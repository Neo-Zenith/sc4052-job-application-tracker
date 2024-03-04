import "./Card.css";

function StandardCard({ title, subtitle, icon }) {
    return (
        <div className="card">
            <div className="card__text">
                <span className="card__title">{title}</span>
                <span className="card__subtitle">{subtitle}</span>
            </div>
            <div className="card__icon">{icon}</div>
        </div>
    );
}

export default StandardCard;
