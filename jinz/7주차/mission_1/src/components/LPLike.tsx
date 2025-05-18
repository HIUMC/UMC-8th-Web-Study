import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { deleteLike, likeList, postLike } from "../apis/auth";

function LPLike({lpId, initialLikes}:{lpId: string, initialLikes:number}) {
    const[like, setLike] = useState<boolean>(false);
    const[likecount, setLikecount] = useState<number>(initialLikes)

    
    const postLikeMutation = useMutation({
        mutationFn: postLike,
        onError: (error) => console.log('에러 발생', error),
        onSuccess: () => {
            console.log('좋아요 성공');
            setLike(true);
            setLikecount((prev)=>prev+1);
        }
    })

    const deleteLikeMutation = useMutation({
        mutationFn: deleteLike,
        onError: (error) => console.log('에러발생', error),
        onSuccess: () => {
            console.log('좋아요 취소 성공');
            setLike(false);
            setLikecount((prev)=>Math.max(prev-1,0));
        }
    })

    useEffect(() => {
        const fetchLikeLPs = async () => {
            try{
                const res = await likeList();
                const likedLPs = res.data.data;

                const liked = likedLPs.some((lp:any) => String(lp.id)===lpId);
                setLike(liked);
            }catch (err) {
                console.error('좋아요 목록 불러오기 실패', err);
            }
        }

        if (lpId) fetchLikeLPs();
    }, [lpId]);

    return(
        <>
            {like ? (
                <button className='flex items-center gap-1 text-red'
                    onClick={()=>deleteLikeMutation.mutate(lpId)}>♥</button>
            ):(
                <button className='flex items-center gap-1 text-red'
                    onClick={()=>postLikeMutation.mutate(lpId)}>♡</button>
            )}
            <span>{likecount}</span>
        </>
    )
}

export default LPLike;