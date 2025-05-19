import { PAGINATION_ORDER } from "../enums/common";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import LpCard from "../components/LPCard/LPCard";
import LpCardSkeletonList from "../components/LPCard/LPCardSkeletonList";
import Modal from "react-modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Search } from "lucide-react";
import useDebounce from "../hooks/useDebounce";

Modal.setAppElement("#root");




const HomePage = () => {
  const [search, setSearch] = useState("");
  const debouncedValue = useDebounce(search, 300);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lpTitle, setLpTitle] = useState("");
  const [lpContent, setLpContent] = useState("");
  const [lpFile, setLpFile] = useState<File | null>(null);
  const [lpTags, setLpTags] = useState<string>("");

  const queryClient = useQueryClient();

  const {
    data: lps,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
  } = useGetInfiniteLpList(10, debouncedValue, PAGINATION_ORDER.dsec);

  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  const createLpMutation = useMutation({
    mutationFn: async (data: {
      title: string;
      content: string;
      thumbnail: string;
      published: boolean;
      tags: string[];
    }) => {
      const accessToken = localStorage.getItem("accessToken");
      const res = await fetch("http://localhost:8000/v1/lps", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) {
        console.error("LP 등록 실패 응답:", result);
        throw new Error("LP 등록 실패");
      }
      return result;
    },
    onSuccess: () => {
      alert("LP 등록 완료!");
      setIsModalOpen(false);
      setLpTitle("");
      setLpContent("");
      setLpFile(null);
      setLpTags("");
      queryClient.invalidateQueries({ queryKey: ["lps"] });
    },
    onError: (error: any) => {
      alert(error.message || "LP 등록 실패");
    },
  });

 

  const handleSubmit = async () => {
    console.log("등록버튼클릭됨");
    if (!lpFile) return alert("이미지를 선택해주세요!");
    const accessToken = localStorage.getItem("accessToken");
    console.log("accessToken:", accessToken);
    if (!accessToken) return alert("로그인이 필요합니다.");

    try {
      const formData = new FormData();
      formData.append("file", lpFile);

      const uploadRes = await fetch("http://localhost:8000/v1/uploads", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (!uploadRes.ok) throw new Error("이미지 업로드 실패");

      const uploadData = await uploadRes.json();
      const imageUrl = uploadData.data.imageUrl;

      if (typeof imageUrl !== "string") {
        console.error("썸네일 URL이 문자열이 아닙니다:", imageUrl);
        throw new Error("썸네일 처리 오류");
      }

      const tagsArray = lpTags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag);

      const payload = {
        title: lpTitle,
        content: lpContent,
        thumbnail: imageUrl,
        published: true,
        tags: tagsArray.length > 0 ? tagsArray : ["default"],
      };

      console.log("보낼 데이터:", payload);

      createLpMutation.mutate(payload);
    } catch (err: any) {
      alert(err.message || "에러 발생");
      console.error(err);
    }
  };

  if (isError) return <div className="mt-20">Error...</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      {/*검색창*/}
      <form onSubmit={(e) => { e.preventDefault(); }}className="relative w-40 mb-6">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="검색"
        className="w-full border-b border-gray-400 bg-transparent text-sm px-2 py-1 pr-6 focus:outline-none focus:border-blue-500 placeholder-gray-400"
      />
      <button
        type="submit"
        className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500"
      >
        🔍
      </button>
    </form>

      <button
  onClick={() => setIsModalOpen(true)}
  className="fixed bottom-[113px] right-6 w-14 h-14 rounded-full bg-blue-500 text-white text-3xl shadow-lg flex items-center justify-center hover:bg-blue-600 transition duration-200 z-50"
>
  +
</button>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isPending && <LpCardSkeletonList count={20} />}
        {lps?.pages
          ?.map((page) => page.data.data)
          ?.flat()
          ?.map((lp) => (
            <LpCard key={lp.id} lp={lp} />
          ))}
        {isFetching && <LpCardSkeletonList count={20} />}
      </div>
      <div ref={ref} className="h-2"></div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="LP 작성 모달"
        className="bg-white p-6 rounded shadow-md max-w-lg mx-auto mt-24 outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50"
      >
        <h2 className="text-xl font-bold mb-4">LP 작성</h2>
        <input
          type="text"
          placeholder="제목"
          className="w-full border p-2 mb-2"
          value={lpTitle}
          onChange={(e) => setLpTitle(e.target.value)}
        />
        <textarea
          placeholder="내용"
          className="w-full h-24 border p-2 mb-2"
          value={lpContent}
          onChange={(e) => setLpContent(e.target.value)}
        />
        <input
          type="text"
          placeholder="태그 (쉼표로 구분)"
          className="w-full border p-2 mb-2"
          value={lpTags}
          onChange={(e) => setLpTags(e.target.value)}
        />
        <input
          type="file"
          className="mb-4"
          onChange={(e) => {
            if (e.target.files) setLpFile(e.target.files[0]);
          }}
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
          >
            등록
          </button>
          <button
            onClick={() => setIsModalOpen(false)}
            className="bg-gray-300 text-black px-4 py-2 rounded cursor-pointer"
          >
            닫기
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default HomePage;
