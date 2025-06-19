import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Container, Label, Row } from "reactstrap";
import { Btn, H2, H6, Image, P } from "../../AbstractElements";
import { dynamicImage } from "../../Service";
import Loader from '../../CommonElements/Loader/Loader';
import {
  CreateAccount,
  DoNotAccount,
  UserName,
  ForgotPassword,
  Href,
  Password,
  RememberPassword,
  SignIn,
  SignInAccount,
  SignInWith,
} from "../../utils/Constant";
import {
  encryptData,
  decryptData,

} from "../../utils/helper/Crypto";
import {
  LoginFormPropsType, LoginForminitialValues
} from "../../Type/Forms/FormsType";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { truncate } from "fs";
import { useLoginService } from '../../Service/Authentication/LoginService';
// Validation schema
const LoginSchema = Yup.object().shape({
  userid: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get('username');
  const password = queryParams.get('password');
  const [FormFieldData, setFormFieldData] = useState<any>(null)
  const { doLogin, loading } = useLoginService();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (username && password) {
      ProcessLogin()
    }

  }, [])
  const SimpleLoginHandle = async (values: LoginFormPropsType) => {
    const { userid, password } = values;
    const res = await doLogin({ procName: 'SolidityLogin', Para: '{"UserId":"' + userid + '","Password":"' + password + '"}' });
    if (!res) return
    if (res[0]?.StatusCode == "1") {
      localStorage.setItem("clientId", encryptData(res[0]?.UserId?.toString()));
      localStorage.setItem("userToken", encryptData(res[0]?.UserToken));
      localStorage.setItem("UserName", res[0]?.UserName);
      localStorage.setItem("refURL", res[0]?.ReferralURL);
      localStorage.setItem("MemberName", res[0]?.MemberName);
      localStorage.setItem('memberemail', res[0]?.EmailId);
      localStorage.setItem('RankName', res[0]?.RankName)
      navigate(`${process.env.PUBLIC_URL}/dashboard`);
    } else {
      toast.error(res[0]?.msg);
    }
  };
  const ProcessLogin = async () => {
    const res = await doLogin({ procName: 'SolidityLogin', Para: '{"UserId":"' + username + '","Password":"' + password + '"}' });
    if (!res) return
    if (res[0]?.StatusCode == "1") {
      localStorage.setItem("clientId", encryptData(res[0]?.UserId?.toString()));
      localStorage.setItem("userToken", encryptData(res[0]?.UserToken));
      localStorage.setItem("UserName", res[0]?.UserName);
      localStorage.setItem("refURL", res[0]?.ReferralURL);
      localStorage.setItem("MemberName", res[0]?.MemberName)
      const loginformData = {
        userid: username,
        password: password
      }
      setFormFieldData(loginformData);
      setTimeout(() => {
        navigate(`${process.env.PUBLIC_URL}/dashboard`);
      }, 1000);
    } else {
      toast.error(res[0]?.msg);
    }
  }
  return (
    <Container fluid className="p-0">
      {loading && <Loader />}
      <Row className="m-0">
        <Col xs="12" className="p-0">
          <div className="login-card login-dark" style={{ backgroundColor: "transparent" }}>
            <div>
              <div className="login-main" style={{ boxShadow: "0px 1px 20px 0px #f8dca6" }}>
                <div>
                  <Link className="logo text-center" to={Href}>
                    <Image
                      className="img-fluid for-light"
                      src={dynamicImage("logo/GoldenLogo.png")}
                      style={{ height: "70px", margin: "auto" }}
                      alt="logo"
                    />
                    <Image
                      className="img-fluid for-dark"
                      src={dynamicImage("logo/GoldenLogo.png")}
                      style={{ height: "70px", margin: "auto" }}
                      alt="darkLogo"
                    />
                  </Link>
                </div>
                <Formik
                  initialValues={FormFieldData || LoginForminitialValues}
                  validationSchema={LoginSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    SimpleLoginHandle(values);
                    setSubmitting(false);
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form className="theme-form">
                      <H2 className="text-center mt-1">{SignInAccount}</H2>
                      <P className="text-center">{"Enter your User ID & Password to login"}</P>
                      <div className="form-group">
                        <Label className="col-form-label">{UserName}</Label>
                        <Field
                          type="text"
                          name="userid"
                          placeholder="Enter Username"
                          className="form-control"
                        />
                        <ErrorMessage name="userid" component="div" className="text-danger" />
                      </div>
                      <div className="form-group">
                        <Label className="col-form-label">{Password}</Label>
                        <div className="form-input position-relative">
                          <Field
                            type={show ? "text" : "password"}
                            name="password"
                            placeholder="Enter Password"
                            className="form-control"
                          />
                          <div className="show-hide" onClick={() => setShow(!show)}>
                            <span className="show" style={{ color: "#d0b163" }}> </span>
                          </div>
                        </div>
                        <ErrorMessage name="password" component="div" className="text-danger" />
                      </div>
                      <div className="form-group mb-0 checkbox-checked">
                        <div className="form-check checkbox-solid-info">
                          <Field type="checkbox" id="checkbox1" className="form-check-input" />
                          <Label className="text-muted" htmlFor="checkbox1">
                            {RememberPassword}
                          </Label>
                          <Link style={{ color: "#d0b163" }} to={`${process.env.PUBLIC_URL}/forgotpassword`}>
                            {ForgotPassword}
                          </Link>
                        </div>
                        <div className="text-end mt-3">
                          <Btn
                            color="primary"
                            style={{ backgroundColor: "#d0b163", color: "#000", borderColor: "#000" }}
                            block
                            className="w-100"
                            type="submit"
                            disabled={isSubmitting}
                          >
                            {SignIn}
                          </Btn>
                        </div>
                      </div>
                      <div className="login-social-title">
                        <H6>{SignInWith}</H6>
                      </div>
                      <P className="mt-4 mb-0 text-center">
                        {DoNotAccount}
                        <Link className="ms-2" style={{ color: "#d0b163" }} to={`${process.env.PUBLIC_URL}/register`}>
                          {CreateAccount}
                        </Link>
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
};

export default Login;
