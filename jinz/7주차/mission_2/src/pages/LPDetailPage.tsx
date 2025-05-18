import { useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import LPComments from "./LPComments";
import { useState } from "react";
import LPData from "../components/LPData";
import { deleteLP } from "../apis/auth";
import LPLike from "../components/LPLike";

dayjs.extend(relativeTime);

const fetchLPdetail = async (id:any) => {
    const res = await fetch(`http://localhost:8000/v1/lps/${id}`);
    return res.json();
}
function LPdetailComponet() {
    const {id} = useParams();
    const [editMode, setEditMode] = useState<boolean>(false);
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: deleteLP,
        onSuccess: () => {
            console.log("LP 삭제 성공");
            queryClient.invalidateQueries({ queryKey: ['lpDetail', id] });
        }
    })

    const {data, isLoading, error} = useQuery({
        queryKey: ['lpDetail', id],
        queryFn: () => fetchLPdetail(id),
    })

    if(!id) return <div>id가 없습니다.</div>;
    if(isLoading) return <div>로딩 중...</div>;
    if(error) return <div> 에러 발생... ㅜㅜㅜ</div>;
    if(!data || !data.status || !data.data) return <div>데이터가 없습니다.</div>;

    const createdAt = data.data.createdAt || new Date();
    const daysAgo = dayjs(createdAt).fromNow();

    return(
    <div>
        <div className="flex flex-col items-center w-200 p-6 bg-gray-300 rounded-lg shadow-md">
            {/* 상단 바 */}
            <div className="w-full flex items-center justify-between  mb-4">
                <div className="flex items-center gap-2 font-semibold"> {data.data.author.name}</div>
                <div className="flex items-center gap-4 text-gray-900 text-sm">
                    <span>{daysAgo}</span>
                </div>
            </div>
            <div className="w-full flex items-center justify-between  mb-4">
                {editMode? (
                    <LPData
                        lpData={data.data}
                        onCancel={() => setEditMode(false)}
                        onDone={()=>setEditMode(false)}
                    />
                ):(
                    <>
                        <h2 className="flex items-center gap-2 font-bold mb-4">title: {data.data.title}</h2>
                        <div className="flex items-center gap-4 text-gray-900 text-sm">
                        <button
                            onClick={()=>{setEditMode(true)}}>✏️</button>
                        <button
                            onClick={()=>deleteMutation.mutate(id)}>🗑️</button>
                        </div>
                    </>
                    

                )}
                
            </div>

            {!editMode && (
                <>
                    <div className="flex flex-col items-center mb-4 w-100 p-4 bg-gray-300 rounded-lg shadow-2xl">
                        <img 
                        src={'/sza.jpg'}
                        className="w-80 h-80 object-cover mb-4 rounded-full" />
                    </div>
                    <div className="w-full mb-4 text-sm">content: {data.data.content} </div>
                    <div className="flex flex-wrap gap-2 mb-4"> tags : 
                        {data.data.tags?.map((tag:any)=>(
                        <span
                            key={tag.id}
                            className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                        >
                            #{tag.name}
                        </span>
                    ))}
                    </div> 
                    <LPLike lpId={id} initialLikes={data.data.likes.length}/>
                </>
            )}  
        </div>

    </div>
    )
}

const LPDetailPage=() => {
    return(
        <div className="flex flex-col items-center justify-center h-full gap-4">
            <LPdetailComponet/>
            <LPComments/>
        </div>
    )
}

export default LPDetailPage;