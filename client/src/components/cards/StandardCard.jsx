import { ClipLoader } from "react-spinners";
import "./Card.css";

function StandardCard({ title, subtitle, icon, loaded }) {
    return (
        <div className="card">
            <div className="card__text">
                <span className="card__title">{title}</span>
                {loaded ? (
                    <span className="card__subtitle">{subtitle}</span>
                ) : (
                    <div>
                        <ClipLoader color="white" size={10} />
                    </div>
                )}
            </div>
            <div className="card__icon">{icon}</div>
        </div>
    );
}

export default StandardCard;
