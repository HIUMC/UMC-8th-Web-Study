import React, {
  useState,
  createContext,
  PropsWithChildren,
  ReactElement,
  useContext,
} from "react";
import { LoadingSpinner } from "../components/LoadingSpinner";

interface LoadingContextType {
  isPending: boolean;
  setIsPending: React.Dispatch<React.SetStateAction<boolean>>;
  isError: boolean;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PendingContext = createContext<LoadingContextType | undefined>(
  undefined,
);

export const PendingProvider = ({
  children,
}: PropsWithChildren): ReactElement => {
  const [isPending, setIsPending] = useState(false);

  return (
    <PendingContext.Provider value={{ isPending, setIsPending }}>
      {children}
    </PendingContext.Provider>
  );
};

export const usePending = (): LoadingContextType => {
  const context = useContext(PendingContext);
  if (!context) {
    throw new Error("usePending must be used within a PendingProvider");
  }
  return context;
};
