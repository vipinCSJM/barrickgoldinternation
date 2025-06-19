import { Row, Col } from "reactstrap";
import { useAppDispatch, useAppSelector } from "../../../../ReduxToolkit/Hooks";
import { AddNewBookmark, Bookmark, Href } from "../../../../utils/Constant";
import { Link, useNavigate } from "react-router-dom";
import { LI, SVG, UL } from "../../../../AbstractElements";
import { setFlip } from "../../../../ReduxToolkit/Reducers/LayoutSlice";


export const BookmarkListData = () => {
  const { bookmarkedData } = useAppSelector((state) => state.bookmarkHeader);
  const dispatch = useAppDispatch();
  const Navigete = useNavigate();

  return (
    <div className="front">
      <h5 className="title bg-primary-light">{Bookmark}</h5>
      <UL className="bookmark-dropdown">
        <LI className="custom-scrollbar">
          <Row className="g-1">
            {bookmarkedData.map((item, index) => (
              <Col xs="4" className="text-center" key={index}>
                <div className="bookmark-content" onClick={() => Navigete(`/${item.path}`)}>
                  <div className={`bookmark-icon bg-light-primary`}>
                    <SVG className={`svg-color stroke-primary`} iconId={item.icon} />
                  </div>
                  <span className={`font-primary`}>{item.title}</span>
                </div>
              </Col>
            ))}
          </Row>
        </LI>
        <li className="text-center m-0" onClick={() => dispatch(setFlip())}>
          <Link className="flip-btn f-w-700 btn btn-secondary" id="flip-btn" to={Href}>
            {AddNewBookmark}
          </Link>
        </li>
      </UL>
    </div>
  );
};
