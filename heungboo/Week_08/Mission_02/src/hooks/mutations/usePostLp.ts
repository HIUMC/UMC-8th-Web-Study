import { useMutation } from "@tanstack/react-query";
import { postLpList } from "../../apis/lp";

export const usePostLp = () => {
  return useMutation({
    mutationFn: postLpList,
    onSuccess: (data) => {
      console.log("LP 생성 성공:", data);
      alert("LP가 성공적으로 생성되었습니다!");
    },
    onError: (error) => {
      console.error("LP 생성 실패:", error);
      alert("LP 생성 중 오류가 발생했습니다.");
    },
  });
};
