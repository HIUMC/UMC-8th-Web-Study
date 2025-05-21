import { useMutation } from "@tanstack/react-query";
import { patchUserInfo } from "../../apis/auth";
import { RequestPatchUserInfoDto } from "../../types/auth";

export const usePatchUserInfo = () => {
  return useMutation({
    mutationFn: (body: RequestPatchUserInfoDto) => patchUserInfo({ body }),
    onSuccess: (data) => {
      console.log("유저 정보 수정 성공:", data);
      alert("프로필이 성공적으로 수정되었습니다!");
    },
    onError: (error) => {
      console.error("유저 정보 수정 실패:", error);
      alert("프로필 수정 중 오류가 발생했습니다.");
    },
  });
};
