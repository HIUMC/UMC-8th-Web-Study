import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import useAddLp from "../hooks/mutations/useAddLp";
import { RequestAddLpDto } from "../utils/types/lp";

const AddLPCardPage = () => {
  const { mutate: addLpMutate } = useAddLp();

  const navigate = useNavigate();

  const handlerToBack = () => {
    navigate("/");
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState("/daon.svg");

  //input값 value설정하기
  const [LPName, setLPName] = useState<string>("");
  const [LPContent, setLPContent] = useState<string>("");
  const [LPTag, setLPTag] = useState<string>("");
  const [Tags, setTags] = useState<string[]>([]);

  const handleAddTag = () => {
    if (LPTag.trim() !== "") {
      setTags((prevTags) => [...prevTags, LPTag]);
      setLPTag(""); // 태그 추가 후 input 초기화
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click(); // 숨겨진 input 클릭
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl); // 선택한 이미지로 미리보기 교체
    }
  };

  const handlerAddLP = () => {
    const payload: RequestAddLpDto = {
      title: LPName,
      content: LPContent,
      thumbnail: previewUrl,
      tags: Tags,
      published: true,
    };
    addLpMutate(payload);
    console.log("handlerAddLP에서 의 값", payload);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md p-6  rounded-lg shadow-md space-y-4">
        <div className="relative flex items-center justify-center">
          <h2 className="text-lg font-semibold">Add LP</h2>
          <button
            className="absolute right-0 cursor-pointer"
            onClick={handlerToBack}
          >
            X
          </button>
        </div>
        <div>
          <img
            src={previewUrl}
            alt="LP추가하는 img"
            onClick={handleImageClick}
            style={{
              width: 200,
              height: 200,
              objectFit: "contain",
              cursor: "pointer",
            }}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
        <input
          placeholder="LP Name"
          className="w-full p-3 rounded-md border-2 rounded-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          value={LPName}
          onChange={(e) => setLPName(e.target.value)}
        />

        <input
          placeholder="LP Content"
          className="w-full p-3 rounded-md border-2 rounded-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          value={LPContent}
          onChange={(e) => setLPContent(e.target.value)}
        />

        <div className="flex gap-2">
          <input
            placeholder="LP Tags"
            className="flex-1 p-3 rounded-md border-2 rounded-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            value={LPTag}
            onChange={(e) => setLPTag(e.target.value)} // 쉼표로 구분된 태그 입력
          />
          <button
            className="px-4 py-2 rounded-md bg-gray-500 hover:bg-gray-400 text-white"
            onClick={handleAddTag}
          >
            Add
          </button>
        </div>

        <button
          className="w-full py-3 rounded-md bg-gray-500 hover:bg-gray-400 text-white font-semibold"
          onClick={handlerAddLP}
        >
          Add LP
        </button>
      </div>
    </div>
  );
};

export default AddLPCardPage;
