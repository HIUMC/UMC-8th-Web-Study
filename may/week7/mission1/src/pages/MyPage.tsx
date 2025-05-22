import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { useAuth } from "../context/AuthContext";
import { ResponseMyInfoDto } from "../types/auth";
import { useNavigate } from "react-router-dom";
import usePatchMyInfo from "../hooks/mutations/usePatchMyInfo";
import { FiSettings } from "react-icons/fi";

const MyPage = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [data, setData] = useState<ResponseMyInfoDto | null>(null);
    const [isEdit, setIsEdit] = useState(false);
    const [form, setForm] = useState({ name: "", bio: "", email: "" });
    const patchMyInfo = usePatchMyInfo();

    useEffect(() => {
        const getData = async () => {
            const response = await getMyInfo();
            console.log(response);
            setData(response);
            setForm({
                name: response.data.name || "",
                bio: response.data.bio || "",
                email: response.data.email || "",
            });
        };

        getData();
    }, []);

    const handleLogout = async () => {
        await logout();
        navigate("/");
    }

    const handleEdit = () => setIsEdit(true);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        if (!form.name.trim()) {
            alert("닉네임은 필수입니다.");
            return;
        }
        patchMyInfo.mutate({
            name: form.name,
            bio: form.bio,
            email: form.email,
        });
        setIsEdit(false);
    };

    return (
        <div>
            {data && (
                <>
                    <img src={data.data?.avatar || "/images/default-profile.png"} alt="프로필" />
                    {isEdit ? (
                        <div className="flex flex-col gap-4 max-w-xs mx-auto bg-white p-6 rounded-lg shadow">
                            <label className="flex flex-col font-semibold">
                                닉네임(필수)
                                <input
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="닉네임을 입력하세요"
                                    className="mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </label>
                            <label className="flex flex-col font-semibold">
                                소개(선택)
                                <input
                                    name="bio"
                                    value={form.bio}
                                    onChange={handleChange}
                                    placeholder="자기소개를 입력하세요"
                                    className="mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </label>
                            <label className="flex flex-col font-semibold">
                                이메일(필수)
                                <input
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="이메일을 입력하세요"
                                    className="mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    type="email"
                                    required
                                />
                            </label>
                            <div className="flex gap-2 mt-2">
                                <button
                                    onClick={handleSave}
                                    className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                                >
                                    저장
                                </button>
                                <button
                                    onClick={() => setIsEdit(false)}
                                    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400 transition"
                                >
                                    취소
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
                                {data.data?.name}님 환영합니다.
                                <button
                                    onClick={handleEdit}
                                    className="ml-2 p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                                    title="설정"
                                >
                                    <FiSettings className="text-white text-xl" />
                                </button>
                            </h1>
                            <div className="text-gray-300 mb-1">{data.data?.bio}</div>
                            <div className="text-gray-400 mb-4">{data.data?.email}</div>
                        </div>
                    )}
                </>
            )}
            <button
                className="cursor-pointer bg-blue-300 rounded-sm p-5 hover:scale-90"
                onClick={handleLogout}
            >
                로그아웃
            </button>
        </div>
    );
};

export default MyPage;