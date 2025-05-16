import { useEffect, useState } from 'react';
import useGetInfiniteLpList from '../../hooks/queries/useGetInfiniteLpList';
import { PAGINATION_ORDER } from '../../enums/common';
import { useInView } from 'react-intersection-observer';
import LpCard from './LpCard';
import LpCardSkeletonList from './LpCardSkeletonList';

const LpList = () => {
  const [search, setSearch] = useState('');
  const [sortType, setSortType] = useState<PAGINATION_ORDER>(
    PAGINATION_ORDER.desc
  );
  const {
    data: lps,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
  } = useGetInfiniteLpList(10, search, sortType);
  console.log(lps);
  // ref -> 특정한 HTML 요소를 감시
  // inView -> 그 요소가 화면에 보이면 true, 아니면 false
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isError) return <h1>Error...</h1>;

  return (
    <div className="flex flex-col p-5">
      <div className="flex justify-end">
        <button
          onClick={() => setSortType(PAGINATION_ORDER.asc)}
          className={`p-2 rounded-md cursor-pointer ${sortType === PAGINATION_ORDER.asc ? 'bg-white text-black' : 'bg-black text-white'}`}
        >
          오래된순
        </button>
        <button
          onClick={() => setSortType(PAGINATION_ORDER.desc)}
          className={`p-2 rounded-md cursor-pointer ${sortType === PAGINATION_ORDER.desc ? 'bg-white text-black' : 'bg-black text-white'}`}
        >
          최신순
        </button>
      </div>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <div className="grid grid-cols-3 gap-4">
        {isPending && <LpCardSkeletonList count={20} />}
        {lps?.pages
          ?.map((page) => page.data.data)
          ?.flat()
          ?.map((lp) => <LpCard lp={lp} key={lp.id} />)}
        {isFetching && <LpCardSkeletonList count={20} />}
      </div>
      <div ref={ref} className="h-2"></div>
    </div>
  );
};

export default LpList;
