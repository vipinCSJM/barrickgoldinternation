import { Card, CardBody, Col, Container, Row,FormGroup,Label,Input,  } from "reactstrap";
import { Formik, Field, Form, FieldProps, ErrorMessage } from "formik";
import { Btn} from "../../../AbstractElements";
import { RewardTitle, BonanzaPage } from "../../../utils/Constant";
import Breadcrumbs from "../../../CommonElements/Breadcrumbs/Breadcrumbs";
import SearchTable from "../../../CommonElements/SearchTable/SearchTable";
import { Bonanza_Report } from '../../../Data/TableData/TableData';
import {useDataTableService} from '../../../Service/DataTable/DataTableService'
import { useEffect, useMemo, useState } from "react";
import { decryptData} from "../../../utils/helper/Crypto";

interface DateOption {
  SearchDateVal: string;
  SearchDateView: string;
}

const BonanzaPageContainer = () => {
  const [SeaarchData_date, setSeaarchData_date] =useState<any>(null)
  const {loading, FetchDataTable} = useDataTableService();
  const [DateOptions, setDateOptions] = useState<DateOption[]>([]);
  const [FormValue, setFormValue] = useState<any>(null)
  const [MemberID, setMemebrID] = useState(decryptData(localStorage.getItem('clientId') as string))
  const [API_Payload, setAPIPayload] =useState({})

  const initialValues ={
    Date : ''
  }
  
  const GetDateList = async()=>{
    const Obj = {procName: 'RewardMaster', Para:JSON.stringify({ActionMode:"GetDateToSearch"})}
     const res = await FetchDataTable(Obj)
    //  console.log(res);
     SettingValues(res[0]?.SearchDateView)
     setDateOptions(res)
     const SearchData = {
      Date : res[0]?.SearchDateView
     }
     setFormValue(SearchData) 
  }

   useEffect(()=>{
    GetDateList()

   },[])
  
  const handleSubmit = (values:any)=>{
    SettingValues(values?.Date)
  }

  
   const SettingValues =  (value?:any) => {
    const myArray = value.split(" ");      
    setAPIPayload({
      procName: 'MemberReward',
      Para:JSON.stringify({FromDate:myArray[0], ToDate:myArray[2], MemberId:MemberID,ActionMode:"Report"})
    })
    
   };


  return (
    <>
      <Breadcrumbs mainTitle={BonanzaPage} parent={RewardTitle} ChildName={BonanzaPage}/>
      <Container fluid>
        <Row>
          <Col xl="12">
            <Formik
              initialValues={FormValue || initialValues}
              enableReinitialize={true}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue, values, errors, touched }) => (
                <Form>
                  <Row>
                    <Col xl="12">
                      <Row>
                        <Col md="4" className="col-8 pe-0">
                          <FormGroup>
                            <Label htmlFor="">To Date:</Label>
                            <Field
                              name="Date"
                              as="select"
                              className=" form-control btn-square form-select"
                            >
                              {DateOptions.map((option: any, index: number) => (
                                <option
                                  key={index}
                                  value={option.SearchDateView}
                                >
                                  {option.SearchDateView}
                                </option>
                              ))}
                            </Field>
                            <ErrorMessage name="Date" component="div" />
                          </FormGroup>
                        </Col>
                        <Col md="4" className="col-4">
                          <Btn color="primary mt33" type="submit">
                            Search
                          </Btn>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
            <div style={{ overflowX: 'auto' }}>
            <SearchTable
              ColumnData={Bonanza_Report}
              SeaarchData_date={SeaarchData_date}
              apiPayload={API_Payload}
            />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default BonanzaPageContainer;
