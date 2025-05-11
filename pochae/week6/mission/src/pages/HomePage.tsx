import { useEffect, useState } from "react";
import { PAGINATION_ORDER } from "../enums/common";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import {useInView} from "react-intersection-observer"
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import OrderToggle from "../components/OrderToggle";

const HomePage = () => {
    const[search, setSearch] = useState("");
    // 오래된순, 최신순 버튼입니다~~
    const [order, setOrder] =useState<PAGINATION_ORDER>(PAGINATION_ORDER.asc);

    const {data:lps, isFetching, hasNextPage, isPending, fetchNextPage, isError} 
    = useGetInfiniteLpList( 1, search, order);


    // ref, inView
    // ref -> 특정한 HTML 요소를 감시할 수 있다.
    // inView -> 그 요소가 화면에 보이면 true
    const {ref, inView} = useInView({threshold: 0});

    useEffect(() => {
        if(inView) {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            !isFetching && hasNextPage && fetchNextPage();
        }
    }, [inView, isFetching, hasNextPage, fetchNextPage]);

    if(isError) { return <div className={"mt-20"}>Error...</div> }

    //[[1, 2],[3, 4]].flat() => [1, 2, 3, 4]

    return (
        <div className='container mx-auto px-4 py-6'>
            <input value={search} onChange={(e) => setSearch(e.target.value)} />

            {/* 정렬 버튼 */}
            <div className="flex justify-end p-2">
                <OrderToggle order={order} setOrder={setOrder} />
            </div>

            <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-7"}>
                {isPending && <LpCardSkeletonList count={20} />}
                {lps?.pages
                ?.map((page)=>page.data.data)
                ?.flat()
                ?.map((lp)=> <LpCard key={lp.id} lp={lp}/>)}
                {isFetching && <LpCardSkeletonList count={20} />}
            </div>
            <div ref={ref} className='h-2'></div>
        </div>
    )

};

export default HomePage;
