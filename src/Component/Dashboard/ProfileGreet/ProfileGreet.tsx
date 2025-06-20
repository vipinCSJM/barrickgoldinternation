import { Card, CardBody, Col } from "reactstrap";
import React, { useEffect, useState } from 'react';
import { decryptData } from "../../../utils/helper/Crypto";
import { Btn, H1, H3, H6, P } from "../../../AbstractElements";
import { Href } from "../../../utils/Constant";
import { profileNameProps } from '../../../Type/Dashboard/ProjectType'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useSweetAlert } from '../../../Context/SweetAlertContext'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { toast } from "react-toastify";
import { useTransferFundService } from '../../../Service/TransferFundToDepositWallet/TransferFundToDepositWallet'
const ProfileGreet = (props: any) => {
  // console.log(props);
  const [ClientID, setClientID] = useState(decryptData(localStorage.getItem("clientId") as string))
  const { showAlert, ShowSuccessAlert, ShowConfirmAlert } = useSweetAlert();
  const { doLoginKingMakerz, loading } = useTransferFundService();
  const { memberName, Rank } = props?.profileName
  // console.log(props?.loadingStatus);

  const CopyCallBack = (t: any, r: any) => {
    if (r == true) {
      toast.success("Copied");
    }
  }
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
  return (
    <Col xl="4" sm="6">
      <Card className="profile-greeting card-hover boxshadow overflow-hidden">
        <CardBody>
          <div className="img-overlay" >
            <H1>Welcome, {memberName}</H1>
            {/* <H6>{'demofxstock@gmail.com'}</H6>
            <H6>{Rank ? Rank : 'NO Rank'}</H6> */}
            
            <P className="mb-1">
              Welcome to the Barrick Gold family!
            </P>
            <CopyToClipboard text={localStorage.getItem("refURL") as string} onCopy={CopyCallBack} >
              <Btn color="primary f-14 mt-3 mt-xl-4 text-black">
                Copy and Refer
              </Btn>
            </CopyToClipboard>
            {/* <br />
            <Btn color="primary f-14 mt-2 mt-xl-3 text-black animated-button" onClick={doLogin}>
              {loading ? 'Please Wait....' : 'Login To Kingz Maker'}
            </Btn>  */}
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ProfileGreet;
