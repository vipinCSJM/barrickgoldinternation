import { Col, Row, Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import {  } from "reactstrap";
import { H5, LI, UL } from "../../../AbstractElements";
import { overviewData } from "../../../Data/Dashboard/Dashboard";
import { useState } from "react";



const AccountOverviewDetail = (props:any) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  
  return (
    <Row className="align-items-center">   
      <Col xs="12" className="d-sm-none d-md-block">
        <UL className="overview-details pb-2 pb-md-3">
          {props?.actOverview?.map((item:any, i:any) => (
            <LI className="d-flex align-items-center p-0 mt-2 mt-md-4" key={i}>
              <div className={`circle-dot-${overviewData[0].color}`}>
                <span />
              </div>
              <H5 className="custom-h5 actoverviewtitle">
                {item.value}<span className="font-light" style={{float:'right'}}>{item.key}</span>
              </H5>
            </LI>
          ))}
        </UL>
       
      </Col>
      <Dropdown isOpen={dropdownOpen} toggle={toggle} hidden>
      <DropdownToggle className="view-btn btn bg-light d-block w-100 position-relative text-center" caret>ViewTeam</DropdownToggle>
      <DropdownMenu className="dropdown-menu-end" >
        <DropdownItem>View</DropdownItem>
        <DropdownItem>View</DropdownItem>
        <DropdownItem>View</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    </Row>
  );
};

export default AccountOverviewDetail;
