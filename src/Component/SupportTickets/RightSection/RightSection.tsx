import React, { useEffect } from 'react'
import {   Col, Container, Row, FormGroup, Input, Label, Card, CardBody, CardHeader } from "reactstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { P, Btn, UL, LI, Image, H6, H2} from "../../../AbstractElements";
import { dynamicImage } from "../../../Service";
import { useState } from 'react';
import {SearchTicketData, SearchTicket_PropsType} from '../../../Type/Forms/FormsType'
import {SupportTicketForm} from '../../../Forms/FormsVailidationSchema'
import { decryptData} from "../../../utils/helper/Crypto";
import {SupportTicketService} from '../../../Service/SupportTickets/STicketsService'
import SvgIcon from '../../../CommonElements/SVG/SvgIcon';
import TicketModal from "../../../CommonElements/Modal/TicketModal";
const RightSection = (props:any) => {
  const {loading, Support_Ticket} = SupportTicketService();
  const [ClientID, setClientID] = useState(decryptData(localStorage.getItem("clientId") as string))
  const [modelData, setmodelData] =useState<any>([])
  const [TicketListdata, setTicketListdata] = useState<any>([])
  const [IsSearched, setSearched] = useState(false);
  const [modalDatareload, setmodalDatareload] =useState(false)
  const [userID, setUserID] = useState(null)
  const {TicketListData} = props


  const HandleSubmit = async(values:SearchTicket_PropsType)=>{
    setSearched(true)
      try {
        const param = {
          RaisedBy:ClientID,
          QueryStatus:values?.StatusString,
          SearchValue:values?.SearchString,
          SearchTerm:values?.QueryString,
          ActionMode:"Select",  
       };
       const obj = {
         procName: 'Support',
         Para: JSON.stringify(param),
       };
        // console.log(values);
        const res =  await Support_Ticket(obj);
        
        
      if(Array.isArray(res)){
        setTicketListdata(res)
      } 
      } catch (error) {
        // console.log(error);
        
      } 
}
useEffect(()=>{
  if(userID){
    handleViewModal(userID)
  }

},[modalDatareload])

const handleViewModal = async(id:any) => {
  setUserID(id)
  try {
    const param = {
      QueryId:id,
      ReadPerson:'Member',
      ActionMode:"GetSupport",  
   };
   const obj = {
     procName: 'Support',
     Para: JSON.stringify(param),
   };

    const res =  await Support_Ticket(obj);
    console.log(res);
    setmodelData(res); 
  } catch (error) {
    
  }
  // Store the clicked item id in state
};
  
  return (
    <Container className="email-right-aside">
      <Card className='mail-body-wrapper'>
            <CardHeader className='p-0 m-0 cutomHeight'>
            <Formik
              initialValues={SearchTicketData}
              validationSchema={SupportTicketForm}
              enableReinitialize
              onSubmit={(values: any, { setSubmitting }) => {
                HandleSubmit(values);
                setSubmitting(false);
              }}
            >
                <CardBody className='px-4 pb-0'>
                  <Row>
                    <Form>
                      <Col>
                        <Row>
                        <Col md="3">
                    <FormGroup>
                      <Label>Select Type</Label>
                      <Field
                        as="select"
                        name="QueryString"
                        className=" form-control btn-square form-select"
                      >
                        <option value="">Select</option>
                        <option value="QueryType">Query Type</option>
                        <option value="Title">Title</option>
                        <option value="Description">Description</option>
                      </Field>
                      <ErrorMessage name="QueryString" component="div" className="text-danger" />
                      </FormGroup>
                      </Col>
                      <Col  md="3">
                    <FormGroup>
                      <Label>Search By Text</Label>
                      <Field
                        name="SearchString"
                        className=" form-control "
                        placeholder="Search by Text"
                      />
                      <ErrorMessage name="SearchString" component="div" className="text-danger" />
                      </FormGroup>
                      </Col>
                      <Col  md="3">
                    <FormGroup>
                      <Label>Status </Label>
                      <Field
                        as="select"
                        name="StatusString"
                        className=" form-control btn-square form-select"
                      >
                        <option value="Open">Open</option>
                        <option value="Closed">Closed</option>
                      </Field>
                      <ErrorMessage name="StatusString" component="div" className="text-danger" />
                      </FormGroup>
                      </Col>
                      <Col  md="3">
                      <Btn color="primary mt33" type="submit">
                        Search
                      </Btn>
                      </Col>
                        </Row>
                      </Col>
                    </Form>
                  </Row>
                </CardBody>
            </Formik>
            </CardHeader>
        <CardBody>
              <UL className="simple-list list-group ticket-block">
                {TicketListData.length > 0 ? TicketListData.map((itm:any, index:number)=><LI className='inbox-data  list-group-item border rounded p-2 mt-1' key={index}>
                    <Row className='align-items-center'>
                    <Col className='d-flex align-items-center m-0'>
                    <SvgIcon className='feather me-2' iconId='star'/><Image src={dynamicImage("default_user.png")} alt="avatar" />
                    <span className='ms-2'>
                        <span className='badge badge-danger'>{itm?.QueryType ? itm?.QueryType : 'Other'}</span>
                        <div>{itm.UserName}</div>
                        <P>{itm?.QueryDate}</P>
                      </span> 
                    </Col>
                    <Col md="5 px-3">
                      <P>{itm?.Title ? itm?.Title : 'Title not mention' }</P>
                      <P className='crad_text-wrap'>{itm?.Description ? itm?.Description : 'Description not mention'}</P>
                    </Col>
                    <Col md="3 text-end px-2">
                      <TicketModal btnName={"View More"} ModelName={"ViewMore"} ModelTitle={itm?.Title} onOpen={() => handleViewModal(itm?.QueryId)} modelData={modelData} refreshdata={setmodalDatareload}/>
                    </Col>
                    </Row>
                </LI>
                ) : <>
                    {IsSearched && TicketListdata.length > 0 ?  TicketListdata.map((itm:any, index:number)=><LI className='inbox-data  list-group-item border rounded p-2 mt-1' key={index}>
                    <Row className='align-items-center'>
                    <Col className='d-flex align-items-center m-0'>
                    <SvgIcon className='feather me-2' iconId='star'/><Image src={dynamicImage("default_user.png")} alt="avatar" />
                    <span className='ms-2'>
                        <span className='badge badge-danger'>{itm?.QueryType ? itm?.QueryType : 'Other'}</span>
                        <div>{itm.UserName}</div>
                        <P>{itm?.QueryDate}</P>
                      </span>  
                    </Col>
                    <Col md="5 px-3">
                      <P>{itm?.Title ? itm?.Title : 'Title not mention' }</P>
                      <P className='crad_text-wrap'>{itm?.Description ? itm?.Description : 'Description not mention'}</P>
                    </Col>
                    <Col md="3 text-end px-2">
                      <TicketModal btnName={"View More"} ModelName={"ViewMore"} ModelTitle="Open" onOpen={() => handleViewModal(itm?.QueryId)} modelData={modelData}/>
                    </Col>
                    </Row>
                </LI>
                ) : <>
                  <Row className='align-items-center'>
                    <Col className='d-flex justify-content-center align-items-center m-0 h-100'>
                        <div className='text-center'>
                        <Image src={dynamicImage("Data_not_found.png")} alt="avatar" style={{width:'200px'}} />
                        <H6>Whoops! There’s nothing to see here.</H6>
                        </div>
                    </Col>
                    </Row>
                </>}

                </>} 
              </UL>
        </CardBody>
      </Card>
    </Container>
  );
}

export default RightSection