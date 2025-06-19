import { Card, CardBody, Col, Table } from "reactstrap";
import CardHeaderCommon from "../../../CommonElements/CommonCardHeader/CardHeaderCommon";
import { Href, WalletHeading, Monthly, Weekly, Yearly} from "../../../utils/Constant";
import { H6, Image } from "../../../AbstractElements";
import { dynamicImage } from "../../../Service";
import { Link } from "react-router-dom";
import { CiWallet } from "react-icons/ci";
import { MdCurrencyRupee } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
// import { manageWalletData } from "../../../Data/Dashboard/Dashboard";

const Wallet = (props:any) => {  
  let Data = [
    {title:props?.walletdata[0]?.key,  Amt:props?.walletdata[0]?.value, icon:<Image className="img-fluid img-32 b-r-10" src={dynamicImage('Wallet/1.png')} alt="avatar" /> } ,
    {title:props?.walletdata[1]?.key,  Amt:props?.walletdata[1]?.value, icon:<Image className="img-fluid img-32 b-r-10" src={dynamicImage('Wallet/2.png')} alt="avatar" /> } ,
    // {title:props?.walletdata[2]?.key,  Amt:props?.walletdata[2]?.value, icon:<Image className="img-fluid img-32 b-r-10" src={dynamicImage('Wallet/3.png')} alt="avatar" /> } ,
    // {title:props?.walletdata[3]?.key,  Amt:props?.walletdata[3]?.value, icon:<Image className="img-fluid img-32 b-r-10" src={dynamicImage('Wallet/4.png')} alt="avatar" /> } ,
    // {title:props?.walletdata[4]?.key,  Amt:props?.walletdata[4]?.value, icon:<Image className="img-fluid img-32 b-r-10" src={dynamicImage('Wallet/5.png')} alt="avatar" /> } ,
    // {title:props?.walletdata[5]?.key,  Amt:props?.walletdata[5]?.value, icon:<Image className="img-fluid img-32 b-r-10" src={dynamicImage('Wallet/6.png')} alt="avatar" /> } ,
  ]
  return (
    <Col md="4" xl="4">
      <Card className="bgWrapper boxshadow pt-0">
        <CardHeaderCommon headClass="pb-0 cardHeaderCustom" title={WalletHeading} firstItem={Weekly} secondItem={Monthly} thirdItem={Yearly}/>
        <CardBody className="manage-order">
          <Table>
            <tbody>
              {Data.map((data:any, i:number) => (
                <tr key={i}>
                  <td>
                    <div className="d-flex gap-3 align-items-center">
                      <div className="flex-shrink-0">
                        {/* <Image className="img-fluid img-32 b-r-10" src={} alt="avatar" /> */}
                        {/* <CiWallet size={33}/> */}
                        {data?.icon}
                      </div>
                      <div className="flex-grow-1 all-incomes">
                        <Link to={Href}>
                          <H6 className="f-w-500 Font-S">{data.title}</H6>
                        </Link>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-block text-end">
                     <H6 className="f-w-500">{data.title === 'FXST Pay Wallet' ? <FaRupeeSign/> : undefined} {data.Amt} </H6>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Col>
  );
};

export default Wallet;
