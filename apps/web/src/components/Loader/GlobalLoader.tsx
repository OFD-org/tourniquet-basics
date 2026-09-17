import React from "react";
import { useSelector } from "react-redux";
import { selectIsLoading } from "../../store/slices/loading/loadingSlice";
import { Loader } from "./Loader";
import { useDebounce } from "../../hooks/useDebounce";

export const GlobalLoader: React.FC = () => {
    const isLoading = useSelector(selectIsLoading);
    const showLoader = useDebounce(isLoading);
    return showLoader ? <Loader fullScreen /> : null;
};
