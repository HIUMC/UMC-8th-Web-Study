import { useState } from "react";
import { usePostLp } from "../../hooks/mutations/usePostLp";

const LpModal = ({ onClose }: { onClose: () => void }) => {
  const [lpName, setLpName] = useState("");
  const [lpContent, setLpContent] = useState("");
  const [lpTag, setLpTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [lpImage, setLpImage] = useState<string>("/Lp.jpg");

  const { mutate: postLp } = usePostLp();

  const addTag = () => {
    if (lpTag.trim()) {
      setTags([...tags, lpTag.trim()]);
      setLpTag("");
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleAddLp = () => {
    if (!lpName.trim() || !lpContent.trim()) {
      alert("LP 제목과 내용을 입력해주세요!");
      return;
    }

    // 서버에서 tag 를 한 개 이상 요구함
    if (tags.length === 0 || tags.some((tag) => !tag.trim())) {
      alert("태그를 최소 1개 이상 입력해주세요!");
      return;
    }

    // lpImage 가 data:image 으로 시작하는 경우 기본 URL로 대체 => 서버가 기본 URL 을 필요로 하는 것인지..
    const validThumbnail = lpImage.startsWith("data:image")
      ? "https://example.com/default-thumbnail.jpg"
      : lpImage;

    const lpData = {
      title: lpName,
      content: lpContent,
      thumbnail: validThumbnail,
      tags: tags.map((tag) => tag.trim()),
      published: true,
    };
    console.log("전송 데이터:", lpData);
    postLp(lpData);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {/* LP Image */}
        <div className="mb-4">
          <label htmlFor="lpImageInput">
            <img
              src={lpImage}
              alt="LP"
              className="w-full h-40 object-cover rounded-md cursor-pointer"
            />
          </label>
          <input
            id="lpImageInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = () => {
                  if (reader.result) setLpImage(reader.result as string);
                };
                reader.readAsDataURL(file);
              }
            }}
          />
        </div>

        {/* LP Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">LP Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            value={lpName}
            onChange={(e) => setLpName(e.target.value)}
            placeholder="Enter LP Name"
          />
        </div>

        {/* LP Content */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">LP Content</label>
          <textarea
            className="w-full h-20 border border-gray-300 rounded-md p-2"
            value={lpContent}
            onChange={(e) => setLpContent(e.target.value)}
            placeholder="Enter LP Content"
          ></textarea>
        </div>

        {/* LP Tag */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">LP Tag</label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-md p-2"
              value={lpTag}
              onChange={(e) => setLpTag(e.target.value)}
              placeholder="Enter LP Tag"
            />
            <button
              onClick={addTag}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add
            </button>
          </div>
          {/* Display Tags */}
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-200 text-sm rounded-md px-2 py-1"
              >
                <span>{tag}</span>
                <button
                  onClick={() => removeTag(index)}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Add LP Button */}
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={handleAddLp}
          >
            Add LP
          </button>
        </div>
      </div>
    </div>
  );
};

export default LpModal;
