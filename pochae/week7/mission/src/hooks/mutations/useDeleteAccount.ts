import { useMutation } from "@tanstack/react-query";
import { deleteMy } from "../../apis/auth";

function useDeleteAccount() {
    return useMutation({
        mutationFn: deleteMy,
        onSuccess: () => {
            alert("탈퇴가 완료되었습니당~~");
        },
        onError: () => {
            alert("탈퇴에 실패했더요 ㅠㅠ");
        },
    })
}

export default useDeleteAccount;