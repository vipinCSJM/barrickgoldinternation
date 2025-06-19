import { H5, UL, LI } from "../../AbstractElements";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/Hooks";
import { Pinned } from "../../utils/Constant";
import SidebarMenuList from "./SidebarMenuList";
import SvgIcon from "../../CommonElements/SVG/SvgIcon";
import { scrollToLeft, scrollToRight } from "../../ReduxToolkit/Reducers/LayoutSlice";

const Sidebar = () => {
  const { pinedMenu ,margin} = useAppSelector((state) => state.layout);
  const { sidebarIconType,layout } = useAppSelector((state)=> state.themeCustomizer)
  const dispatch = useAppDispatch();
  return (
    <>
      <div className="overlay"></div>
      <div className={`page-sidebar ${sidebarIconType === "Colorfull icon" ? "iconcolor-sidebar" :""}`} id="sidebarwrappers">
        <div className={`left-arrow ${margin === 0 ? "disabled" : ""}`} id="left-arrow" onClick={()=>dispatch(scrollToLeft())}>
          <SvgIcon className="feather" iconId="arrow-left" />
        </div>
        <div id="sidebar-menu" style={{ marginLeft : layout === "horizontal-sidebar" ? `${margin}px` : "0px"}}>
          <UL className="sidebar-menu simple-list" id="simple-bar">
            <LI className={`pin-title sidebar-list p-0 ${ pinedMenu.length > 1 ? "show" : "" }`} >
              <H5 className="sidebar-main-title">{Pinned}</H5>
            </LI>
            <SidebarMenuList />
          </UL>
        </div>
        <div className={`right-arrow ${margin === -3500 ? "disabled" : ""}`} onClick={()=>dispatch(scrollToRight())}>
          <SvgIcon className="feather" iconId="arrow-right" />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
