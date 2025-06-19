import { ChangeEvent, useState } from "react";
import { Input } from "reactstrap";
import { useAppDispatch, useAppSelector } from "../../../../ReduxToolkit/Hooks";
import { BookmarkedDataType } from "../../../../Type/Layout/Sidebar";
import { setFlip } from "../../../../ReduxToolkit/Reducers/LayoutSlice";
import { LI, SVG, UL } from "../../../../AbstractElements";
import { Back, Href } from "../../../../utils/Constant";
import { handleBookmarkChange } from "../../../../ReduxToolkit/Reducers/BookmarkHeaderSlice";
import { Link } from "react-router-dom";

export const BookmarkBack = () => {
  const dispatch = useAppDispatch();
  const { linkItemsArray } = useAppSelector((store) => store.bookmarkHeader);
  const [searchedItems, setSearchedItems] = useState<BookmarkedDataType[]>([]);
  const [searchWord, setSearchWord] = useState("");

  const searchItems = (e: string) => {
    let copyArray = [...linkItemsArray];
    let result = copyArray.filter((item, i) => item.title?.toLowerCase().includes(e.toLowerCase()));
    setSearchedItems(result);
  };

  const handleBackButton = () => {
    dispatch(setFlip());
    setSearchWord("");
  };

  const bookMarkInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
    searchItems(e.target.value);
  };

  return (
    <div className="back">
      <UL>
        <LI>
          <div className="flip-back-content">
            <Input type="text" placeholder="search..." onChange={(e) => bookMarkInputChange(e)} value={searchWord} />
            <div className={`Typeahead-menu ${searchWord ? "is-open" : ""} custom-scrollbar`}>
            {searchedItems?.map((item: BookmarkedDataType, index: number) => {
              const bookmarkedItem = linkItemsArray[item.id ?? -1];
              const isBookmarked = bookmarkedItem?.bookmarked ?? false;
              return (
                <div key={index} className="ProfileCard u-cf">
                  <div className="ProfileCard-avatar">
                    <SVG className="svg-color stroke-primary" iconId={`${item.icon}`} />
                  </div>
                  <div className="ProfileCard-details">
                    <div className="ProfileCard-realName">
                      <Link className="realname" to={Href}>
                        {item.title}
                      </Link>
                      <span className="pull-right">
                        <Link to={Href}>
                          <i onClick={() => dispatch(handleBookmarkChange(bookmarkedItem))} className={`fa fa-star-o mt-1 icon-star ${isBookmarked ? "starred" : ""}`}></i>
                        </Link>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
            {!searchedItems.length && <p>Opps!! There are no result found.</p>}
          </div>
          </div>
        </LI>
        <LI onClick={handleBackButton}>
          <Link className="f-w-700 d-block flip-back btn btn-secondary" id="flip-back" to={Href}>
            {Back}
          </Link>
        </LI>
      </UL>
    </div>
  );
};
