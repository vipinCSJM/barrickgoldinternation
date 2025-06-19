import { CardHeader,  } from "reactstrap";
import H4 from "../Headings/H4Element";
import { Link } from "react-router-dom";
import CardHeaderDropdown from "./CardHeaderDropdown";
import { CardHeaderCommonType } from "../../Type/Layout/CommonElements/CommonCardHeader";
import { Btn, H2, H6, Image, P } from "../../AbstractElements";
import { dynamicImage } from "../../Service";

const CardHeaderCommon = ({title,subTitle,headClass,mainTitle,firstItem,secondItem,thirdItem,borderClass, coupon, coponcount, Openmodal}:CardHeaderCommonType) => {  
  return (
    <CardHeader className={`${headClass} ${!borderClass === true ? "card-no-border" : ""} `}>
      <div className="d-flex justify-content-between"><H4>{title}</H4> 
       {title === "Bot Royalty" ? <Image style={{width:'35px'}} src={dynamicImage('achievement.png')} alt="award"/> : undefined}
      {coupon && coponcount > 1 ? <button  className="btn btn-primary btn-font px-1 " onClick={Openmodal}>
      <small>Check Your Coupons {coponcount}</small> 
        </button>: undefined} </div>
      {subTitle && <Link to={`${process.env.PUBLIC_URL}/pages/samplepage`}>{subTitle}</Link> }
      {firstItem &&
      <CardHeaderDropdown mainTitle={mainTitle} firstItem={firstItem} secondItem={secondItem} thirdItem={thirdItem} />}
    </CardHeader>
  );
};

export default CardHeaderCommon;
