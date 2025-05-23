import {
  useDispatch as useDefaultDispatch,
  type TypedUseSelectorHook,
  useSelector as useDefaultSelector,
} from "react-redux";
import type { AppDispatch, RootState } from "../store/store";

export const useDispatch: () => AppDispatch = useDefaultDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useDefaultSelector;
//이렇게 하는 이유 공부해보기.
