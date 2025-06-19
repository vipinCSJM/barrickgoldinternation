import { Link, useNavigate } from "react-router-dom";
import { LI, SVG, UL  } from "../../../../AbstractElements";
import { userProfilesData } from "../../../../Data/Layout/HeaderData";
import {useSweetAlert} from '../../../../Context/SweetAlertContext'

const UserProfileIcons = () => {
  const navigate = useNavigate()
  const {ShowSuccessAlert} = useSweetAlert()
  const handleClick = (name: string) => {
    if (name === "Log Out") {
      localStorage.clear();
      ShowSuccessAlert("Successfully Logged Out.")
      navigate(`${process.env.PUBLIC_URL}/login`)
      
    }
  };
  return (
    <UL>
      {userProfilesData.map((item, i) => (
        <LI className="d-flex" key={i}>
          <SVG className="svg-color" iconId={item.icon} />
          <Link className="ms-2" to={item.link} onClick={() => item.title === "Log Out" ?  handleClick(item.title) : null} >
            {item.title}
          </Link>
        </LI>
      ))}
    </UL>
  );
};

export default UserProfileIcons;
