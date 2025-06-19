import { useState } from "react";
import { Card, CardBody, Col, Nav, NavItem, NavLink } from "reactstrap";
import {  UpdatePassword, Personal, Href, Nominee } from "../../../utils/Constant";

import BorderTabContent from "./BorderTabContent";

import { SVG } from "../../../AbstractElements";

const BorderTabs = (props:any) => {
  const [basicTab, setBasicTab] = useState<string>("1");
  return (
    <Col lg="12">
      <Card>
        <CardBody>
          <Nav tabs className="border-tab mb-0" id="bottom-tab" color="primary">
            <NavItem>
              <NavLink
                href={Href}
                className={`nav-border font-primary tab-primary pt-0 ${basicTab === "1" ? "active" : ""}`}
                onClick={() => setBasicTab("1")}
              >
                <i className="fa fa-user"></i>

                {Personal}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href={Href}
                className={`nav-border font-primary tab-primary ${basicTab === "2" ? "active" : ""}`}
                onClick={() => setBasicTab("2")}
              >
                <i className="fa fa-group"></i>
                {Nominee}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href={Href}
                className={`nav-border font-primary tab-primary ${basicTab === "3" ? "active" : ""}`}
                onClick={() => setBasicTab("3")}
              >
                 <i className="fa fa-key"></i>
                {UpdatePassword}
              </NavLink>
            </NavItem>
          </Nav>
          <BorderTabContent basicTab={basicTab} setUserData={props?.userData} />
        </CardBody>
      </Card>
    </Col>
  );
};

export default BorderTabs;