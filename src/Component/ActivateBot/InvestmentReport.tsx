import {   Col, Container, Row, FormGroup, Input, Label } from "reactstrap";
import { P, Btn } from "../../AbstractElements";
import { PayoutTitle} from "../../utils/Constant";
import Breadcrumbs from "../../CommonElements/Breadcrumbs/Breadcrumbs";
import HistoryTable from "../../CommonElements/SearchTable/SearchTable"
import {  monthly_ProfitIncome } from '../../Data/TableData/TableData';
import { Formik, Field, Form, FieldProps, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";
import {SearchingTableData, SearchTableData_PropsType} from '../../Type/Forms/FormsType'
import { SearchFormValid_Schema } from '../../Forms/FormsVailidationSchema';
import {ChangeDateintoLongDate, formatDates} from '../../utils/helper/opreaton'
import { useEffect, useMemo, useState } from "react";
import { decryptData} from "../../utils/helper/Crypto";
import {format} from 'date-fns'
import { TableColumn } from "react-data-table-component";
import { useBotService } from "../../Service/ActivateBot/ActivateBot";
import { useNavigate } from "react-router-dom";
// interface MyFormValues {
//   FromDate: string;
//   ToDate: string;
// }

interface FormValues {
  FromDate: Date | null;
  ToDate: Date | null;
}



const InvestmentReportContainer = () => {
    const { ExecuteProcedure } = useBotService();
  
  const [memberID, setmemberID] = useState(decryptData(localStorage.getItem('clientId') as string))
  const [API_Payload, setAPIPayload] =useState<any>({})
  const [SeaarchData_date, setSeaarchData_date] =useState<any>(null)
//   const [Formvalue, setFormValue] = useState({})

 const OnemonthAgo = new Date();
 OnemonthAgo.setDate(OnemonthAgo.getDate() - 30);

 const initialValues: FormValues = { 
  FromDate:  OnemonthAgo,     // setting one month ago date
  ToDate: new Date(), // Default fromDate 
 };

 useMemo(()=>{
   // Default fromDate 
  const formattedFromDate = format(initialValues?.FromDate!, 'dd-MMMM-yyyy');
    const formattedToDate = format(initialValues?.ToDate!, 'dd-MMMM-yyyy');
  setSeaarchData_date({FormDate:formattedFromDate, ToDate:formattedToDate})
  setAPIPayload({
    procName:"InvestmentReportAdmin",
    Para:JSON.stringify({ClientId:memberID,FromDate:formattedFromDate, ToDate:formattedToDate, ActionMode:"MemberReport"})
  })
 },[])

 const handleSubmit = (values: FormValues) => {
   const formattedFromDate = format(values.FromDate!, 'dd-MMMM-yyyy');
    const formattedToDate = format(values.ToDate!, 'dd-MMMM-yyyy');
    // console.log(formattedFromDate, formattedToDate);
    setSeaarchData_date({FormDate:formattedFromDate, ToDate:formattedToDate})
    setAPIPayload({
      procName:"InvestmentReportAdmin",
      Para:JSON.stringify({ClientId:memberID,FromDate:formattedFromDate, ToDate:formattedToDate, ActionMode:"MemberReport"})
    })
 };
 const ProcessWithdrawInvestment = async (id: number) => {
    const param = {
      ClientId: memberID,
      InvestmentId: id,
      ActionMode: "WithdrawInvestment"
    }
    const obj = {
      procName: 'InvestmentReportAdmin',
      Para: JSON.stringify(param),
    };
    const res = await ExecuteProcedure(obj);
   if (res[0].StatusCode=='0'){
      alert(res[0].Msg);
   }
  
  }
 useEffect(() => {
  (window as any).handleWithdraw = (id: number) => {
    console.log("Called from global onclick, ID:", id);
    // Your logic here
      ProcessWithdrawInvestment(id)
  };
}, []);


  const navigate = useNavigate();
useEffect(() => {
  (window as any).handleCertificate = (id: number) => {
    console.log("Called from global onclick, ID:", id);
    // Your logic here
        navigate(`${process.env.PUBLIC_URL}/DigitalCertificatePage/${id}`);
  };
}, [[navigate]]);

   const InvestmentReport:TableColumn<any>[] = [
    {
      name: "S.No.",
      selector: (row:any) => row['S.No.'],
      sortable: true,
      center: false,
      width:'100px'
    },
    //  {
    //   name: "Client",
    //   selector: (row:any) => row['Client'],
    //   sortable: true,
    //   center: false,
    //   width:'100px'
    // },
    {
      name: "InvestmentAmount",
      selector: (row:any) => row['InvestmentAmount'],
      sortable: true,
      center: false,
      width:'200px'
    },
    {
      name: "PricePerGramINR",
      selector: (row:any) => row['PricePerGramINR'],
      sortable: true,
      center: false,
    },
   
    {
      name: "BuyIn",
      selector: (row:any) => row['BuyIn'],
      sortable: true,
      center: false,
    },
     {
      name: "WeightInGrams",
      selector: (row:any) => row['WeightInGrams'],
      sortable: true,
      center: false,
    },
    {
      name: "InvestmentDate",
      selector: (row:any) => row['InvestmentDate'],
      sortable: true,
      center: false,
    },
     {
      name: "Action",
      selector: (row:any) => row['Action'],
      sortable: true,
      center: false,
       cell: (row:any) => (
      <div
        dangerouslySetInnerHTML={{ __html: row['Action'] }}
      />
    )
    },
     {
      name: "Certificate",
      selector: (row:any) => row['Certificate'],
      sortable: true,
      center: false,
       cell: (row:any) => (
      <div
        dangerouslySetInnerHTML={{ __html: row['Certificate'] }}
      />
     )
    },
    
  ]



  return (
    <>
      <Breadcrumbs mainTitle={"Buy Gold Report"} parent={PayoutTitle} ChildName={'Buy Gold Report'}/>
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
          <Col md="4">
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
          <Col md="4">
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
          <Col md="4">
                  <Btn color="primary mt33" type="submit">Search</Btn>
                    </Col>
          </Row>
          </Col>
          </Row>
        </Form>
      )}
    </Formik>
    <HistoryTable ColumnData={InvestmentReport} SeaarchData_date={SeaarchData_date} PageCate={'Payout'}  apiPayload={API_Payload}/>    
      </Container>
    </>
  );
};

export default InvestmentReportContainer;
