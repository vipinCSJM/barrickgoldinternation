import {   Col, Container, Row, FormGroup, Input, Label } from "reactstrap";
import { P, Btn } from "../../../AbstractElements";
import { WithdrawTitle, WithdrawHistory } from "../../../utils/Constant";
import Breadcrumbs from "../../../CommonElements/Breadcrumbs/Breadcrumbs";
import HistoryTable from "../../../CommonElements/SearchTable/SearchTable";
import { WithDrawReport } from '../../../Data/TableData/TableData';
import { Formik, Field, Form, FieldProps, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";
import { useEffect, useMemo, useState } from "react";
import { decryptData} from "../../../utils/helper/Crypto";
import {format} from 'date-fns'

interface FormValues {
  FromDate: Date | null;
  ToDate: Date | null;
  Status:string;
}

const DepositHistoryPageContainer = () => {
  const [memberID, setmemberID] = useState(decryptData(localStorage.getItem('clientId') as string))
  const [API_Payload, setAPIPayload] =useState<any>({})
  const [SeaarchData_date, setSeaarchData_date] =useState<any>(null)

 const twoDaysAgo = new Date();
 twoDaysAgo.setDate(twoDaysAgo.getDate() - 30);

 const initialValues: FormValues = { 
  FromDate:  twoDaysAgo,     // Two Ago Default toDate 
  ToDate: new Date(),   // Default fromDate 
  Status: 'All'
 };


  useMemo(()=>{
    // Default fromDate 
   const formattedFromDate = format(initialValues?.FromDate!, 'dd-MMMM-yyyy');
     const formattedToDate = format(initialValues?.ToDate!, 'dd-MMMM-yyyy');
   setSeaarchData_date({FormDate:formattedFromDate, ToDate:formattedToDate})
   setAPIPayload({
     procName:"WithdrawFund",
     Para:JSON.stringify({ClientId:memberID,FromDate:formattedFromDate, ToDate:formattedToDate, Status:'All', ActionMode:"Search"})
   })
  },[])
 
 
  const handleSubmit = (values: FormValues) => {
    const {Status} = values
    // console.log(values);
    
    const formattedFromDate = format(values.FromDate!, 'dd-MMMM-yyyy');
     const formattedToDate = format(values.ToDate!, 'dd-MMMM-yyyy');
     console.log(formattedFromDate, formattedToDate);
     setSeaarchData_date({FormDate:formattedFromDate, ToDate:formattedToDate})
     setAPIPayload({
       procName:"WithdrawFund",
       Para:JSON.stringify({ClientId:memberID,FromDate:formattedFromDate, ToDate:formattedToDate, Status, ActionMode:"Search"})
     })
  };



  return (
    <>
      <Breadcrumbs mainTitle={WithdrawHistory} parent={WithdrawTitle} ChildName={WithdrawHistory  }/>
      <Container fluid>
      <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values, errors, touched }) => (
        <Form>
          <Row>
          <Col xl="12">
          <Row>
          <Col md="3">
          <FormGroup>
          
            <Label>From Date:</Label>
            <Field name="FromDate">
              {({ field }:FieldProps) => (
                <DatePicker
                className={`form-control`}
                  selected={values.FromDate}
                  onChange={(date) => setFieldValue('FromDate', date)}
                  dateFormat="dd-MMMM-yyyy" // Yahan format set kiya gaya
                  placeholderText="dd-MMMM-yyyy" // Placeholder
                />
              )}
            </Field>
            <ErrorMessage name="FromDate" component="div" />
         
          </FormGroup>
          </Col>
          <Col md="3">
          <FormGroup>
            <Label htmlFor="ToDate">To Date:</Label>
            <Field name="ToDate" className="form-control">
              {({field}: FieldProps) => (
                <DatePicker
                  selected={values.ToDate}
                  className={`form-control`}
                  onChange={(date) => setFieldValue('ToDate', date)}
                  dateFormat="dd-MMMM-yyyy" // Yahan format set kiya gaya
                  placeholderText="dd-MMMM-yyyy" // Placeholder
                />
              )}
            </Field>
            <ErrorMessage name="ToDate" component="div" />
          </FormGroup>
          </Col>
          <Col md="3">
          <FormGroup>
            <Label htmlFor="Status">Status</Label>
            <Field name="Status" type="select" as="select" className=" form-control btn-square form-select">
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Paid</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Rejected">Rejected</option>
            </Field>
            <ErrorMessage name="Status" component="div" />
          </FormGroup>
          </Col>
          <Col md="3" className="d-flex align-items-center justify-content-start pb-2 pb-md-0">
              <Btn color="primary mt-0 mt-md-3" type="submit">Search</Btn>
          </Col>
          </Row>
          </Col>
          </Row>
        </Form>
      )}
    </Formik>
      <HistoryTable ColumnData={WithDrawReport} SeaarchData_date={SeaarchData_date} PageCate={'Payout'}  apiPayload={API_Payload}/> 
    </Container>
    </>
  );
};

export default DepositHistoryPageContainer;
