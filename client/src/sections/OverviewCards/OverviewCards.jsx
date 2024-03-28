import StandardCard from "../../components/cards/StandardCard";
import "./OverviewCards.css";
import ArticleIcon from "@mui/icons-material/Article";
import StarIcon from "@mui/icons-material/Star";
import PercentIcon from "@mui/icons-material/Percent";

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
                    title={"Latest Resume Score"}
                    subtitle={"98%"}
                    icon={<PercentIcon />}
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
