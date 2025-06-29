import React, { useState } from "react";
import {
  Link,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import {
  AiFillHome,
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlinePlus,
} from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { dynamicImage } from "../../Service";
import { Image } from "../../AbstractElements";
const BottomNavBar: React.FC = () => {
  const [active, setActive] = useState<string>("dashboard");
  const navigate = useNavigate();
  // const handleNavClick = (name: string) => {
  //   navigate(`${import.meta.env.BASE_URL}/` + name);
  // };

  const HandleTab = (path: any) => {
    // handleNavClick(path);
    setActive(path);
    navigate(`${process.env.PUBLIC_URL}/${path}`);
  };

  return (
    <div className="bottom-nav">
      <div className="bottom-nav-bar">
        <div
          className={`nav-item ${active === "dashboard" ? "active" : ""}`}
          onClick={() => HandleTab("dashboard")}
        >
          <Image src={dynamicImage("nav-icon/house.svg")} alt="home" />
          <span>Home</span>
        </div>

        <div
          className={`nav-item ${active === "RequestWithdraw" ? "active" : ""}`}
          onClick={() => HandleTab("RequestWithdraw")}
        >
          <Image
            src={dynamicImage("nav-icon/hand-withdraw.svg")}
            alt="wallet"
          />
          <span>Withdraw</span>
        </div>

        <div
          className={`nav-item add-btn ${active === "BuyGold" ? "active" : ""}`}
          onClick={() => HandleTab("BuyGold")}
        >
          <div className="add-icon">
            <div className="brand-logo">
             
              <div className="logo-rotation-wrapper  ">
                <Image src={dynamicImage("nav-icon/plus.png")} alt="logo" />
              </div>
            </div>
          </div>
          <span>Buy Gold</span>
        </div>
        <div
          className={`nav-item ${active === "teamdownline" ? "active" : ""}`}
          onClick={() => HandleTab("teamdownline")}
        >
          <Image src={dynamicImage("nav-icon/users-three.svg")} alt="wallet" />
          <span>Team</span>
        </div>
        <div
          className={`nav-item ${active === "myprofile" ? "active" : ""}`}
          onClick={() => HandleTab("myprofile")}
        >
          <Image src={dynamicImage("nav-icon/user.svg")} alt="wallet" />
          <span>Profile</span>
        </div>
      </div>
    </div>
  );
};

export default BottomNavBar;
