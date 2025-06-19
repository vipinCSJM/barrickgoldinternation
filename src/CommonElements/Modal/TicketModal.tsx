import React, { useEffect, useState } from 'react';
import {Btn, P} from '../../AbstractElements'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Row, Col, Label } from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from "formik";
import {Ticket_PropsType, TicketData, ChatForm_PropsType, ChatForm_Data } from './DataType/ModalType'
import {ModalForm_validSchema, ChatModal_FormSchema} from './FormSchema/FormSchema'
import { decryptData} from "../../utils/helper/Crypto";
import {SupportTicketService} from '../../Service/SupportTickets/STicketsService'
import {useSweetAlert} from '../../Context/SweetAlertContext'
import PropTypes from 'prop-types';

function TicketModal(props:any) {
  const { btnName, className, GetTicketCount, ModelName, ModelTitle, onOpen, modelData, updateListfunc, refreshdata} = props;
  const [modal, setModal] = useState(false);
  const [ClientID, setClientID] = useState(decryptData(localStorage.getItem("clientId") as string))
  const {loading, Support_Ticket} = SupportTicketService()
  const [loadData, setloadData] =useState(false)
  const {ShowSuccessAlert} = useSweetAlert()
  const toggle = () => {
     setModal(!modal);
  }
  const closeBtn = (
    <Btn className="close primary" style={{color:'#fff', fontSize:'20px'}} onClick={toggle} type="button">
      &times;
    </Btn>
  );

  const HandleSubmit = async(values:Ticket_PropsType)=>{
    // console.log('working');
    
    try {
      const param = {
        RaisedBy:ClientID,
        FromId:ClientID,
        Title:values?.Title,
        QueryType:values?.QueryType,
        Description:values?.Description,
        ActionMode:"Insert"
      };
      const obj = {
        procName: 'Support',
        Para: JSON.stringify(param),
      };
      const res = await Support_Ticket(obj)
      
        toggle()
        updateListfunc()
        ShowSuccessAlert(res[0]?.msg)
      
    } catch (error) {
      // console.log(error);
    }

      
  }

  const HandleChatonModal = async(values:any)=>{
    // console.log(values);
    setloadData(!loadData)
    try {
      const param = {
        Title:ModelTitle,
        QueryId:modelData[0]?.QueryId,
        FromId:ClientID,
        Description:values?.Comment,
        ActionMode:"InsertReply"
     };
     const obj = {
       procName: 'Support',
       Para: JSON.stringify(param),
     };
      const res = await Support_Ticket(obj)
      if(Array.isArray(res)){
        refreshdata(!loadData)
        // ShowSuccessAlert(res[0]?.msg)
      }  
      GetTicketCount(true)
     } catch (error) {
      // console.log(error);
      
     }
    
  }

 

  return (
    <div>
      <Btn className="emailbox btn btn-primary" onClick={()=> {
        if(ModelName === "ViewMore" ){
          onOpen(); 
          toggle();
        }
        toggle()
        }}>
        {btnName}
      </Btn>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle} close={closeBtn} className='justify-content-between'>
          <P>{ModelTitle}</P>
        </ModalHeader>
        <ModalBody>
        {ModelName !== "ViewMore" ?
        <Formik
        initialValues={TicketData}
        validationSchema={ModalForm_validSchema}
        enableReinitialize
        onSubmit={(values: any,  { setSubmitting }) => {
          HandleSubmit(values);
          setSubmitting(false);
        }}
      >
        <Form>
          <Col>
            <Col>
              <FormGroup>
                <Label>Select Type</Label>
                <Field
                  as="select"
                  name="QueryType"
                  className=" form-control btn-square form-select"
                >
                  <option value="1">Technical Issue</option>
                  <option value="2">Bonus Issue</option>
                  <option value="3">Sponsor Related Issue</option>
                  <option value="4">Other</option>
                </Field>
                <ErrorMessage
                  name="QueryType"
                  component="div"
                  className="text-danger"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Query Title</Label>
                <Field
                  name="Title"
                  className=" form-control "
                  placeholder="Query Title"
                />
                <ErrorMessage
                  name="Title"
                  component="div"
                  className="text-danger"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Query Description</Label>
                <Field
                  as="textarea"
                  rows={3}
                  name="Description"
                  className=" form-control btn-square form-select"
                />
                <ErrorMessage
                  name="Description"
                  component="div"
                  className="text-danger"
                />
              </FormGroup>
            </Col>
            <Btn color="primary mt33" type="submit">
              Create Ticket
            </Btn>
            <Btn color="primary mt33 ms-2" type="reset" onClick={toggle}>
              Cancel
            </Btn>
          </Col>
        </Form>
      </Formik>
      : 
      <>
      <Col style={{'overflowY': 'scroll', minHeight:'130px', height: '270px'}}>
      {modelData.map((itm:any, index:number)=> <div className={itm?.ToId === 1 ? 'w-50 bg-dark float-start  p-3 m-2 rounded' : 'w-50 memberchatbg p-3 m-2 float-end rounded'} key={index}>
      {/* <P dangerouslySetInnerHTML={{ __html:itm.UserName}}/>
      <P>{itm?.Title}</P> */}
      <P>{itm?.Description}</P>
      <P>{itm?.DateTime}</P>
      </div>)}
      </Col>
      <Formik
        initialValues={ChatForm_Data}
        validationSchema={ChatModal_FormSchema}
        onSubmit={(values: any, { setSubmitting, resetForm  }) => {
          HandleChatonModal(values);
          resetForm(); // Reset the form after submission
          setSubmitting(false);
        }}
      >
        <Form>
          <Col>
            <Col>
              <FormGroup>
                <Field
                  as="textarea"
                  name="Comment"
                  className=" form-control btn-square"
                  placeholder="Enter your comment"
                >
                </Field>
                <ErrorMessage
                  name="Comment"
                  component="div"
                  className="text-danger"
                />
              </FormGroup>
            </Col>
            <Btn color="primary mt33" type="submit">
              Send
            </Btn>
            <Btn color="primary mt33 ms-2" type="reset" onClick={toggle}>
              Cancel
            </Btn>
          </Col>
        </Form>
      </Formik>
      </>  
      
      }
        </ModalBody>
      </Modal>
    </div>
  );
}


export default TicketModal;