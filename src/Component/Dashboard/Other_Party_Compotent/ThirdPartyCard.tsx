import { Card, CardBody, Col, Row , Container} from "reactstrap";
import CardHeaderCommon from "../../../CommonElements/CommonCardHeader/CardHeaderCommon";
import { Accept, Decline, Href, Monthly, NotificationsHeading, Weekly, Yearly} from "../../../utils/Constant";
import { Btn, H6, H4, H5, Image, P } from "../../../AbstractElements";
import { Link, useNavigate } from "react-router-dom";
import { notificationsData } from "../../../Data/Dashboard/Dashboard";
import { dynamicImage } from "../../../Service";
import { IoIosNotificationsOff } from "react-icons/io";
import { decryptData } from "../../../utils/helper/Crypto";
import { useSweetAlert } from '../../../Context/SweetAlertContext'
import { useState } from "react";
import { useTransferFundService } from "../../../Service/TransferFundToDepositWallet/TransferFundToDepositWallet";

const ThirdPartyCard = () => {
    const [ClientID, setClientID] = useState(decryptData(localStorage.getItem("clientId") as string));
     const { showAlert, ShowSuccessAlert, ShowConfirmAlert } = useSweetAlert();
      const { doLoginKingMakerz, loading } = useTransferFundService();
      const navigate = useNavigate()
  // login to KingzMaker 
  const doLogin = async () => {
    const param = {
      ClientId: ClientID
    }
    const res = await doLoginKingMakerz(param);
    if (res) {
      const parsedData = JSON.parse(res);
      // Extract the login_url
      const loginUrl = parsedData?.data?.login_url;
      window.open(loginUrl);
    } else {
      showAlert("Unable to Login");
    }
  };

  const UserName = localStorage.getItem('MemberName')
  return (
    <Container>
      <Row>
        <Col sm="12" className="text-center bg-dark mb-3 rounded-5 py-3 px-3">
          <H4>Our Lottery & Gaming Platform</H4>
        </Col>
      <Col xl="6" sm="6" >
      <Card className="notification-card text-center boxshadow ">
        <CardHeaderCommon headClass="pb-3 pt-0" title={'KingzMaker'} firstItem={Weekly} secondItem={Monthly} thirdItem={Yearly}/>
        <CardBody className="text-center p-0 px-lg-3 mx-2 mb-2  thirdPartyCard">
          <div className="text-start">
          <div>
        <Btn color="primary" className="btn-fs " onClick={doLogin}>
        {loading ? 'Please Wait....' : 'Login To Kingz Maker'}</Btn>
        </div>
        <div>
        <Btn color="primary" className="mt-2 btn-fs" onClick={()=> navigate(`${process.env.PUBLIC_URL}/transfer`)}>Transfer Funds </Btn>
        </div>
          </div>
        </CardBody>
      </Card>
    </Col>
    <Col xl="6" sm="6" >
      <Card className="notification-card text-center boxshadow ">
        <CardHeaderCommon headClass="pb-3 pt-0" title={'Last Stake'} firstItem={Weekly} secondItem={Monthly} thirdItem={Yearly}/>
        <CardBody className="text-center  px-lg-3 mx-2 mb-2 thirdPartyCard LastStake">
        </CardBody>
      </Card>
    </Col>
      </Row>
    </Container>
  );
};

export default ThirdPartyCard;
