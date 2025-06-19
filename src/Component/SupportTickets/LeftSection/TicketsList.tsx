import React, { useEffect, useState } from "react";
import { H5, LI, UL, Btn } from "../../../AbstractElements";
import { Col, Container, Row, Card, CardBody, Progress } from "reactstrap";
import { SupportTicketService } from "../../../Service/SupportTickets/STicketsService";
import { decryptData } from "../../../utils/helper/Crypto";
import { IoTicketSharp } from "react-icons/io5";
import TicketModal from "../../../CommonElements/Modal/TicketModal";
const TicketsLIst = (props: any) => {
  const { TicketsData=[{OpenTicket:0, TotalTickets:0, closedTicket:0}], updateTicket } = props;
  const [updateticketList, setupdateticketList]=useState(false)
  const updateList =()=>{
    setupdateticketList(!updateticketList)
    updateTicket(!updateticketList) 
  }

  return (
    <Col className="md-sidebar">
      <Col className="job-left-aside custom-scrollbar ">
        <Col className="email-left-aside">
          <Card>
            <CardBody>
              <Col className="email-app-sidebar">
                <TicketModal btnName={" + Post New Query"} ModelTitle="Create New Ticket" updateListfunc={updateList}/>
                <UL className="main-menu email-category nav nav-pills">
                  {TicketsData.length > 0 ?  TicketsData.map((itm: any, index: number) => (
                    <LI
                      className="nav-item border rounded px-1 mt-1"
                      key={index}
                    >
                      <div className="d-flex justify-content-between " style={{padding:'15px 20px'}}>
                        <div>
                          <IoTicketSharp />
                        </div>
                        <div>
                          <div className="ms-2">{itm.key}</div>
                        </div>
                        <span className="badge bg-">{itm.value}</span>
                      </div>
                    </LI>
                  )):
                 <>
                   <LI
                      className="nav-item border rounded px-1 mt-1">
                      <div className="d-flex justify-content-between " style={{padding:'15px 20px'}}>
                        <div>
                          <IoTicketSharp />
                        </div>
                        <div>
                          <div className="ms-2">{'Open Tickets'}</div>
                        </div>
                        <span className="badge bg-">{0}</span>
                      </div>
                    </LI>
                    <LI
                      className="nav-item border rounded px-1 mt-1">
                      <div className="d-flex justify-content-between " style={{padding:'15px 20px'}}>
                        <div>
                          <IoTicketSharp />
                        </div>
                        <div>
                          <div className="ms-2">{'closed Tickets'}</div>
                        </div>
                        <span className="badge bg-">{0}</span>
                      </div>
                    </LI>
                    <LI
                      className="nav-item border rounded px-1 mt-1">
                      <div className="d-flex justify-content-between " style={{padding:'15px 20px'}}>
                        <div>
                          <IoTicketSharp />
                        </div>
                        <div>
                          <div className="ms-2">{'Total Tickets'}</div>
                        </div>
                        <span className="badge bg-">{0}</span>
                      </div>
                    </LI>
                 </>
                  
                  }
                </UL>
              </Col>
            </CardBody>
          </Card>
        </Col>
      </Col>
    </Col>
  );
};

export default TicketsLIst;
