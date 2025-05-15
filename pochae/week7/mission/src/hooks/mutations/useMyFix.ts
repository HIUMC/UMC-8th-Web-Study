import { useMutation } from "@tanstack/react-query";
import { myFix } from "../../apis/auth";


function useMyFix() {
    return useMutation({
        mutationFn: myFix,
        onSuccess: () => {
            alert("프로필 수정 완료~~!");
        },
        onError: () => {
            alert("프로필 수정 실패셔 ㅠㅠㅠ");
        },
    });
}

export default useMyFix;