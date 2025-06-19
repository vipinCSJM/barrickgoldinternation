import React, { useEffect, useState } from 'react'
import {   Col, Container, Row, FormGroup, Input, Label } from "reactstrap";
import TicketsList from './LeftSection/TicketsList'
import RightSection from './RightSection/RightSection'
import { SupportTicket, DownlineTitle } from "../../utils/Constant";
import Breadcrumbs from "../../CommonElements/Breadcrumbs/Breadcrumbs";
import { useCommonService } from '../../Service/CommonService/Commonservice';
import { decryptData} from "../../utils/helper/Crypto";
import {objectEntriesToArray} from '../../../src/utils/helper/opreaton'
const SupportTicketContainer = () => {
const {loading, ApiCalling} =useCommonService()
const [userID, setUserID] =useState(decryptData(localStorage.getItem('clientId') as string))
const [TicketsStatus, setTicketsStatus] = useState<any>([])
const [TicketLists, setTicketList] =useState<any>([])
const [updateTickets, setupdateTickets] = useState(false)

// Fetching Tickets Count
const FetchData = async()=>{
  const Obj ={
     procName: 'Support',
     Para:JSON.stringify({"RaisedBy":userID,"ActionMode":"SelectTickets"})
  }
  const Obj2 ={
    procName: 'Support',
    Para:JSON.stringify({"RaisedBy":userID, QueryStatus:"Open", SearchValue:"", SearchTerm:"0", ActionMode:"Select"})
 }
 const res = await ApiCalling(Obj)
 const txtList_res = await ApiCalling(Obj2)
  let convertedData = objectEntriesToArray(res[0]) 
  console.log(res, txtList_res);
  
  if(res === "NoRecord"){    
    setTicketsStatus([]);
    setTicketList([])
  }else{
    setTicketsStatus(convertedData)
    setTicketList(txtList_res)
  }

}



useEffect(()=>{
  FetchData()
},[updateTickets])

  return (
   <Container>
    <Breadcrumbs mainTitle={SupportTicket} parent={SupportTicket} />
      <Col className='email-wrap email-main-wrapper'>
      <Row>
        <Col md="3">
        <TicketsList TicketsData={TicketsStatus} updateTicket={setupdateTickets}/>
        </Col>
        <Col md="9">
        <RightSection TicketListData={TicketLists}/>
        </Col>
        </Row>
      </Col>
        
  
   
   </Container>
 
  
  )
}

export default SupportTicketContainer