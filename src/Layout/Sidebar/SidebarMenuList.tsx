import { Fragment, useState } from 'react'
import { useAppSelector } from '../../ReduxToolkit/Hooks';
import { LI } from '../../AbstractElements';
import { MenuList } from '../../Data/Layout/Sidebar';
// import { useTranslation } from 'react-i18next';
import { MenuItem } from '../../Type/Layout/Sidebar';
import MenuLists from './MenuLists';

const SidebarMenuList = () => {
    const [activeMenu, setActiveMenu] = useState<string[]>([]);
    // const { t } = useTranslation(); 
    const { pinedMenu } = useAppSelector((state) => state.layout);
    const shouldHideMenu = (mainMenu: MenuItem) => {return mainMenu?.Items?.map((data) => data.title).every((titles) =>pinedMenu.includes(titles || ""));};
  
    return (
      <>
        {MenuList &&
          MenuList.map((mainMenu: MenuItem, index) => (
            <Fragment key={index}>
              <LI className={`line ${index === 0 ?"pin-line" : ""} `}></LI>
              <LI className={`sidebar-main-title ${shouldHideMenu(mainMenu) ? "d-none" : ""}`}>{mainMenu.title}</LI>
              <MenuLists menu={mainMenu.Items} activeMenu={activeMenu} setActiveMenu={setActiveMenu}  level={0}/>
            </Fragment>
          ))}
      </>
    );
}

export default SidebarMenuList