import { useEffect } from "react";
import { getMyInfo } from "../apis/auth";

const Mypage = () => {
  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      console.log(response);
    };

    getData();
  }, []);
  return <div>hello</div>;
};

export default Mypage;
