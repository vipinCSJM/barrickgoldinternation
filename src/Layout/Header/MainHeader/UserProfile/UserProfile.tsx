import { useState } from "react";
import { H5, Image, LI, P , Btn} from "../../../../AbstractElements";
import { dynamicImage } from "../../../../Service";
import UserProfileIcons from "./UserProfileIcons";

const UserProfile = () => {
  const [show,setShow] =  useState(false)
  const [userName, setUserName] = useState(localStorage.getItem('UserName'));
  const [MemberName, setMemberName] = useState (localStorage.getItem('MemberName'))
  const [MemberEmail, setMemberEmail] =useState(localStorage.getItem('memberemail'))
  const [RankName, setRankName] = useState(localStorage.getItem('RankName'))
  return (
    <LI className="profile-dropdown custom-dropdown">
      <div className="d-flex align-items-center" onClick={()=>setShow(!show)}>
        <Image src={dynamicImage("default_user.png")} alt="avatar" />
        <div className="flex-grow-1 d-block">
         <div>
         <span>{MemberName} <span>[{userName}]</span></span>
          <div className="d-flex justify-content-between align-items-center rounded pe-2" style={{border:'2px solid #e6b855'}}>
          <div><Btn className="btn btn-primary pb-0 pt-1 px-1 rounded-1" style={{fontSize:'12px'}}>Rank</Btn></div>
          <div> <P className="flex-grow-1 p-0 d-block text-center" style={{fontSize:12, fontWeight:500, lineHeight:1}}>{RankName}</P></div>
          </div>
          </div>
          <div>
            <P style={{fontSize:10, fontWeight:500}}>{MemberEmail}</P>
          </div>
        </div>
      </div>
      <div className={`custom-menu overflow-hidden ${show? "show" : ""}`}>
        <UserProfileIcons />
      </div>
    </LI>
  );
};

export default UserProfile;
