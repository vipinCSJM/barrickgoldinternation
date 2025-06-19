import React, { useEffect } from "react";
import { useState } from "react";
import { CardBody,  FormGroup, Input, Label, TabContent, TabPane, Card, CardFooter, Col, Row } from "reactstrap";
import {  P, Btn } from "../../../AbstractElements";
import {
   EmailAddress, Address, DOB, Fathername, MaritalStatus, EmailId,
  Title, Name, MobileNo, UpdateProfile, Gender, telephone, State, Country, chooseCity, choosePincode, NomineeRelation, NomineeName
} from "../../../utils/Constant";
import { TabContentProp } from "../../../Type/Profile/ProfileType";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Personal_Details, Nominee_Details, Change_Password, Personal_Details_propsType, Nominee_Details_propsType, Password_Change_PropsType } from '../../../Type/Forms/FormsType'
import {Personal_DetailsValid_Schema, Nominee_DetailsValid_Schema, Change_PasswordValid_Schema } from '../../../Forms/FormsVailidationSchema'
import { decryptData} from "../../../utils/helper/Crypto";
import {useSweetAlert } from '../../../Context/SweetAlertContext'
import {Profile_Service} from '../../../Service/MyProfile/Myprofile'
import { IoEyeOffOutline } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa6";
import DatePicker from "react-datepicker";
import moment from "moment";
import { format } from 'date-fns';
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import es  from 'date-fns/locale/es';
import "react-datepicker/dist/react-datepicker.css";
import {DatePickerField} from '../../../CommonElements/DatePicker/DatePicker'
import Loader from '../../../CommonElements/Loader/Loader'
import {ChangeDateintoLongDate} from '../../../utils/helper/opreaton'

interface ExtendedpropsType extends TabContentProp {
  setUserData:any
}

type ValuePiece = Date | null;

