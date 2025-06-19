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

const NoInternet = () => {
  return (
    <Container fluid className="p-0">

      <Row className="m-0">
        <Col xs="12" className="p-0">
          <div className="login-card" style={{ backgroundColor: "transparent" }}>
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
                <center><img src={dynamicImage("nointernetconnection.png")} style={{ height: 200 }} /></center>
                <H2 className="text-center mt-1">No Internet Connection</H2>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NoInternet;
