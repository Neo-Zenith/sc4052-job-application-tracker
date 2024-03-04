import StandardCard from "../../components/cards/StandardCard";
import "./OverviewCards.css";
import ArticleIcon from "@mui/icons-material/Article";
import StarIcon from "@mui/icons-material/Star";
import ApartmentIcon from "@mui/icons-material/Apartment";

function OverviewCards() {
    return (
        <>
            <div className="overview__cards">
                <StandardCard
                    title={"Jobs Submitted"}
                    subtitle={"2"}
                    icon={<ArticleIcon />}
                />
                <StandardCard
                    title={"Number of Employers"}
                    subtitle={"2"}
                    icon={<ApartmentIcon />}
                />
                <StandardCard
                    title={"Hit back Ratio"}
                    subtitle={"0.1"}
                    icon={<StarIcon />}
                />
            </div>
        </>
    );
}

export default OverviewCards;
