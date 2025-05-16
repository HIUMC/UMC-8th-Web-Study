import { useState, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createLP } from '../api/lp';
import Modal from './Modal';
import { X, Plus } from 'lucide-react';
import { uploadProfileImage } from '../api/user';

interface LPCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LPCreateModal = ({ isOpen, onClose }: LPCreateModalProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const createLPMutation = useMutation({
    mutationFn: createLP,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['lps']});
    }
  });

  const uploadImageMutation = useMutation({
    mutationFn: uploadProfileImage,
    onSuccess: (data) => {
      setThumbnail(data.url);
    }
  });

  const handleAddTag = () => {
    if (tagInput.trim()) {
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // 이미지 미리보기 생성
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setThumbnail(e.target.result as string);
        }
      };
      reader.readAsDataURL(files[0]);

      // 이미지 업로드
      uploadImageMutation.mutate(files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createLPMutation.mutate(
      { 
        title, 
        content, 
        tags,
        thumbnail,
        published: true
      },
      {
        onSuccess: () => {
          onClose();
          setTitle('');
          setContent('');
          setTags([]);
          setThumbnail(null);
        }
      }
    );
  };

  // 모달 내용만 재정의
  const modalContent = (
    <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full mx-auto relative">
      <button 
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-500 hover:text-white"
      >
        <X size={20} />
      </button>
      
      <div className="flex justify-center mb-6">
        <div 
          onClick={handleImageClick}
          className="w-40 h-40 rounded-full bg-gray-700 flex items-center justify-center cursor-pointer overflow-hidden"
        >
          {thumbnail ? (
            <img src={thumbnail} alt="LP Cover" className="w-full h-full object-cover" />
          ) : (
            <div className="w-36 h-36 bg-black rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded-full"></div>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="LP Name"
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            placeholder="LP Content"
            rows={3}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          
          <div className="flex">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              placeholder="LP Tag"
              className="flex-1 p-3 bg-gray-700 border border-gray-600 rounded-l focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="bg-gray-600 px-4 rounded-r hover:bg-gray-500"
            >
              Add
            </button>
          </div>
          
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <div
                  key={tag}
                  className="bg-purple-600 text-white px-2 py-1 rounded flex items-center text-sm"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 text-white hover:text-red-200"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
          
          <button
            type="submit"
            disabled={createLPMutation.isLoading}
            className="w-full bg-blue-500 p-3 rounded font-medium hover:bg-blue-600 transition-colors"
          >
            {createLPMutation.isLoading ? "Processing..." : "Add LP"}
          </button>
        </div>
      </form>
    </div>
  );

  // 기존 Modal 컴포넌트에 커스텀 스타일 전달
  return (
    <div className={isOpen ? "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" : "hidden"}>
      {isOpen && modalContent}
    </div>
  );
};

export default LPCreateModal; 