import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLPComment } from "../apis/auth";
import { useState } from "react";
import { useParams } from "react-router-dom";
import LPComment from "../components/LPComment";



function LPComments() {
    const QueryClient = useQueryClient();
    const [comment, setComment] = useState<string>('');
    const {id} = useParams();


    const handleCommentSubmit = useMutation({
        mutationFn: postLPComment,
        onError: () => console.log('댓글 등록 중 에러 발생'),
        onSuccess: () => {
            console.log("댓글 작성 성공", comment);
            setComment('');
            QueryClient.invalidateQueries({queryKey: ['lpComment']});
        }
    })


    return (
        <div className="flex flex-col items-center w-200 p-6 bg-gray-300 rounded-lg shadow-md mt-6">
            <div className="flex items-center gap-2 font-semibold"> 댓글</div>                    
                <div className="w-full flex items-center gap-2  mb-4">
                    <input 
                        type="text" 
                        value={comment}
                        placeholder="댓글을 입력하세요..." 
                        className="flex-grow p-2 border border-balck rounded-lg " 
                        onChange={(e)=>setComment(e.target.value)}/>  
                    <button 
                        className="px-4 py-2 bg-gray-500 text-white text-sm rounded-lg h-full"
                        onClick={()=>{
                            if(comment.trim() === '') return;
                            handleCommentSubmit.mutate({id, comment});
                        }}>작성</button>
                </div>
                <LPComment/>
        </div>
    )

}

export default LPComments;