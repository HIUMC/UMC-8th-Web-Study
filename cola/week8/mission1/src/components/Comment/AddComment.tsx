import { useParams } from 'react-router-dom';
import usePostComment from '../../hooks/mutations/usePostComment';
import { useState } from 'react';

const AddComment = () => {
  const { lpId } = useParams<{ lpId: string }>();

  const { mutate: addComment } = usePostComment();

  const [content, setContent] = useState('');

  const handleAddComment = async () => {
    await addComment({ lpId: Number(lpId), body: { content } });
    setContent('');
  };

  const isFilled = content.trim().length > 0;

  return (
    <div className="flex gap-2">
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        type="text"
        placeholder="댓글을 입력하세요."
        className="w-full h-10 rounded-md bg-gray-500 px-3 text-white"
      />
      <button
        onClick={handleAddComment}
        className={`w-20 h-10 rounded-md text-white transition ${
          isFilled ? 'bg-pink-500 cursor-pointer' : 'bg-gray-600'
        }`}
      >
        작성
      </button>
    </div>
  );
};

export default AddComment;
