import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [lpName, setLpName] = useState(""); // State for LP Name
  const [lpContent, setLpContent] = useState(""); // State for LP Content
  const [lpTag, setLpTag] = useState(""); // State for LP Tag

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      console.log(response);

      setData(response);
    };

    getData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLpSubmit = () => {
    // Handle LP submission logic here
    console.log("LP Name:", lpName);
    console.log("LP Content:", lpContent);
    console.log("LP Tag:", lpTag);
    setIsModalOpen(false); // Close the modal after submission
  };

  return (
    <div className="mt-20 flex flex-col items-center space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">
        {data?.data.name}님 환영합니다.
      </h1>
      <img
        src={data?.data.avatar as string}
        alt={"구글 로고"}
        className="w-32 h-32 rounded-full shadow-md"
      />
      <h2 className="text-lg text-gray-600">{data?.data.email}</h2>

      <button
        className="cursor-pointer bg-blue-500 text-white font-semibold rounded-md px-6 py-3 hover:bg-blue-600 hover:scale-105 transition-transform shadow-md"
        onClick={handleLogout}
      >
        로그아웃
      </button>

      {/* Button to open modal */}
      <button
        className="cursor-pointer bg-green-500 text-white font-semibold rounded-md px-6 py-3 hover:bg-green-600 hover:scale-105 transition-transform shadow-md"
        onClick={handleModalToggle}
      >
        + LP 작성
      </button>

      {/* Modal */}
      {isModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-96">
      {/* Modal Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          LP 작성
        </h2>
        <button
          className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          onClick={handleModalToggle}
        >
          ✕
        </button>
      </div>

      {/* Modal Content */}
      <div className="space-y-6">
        {/* LP Name */}
        <div>
          <label
            htmlFor="lpName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            LP 이름
          </label>
          <input
            id="lpName"
            type="text"
            placeholder="LP 이름을 입력하세요"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={lpName}
            onChange={(e) => setLpName(e.target.value)}
          />
        </div>

        {/* LP Content */}
        <div>
          <label
            htmlFor="lpContent"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            LP 내용
          </label>
          <textarea
            id="lpContent"
            placeholder="LP 내용을 입력하세요"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={lpContent}
            onChange={(e) => setLpContent(e.target.value)}
            rows={4}
          />
        </div>

        {/* LP Tag */}
        <div>
          <label
            htmlFor="lpTag"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            LP 태그
          </label>
          <input
            id="lpTag"
            type="text"
            placeholder="LP 태그를 입력하세요 (쉼표로 구분)"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={lpTag}
            onChange={(e) => setLpTag(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button
          className="w-full bg-blue-500 text-white font-semibold rounded-md px-4 py-3 hover:bg-blue-600 transition-colors"
          onClick={handleLpSubmit}
        >
          작성 완료
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default MyPage;