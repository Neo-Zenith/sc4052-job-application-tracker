import { useEffect, useState } from "react";
import "./Button.css";
import { DotLoader } from "react-spinners";

function StandardButton({
    onClick,
    display,
    isTransparentBg,
    useLoader,
    loaderEnd,
}) {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (loaderEnd) {
            setIsLoading(false);
        }
    }, [loaderEnd]);

    return (
        <button
            className={isTransparentBg ? " btn-transparent" : "btn-primary"}
            onClick={() => {
                onClick();
                if (useLoader) setIsLoading(true);
            }}
        >
            <span style={{ minWidth: "10rem", textAlign: "center" }}>
                {isLoading ? (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <DotLoader color="black" size={15} />
                    </div>
                ) : (
                    display
                )}
            </span>
        </button>
    );
}

export default StandardButton;
