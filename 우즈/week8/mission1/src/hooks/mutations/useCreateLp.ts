import { useMutation } from "@tanstack/react-query";
import { createLp } from "../../apis/lp";

export const useCreateLp = () => {
  return useMutation({
    mutationFn: createLp,
  });
};
