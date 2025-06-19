import { Card, CardBody, Col, Row } from "reactstrap";
import CardHeaderCommon from "../../../CommonElements/CommonCardHeader/CardHeaderCommon";
import { InvestingHeading, Monthly, Weekly, Yearly } from "../../../utils/Constant";
import { Btn, H2, H6, Image, P } from "../../../AbstractElements";
import ReactApexChart from "react-apexcharts";
// import { investingChartData } from "../../../Data/Dashboard/DashboardChartData";
import CouponCode from "../CouponCode/CouponCode";
import { useState } from "react";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { useCommonService } from "../../../Service/CommonService/Commonservice";
import { dynamicImage } from "../../../Service";
import { decryptData} from "../../../utils/helper/Crypto";
const Investing = (props: any) => {
  const { couponCode, isApplicable, coponcout } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [ClientID, setClientID] = useState(decryptData(localStorage.getItem("clientId") as string))
  const {loading, ApiCalling} = useCommonService();
  const [CoponData, setCoponData] = useState<any>([])
  const OpenModal = async()=>{
    const param = {
      MemberId: ClientID, 
      ActionMode:"GetMoreCoupons"
    };
    const obj = {
      procName: 'MemberDashboard',
      Para: JSON.stringify(param),
    };
    const res = await ApiCalling(obj)
    console.log(res.length);
    
    setCoponData(res)
    setModalOpen(true)
  }
  const closeModal = () => {
    document.body.style.paddingRight = '';
    setModalOpen(false);
  };
  return (
    <Col xl="3" sm="6">
      <Card className="investing-card boxshadow">
        <CardHeaderCommon headClass="pb-0" title={InvestingHeading} firstItem={Weekly} secondItem={Monthly} thirdItem={Yearly} coupon={true} coponcount={coponcout} Openmodal={OpenModal}/>
        <div className="text-end me-3"></div>
        <CardBody className="px-6 pb-3 pt-md-0 pt-4">
          <div className="investing" >
            {/* <ReactApexChart options={investingChartData} series={investingChartData.series} height={208} type={"bar"} /> */}
            <CouponCode couponCode={couponCode} isApplicable={isApplicable} />
          </div>
        </CardBody>
      </Card>
      <Modal isOpen={modalOpen} toggle={closeModal} className="modal-lg" centered>
          <ModalHeader  toggle={closeModal} className="mymodal-header px-4">
            All Copons
          </ModalHeader>
          <ModalBody className="Coponmodal-body text-center" >
            <div className="d-md-flex d-block" style={{ height: 'auto', width: '100%', gap: '15px', marginBottom: '15px' }}>
              <Row>
              {CoponData?.map((itm:any, idx:number)=> 
            
            <Col md="6">
          
          <div className="Popupcoupon">
                <div className="Popupcouponleft">
                    <div>FXSTOCK CORPORATION</div>
                </div>
                <div className="Popupcenterdiv">
                    <div>
                    <Image className="w-75 bg-dark mb-1" alt='popimage' title='popImage' src={dynamicImage("logo2.png")} />
                        <h2 className="cCode">{itm?.CouponCode}</h2>
                        <div><small>{itm?.Name}</small></div>
                    </div>
                </div>
                <div className="Popupcouponright">
                    <div className="cCode">{itm?.CouponCode}</div>
                </div>
            </div></Col>
         
          )}  
              </Row>
           
            </div>
          </ModalBody>
        </Modal>
    </Col>
  );
};

export default Investing;
