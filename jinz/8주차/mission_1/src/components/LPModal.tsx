import { useMutation, QueryClient, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { postLP } from "../apis/auth";

function LPModal() {
    //모달 상태 확인인
    const [isOpen, setIsOpen] = useState(false);

    // lp 이미지 URL을 위한 state
    const [lpImage, setLpImage] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');

    //태그 관리
    const [tag, setTag] = useState<string|''>('');
    const [tagArr, setTagArr] = useState<string[]>([]);

    const queryClient = useQueryClient();

    const handleSubmit = useMutation({
        mutationFn: (newLP) => postLP(newLP),
        onError: () => { 
            console.log('에러 발생');  
        },
        onSuccess: () => { 
            console.log('성공', title, content, tagArr, lpImage);
            queryClient.invalidateQueries({ queryKey: ['lps'] });
            setTitle('');
            setContent('');
            setTag('');
            setTagArr([]);
            setLpImage('');
            setIsOpen(false);
        }
    })

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // base64 URL로 변환
                const base64Url = reader.result as string;
                setLpImage(base64Url);
            };
            reader.readAsDataURL(file);
        }
    }

    const handleAddTag = (event:any) => {
        event.preventDefault(); // 폼 제출 방지
        if(tag.trim() !== ''){
            setTagArr((prev) => [...prev, tag]);
            setTag('');
        }
    }

    const deleteTag = (deleteIndex:number) => {
        setTagArr(tagArr.filter((_, index) => index !== deleteIndex));
    }

    return(
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-4 right-4 p-4 w-15 h-15 rounded-full bg-gray-500 text-white shadow text-2xl bold"
            >
                +
            </button>

            {isOpen && (
                <form className="fixed inset-25 flex flex-col items-center justfy-center bg-gray-300 rounded-lg shadow-md z-50 p-4">
                    <button
                        onClick={() => setIsOpen(false)} 
                        className="absolute top-1 right-3"> ✖ </button>
                    
                    <img 
                        src={lpImage || '/lp.png'}
                        className='w-60 h-60 object-cover mb-10 rounded-full cursor-pointer'
                        onClick={()=>fileInputRef.current?.click()} />
                    <input 
                        type="file" 
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        className="hidden" />
                    <input 
                        type="text" 
                        value={title}
                        onChange={(e)=> setTitle(e.target.value)}
                        placeholder="LP 제목" 
                        className="flex-grow w-80 h-12 p-2 border border-black rounded-lg mb-4 text-sm" />
                    <input 
                        type="text" 
                        value={content}
                        onChange={(e)=> setContent(e.target.value)}
                        placeholder="LP 내용..." 
                        className="flex-grow w-80 h-12 p-2 border border-black rounded-lg mb-4 text-sm" />
                    <div className="flex flex-wrap w-80 gap-2 mb-4"> 
                        <input 
                            type="text" 
                            value={tag}
                            onChange={(e)=> setTag(e.target.value)}
                            placeholder="태그 추가..." 
                            className="flex-grow h-12 p-2 border border-black rounded-lg mb-4 text-sm" />
                        <button
                            onClick={handleAddTag} 
                            className="h-12 px-4 bg-gray-500 text-white text-sm rounded-lg mb-4">작성</button>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                            {tagArr.map((tag, index)=>(
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

                    <button 
                        type="button"
                        className="w-80 h-12 px-4 py-2 bg-gray-500 text-white text-sm rounded-lg"
                        onClick={()=>{
                            const newLP = {
                                title,
                                content,
                                thumbnail: lpImage,
                                tags: tagArr,
                                published: true,
                            };
                            
                            handleSubmit.mutateAsync(newLP);
                        }}
                    >작성</button>

                </form>
            )}
        </>
    );
}

export default LPModal;

