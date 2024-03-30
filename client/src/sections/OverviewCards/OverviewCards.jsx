import StandardCard from "../../components/cards/StandardCard";
import "./OverviewCards.css";
import ArticleIcon from "@mui/icons-material/Article";
import StarIcon from "@mui/icons-material/Star";
import PercentIcon from "@mui/icons-material/Percent";

function OverviewCards({
    totalApplications,
    highestResumeScore,
    hitBackRatio,
    loaded
}) {
    return (
        <>
            <div className="overview__cards">
                <StandardCard
                    title={"Applications Submitted"}
                    subtitle={totalApplications}
                    icon={<ArticleIcon />}
                    loaded={loaded}
                />
                <StandardCard
                    title={"Latest Resume Score"}
                    subtitle={
                        highestResumeScore ? highestResumeScore + "%" : "NA"
                    }
                    icon={<PercentIcon />}
                    loaded={loaded}
                />
                <StandardCard
                    title={"Hit back Ratio"}
                    subtitle={hitBackRatio ? hitBackRatio + "%" : "NA"}
                    icon={<StarIcon />}
                    loaded={loaded}
                />
            </div>
        </>
    );
}

export default OverviewCards;
