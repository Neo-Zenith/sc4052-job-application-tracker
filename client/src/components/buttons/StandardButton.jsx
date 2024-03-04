import "./Button.css";

function StandardButton({ onClick, display }) {
    return (
        <button className="btn-primary" onClick={onClick}>
            {display}
        </button>
    );
}

export default StandardButton;
