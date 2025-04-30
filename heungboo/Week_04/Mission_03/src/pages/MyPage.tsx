import React, { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";

// 내 정보 조회 페이지
const MyPage = () => {
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);
  useEffect(() => {
    const getData = async () => {
      const response: ResponseMyInfoDto = await getMyInfo();
      console.log(response);

      setData(response);
    };

    getData();
  }, []);
  console.log(data);
  return (
    <div>
      <h1>My Page 입니다. </h1>
      <h2>이름 : {data?.data.name}</h2>
      <h2>이메일 : {data?.data.email}</h2>
      <h2>이메일 : {data?.data.email}</h2>
    </div>
  );
};

export default MyPage;