const BorderTabContent: React.FC<ExtendedpropsType> = (props) => {
 const  { basicTab , setUserData}=props
  const [ClientID, setClientID] = useState(decryptData(localStorage.getItem("clientId") as string))
  const [UserToken, setUserToken] = useState(decryptData(localStorage.getItem("userToken") as string))
  const [P_Details, set_P_Details] = useState <any>(null)
  const [N_Details, setN_Details] = useState <any>(null)
  const [spinner, setspinner] = useState({FormName:"Myprofile", Action:false})
  const {GetProfile_Details, UpdateUser_Profile, loading} = Profile_Service()
  const {showAlert, showInputAlert , ShowSuccessAlert} =useSweetAlert() 
  const [startDate, setStartDate] = useState(null);
  registerLocale('es', es)
  const [eyeIcon, setEyeIcon] = useState<any[]>([
    { btnName: "OldPassword", action: false },
    { btnName: "NewPassword", action: false },
    { btnName: "ConfirmPassword", action: false },
  ]);

useEffect(()=>{
  Get_MyProfileData()
},[])


//========== Getting MyProfile Data
  const Get_MyProfileData = async ()=>{
    const param ={
      ClientId:ClientID,
      UserToken:UserToken,
      ActionMode:"GetProfile"
    }
    const obj = {
      procName: 'UpdateProfile',
      Para: JSON.stringify(param)
    }
     const res = await GetProfile_Details(obj)
     setUserData(res)
    const ProfileValues ={
      Title:`${res[0]?.Title}` || '',
      FirstName:res[0]?.FirstName,
      MobileNo:res[0]?.MobileNo,
      Gender:res[0]?.Gender === "0"  ?  '' : res[0]?.Gender,
      DateofBirth:res[0]?.DOB,
      FathersName:res[0]?.FathersName,
      MaritalStatus:res[0]?.MaritalStatus,
      AlternateNo:res[0]?.AlternateNo,
      EmailId:res[0]?.EmailId,
      CountryName:res[0]?.CountryName,
      StateName:res[0]?.StateName,
      CityName:res[0]?.CityName,
      Pincode:res[0]?.PinCode,
      Address:res[0]?.Address
    }

    const Nominee_Values = {
      NomineeName:res[0]?.NomineeName,
      NomineeRelation:res[0]?.NomineeRelation,
      NomineeDOB:res[0]?.NomineeDOB,
      NomineeNationalId:res[0]?.NomineeNationalId,
      NomineeDrivingLicence:res[0]?.NomineeDrivingLicence,
      NomineePassportNumber:res[0]?.NomineePassportNumber
    }
    set_P_Details(ProfileValues);
    setN_Details(Nominee_Values);
  }

  //======== Updating Profile Personal Details
  const Update_PersonalDetails = async (values:Personal_Details_propsType)=>{
    setspinner({ FormName: "Myprofile", Action: true });
    try {
      const {MaritalStatus, FathersName, Pincode, Gender, Title, FirstName, MobileNo,EmailId , AlternateNo, DateofBirth, CityName, StateName, Address} = values
      const param ={
        ClientId:ClientID,
        UserToken:UserToken,
        MaritalStatus:MaritalStatus,
        FathersName:FathersName,
        Pincode:Pincode,
        Gender:Gender,
        Title:Title,
        FirstName:FirstName,
        MobileNo:MobileNo,
        EmailId,
        AlternateNo:AlternateNo,
        DOB:ChangeDateintoLongDate(DateofBirth),
        CityName:CityName,
        StateName:StateName,
        Address:Address,
        ActionMode:"updatememberprofile"
      }
      const obj = {
        procName: 'UpdateProfile',
        Para: JSON.stringify(param)
      }
      const res = await UpdateUser_Profile(obj)
      if (res[0].StatusCode == "1") {
        ShowSuccessAlert(res[0]?.Msg)
        // Success logic here
      } else {
        console.error("update failed: ", res[0].msg);
        showAlert('Opps!', res[0].msg);
      }
      setspinner({ FormName: "Myprofile", Action: false });
    } catch (error) {
      console.error("Error in update Failed: ", error);
    }}

  //========== Updating Profile Nominee Details
  const Update_NomineeDetails = async (values:Nominee_Details_propsType)=>{
    setspinner({ FormName: "Nominee", Action: true });
    try {
      const {NomineeName, NomineeDOB, NomineeRelation, NomineeNationalId, NomineeDrivingLicence, NomineePassportNumber} = values
      const param ={
        ClientId:ClientID,
        UserToken:UserToken,
        NomineeName:NomineeName,
        NomineeDOB:NomineeDOB,
        NomineeRelation:NomineeRelation,
        NomineeNationalId:NomineeNationalId,
        NomineeDrivingLicence:NomineeDrivingLicence,
        NomineePassportNumber:NomineePassportNumber,
        ActionMode:"UpdateNominee"
      }
      const obj = {
        procName: 'UpdateProfile',
        Para: JSON.stringify(param)
      }
      const res = await UpdateUser_Profile(obj)
      if (res[0].StatusCode == "1") {
        ShowSuccessAlert(res[0]?.msg)
        // Success logic here
      } else {
        console.error("update failed: ", res[0].msg);
        showAlert('Opps!', res[0].msg);
      }
      setspinner({ FormName: "Myprofile", Action: false });
    } catch (error) {
      console.error("Error in update Failed: ", error);
    }
  }

//============= Changing Password 
const Change_User_Password = async (values:Password_Change_PropsType)=>{
  setspinner({ FormName: "ChangePass", Action: true });
  try {
    const {OldPassword, NewPassword} = values
    const param ={
      ClientId:ClientID,
      UserToken,
      OldPassword,
      NewPassword,
      ActionMode:"ChangePassword"
    }
    const obj = {
      procName: 'UpdateProfile',
      Para: JSON.stringify(param)
    }
    const res = await UpdateUser_Profile(obj)
    if (res[0].StatusCode == "1") {
      ShowSuccessAlert(res[0]?.msg)
      // Success logic here
    } else {
      console.error("update failed: ", res[0].msg);
      showAlert('Opps!', res[0].msg);
    }
    setspinner({ FormName: "ChangePass", Action: false });
  } catch (error) {
    console.error("Error in update Failed: ", error);
  }
}

//============= Toggle Eye Icon
const toggleEyeIcon = (btnName: string) => {
  setEyeIcon(prevState =>
    prevState.map(item =>
      item.btnName === btnName
        ? { ...item, action: !item.action }
        : item
    )
  );
};

  return (
    
      <TabContent activeTab={basicTab}>
      <TabPane tabId="1" className="mt-2">
        <Formik
          initialValues={P_Details || Personal_Details}
          validationSchema={Personal_DetailsValid_Schema}
          enableReinitialize
          onSubmit={(values: any, { setSubmitting }) => {
            Update_PersonalDetails(values);
            setSubmitting(false);
          }}
        >
          {({
            values,
            handleChange,
            touched,
            handleBlur,
            setFieldValue,
            setFieldError,
            errors,
          }) => (
            <Form>
              <Card>
                <CardBody>
                  <Row>
                    <Col md="3">
                    <FormGroup>
                      <Label>{Title}</Label>
                      <Field
                        type="select"
                        as="select"
                        name="Title"
                        className=" form-control btn-square form-select"
                      >
                        <option value="">{"Select"}</option>
                        <option value="Mr.">{"Mr."}</option>
                        <option value="Ms.">{"Ms."}</option>
                        <option value="Mrs.">{"Mrs."}</option>
                        <option value="M/s">{"M/s"}</option>
                        <option value="Dr.">{"Dr."}</option>
                        <option value="Md.">{"Md."}</option>
                      </Field>
                      <ErrorMessage name="Title" component="div" className="text-danger" />
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <Label>{Name}</Label>
                      <FormGroup>
                      <Field
                        className="form-control"  autoComplete="off" 
                        type="text"
                         name="FirstName"
                        placeholder="Name"
                      />
                       <ErrorMessage name="FirstName" component="div" className="text-danger" />
                      </FormGroup>
                    </Col>
                    <Col sm="3" md="3">
                      <Label>{MobileNo}</Label>
                      <FormGroup>
                      <Field
                        className="form-control" autoComplete="off" 
                        type="text"
                        name="MobileNo"
                        placeholder="MobileNo"
                      />
                       <ErrorMessage name="MobileNo" component="div" className="text-danger" />
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <Label>{Gender}</Label>
                      <FormGroup>
                      <Field
                        type="select"
                        as="select"
                        name="Gender"
                        className="btn-square form-select form-control"
                      >
                        <option value="">{"Select Gender"}</option>
                        <option value="Male">{"Male"}</option>
                        <option value="Female">{"Female"}</option>
                      </Field>
                      <ErrorMessage name="Gender" component="div" className="text-danger" />
                      </FormGroup>
                    </Col>
                    <Col sm="3" md="3">
                      <Label>{DOB}</Label>
                      <FormGroup>
                      <Field name="DateofBirth">
                      {({ field }: any) => (
                      <DatePicker
                          className={`form-control ${errors.DateofBirth && touched.DateofBirth ? 'is-invalid' : ''}`}
                          dateFormat="dd-MMMM-yyyy"
                          selected={field.value ? new Date(field.value) : null} // Ensure it's a valid Date or null
                          onChange={(date: Date | null) => setFieldValue('DateofBirth', date)}
                          placeholderText="Select a date and time"
                        />
                        )}
                      </Field>
                          <ErrorMessage name="DateofBirth" component="div" className="text-danger" />
                      </FormGroup>
                    </Col>
                    <Col sm="3" md="3">
                      <Label>{Fathername}</Label>
                      <FormGroup>
                      <Field
                        className="form-control" autoComplete="off" 
                        type="text"
                        name="FathersName"
                        placeholder="Father Name"
                      />
                       <ErrorMessage name="FathersName" component="div" className="text-danger" />
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <Label>{MaritalStatus}</Label>
                      <FormGroup>
                      <Field
                        type="select"
                        as="select"
                        name="MaritalStatus"
                        className=" form-control btn-square form-select"
                      >
                        <option value="">{"Select"}</option>
                        <option value="Married">{"Married"}</option>
                        <option value="Unmarried">{"Unmarried"}</option>
                      </Field>
                      <ErrorMessage name="MaritalStatus" component="div" className="text-danger" />
                      </FormGroup>
                    </Col>
                    <Col sm="3" md="3">
                      <Label>{telephone}</Label>
                      <FormGroup>
                      <Field
                        className="form-control" autoComplete="off" 
                        type="text"
                        name="AlternateNo"
                        placeholder="telephone"
                      />
                       <ErrorMessage name="AlternateNo" component="div" className="text-danger" />
                      </FormGroup>
                    </Col>
                    <Col sm="3" md="3">
                      <Label>{EmailId}</Label>
                      <FormGroup>
                      <Field
                        className="form-control" autoComplete="off" 
                        type="text"
                        name="EmailId"
                        placeholder="EmailId"
                      />
                       <ErrorMessage name="EmailId" component="div" className="text-danger" />
                      </FormGroup>
                    </Col>
                    <Col sm="3" md="3">
                      <Label>{Country}</Label>
                      <FormGroup>
                      <Field
                        className="form-control" autoComplete="off" 
                        type="text"
                        name="CountryName"
                        placeholder="Country"
                      />
                       <ErrorMessage name="CountryName" component="div" className="text-danger" />
                      </FormGroup>
                    </Col>
                    <Col sm="3" md="3">
                      <Label>{State}</Label>
                      <FormGroup>
                      <Field
                        className="form-control" autoComplete="off" 
                        type="text"
                        name="StateName"
                        placeholder="State"
                      />
                       <ErrorMessage name="StateName" component="div" className="text-danger" />
                      </FormGroup>
                    </Col>
                    <Col sm="3" md="3">
                      <Label>{chooseCity}</Label>
                      <FormGroup>
                      <Field
                        className="form-control" autoComplete="off" 
                        type="text"
                        placeholder="Choose City"
                        name="CityName"
                      />
                       <ErrorMessage name="CityName" component="div" className="text-danger" />
                      </FormGroup>
                    </Col>
                    <Col sm="3" md="3">
                      <Label>{choosePincode}</Label>
                      <FormGroup>
                      <Field
                        className="form-control" autoComplete="off" 
                        type="text"
                        name="Pincode"
                        maxLength="6"
                        placeholder="Choose Pincode"
                      />
                       <ErrorMessage name="Pincode" component="div" className="text-danger" />
                      </FormGroup>
                    </Col>
                    <Col sm="9" md="9">
                      <Label>{Address}</Label>
                      <FormGroup>
                      <Field
                        className="form-control" autoComplete="off" 
                        type="text"
                        placeholder="Address"
                        name="Address"
                      />
                       <ErrorMessage name="Address" component="div" className="text-danger" />
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter className="text-end">
                  <Btn color="primary" type="submit">
                    {UpdateProfile}
                    {spinner.Action === true && spinner.FormName === 'Myprofile' ? <div className="spinner-border spinner-border-sm text-dark ms-2" role="status">
                    <span className="sr-only">Loading...</span>
                    </div> : ''}
                  </Btn>
                </CardFooter>
              </Card>
            </Form>
          )}
        </Formik>
      </TabPane>
       <TabPane tabId="2"  className="mt-2">
       <Formik
          initialValues={N_Details || Nominee_Details}
          validationSchema={Nominee_DetailsValid_Schema}
          enableReinitialize
          onSubmit={(values: any, { setSubmitting }) => {
            Update_NomineeDetails(values);
            setSubmitting(false);
          }}
        >
          {({ values, handleChange, touched, handleBlur, setFieldValue, setFieldError, errors,
          }) => (<Form>
            <Card>
              <CardBody>
                <Row>
                  <Col md="4">
                    <FormGroup>
                      <Label>{NomineeName}</Label>
                      <Field className="form-control" name="NomineeName" autoComplete="off"  type="text" placeholder="Nominee Name" />
                      <ErrorMessage name="NomineeName" component="div" className="text-danger" />
                    </FormGroup>
                  </Col>
  
                  <Col md="4">
                    <FormGroup>
                      <Label>{NomineeRelation}</Label>
                      <Field  type='select' as="select" name="NomineeRelation" className="form-control btn-square form-select">
                        <option value="">Select Relation</option>
                        <option value="Husband">Husband</option>
                        <option value="Wife">Wife</option>
                        <option value="Son">Son</option>
                        <option value="Daughter">Daughter</option>
                        <option value="Father">Father</option>
                        <option value="Mother">Mother</option>
                        <option value="Brother">Brother</option>
                        <option value="Sister">Sister</option>
                      </Field>
                      <ErrorMessage name="NomineeRelation" component="div" className="text-danger" />
                    </FormGroup>
                  </Col>
                  <Col sm="4" md="4" >
                    <FormGroup>
                      <Label>Nominee DOB</Label>
                      <Field name="NomineeDOB">
                      {({ field }: any) => (
                      <DatePicker
                          className={`form-control ${errors.NomineeDOB ? 'is-invalid' : ''}`}
                          dateFormat="dd-MMMM-yyyy"
                          selected={field.value ? new Date(field.value) : null} // Ensure it's a valid Date or null
                          onChange={(date: Date | null) => { setFieldValue('NomineeDOB', date); }}
                          placeholderText="Select a date and time"
                        />
                        )}
                      </Field>
                      <ErrorMessage name="NomineeDOB" component="div" className="text-danger" />
                    </FormGroup>
                  </Col>
                  <Col sm="4" md="4" >
                    <FormGroup>
                      <Label>Nominee National ID</Label>
                      <Field className="form-control" name="NomineeNationalId" autoComplete="off"  type="text" placeholder="Nominee National ID" />
                      <ErrorMessage name="NomineeNationalId" component="div" className="text-danger" />
                    </FormGroup>
                  </Col>
                  <Col sm="4" md="4" >
                    <FormGroup>
                      <Label>Nominee Driving License</Label>
                      <Field className="form-control" name="NomineeDrivingLicence" autoComplete="off"  type="text" placeholder="Nominee Driving License" />
                      <ErrorMessage name="NomineeDrivingLicence" component="div" className="text-danger" />
                    </FormGroup>
                  </Col>
                  <Col sm="4" md="4" >
                    <FormGroup>
                      <Label>Nominee Passport Number</Label>
                      <Field className="form-control" name="NomineePassportNumber" autoComplete="off"  type="text" placeholder="Nominee Passport Number" />
                      <ErrorMessage name="NomineePassportNumber" component="div" className="text-danger" />
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter className="text-end">
                <Btn color="primary" type="submit">{UpdateProfile}
                {spinner.Action === true && spinner.FormName === 'Nominee' ? <div className="spinner-border spinner-border-sm text-dark ms-2" role="status">
                      <span className="sr-only">Loading...</span>
                      </div> : ''}
                </Btn>
              </CardFooter>
            </Card>
          </Form>)}
        </Formik>
      </TabPane>
      <TabPane tabId="3"  className="mt-2">
      <Formik
          initialValues={ Change_Password}
          validationSchema={Change_PasswordValid_Schema}
          onSubmit={(values: any, { setSubmitting }) => {
            Change_User_Password(values);
            setSubmitting(false);
          }}
        >
          {({ values, handleChange, touched, handleBlur, setFieldValue, setFieldError, errors,
          }) => (
        <Form>
          <Card>
            <CardBody>
              <Row>
                <Col md="4" style={{position: 'relative'}}>
                  <FormGroup >
                    <Label>Old Password</Label>
                    <Field className="form-control" name="OldPassword" autoComplete="off"  type={eyeIcon[0]?.btnName === 'OldPassword' && !eyeIcon[0]?.action ? "password" : "text"} placeholder="Old Password" />
                    <Btn onClick={()=> toggleEyeIcon("OldPassword")} style={{ position: 'absolute', padding:'0px 10px',  right: '10px', top: '35px', color: '#000', outline:'none' }}>
                    {eyeIcon[0]?.btnName === 'OldPassword' && eyeIcon[0]?.action ?  <IoEyeOffOutline style={{ color: '#e6b855', fontSize: '20px' }} /> 
                    :
                    <FaRegEye style={{ color: '#e6b855', fontSize: '20px' }} />
                    }
                    </Btn>
                    <ErrorMessage name="OldPassword" component="div" className="text-danger" />
                  </FormGroup>
                </Col>
                <Col md="4" style={{position: 'relative'}}>
                  <FormGroup>
                    <Label>New Password</Label>
                    <Field className="form-control" name="NewPassword" autoComplete="off"  type={eyeIcon[1]?.btnName === 'NewPassword' && !eyeIcon[1]?.action ? "password" : "text"} placeholder="New Password" />
                    <Btn onClick={()=> toggleEyeIcon("NewPassword")} style={{ position: 'absolute', padding:'0px 10px',  right: '10px', top: '35px', color: '#000', outline:'none' }}>
                    {eyeIcon[1]?.btnName === 'NewPassword' && eyeIcon[1]?.action ?  <IoEyeOffOutline style={{ color: '#e6b855', fontSize: '20px' }} /> 
                    :
                    <FaRegEye style={{ color: '#e6b855', fontSize: '20px' }} />
                    }
                    </Btn>
                    <ErrorMessage name="NewPassword" component="div" className="text-danger" />
                  </FormGroup>
                </Col>
                <Col sm="4" md="4" style={{position: 'relative'}} >
                  <FormGroup>
                    <Label>Confirm New Password</Label>
                    <Field className="form-control" name="ConfirmPassword" autoComplete="off"  type={eyeIcon[2]?.btnName === 'ConfirmPassword' && !eyeIcon[2]?.action ? "password" : "text"} placeholder="Confirm New Password" />
                    <Btn onClick={()=> toggleEyeIcon("ConfirmPassword")} style={{ position: 'absolute', padding:'0px 10px',  right: '10px', top: '35px', color: '#000', outline:'none' }}>
                    {eyeIcon[2]?.btnName === 'ConfirmPassword' && eyeIcon[2]?.action ?  <IoEyeOffOutline style={{ color: '#e6b855', fontSize: '20px' }} /> 
                    :
                    <FaRegEye style={{ color: '#e6b855', fontSize: '20px' }} />
                    }
                    </Btn>
                    <ErrorMessage name="ConfirmPassword" component="div" className="text-danger" />
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>
            <CardFooter className="text-end">
              <Btn color="primary" type="submit">{UpdateProfile}
              {spinner.Action === true && spinner.FormName === 'ChangePass' ? <div className="spinner-border spinner-border-sm text-dark ms-2" role="status">
                      <span className="sr-only">Loading...</span>
                      </div> : ''}
              </Btn>
            </CardFooter>
          </Card>
        </Form>
          )}
        </Formik>
      </TabPane>
    </TabContent> 

    
  );
};

export default BorderTabContent;
