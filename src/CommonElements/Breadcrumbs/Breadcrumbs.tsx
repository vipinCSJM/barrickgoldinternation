import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Container, Row } from "reactstrap";
import SVG from "../SVG";
import {Image} from '../../AbstractElements'
import { PropsTypes } from "../../Type/Layout/CommonElements/Breadcrumbs";
import H3 from "../Headings/H3Element";
import Btn from "../Button";
import { FaGooglePlay } from "react-icons/fa";
import H6 from "../Headings/H6Element";
import P from "../Paragraph";
import { dynamicImage } from "../../Service";

const Breadcrumbs = ({ mainTitle, parent, ChildName }: PropsTypes) => {

  return (
    <Container fluid>
      <Row className="page-title align-items-center">
        <div className={mainTitle === "Dashboard" ? 'col-4 col-md-2 order-1' : 'col-md-6'}>
          <H3>{mainTitle}</H3>
        </div>
        <div className="d-none d-md-block col-md-2 px-0 order-2 justify-content-end">
          <div className={mainTitle === "Dashboard" ? "d-flex gap-2 justify-content-end" : "d-none"}>
            <Link to="#" target="_blank" rel="noopener noreferrer">
            <Image src={dynamicImage('facebook-fill.png')} alt="facebook" className="social-icon"/>
            </Link>
            <Link to="#" target="_blank" rel="noopener noreferrer">
            <Image src={dynamicImage('instagram-fill.png')} alt="instagram" className="social-icon"/>
            </Link>
            <Link to="#" target="_blank" rel="noopener noreferrer">
            <Image src={dynamicImage('telegram-fill.png')} alt="telegram" className="social-icon"/>
            </Link>
            <Link to="#" target="_blank" rel="noopener noreferrer">
            <Image src={dynamicImage('twitter-fill_x.png')} alt="facebook" className="social-icon"/>
            </Link>
            <Link to="#" target="_blank" rel="noopener noreferrer">
            <Image src={dynamicImage('youtube-fill.png')} alt="facebook" className="social-icon"/>
            </Link>
          </div>
        </div>
        <div className={mainTitle === "Dashboard" ? 'block col-md-4 col-xl-6 order-md-2 order-3' : 'd-none'}>
          <div className="justify-content-end d-md-flex d-block">
            {/* <div className="d-flex justify-content-end  me-md-1 mb-2 mb-md-0">
            <Link to="https://fxstockcorp.com/MemberPanel/FxStock.apk" className="w-100" target="_blank" rel="noopener noreferrer">
                <Btn className="d-flex justify-content-center text-black w-100 px-2 align-items-center" color="primary">
                  <FaGooglePlay className="me-2" />
                  <span>
                    <H6 className="DownloadBtnHeading text-black">
                      Fxstock App
                    </H6>
                    <P className="text-start DownloadBtnPara text-black">Get Our Android App</P>
                  </span>
                </Btn>
              </Link>
            </div>
            <div className="d-flex  justify-content-end  me-md-1 mb-2 mb-md-0">
            <Link to='https://fxstockcorp.com/MemberPanel/FxStockTrade.apk' className="w-100" target="_blank" rel="noopener noreferrer">
                <Btn className="d-flex justify-content-center w-100 px-2 align-items-center text-black" color="primary">
                  <FaGooglePlay className="me-2" />
                  <span>
                    <H6 className="DownloadBtnHeading text-black">
                       Trading App
                    </H6>
                    <P className="text-start DownloadBtnPara text-black">Get Our Android App</P>
                  </span>
                </Btn>
              </Link>
            </div>*/}
            <div className="d-flex  justify-content-end mb-2 mb-md-0">
            <Link to='#' className="w-100" target="_blank" rel="noopener noreferrer">
                <Btn className="d-flex justify-content-center px-2 w-100 align-items-center text-black" color="primary">
                  <FaGooglePlay className="me-2" />
                  <span>
                    <H6 className="DownloadBtnHeading text-black">
                       BarrickG old APP
                    </H6>
                    <P className="text-start DownloadBtnPara text-black">Get Our Android App</P>
                  </span>
                </Btn>
              </Link>
            </div> 
          </div>
        </div>
        <div className={mainTitle === "Dashboard" ? 'col-12 mb-3 mb-md-0 col-md-3 col-xl-2 order-md-3 order-2 ' : 'd-none'}>
          <Breadcrumb className="justify-content-sm-end align-items-center">
            <BreadcrumbItem>
              <Link to={`${process.env.PUBLIC_URL}`}>
                <SVG iconId="Home" className="svg-color" />
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>{parent}</BreadcrumbItem>
            {ChildName ? <BreadcrumbItem className="active">{ChildName}</BreadcrumbItem> : undefined}
          </Breadcrumb>
        </div>
      </Row>
    </Container>
  );
};

export default Breadcrumbs;
