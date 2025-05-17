import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateNickname } from "../../apis/auth"; // PATCH API

export const useUpdateNickname = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newName: string) => updateNickname(newName),
    onMutate: async (newName) => {
      await queryClient.cancelQueries({ queryKey: ["myInfo"] });

      const previousData = queryClient.getQueryData(["myInfo"]);

      queryClient.setQueryData(["myInfo"], (old: any) => ({
        ...old,
        data: {
          ...old?.data,
          name: newName,
        },
      }));

      return { previousData };
    },
    onError: (_err, _newName, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["myInfo"], context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["myInfo"] });
    },
  });
};
