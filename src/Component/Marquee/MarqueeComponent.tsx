import React, { useEffect, useState } from "react";
import { useCommonService } from "../../Service/CommonService/Commonservice";
import { GrAnnounce } from "react-icons/gr";
import Marquee from "react-fast-marquee";
const MarqueeComponent = () => {
    const { loading, ApiCalling } = useCommonService();
    const [HeaderNews, setHeaderNews] = useState<any>()
    const FetchHeaderNews = async ()=>{
        
        const param = {
            ActionMode:"Select"
          };
          const obj = {
            procName: 'HeaderNews',
            Para: JSON.stringify(param),
          };
          const res = await ApiCalling(obj)
          if(Array.isArray(res)){
            setHeaderNews(res[0]?.News)
          }
          
      }
      useEffect(()=>{
        FetchHeaderNews()
      },[])
    
  return (
    <>
      <div className="marquee-container d-flex d-xl-flex me-4 d-none col-md-6">
        <div className="col">
        <div className="d-flex d-xl-flex">
      <span>
            <GrAnnounce/>
            </span>
        <Marquee>
          <div className="marquee-content ">
          <div dangerouslySetInnerHTML={{ __html: HeaderNews }} />
          </div>
        </Marquee>
      </div>
      </div>
      </div>
    </>
  )
}

export default MarqueeComponent