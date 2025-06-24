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
          className={`nav-item ${active === "withdrawfund" ? "active" : ""}`}
          onClick={() => HandleTab("withdrawfund")}
        >
          <Image
            src={dynamicImage("nav-icon/hand-withdraw.svg")}
            alt="wallet"
          />
          <span>Withdraw</span>
        </div>

        <div
          className={`nav-item add-btn ${active === "bep20" ? "active" : ""}`}
          onClick={() => HandleTab("bep20")}
        >
          <div className="add-icon">
            <div className="brand-logo">
              {/* <div className="logo-rotation-frame">
                <Image src={dynamicImage("logo/logo-text.png")} alt="logo" />
              </div> */}
              <div className="logo-rotation-wrapper  ">
                <Image src={dynamicImage("nav-icon/plus.png")} alt="logo" />
              </div>
            </div>
          </div>
          <span>Add Fund</span>
        </div>
        <div
          className={`nav-item ${active === "sponsorlist" ? "active" : ""}`}
          onClick={() => HandleTab("sponsorlist")}
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
