import { TabContent, TabPane } from "reactstrap";
import { ScheduleTimeTabContentPropsType } from "../../../Type/Dashboard/DefaultType";
import { H5, H6, LI, UL,Btn, P, Image} from "../../../AbstractElements";
import { dynamicImage } from "../../../Service";
import { downloadappContent } from "../../../Data/Dashboard/Dashboard";
import { IoMdDownload } from "react-icons/io";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaAward } from "react-icons/fa6";

const DownloadAppContent = ({ tabId, royalities}: any) => {
    
  
//  const downloadappContent = [
//       {
//         id:"mon-tab",
//         TabContentData: [
//           {
//             color: "primary",
//             title: "FXstock App",
//             path:'https://fxstockcorp.com/MemberPanel/FxStock.apk',
//             comment: "Hannah",
//             Amt:royalities?.DistributionAmount,
//             image: "11.jpg",
//           },
//           {
//             color: "primary",
//             title: "Trading App",
//             path:'https://fxstockcorp.com/MemberPanel/FxStockTrade.apk',
//             comment: "Hannah",
//             image: "11.jpg",
//           },
//           {
//             color: "primary",
//             title: "FXST Pay App",
//             path:'https://fxstockcorp.com/MemberPanel/FXSTPay.apk',
//             comment: "Hannah",
//             image: "11.jpg",
//           },
         
          
//         ],
//       },
    
      
//     ];   
  return (
    <>
    <TabContent id="myTabContent" activeTab={tabId} >
    <hr/>
      {downloadappContent.map((item:any, i:number) => (
        <TabPane tabId='mon-tab' key={i}>
          <UL className="activity-update pb-1">
            {royalities.length > 0 ? royalities.map((data:any, i:number) => (
              <LI className='d-flex py-1 align-items-center b-l-primary' key={i}>
                <div className="flex-grow-1">
                  <H5 className="fw-bold">{data?.PoolType}</H5>
                  <H6>{data?.AchievementDate}</H6>
                </div>
                <div className="flex-shrink-0">
                <P className="fw-bold">{data?.DistributionAmount}</P>
                </div>
              </LI>
            )) : <div>
                <div className="text-center">
                <Image className="b-r-10 img-80" src={dynamicImage(`avatar/5.png`)} alt="avatar" />
                </div>
                <LI className='d-flex py-1 align-items-center b-l-primary'> 
            
              <div className="flex-grow-1 text-center">
              
              <H5>You have no Achievements.</H5>
              
              </div>
              </LI>
              </div>}
          </UL>
        </TabPane>
      ))}
    </TabContent>
    <hr/>
    <Btn color="primary" className="mt-2"> Your Bot Royalty Pool Achievements</Btn>
    </>
  );
  


};

export default DownloadAppContent;
