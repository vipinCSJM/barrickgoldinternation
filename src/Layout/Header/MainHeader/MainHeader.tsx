import { Col } from "reactstrap";
import SearchInput from "./SearchInput";
import { UL , P, LI} from "../../../AbstractElements";
import { useState } from "react";
import DarkMode from "./DarkMode/DarkMode";
import ResponsiveSearch from "./ResponsiveSearch";
import NotificationHeader from "./NotificationHeader/NotificationHeader";
import BookmarkHeader from "./BookmarkHeader/BookmarkHeader";
import CartHeader from "./CartHeader/CartHeader";
import MessagesHeader from "./MessagesHeader/MessagesHeader";
import UserProfile from "./UserProfile/UserProfile";
import ZoomInOut from "./ZoomInOut/ZoomInOut";
import Language from "./Language/Language";
import LatestNews from '../../../Component/Marquee/MarqueeComponent'
import { useEffect } from "react";
const MainHeader = () => {
  const [userName, setUserName] = useState(localStorage.getItem('UserName'));
  const [MemberName, setMemberName] = useState (localStorage.getItem('MemberName'))
  return (
    <Col className="page-main-header justify-content-start justify-content-md-between">
      {/* <SearchInput /> */}
        <LatestNews/>
      <div className="nav-right w-100">
        <UL className="header-right flex-row simple-list justify-content-md-end overflow-visible gap-2 gap-md-0">
          {/* <LI className="list-group-item Language_List">
          <Language />
          </LI> */}
          {/* <DarkMode/> */}
          {/* <ResponsiveSearch /> */}
          <ZoomInOut />  
          <NotificationHeader /> 
          {/* <BookmarkHeader /> */}
          {/* <CartHeader /> */}
          {/* <MessagesHeader /> */}
          <UserProfile />
        </UL>
      </div>
    </Col>
  );
};

export default MainHeader;
