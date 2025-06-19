import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Container, Label, Row } from "reactstrap";
import { Btn, H2, H6, Image, P } from "../../AbstractElements";
import { dynamicImage } from "../../Service";
import Loader from '../../CommonElements/Loader/Loader';
import {
  Href,
  Password,
  SignInWith,
} from "../../utils/Constant";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useResetPasswordService } from '../../Service/Authentication/ForgotPassword';
import { useSweetAlert } from '../../Context/SweetAlertContext'
export interface ResetPasswordFormPropsType {
  Password: string,
  ConfirmPassword: string,
}
// Create initial values based on the ForGotPasswordFormPropsType interface
export const ResetPasswordForminitialValues: ResetPasswordFormPropsType = {
  Password: "",
  ConfirmPassword: ""
};

// Validation schema
const ResetPasswordSchema = Yup.object().shape({
  Password: Yup.string().required("Password is required"),
  ConfirmPassword: Yup.string().required("Confirm Password is required"),
});

const ResetPassword = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  const { doResetPassword, checkTokenValidity, loading } = useResetPasswordService();
  const [show, setShow] = useState(false);
  const [confirmshow, setconfirmShow] = useState(false);
  const navigate = useNavigate();
  const { showAlert, ShowSuccessAlert, ShowConfirmAlert } = useSweetAlert();
  useEffect(() => {
    checkToken();
  }, []);
  const HandleSubmit = async (values: ResetPasswordFormPropsType) => {
    const { Password } = values;
    if (token) {
      const res = await doResetPassword({ "Password": Password, "Token": token });
      if (!res) return
      if (res[0]?.StatusCode == "1") {
        ShowSuccessAlert(res[0].Msg);
        setTimeout(() => {
          navigate(`${process.env.PUBLIC_URL}/login`);
        }, 3000);
      } else {
        showAlert(res[0]?.Msg);       
      }
    } else {
      showAlert("Invalid Token, Try again");
    }
  };
  const checkToken = async () => {
    if (token) {
      const res = await checkTokenValidity({ procName: 'ResetPassword', Para: '{"ActionMode":"CheckTokenValidity","RandomKey":"' + token + '"}' });
      if (!res) return
      if (res[0]?.StatusCode == "1") {
        //perform reset
      } else {
        showAlert(res[0]?.Msg);
        setTimeout(() => {
          navigate(`${process.env.PUBLIC_URL}/login`);
        }, 2000);
      }
    } else {
      showAlert("Invalid Token, Try again");
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
                  initialValues={ResetPasswordForminitialValues}
                  validationSchema={ResetPasswordSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    HandleSubmit(values);
                    setSubmitting(false);
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form className="theme-form">
                      <H2 className="text-center mt-1">Password Reset</H2>
                      <P className="text-center">{"Enter new password and confirm password to reset your password"}</P>
                      <div className="form-group">
                        <Label className="col-form-label">New Password</Label>
                        <div className="form-input position-relative">
                          <Field
                            type={show ? "text" : "password"}
                            name="Password"
                            placeholder="Enter New Password"
                            className="form-control"
                          />
                          <div className="show-hide" onClick={() => setShow(!show)}>
                            <span className="show" style={{ color: "#d0b163" }}> </span>
                          </div>
                        </div>
                        <ErrorMessage name="Password" component="div" className="text-danger" />
                      </div>
                      <div className="form-group">
                        <Label className="col-form-label">Confirm Password</Label>
                        <div className="form-input position-relative">
                          <Field
                            type={confirmshow ? "text" : "password"}
                            name="ConfirmPassword"
                            placeholder="Confirm Password"
                            className="form-control"
                          />
                          <div className="show-hide" onClick={() => setconfirmShow(!confirmshow)}>
                            <span className="show" style={{ color: "#d0b163" }}> </span>
                          </div>
                        </div>
                        <ErrorMessage name="ConfirmPassword" component="div" className="text-danger" />
                      </div>

                      <div className="form-group mb-0 checkbox-checked">

                        <div className="text-end mt-3">
                          <Btn
                            color="primary"
                            style={{ backgroundColor: "#d0b163", color: "#000", borderColor: "#000" }}
                            block
                            className="w-100"
                            type="submit"
                            disabled={isSubmitting}
                          >
                            Submit
                          </Btn>
                        </div>
                      </div>
                      <div className="login-social-title">
                        <H6>{SignInWith}</H6>
                      </div>
                      <P className="mt-4 mb-0 text-center">

                        <Link className="ms-2" style={{ color: "#d0b163" }} to={`${process.env.PUBLIC_URL}/login`}>
                          Back to Login-In
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

export default ResetPassword;
