import {
  useDispatch as useDefaultDispatch,
  useSelector as useDefaultSelector,
} from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";

export const useDispatch: () => AppDispatch = useDefaultDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useDefaultSelector;

// 사용법
// [ useSelector ]
// const { amount, cartItems, total } = useSelector((state) => state.cart);

// [ useDispatch ]
// const dispatch = useDispatch();
//  const handleIncreaseCount = () => {
//    dispatch(increase({ id: lp.id }));
//  };

// [ useDispatch 응용 ]
// const handleDecreaseCount = () => {
//     if (lp.amount == 1) {
//       dispatch(removeItem({ id: lp.id }));
//       return;
//     }
//     dispatch(decrease({ id: lp.id }));
//   };
