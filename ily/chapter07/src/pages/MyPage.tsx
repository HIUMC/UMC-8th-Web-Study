import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { CommonInformation, ResponseMyInfoDto } from "../utils/types/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { NavbarIsLoginned } from "../components/NavbarIsLoginned";
import useReform from "../hooks/mutations/useReform";

const MyPage = () => {
  const { mutate: updateMutate } = useReform();
  const navigate = useNavigate();
  const [onSetting, setOnSetting] = useState<boolean>(false);
  const [info, setInfo] = useState<CommonInformation>({
    name: "",
    bio: "",
    avatar: "",
  });
  const { logout } = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);
  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();

      setData(response);
      console.log("response 출력:", response);
    };

    console.log("data출력:", data);

    getData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const addLp = () => {
    navigate("/addLp");
  };

  const setting = () => {
    setOnSetting((prev) => !prev);
  };

  const handleUpdate = async () => {
    updateMutate({
      name: String(info.name),
      bio: String(info.bio),
      avatar: String(info.avatar),
    });
  };
  return (
    <div>
      {/*로그아웃 link는 존재하지만 실제 구현하진 않았음. */}
      <NavbarIsLoginned />
      <div>
        {data?.data?.name} {data?.data?.avatar} {data?.data?.bio}
        {data?.data?.email}
        <img
          className="w-100 h-100 mt-10"
          src={data?.data?.avatar}
          alt="profile"
        />
      </div>

      <button
        className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={handleLogout}
      >
        로그아웃
      </button>
      <button
        className="cursor-pointer bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded"
        onClick={() => addLp()}
      >
        LP추가 버튼
      </button>
      <button
        className="cursor-pointer bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        onClick={setting}
      >
        설정
      </button>

      {onSetting && (
        <div className="mt-4 space-y-2">
          <div>
            <label className="block font-semibold">name</label>
            <input
              type="text"
              value={info.name}
              onChange={(e) => setInfo({ ...info, name: e.target.value })}
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>

          <div>
            <label className="block font-semibold">bio</label>
            <input
              type="text"
              value={info.bio}
              onChange={(e) => setInfo({ ...info, bio: e.target.value })}
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>

          <div>
            <label className="block font-semibold">avatar</label>
            <input
              type="text"
              value={info.avatar}
              onChange={(e) => setInfo({ ...info, avatar: e.target.value })}
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>
          <button
            className="cursor-pointer bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleUpdate}
          >
            적용하기
          </button>
        </div>
      )}
    </div>
  );
};

export default MyPage;
