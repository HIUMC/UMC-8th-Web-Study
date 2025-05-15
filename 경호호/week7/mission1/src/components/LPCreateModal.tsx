import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createLP } from '../api/lp';
import Modal from './Modal';

interface LPCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LPCreateModal = ({ isOpen, onClose }: LPCreateModalProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const queryClient = useQueryClient();

  const createLPMutation = useMutation({
    mutationFn: createLP,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['lps']});
    }
  });

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createLPMutation.mutate(
      { 
        title, 
        content, 
        tags 
      },
      {
        onSuccess: () => {
          onClose();
          setTitle('');
          setContent('');
          setTags([]);
        }
      }
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">LP 작성</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="제목을 입력하세요"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full h-32 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="내용을 입력하세요"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">태그</label>
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            placeholder="Enter로 추가"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <div className="flex flex-wrap mt-2">
            {tags.map((tag) => (
              <div
                key={tag}
                className="bg-purple-500 text-white px-2 py-1 mr-2 mb-2 rounded flex items-center"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 text-white"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="text-right">
          <button
            type="button"
            onClick={onClose}
            className="mr-2 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            취소
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700"
          >
            작성
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default LPCreateModal; 