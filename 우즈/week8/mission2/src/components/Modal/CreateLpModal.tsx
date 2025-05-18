import { useState } from "react";
import { useCreateLp } from "../../hooks/mutations/useCreateLp";

interface CreateLpModalProps {
  onClose: () => void; // 모달 닫기 함수 (부모에서 전달)
  onSuccess: () => void; // LP 생성 성공 시 실행 함수 (부모에서 전달)
}

const CreateLpModal = ({ onClose, onSuccess }: CreateLpModalProps) => {
  // 입력값 상태들
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [published, setPublished] = useState(true);

  // useMutation 훅 (LP 생성 API 호출)
  const { mutate: createLp, isPending } = useCreateLp();

  // 생성 버튼 클릭 시 실행
  const handleSubmit = () => {
    // 필수 값 검증
    if (!title || !content) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    // createLp mutation 호출
    createLp(
      {
        title,
        content,
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        thumbnail,
        published,
      },
      {
        onSuccess: () => {
          alert("LP 생성 완료!");
          onSuccess(); // 리스트 새로고침 & 모달 닫기
        },
        onError: (err) => {
          console.error("생성 실패:", err);
          alert("LP 생성 실패!");
        },
      }
    );
  };

  return (
    // 어두운 배경 오버레이
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {/* 모달 본체 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-[90%] max-w-lg relative">
        {/* X 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white text-xl"
        >
          ✖
        </button>

        {/* 제목 */}
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          LP 생성
        </h2>

        {/* 입력 폼 */}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="LP 제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 rounded border"
          />
          <textarea
            placeholder="LP 내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="p-2 rounded border h-24"
          />
          <input
            type="text"
            placeholder="태그 (쉼표로 구분)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="p-2 rounded border"
          />
          <input
            type="text"
            placeholder="썸네일 이미지 URL"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            className="p-2 rounded border"
          />

          {/* 공개 여부 스위치 */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-700 dark:text-gray-300">
              공개 여부:
            </label>
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {published ? "공개" : "비공개"}
            </span>
          </div>

          {/* 생성 버튼 */}
          <button
            onClick={handleSubmit}
            className="bg-pink-600 text-white py-2 rounded hover:bg-pink-700 disabled:bg-gray-400"
            disabled={isPending}
          >
            {isPending ? "생성 중..." : "생성하기"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateLpModal;
