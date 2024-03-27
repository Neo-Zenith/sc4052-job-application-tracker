import "./Button.css";

function StandardButton({ onClick, display, isTransparentBg }) {
    return (
        <button
            className={isTransparentBg ? " btn-transparent" : "btn-primary"}
            onClick={onClick}
        >
            {display}
        </button>
    );
}

export default StandardButton;
