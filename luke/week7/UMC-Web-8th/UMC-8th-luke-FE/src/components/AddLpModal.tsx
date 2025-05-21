// src/components/AddLpModal.tsx
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useCreateLp } from '../hooks/useCreateLp';

/**
 * 서버에 전송할 CreateLpDto
 */
export interface CreateLpDto {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  published: boolean;
}

interface AddLpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * 새 LP 추가 모달 컴포넌트
 * - 로컬 미리보기
 * - 제출 시 useMutation으로 API 호출
 */
export default function AddLpModal({ isOpen, onClose }: AddLpModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // createLp mutation 가져오기
  const { mutate: createLp, isLoading: isCreating } = useCreateLp();

  // 모달 열림/닫힘마다 상태 초기화
  useEffect(() => {
    if (!isOpen) {
      setTitle('');
      setContent('');
      setTags([]);
      setTagInput('');
      setFile(null);
      setPreviewUrl(null);
    }
  }, [isOpen]);

  // 파일 선택 시 로컬 미리보기 생성
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
    if (selected) {
      const tmp = URL.createObjectURL(selected);
      setPreviewUrl(tmp);
    }
  };

  const handleAddTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) {
      setTags(prev => [...prev, t]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (t: string) => {
    setTags(prev => prev.filter(tag => tag !== t));
  };

  // 제출 핸들러: 이미지 업로드 후 LP 생성
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    // 1) 이미지가 선택된 경우 업로드해서 URL 받기
    let thumbnailUrl = '';
    if (file) {
      console.log('업로드할 파일:', file);
      const token = localStorage.getItem('accessToken');
      const uploadForm = new FormData();
      uploadForm.append('file', file);

      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/v1/uploads`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: uploadForm,
      });
      if (!res.ok) {
        console.error('이미지 업로드 실패:', res.status, await res.text());
        return;
      }

      const json = await res.json();
      thumbnailUrl = json.data.imageUrl;
      console.log('서버에서 받은 imageUrl:', thumbnailUrl);
    }

    // 2) CreateLpDto 준비
    const dto: CreateLpDto = {
      title: title.trim(),
      content: content.trim(),
      thumbnail: thumbnailUrl,
      tags,
      published: true,
    };
    console.log('최종 DTO:', dto);

    // 3) LP 생성 호출
    createLp(dto, {
      onSuccess: () => {
        onClose();
      },
      onError: err => {
        console.error('LP 생성 에러:', err);
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-gray-800 text-white rounded-lg p-6 w-full max-w-md">
        <button
          type="button"
          className="absolute top-4 right-4 text-white text-xl"
          onClick={onClose}
        >×</button>

        <h2 className="text-2xl font-bold mb-4">새 LP 추가</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 썸네일 */}
          <div>
            <label className="block mb-1">썸네일</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm"
            />
            {previewUrl && (
              <img
                src={previewUrl}
                alt="미리보기"
                className="mt-2 w-full h-40 object-cover rounded"
              />
            )}
          </div>

          {/* 제목 */}
          <div>
            <label className="block mb-1">LP 이름</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 rounded"
            />
          </div>

          {/* 내용 */}
          <div>
            <label className="block mb-1">LP 내용</label>
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 rounded h-24"
            />
          </div>

          {/* 태그 */}
          <div>
            <label className="block mb-1">태그</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                className="flex-1 px-3 py-2 bg-gray-700 rounded"
                onKeyDown={e =>
                  e.key === 'Enter' && (e.preventDefault(), handleAddTag())
                }
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-500"
              >추가</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map(t => (
                <span
                  key={t}
                  className="flex items-center bg-blue-500 px-2 py-1 rounded-full text-xs"
                >
                  #{t}
                  <button
                    type="button"
                    className="ml-1 text-white"
                    onClick={() => handleRemoveTag(t)}
                  >×</button>
                </span>
              ))}
            </div>
          </div>

          {/* 버튼 */}
          <div className="text-right">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
            >취소</button>
            <button
              type="submit"
              disabled={isCreating}
              className={`px-4 py-2 rounded ${
                isCreating ? 'bg-gray-600' : 'bg-green-600 hover:bg-green-500'
              }`}
            >{isCreating ? '저장 중…' : '저장'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
