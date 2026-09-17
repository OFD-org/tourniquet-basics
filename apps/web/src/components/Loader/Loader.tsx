import React from "react";
import "./Loader.css";

interface LoaderProps {
    fullScreen?: boolean;
    size?: number;
}

export const Loader: React.FC<LoaderProps> = ({ fullScreen = false, size = 64 }) => {
    const loader = (
        <div className="loader-grid" style={{ width: size, height: size, gap: size * 0.04 }}>
            <div className="loader-block loader-block--tl" />
            <div className="loader-block loader-block--tr" />
            <div className="loader-block loader-block--bl" />
            <div className="loader-block loader-block--br" />
        </div>
    );

    if (fullScreen) {
        return (
            <div className="loader-backdrop">
                {loader}
            </div>
        );
    }

    return (
        <div className="loader-wrapper">
            {loader}
        </div>
    );
};
