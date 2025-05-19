// hooks/mutations/useUpdateProfile.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateProfilePayload {
  name: string;
  bio?: string;
  avatar?: string;
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateProfilePayload) => {
      const token = localStorage.getItem("accessToken");

      const res = await fetch("http://localhost:8000/v1/users", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("프로필 수정 실패");
      return res.json();
    },

    // 낙관적 업데이트
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: ["myInfo"] });
      const previousData = queryClient.getQueryData(["myInfo"]);

      queryClient.setQueryData(["myInfo"], (old: any) => ({
        ...old,
        data: {
          ...old?.data,
          name: payload.name,
          bio: payload.bio,
          avatar: payload.avatar || old?.data?.avatar,
        },
      }));

      return { previousData };
    },

    // 에러 발생 시 롤백
    onError: (_err, _payload, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["myInfo"], context.previousData);
      }
    },

    // 성공 or 실패 후 쿼리 무효화
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["myInfo"] });
    },
  });
};
