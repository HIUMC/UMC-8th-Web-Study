import { useAuth } from "../context/AuthContext";

const LPidCard = () => {
  const { accessToken } = useAuth();

  if (!accessToken) {
    alert("로그인 후 사용해주세요.");
  }
  //LPidCard 페이지 접근해서 구현해서 내용 보여주기....
  return <></>;
};

export default LPidCard;
