import {useQuery} from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/key.ts";
import { getLpList } from "../api/lp.ts";
import useGetLpList from "../hooks/queries/useGetLpList.ts";

const HomePage = () => {
  const {data: ResponseLpListDto | undefined , isPending : boolean , isEror : boolean } = useGetLpList({cursor, search, order, limit}: ()};
  console.log(data);

  return <div></div>

};

export default HomePage;
