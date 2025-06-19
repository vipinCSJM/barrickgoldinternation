import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { truncate } from "fs";
import { useResetPasswordService } from '../../Service/Authentication/ForgotPassword';
import { useSweetAlert } from '../../Context/SweetAlertContext'
export interface ForGotPasswordFormPropsType {
  Username: string,
}
// Create initial values based on the ForGotPasswordFormPropsType interface
export const ForGotPasswordForminitialValues: ForGotPasswordFormPropsType = {
  Username: "",
};

// Validation schema
const ForGotPasswordSchema = Yup.object().shape({
  Username: Yup.string().required("Username/Email is required"),
});

const Login = () => {
  const { doSendPassword, loading } = useResetPasswordService();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { showAlert, ShowSuccessAlert, ShowConfirmAlert } = useSweetAlert();

  const HandleSubmit = async (values: ForGotPasswordFormPropsType) => {
    const { Username } = values;
    const res = await doSendPassword({ "EmailId": Username });
    if (!res) return
    if (res[0]?.StatusCode == "1") {
      ShowSuccessAlert(res[0].Msg);
    } else {
      toast.error(res[0]?.Msg);
    }
  };

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
                  initialValues={ForGotPasswordForminitialValues}
                  validationSchema={ForGotPasswordSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    HandleSubmit(values);
                    setSubmitting(false);
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form className="theme-form">
                      <H2 className="text-center mt-1">Forget Password</H2>
                      <P className="text-center">{"Enter your Member ID and we will send your reset password to the mobile number and email registred with us"}</P>
                      <div className="form-group">
                        <Label className="col-form-label">Enter Username/Email Id</Label>
                        <Field
                          type="text"
                          name="Username"
                          placeholder="Enter Username/Email Id"
                          className="form-control"
                        />
                        <ErrorMessage name="Username" component="div" className="text-danger" />
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

export default Login;
