import { useState } from "react";
import { Link } from "react-router-dom";
import { LI, SVG } from "../../../../AbstractElements";
import { Href } from "../../../../utils/Constant";

import { useAppSelector } from "../../../../ReduxToolkit/Hooks";
import { BookmarkBack } from "./BookmarkBack";
import { BookmarkListData } from "./BookmarkListData";

const BookmarkHeader = () => {
  const [show, setShow] = useState(false);
  const { flip } = useAppSelector((state) => state.layout);
  return (
    <LI className="custom-dropdown">
      <Link to={Href} onClick={()=>setShow(!show)}>
        <SVG className="svg-color" iconId="Star" />
      </Link>
      <div className={`custom-menu bookmark-dropdown py-0 overflow-hidden onhover-show-div bookmark-flip  ${show ? "show" : ""}`}>
      <div className="flip-card">
          <div className={`flip-card-inner ${flip ? "flipped" : ""}`}>
            <BookmarkListData />
            <BookmarkBack />
          </div>
        </div>
      </div>
    </LI>
  );
};

export default BookmarkHeader;
