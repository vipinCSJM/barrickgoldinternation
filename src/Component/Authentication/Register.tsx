import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { Col, Container, Input, Label, Row } from "reactstrap";
import RatioImage from '../../CommonElements/RatioImage';
import { Btn, H2, H6, P } from "../../AbstractElements";
import Captcha from "../Authentication/Captcha";
import { dynamicImage } from '../../Service';
import CountryWithFlag from '../Authentication/CountryWithFlag';
import { Formik, Field, Form, ErrorMessage } from "formik";
import moment from 'moment';
import { toast } from "react-toastify";
import Loader from '../../CommonElements/Loader/Loader';
import * as Yup from 'yup';
import { RegistrationFormPropsType, RegistrationForminitialValues } from "../../Type/Forms/FormsType";
import { useRegisterService } from '../../Service/Authentication/RegisterationService';
import { SendOTP_Service } from '../../Service/Authentication/SendOTPService'
import { useSweetAlert } from '../../Context/SweetAlertContext'
import { encryptData, decryptData, } from "../../utils/helper/Crypto";

const RegisterWithBgImageContainer = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get('ref');
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [CountryName, setCountryName] = useState<string | null>(null);
  const [FormFieldData, setFormFieldData] = useState<any>(null)
  const [showPassWord] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState<number>(0);
  const { sendOTP, registerMember, validateSponsor, loading } = useRegisterService();
  const { SendOTP, FormatTime, StartTimer } = SendOTP_Service()
  const { showAlert, ShowSuccessAlert, ShowConfirmAlert } = useSweetAlert();
  const navigate = useNavigate();
  useEffect(() => {
    // console.log(username);
    if (username) {
      SetReferValues()
    }

  }, [])

  //Trigger based on ref query string
  // useEffect(() => {
  //   if (username) {
  //     GetDepsitBanks();
  //   }
  // }, [username]);
  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
    // console.log(value);
  };

  const handleCountryChange = (selectedCountry: string) => {
    setCountryName(selectedCountry); // Update state when the country is selected
  };

  const validationSchema = Yup.object({
    SponsorUserName: Yup.string().required('Sponsor ID is required'),
    sponsorName: Yup.string().optional(),
    FirstName: Yup.string().required('Name is required'),
    MobileNo: Yup.string().required('Mobile Number is required'),
    CountryId: Yup.string().required('Country is required').optional(),
    EmailId: Yup.string().email('Invalid email').required('Email is required'),
    OTP: Yup.string().required('OTP is required'),
    address: Yup.string().optional()
  });

  const HandleRegisterSubmit = async (values: RegistrationFormPropsType) => {
    try {
      const { SponsorUserName, FirstName, MobileNo, EmailId, OTP } = values;
      if (!CountryName) {
        toast.error("Please Select Country");
        return;
      }
      if (!captchaValue) {
        toast.error("Captcha Validation Failed");
        return;
      }
      console.log(values);
      //return;
      const res = await registerMember({
        "SponsorUserName": SponsorUserName,
        "FirstName": FirstName,
        "MobileNo": MobileNo,
        "CountryId": CountryName,
        "EmailId": EmailId,
        "OTP": OTP,
        "recaptchaResponse": captchaValue
      });

      //console.log("Response: ", res); // Check API response
      if (res.includes("reCAPTCHA")) {
        showAlert("CAPTCHA validation failed");
      } else {
        if (res[0].StatusCode == "1") {
          ShowSuccessAlert(res[0].Msg);
          // console.log("Registration successful");
          localStorage.setItem("clientId", encryptData(res[0].UserId.toString()));
          localStorage.setItem("userToken", encryptData(res[0].UserToken));
          localStorage.setItem("UserName", res[0].UserName);
          localStorage.setItem("MemberName", res[0]?.MemberName)
          navigate(`${process.env.PUBLIC_URL}/Dashboard`);
        } else {
          console.error("Registration failed: ", res[0].Msg);
          showAlert(res[0].Msg);
        }
      }
    } catch (error) {
      console.error("Error in registration: ", error);
    }
  };

  const handleSendOTP = async (values: RegistrationFormPropsType) => {
    const { MobileNo, FirstName, EmailId } = values;
    const param = {
      MobileNo: MobileNo,
      Name: FirstName,
      EmailId: EmailId,
      ActionMode: 'SendOTP',
    };

    const obj = {
      procName: 'RegOTP',
      Para: JSON.stringify(param),
    };

    const res = await SendOTP(obj);
    if (res[0].StatusCode == "1") {
      setIsOtpSent(true);
      // setOtpTimer(res[0].SecondsLeft - 1)
      startTimer(res[0].SecondsLeft);

    }
  };

  const handleSponsorChange = async (event: React.ChangeEvent<HTMLInputElement>, values: RegistrationFormPropsType, setFieldValue: (field: string, value: any) => void) => {
    const { SponsorUserName } = values;
    const param = {
      UserName: SponsorUserName,
    };

    const obj = {
      procName: 'CheckSponsor',
      Para: JSON.stringify(param),
    };
    const res = await validateSponsor(obj);
    if (res[0].StatusCode == "1") {
      setFieldValue("sponsorName", res[0].Name)
    }
  };

  // setting Refer Values 

  const SetReferValues = async () => {
    const param = {
      UserName: username,
    };

    const obj = {
      procName: 'CheckSponsor',
      Para: JSON.stringify(param),
    };
    const res = await validateSponsor(obj);
    console.log(res);

    const registerformData = {
      SponsorUserName: username,
      FirstName: "",
      MobileNo: "",
      CountryId: "",
      EmailId: "",
      OTP: "",
      recaptchaResponse: "",
      address: "",
      sponsorName: res[0]?.Name,
    }
    setFormFieldData(registerformData)
  }

  const startTimer = (secondsLeft: number) => {
    setOtpTimer(secondsLeft - 1); // Subtract 1 to start the timer at 59 seconds
    const intervalId = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 0) {
          clearInterval(intervalId); // Stop timer when it reaches 0
          setIsOtpSent(false); // Reset OTP sent flag
          return 0; // Ensure it doesn't go below 0
        }
        return prev - 1; // Decrement the timer by 1 second
      });
    }, 1000);
    return () => clearInterval(intervalId);
  };


  return (
    <Container fluid className="p-0">
      {loading && <Loader />}
      <Row className="m-0">
        <Col xl="6">
          <RatioImage className="bg-img-cover bg-center" src={dynamicImage("login/3.jpg")} alt="loginpage" />
        </Col>
        <Col xl="6" className="p-0">
          <div className="login-card login-dark">
            <div>
              <div className="login-main" style={{ width: '100%' }}>
                <Formik
                  initialValues={FormFieldData || RegistrationForminitialValues}
                  validationSchema={validationSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    HandleRegisterSubmit(values);
                    setSubmitting(false);
                  }}
                  enableReinitialize
                >
                  {({ isSubmitting, values, setFieldValue, setFieldError }) => (
                    <Form className="theme-form">
                      <H2 className="text-center">Create Your Account</H2>
                      <P className="text-center">{"Enter your personal details to create account"}</P>
                      <div className="form-group">
                        <Row className="g-2">
                          <Col xs="6">
                            <Label className="col-form-label pt-0">Sponsor ID</Label>
                            <Field
                              type="text" onBlur={
                                (e: React.FocusEvent<HTMLInputElement>) => {
                                  setFieldValue("SponsorUserName", e.target.value)
                                  handleSponsorChange(e, values, setFieldValue)
                                }}
                              name="SponsorUserName"
                              value={values.SponsorUserName}
                              placeholder="Enter sponsorID"
                              className="form-control"
                            />
                            <ErrorMessage name="SponsorUserName" component="div" className="text-danger" />
                          </Col>
                          <Col xs="6">
                            <Label className="col-form-label pt-0">Sponsor Name</Label>
                            <Field
                              type="text"
                              name="sponsorName"
                              className="form-control"
                              disabled
                            />
                          </Col>
                        </Row>
                      </div>
                      <div className="form-group">
                        <Row className="g-2">
                          <Col xs="6">
                            <Label className="col-form-label pt-0">Name</Label>
                            <Field
                              type="text"
                              name="FirstName"
                              placeholder="Enter Name"
                              className="form-control"
                            />
                            <ErrorMessage name="FirstName" component="div" className="text-danger" />
                          </Col>
                          <Col xs="6">
                            <Label className="col-form-label pt-0">Mobile No</Label>
                            <Field
                              type="text"
                              name="MobileNo"
                              placeholder="Enter Mobile No."
                              className="form-control"
                            />
                            <ErrorMessage name="MobileNo" component="div" className="text-danger" />
                          </Col>
                        </Row>
                      </div>
                      <div className="form-group">
                        <Label className="col-form-label">Country</Label>
                        <CountryWithFlag SetCountryName={handleCountryChange} />
                      </div>
                      <div className="form-group">
                        <Label className="col-form-label">Email Address</Label>
                        <Field
                          type="email"
                          name="EmailId"
                          className="form-control"
                          placeholder="Enter Email Id"
                        />
                        <ErrorMessage name="EmailId" component="div" className="text-danger" />
                        <Btn color="info" onClick={() => {
                          if (values.EmailId && values.MobileNo && values.FirstName) handleSendOTP(values)
                        }} style={{ position: 'absolute', right: '2px', bottom: '2px', backgroundColor: '#d0b163', borderColor: '#d0b163', color: '#000' }}>
                          {isOtpSent ? FormatTime(otpTimer) : 'Send OTP'}
                        </Btn>
                      </div>
                      <div className="form-group">
                        <Label className="col-form-label">OTP</Label>
                        <div className="form-input position-relative">
                          <Field
                            type={showPassWord ? "text" : "password"}
                            name="OTP"
                            placeholder="Enter OTP"
                            className="form-control"
                          />
                          <ErrorMessage name="OTP" component="div" className="text-danger" />
                        </div>
                      </div>
                      <div className="form-group">
                        <Label className="col-form-label">Address</Label>
                        <div className="form-input position-relative">
                          <Field
                            name="address"
                            as="textarea"
                            placeholder="Enter Address"
                            className="form-control"
                          />
                          <ErrorMessage name="address" component="div" className="text-danger" />
                        </div>
                      </div>
                      <Captcha onCaptchaChange={handleCaptchaChange} />
                      <div className="form-group mb-0 checkbox-checked">
                        <Btn block color="primary" type="submit"
                          disabled={isSubmitting} style={{ backgroundColor: '#d0b163', color: '#000', borderColor: '#000' }} className="w-100 mt-3">
                          Create Account
                        </Btn>
                      </div>
                      <div className="login-social-title">
                        <H6>Sign Up With</H6>
                      </div>
                      <P className="mt-4 mb-0 text-center" style={{ color: '#d0b163' }}>
                        {"Already have an account?"}
                        <Link className="ms-2" to={`${process.env.PUBLIC_URL}/login`} style={{ color: '#d0b163' }}>Sign In</Link>
                      </P>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default RegisterWithBgImageContainer;
