import { Link } from "react-router-dom";
import { Image } from "../../AbstractElements";
import { dynamicImage } from "../../Service";
import CloseButton from "./CloseButton/CloseButton";
import MainHeader from "./MainHeader/MainHeader";

const Header = () => {
  return (
    <header className="page-header row">
      <div className="logo-wrapper d-flex align-items-center col-auto">
      <CloseButton />
        <Link to={`${process.env.PUBLIC_URL}/dashboard`} className="w-75">
          <Image className="for-light w-100" src={dynamicImage("logo/GoldenLogo.png")} alt="logo"/>
          <Image className="for-dark w-100" src={dynamicImage("logo/GoldenLogo.png")} alt="logo"/>
        </Link> 
       
      </div>
      <MainHeader />
    </header>
  );
};

export default Header;
