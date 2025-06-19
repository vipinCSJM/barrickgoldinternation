import { Card, CardBody, Col, Container, Row,FormGroup,Label,Input,  } from "reactstrap";
import { Formik, Field, Form, FieldProps, ErrorMessage } from "formik";
import { Btn} from "../../AbstractElements";
import { Level_Wise_Report, TeamOverViewTitle } from "../../utils/Constant";
import Breadcrumbs from "../../CommonElements/Breadcrumbs/Breadcrumbs";
import SearchTable from "../../CommonElements/SearchTable/SearchTable";
import { LevelWiseTeamList } from '../../Data/TableData/TableData';
import {LevewiseRepotOption} from '../../utils/Constant'
import {useDataTableService} from '../../Service/DataTable/DataTableService'
import { useEffect, useMemo, useState } from "react";
import { decryptData} from "../../utils/helper/Crypto";

interface DateOption {
  SearchDateVal: string;
  SearchDateView: string;
}

const LevelWiseReport = () => {
  const [SeaarchData_date, setSeaarchData_date] =useState<any>(null)
  const [FormValue, setFormValue] = useState<any>(null)
  const [UserName, setUserName] = useState(localStorage.getItem('UserName'))
  const [API_Payload, setAPIPayload] =useState({})

  const initialValues ={
    Date : ''
  }
  
  const GetDateList = async()=>{
    setAPIPayload({
      procName:"LevelTeamGenealogy",
      Para:JSON.stringify({UserName:UserName, Level:'0'})
    })
  }

   useMemo(()=>{
    GetDateList()

   },[])
  
  const handleSubmit = (values:any)=>{
    SettingValues(values?.Date)    
    setAPIPayload({
      procName:"LevelTeamGenealogy",
      Para:JSON.stringify({UserName:UserName, Level:values?.Date})
    })
    
  }

  
   const SettingValues =  (value?:any) => {
    // console.log(value);
    
    // const myArray = value.split(" ");      
    setAPIPayload({
      procName: 'LevelTeamGenealogy',
      Para:JSON.stringify({Level:value, UserName:UserName})
    })
    
   };


  return (
    <>
      <Breadcrumbs mainTitle={Level_Wise_Report} parent={TeamOverViewTitle} ChildName={Level_Wise_Report}/>
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
                        <Col md="4">
                          <FormGroup>
                            <Label htmlFor="">Levels</Label>
                            <Field
                              name="Date"
                              as="select"
                              className=" form-control btn-square form-select"
                            >
                              {LevewiseRepotOption.map((itm: any, index: number) => (
                                <option
                                  key={index}
                                  value={itm.optionName === "All" ? '0' : itm.optionName}
                                >
                                  Level {itm.optionName}
                                </option>
                              ))}
                            </Field>
                            <ErrorMessage name="Date" component="div" />
                          </FormGroup>
                        </Col>
                        <Col md="4">
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
            <SearchTable
              ColumnData={LevelWiseTeamList}
              SeaarchData_date={SeaarchData_date}
              apiPayload={API_Payload}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LevelWiseReport;
