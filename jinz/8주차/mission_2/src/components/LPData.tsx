import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLP } from "../apis/auth";
import { addLPDto } from "../types/auth";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function LPData({lpData, onCancel, onDone}: {lpData: addLPDto; onCancel: () => void; onDone: () => void}) {
    const {id} = useParams();
    const [editLP, setEditLP] = useState<addLPDto | null>(null);
    const queryClient = useQueryClient();
    
    const [tag, setTag] = useState<string>('');

    useEffect(() => {
        if (lpData) {
            setEditLP({
                ...lpData,
                tags: lpData.tags?.map(tag => typeof tag === 'string' ? tag : tag.name) || []
            });
        }
    }, [lpData]);

    const updateMutation = useMutation({
        mutationFn: updateLP,
        onSuccess: () => {
            console.log("LP 수정 성공");
            queryClient.invalidateQueries({ queryKey: ['lpDetail', id] });
            onDone();
        },
        onError: (error) => {
            console.log('수정 실패', error);
            console.log('보내는 데이터', editLP);
        }
    });

    const handleAddTag = (event: React.FormEvent) => {
        event.preventDefault();
        if (tag.trim()) {
            setEditLP(prev =>
                prev ? { ...prev, tags: [...prev.tags, tag.trim()] } : prev
            );
            setTag('');
        }
    };

    const deleteTag = (index: number) => {
        setEditLP(prev =>
            prev
                ? { ...prev, tags: prev.tags.filter((_, i) => i !== index) }
                : prev
        );
    };

    if (!editLP) return null;

    return (
        <>
            <div className="w-full flex flex-col items-center justify-between mb-4">
                <input 
                    type="text"
                    value={editLP.title || ""}
                    onChange={(e) => setEditLP(prev => prev ? {...prev, title: e.target.value} : null)}
                    className="w-full border border-gray-500 rounded-lg gap-2 p-2 font-bold mb-4"
                    placeholder="제목 수정..." />
                <div className="flex flex-col items-center mb-4 w-100 p-4 bg-gray-300 rounded-lg shadow-2xl">
                    <img 
                        src={'/sza.jpg'}
                        className="w-80 h-80 object-cover mb-4 rounded-full cursor-pointer"
                        onClick={() => {}} />
                </div>
                
                <textarea 
                    rows={4}
                    value={editLP.content || ""}
                    onChange={(e) => setEditLP(prev => prev ? {...prev, content: e.target.value} : null)}
                    className="w-full border border-gray-500 rounded-lg gap-2 p-2 text-sm mb-4"
                    placeholder="내용 수정..." />

                <div className="flex flex-wrap w-80 gap-2 mb-4"> 
                    <input 
                        type="text" 
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        placeholder="태그 추가..." 
                        className="flex-grow h-12 p-2 border border-black rounded-lg mb-4 text-sm" />
                    <button
                        onClick={handleAddTag} 
                        className="h-12 px-4 bg-gray-500 text-white text-sm rounded-lg mb-4">작성</button>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                    {editLP.tags.map((tag, index) => (
                        <span key={index} className="px-3 py-1 flex flex-wrap bg-gray-500 rounded-full text-sm text-white">
                            #{tag} 
                            <button 
                                type="button"
                                onClick={() => deleteTag(index)}
                                className='ml-1 text-sm text-white'
                            > x</button>
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-4 text-gray-900 text-sm">
                    <button 
                        onClick={() => {
                            if (editLP) {
                                updateMutation.mutate({body: editLP, id: id!});
                            }
                        }}
                        className="p-2 bg-gray-500 text-white text-sm rounded-lg">저장</button>
                    <button 
                        onClick={onCancel}
                        className="p-2 bg-gray-500 text-white text-sm rounded-lg">취소</button>
                </div>
            </div>
        </>
    );
}

export default LPData;