import { useState, useEffect } from "react";
import { CardBody, FormGroup, Input, Label, TabContent, TabPane, Card, CardFooter, Col, Row } from "reactstrap";
import { P, Btn, H4 } from "../../../AbstractElements";
import { UpdateProfile } from "../../../utils/Constant";
import { TabContentProp } from "../../../Type/Profile/ProfileType";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { ActsettingCryptoWallet, ActsettingBankINR, ActsettingBank_AED, ActsettingCreditCard_Details, USDTwalletaddrespropsType, Bank_INRpropsType, BANK_AEDpropsType, CreditCardDetails_propsType } from '../../../Type/Forms/FormsType'
import { ActSettingService } from '../../../Service/AccountSetting/ActsettingService'
import { SendOTP_Service } from '../../../Service/Authentication/SendOTPService'
import {CryptoWalletValidSchema, BankINRvalidSchema, BANK_AEDVailSchema, Cedit_Card_DetailsVailSchema} from '../../../Forms/FormsVailidationSchema'
import {useSweetAlert } from '../../../Context/SweetAlertContext'
import Loader from '../../../CommonElements/Loader/Loader'
import { decryptData} from "../../../utils/helper/Crypto";


const BorderTabContent: React.FC<TabContentProp> = ({ basicTab }) => {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState<number>(0);
  const { UpdateActSetting,  GetProfile_Details, loading } = ActSettingService();
  const { SendOTP, FormatTime } = SendOTP_Service()
  const [ClientID, setClientID] = useState(decryptData(localStorage.getItem("clientId") as string))
  const [UserToken, setUserToken] = useState(decryptData(localStorage.getItem("userToken") as string))
  const { showAlert, showInputAlert , ShowSuccessAlert} = useSweetAlert();
  const [cryptoWalletValues, setcryptoWalletValues] = useState <any>(null)
  const [BankINRValues, setBankINRValues] = useState <any>(null)
  const [BankAEDValues, setBankAEDValues] = useState <any>(null)
  const [creditCardValues, setcrreditCardValues] = useState <any>(null)
  const [OTPtimer, setOTPtimer] = useState("cryptoWallet")
  const [disablebtn, setdisablebtn] = useState(false)
  const [spinner, setspinner] = useState({FormName:"cryptoWallet", Action:false})

  useEffect(()=>{
    GetProfileDetails()
  },[])

// ========= Getting Actsetting Data
  const GetProfileDetails = async ()=>{
    const param = {
      ClientId: ClientID, 
      UserToken:UserToken,
      ActionMode:"GetProfile"
    };
    const obj = {
      procName: 'UpdateProfile',
      Para: JSON.stringify(param),
    };
    const res = await GetProfile_Details(obj)
   
      const CryptoWallet_Values = {
        WalletAddress:res[0]?.WalletAddress,
        FXSTRecievingAddress:res[0]?.FXSTAddress,
        OTP:''
      }

      const BankINR_Values = {
        IFSC:res[0]?.IFSC,
        BankName:res[0]?.BankName,
        BranchName:res[0]?.BranchName,
        AccountNo:res[0]?.AccountNo,
        AccountHolderName:res[0]?.AccountHolderName,
        OTP:''
      }
      const BankAED_Values ={
        AEDAccountHolderName:res[0]?.AEDAccountHolderName,
        AEDAccountNumber:res[0]?.AEDAccountNumber,
        IBANNumber:res[0]?.IBANNumber,
        SwiftCode:res[0]?.SwiftCode,
        OTP:''
      }

      const CreditCard_Values ={
        CreditCardHolderMobileNo:res[0]?.CreditCardHolderMobileNo,
        CreditCardNo:res[0]?.CreditCardNo,
        CreditCardHolderName:res[0]?.CreditCardHolderName,
        OTP:''
      }

      // Setting Values in the States 
      setcryptoWalletValues(CryptoWallet_Values)
      setBankINRValues(BankINR_Values)
      setBankAEDValues(BankAED_Values)
      setcrreditCardValues(CreditCard_Values)
    
  } 

  //========= Updating CryptoWallet
  const Update_CryptoWallet = async (values: USDTwalletaddrespropsType) => {
    setspinner({ FormName: "cryptoWallet", Action: true });
    try {
      const { WalletAddress, FXSTRecievingAddress, OTP } = values;
      const param = {
        OTP: OTP,
        ClientId:ClientID,
        WalletAddress: WalletAddress,
        FXSTRecievingAddress: FXSTRecievingAddress,
        ActionMode:"UpdateWalletAddress"
      };
      const obj = {
        procName: 'UpdateProfile',
        Para: JSON.stringify(param),
      };
      const res = await UpdateActSetting(obj)
      setspinner({ FormName: "cryptoWallet", Action: false });
      if (res[0].StatusCode == "1") {
        ShowSuccessAlert(res[0]?.Msg)
        // Success logic here
      } else {
        console.error("update failed: ", res[0].Msg);
        showAlert('Opps!', res[0].Msg);
      }
    } catch (error) {
      console.error("Error in update Failed: ", error);
    }
  }

  //========  Updating Bank INR
  const Update_BankINR = async (values: Bank_INRpropsType) => {
    setspinner({ FormName: "bankINR", Action: true });
    const {OTP, IFSC, BankName, BranchName, AccountNo, AccountHolderName } = values
    try {
      const param = { OTP, ClientId:ClientID, IFSC, BankName, BranchName, PassbookImage:"", AccountNo, AccountHolderName, ActionMode:"UpdateBank" };
      const obj = {
        procName: 'UpdateProfile',
        Para: JSON.stringify(param),
      };

      const res = await UpdateActSetting(obj)
      setspinner({ FormName: "bankINR", Action: false });
      if (res[0].StatusCode == "1") {
        ShowSuccessAlert(res[0].msg)
      } else {
        showAlert('Opps!', res[0].msg);
      }
    } catch (error) {
      console.error("Error in update Failed: ", error);
    }
  }

//======== Updating Bank AED 
    const Update_BankAED = async (values: BANK_AEDpropsType) => {
      setspinner({ FormName: "bankAED", Action: true });
      try {
        const {  OTP, SwiftCode, IBANNumber, AEDAccountNumber, AEDAccountHolderName } = values;
        const param = {
          OTP: OTP,
          ClientId:ClientID,
          IFSC:SwiftCode,
          IBAN:IBANNumber,
          AccountHolderName:AEDAccountHolderName,
          ActionMode: 'UpdateBankAED',
        };
        const obj = {
          procName: 'UpdateProfile',
          Para: JSON.stringify(param),
        };
  
        const res = await UpdateActSetting(obj)
        setspinner({ FormName: "bankAED", Action: false });
        // console.log(res);
        if (res[0].StatusCode == "1") {
          ShowSuccessAlert(res[0]?.msg)
        } else {
          console.error("update failed: ", res[0].msg);
          showAlert('Opps!', res[0].msg);
          //toast.error(res[0].msg);
        }
      } catch (error) {
        console.error("Error in update Failed: ", error);
      }
    }

    //========= Credit Card Detail updation  
    const Update_Creaditcard = async (values: CreditCardDetails_propsType) => {
      setspinner({ FormName: "creditCard", Action: true });
      const {CreditCardHolderMobileNo, CreditCardNo, CreditCardHolderName} = values
      try {
        const { OTP } = values;
        const param = {
          OTP: OTP,
          ClientId:ClientID,
          CreditCardHolderMobileNo,
          CreditCardNo,
          CreditCardHolderName,
          ActionMode:"UpdateCreditCard"
        };
        const obj = {
          procName: 'UpdateProfile',
          Para: JSON.stringify(param),
        };
  
        const res = await UpdateActSetting(obj);
        setspinner({ FormName: "creditCard", Action: false });
        // console.log(res);
        if (res[0].StatusCode == "1") {
          ShowSuccessAlert(res[0]?.msg)
        } else {
          showAlert('Opps!', res[0]?.msg);
        }
      } catch (error) {
        console.error("Error in update Failed: ", error);
      }
    }

  //============= Handling OTP 
  const handleSendOTP = async (value:any) => {
    setOTPtimer(value)
    setdisablebtn(true)
    const param ={
      ClientId:ClientID,
      ActionMode:"SendOTP"
    }
    const obj = {
      procName: 'RegistrationOTP',
      Para: JSON.stringify(param),
    };
    const res = await SendOTP(obj);
    if (res[0].StatusCode == "1") {
      setIsOtpSent(true);
      // setOtpTimer(res[0].SecondsLeft - 1)
      startTimer(res[0].SecondsLeft);
    }
  }
  
  //=========== Setting OTP Counter 
  const startTimer = (secondsLeft: number) => {
    setOtpTimer(secondsLeft - 1); // Subtract 1 to start the timer at 59 seconds
    const intervalId = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 0) {
          clearInterval(intervalId); // Stop timer when it reaches 0
          setIsOtpSent(false); // Reset OTP sent flag
          setdisablebtn(false)
          return 0; // Ensure it doesn't go below 0
        }
        return prev - 1; // Decrement the timer by 1 second
      });
    }, 1000);
    return () => clearInterval(intervalId);
  };


  return (
    <>{loading && <Loader />}
    <TabContent activeTab={basicTab}>
      <TabPane tabId="1">
        <H4 className="mt-4 mb-2">USDT Wallet Address</H4>
          <Formik
            initialValues={cryptoWalletValues || ActsettingCryptoWallet}
            validationSchema={CryptoWalletValidSchema}
            enableReinitialize
            onSubmit={(values:any, { setSubmitting }) => {
              Update_CryptoWallet(values)
              setSubmitting(false)
            }}
          >
            {({ values ,handleChange, touched,  handleBlur, setFieldValue, setFieldError, errors  }) => (
              <Form>
                <Card>
                  <CardBody>
                    <Row>
                      <Col md="4">
                        <Label>USDT Wallet Address</Label>
                        <Field type="text" name="WalletAddress" autoComplete="off"  className="form-control" placeholder="Wallet Address " />
                        <ErrorMessage name="WalletAddress" component="div" className="text-danger" />
                      </Col>
                      {/* <Col sm="4" md="4" >
                        <Label>FXST Recieving Address(Bep20(BSC)Chain)</Label>
                        <Field type="text" name="FXSTRecievingAddress" autoComplete="off" className="form-control" placeholder="FXST Recieving Address" />
                        <ErrorMessage name="FXSTRecievingAddress" component="div" className="text-danger" />
                      </Col> */}
                      <Col sm="4" md="4"  className="position-relative">
                        <Label>One Time Password</Label>
                        <Field type="text" name="OTP" autoComplete="off" onBlur={handleBlur} onChange={handleChange}  className="form-control" placeholder="One Time Password" />
                        <ErrorMessage name="OTP" component="div" className="text-danger" />
                        <Btn color="info"
                          onClick={() => {
                            handleSendOTP('cryptoWallet')
                          }}
                          disabled={disablebtn}
                          style={{ position: 'absolute', right: '15px', top: '45%', backgroundColor: '#d0b163', borderColor: '#d0b163', color: '#000' }}>
                             {isOtpSent && OTPtimer === "cryptoWallet" ? FormatTime(otpTimer) : 'Send OTP'}
                          </Btn>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter className="text-end">
                    <Btn color="primary"  type="submit">{UpdateProfile}
                    {spinner.Action === true && spinner.FormName === 'cryptoWallet' ? <div className="spinner-border spinner-border-sm text-dark ms-2" role="status">
                    <span className="sr-only">Loading...</span>
                    </div> : ''}
                    </Btn>
                  </CardFooter>
                </Card>
              </Form>
            )}
          </Formik>
      </TabPane>
      <TabPane tabId="2">
      <Formik
            initialValues={BankINRValues || ActsettingBankINR}
            validationSchema={BankINRvalidSchema}
            onSubmit={(values, { setSubmitting }) => {
              Update_BankINR(values)
              setSubmitting(false)
            }}
            enableReinitialize
          >
       {({ isSubmitting, values, setFieldValue, setFieldError }) => (
        <Form>
          <Card>
            <CardBody>
              <Row>
                <Col md="4">
                    <Label>IFSC Code</Label>
                    <Field type="text" name="IFSC" autoComplete="off" className="form-control" placeholder="IFSC Code" />
                    <ErrorMessage name="IFSC" component="div" className="text-danger" />
                </Col>
                <Col sm="4" md="4" >
                  <FormGroup>
                    <Label>Bank Name</Label>
                    <Field type="text" name="BankName" autoComplete="off" className="form-control" placeholder="Bank Name" />
                    <ErrorMessage name="BankName" component="div" className="text-danger" />
                  </FormGroup>
                </Col>
                <Col sm="4" md="4" >
                  <FormGroup>
                    <Label>Branch Name</Label>
                    <Field type="text" name="BranchName" autoComplete="off" className="form-control" placeholder="Branch Name" />
                    <ErrorMessage name="BranchName" component="div" className="text-danger" />
                  </FormGroup>
                </Col>
                <Col sm="4" md="4" >
                  <FormGroup>
                    <Label>Account Number</Label>
                    <Field type="text" name="AccountNo" autoComplete="off" className="form-control" placeholder="Account Number" />
                    <ErrorMessage name="AccountNo" component="div" className="text-danger" />
                  </FormGroup>
                </Col>
                <Col sm="4" md="4" >
                  <FormGroup>
                    <Label>Account Holder Name</Label>
                    <Field type="text" name="AccountHolderName" autoComplete="off" className="form-control" placeholder="Account Holder Name" />
                    <ErrorMessage name="AccountHolderName" component="div" className="text-danger" />
                  </FormGroup>
                </Col>
                <Col sm="4" md="4" >
                  <FormGroup style={{ position: 'relative' }}>
                    <Label>One Time Password</Label>
                    <Field type="text" name="OTP" autoComplete="off" className="form-control" placeholder="One Time Password" />
                    <ErrorMessage name="OTP" component="div" className="text-danger" />
                    <Btn color="info" disabled={disablebtn}
                    onClick={() => {
                      handleSendOTP('BankINR')
                    }}
                   
                     style={{ position: 'absolute', right: '0px', top: '33px', backgroundColor: '#d0b163', borderColor: '#d0b163', color: '#000' }}>
                      {isOtpSent && OTPtimer === "BankINR" ? FormatTime(otpTimer) : 'Send OTP'}
                      </Btn>
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>
            <CardFooter className="text-end">
              <Btn color="primary" disabled={isSubmitting} type="submit">{UpdateProfile}
              {spinner.Action === true && spinner.FormName === 'bankINR' ? <div className="spinner-border spinner-border-sm text-dark ms-2" role="status">
                    <span className="sr-only">Loading...</span>
                    </div> : ''}
              </Btn>
            </CardFooter>
          </Card>
        </Form>
      )}
        </Formik>
      </TabPane>
     <TabPane tabId="3">
     <Formik
            initialValues={BankAEDValues}
            validationSchema={BANK_AEDVailSchema}
            onSubmit={(values, { setSubmitting }) => {
              Update_BankAED(values)
              setSubmitting(false)
            }}
            enableReinitialize
          >
         {({ isSubmitting, values, setFieldValue, setFieldError }) => (
        <Form>
          <Card>
            <CardBody>
              <Row>
                <Col sm="3" md="3" >
                <FormGroup>
                    <Label>Account Holder Name</Label>
                    <Field type="text" name="AEDAccountHolderName" autoComplete="off" className="form-control" placeholder="Account Holder Name" />
                    <ErrorMessage name="AEDAccountHolderName" component="div" className="text-danger" />
                </FormGroup>
                </Col>
                <Col sm="3" md="3" >
                <FormGroup>
                    <Label>Account Number</Label>
                    <Field type="text" name="AEDAccountNumber" autoComplete="off" className="form-control" placeholder="Account Number" />
                    <ErrorMessage name="AEDAccountNumber" component="div" className="text-danger" />
                </FormGroup>
                </Col>
                <Col sm="3" md="3" >
                <FormGroup>
                    <Label>IBAN</Label>
                    <Field type="text" name="IBANNumber" autoComplete="off" className="form-control" placeholder="IBAN" />
                    <ErrorMessage name="IBANNumber" component="div" className="text-danger" />
                </FormGroup>
                </Col>
                <Col sm="3" md="3" >
                <FormGroup>
                    <Label>Swit Code</Label>
                    <Field type="text" name="SwiftCode" autoComplete="off" className="form-control" placeholder="Swit Code" />
                    <ErrorMessage name="SwiftCode" component="div" className="text-danger" />
                </FormGroup>
                </Col>
                <Col sm="4" md="4">
                <FormGroup style={{ position: 'relative' }}>
                    <Label>One Time Password</Label>
                    <Field type="text" name="OTP" className="form-control" placeholder="One Time Password" />
                    <Btn color="info"  disabled={disablebtn}
                    onClick={() => {
                      handleSendOTP('BankAED')
                    }}
                     style={{ position: 'absolute', right: '0px', top: '33px', backgroundColor: '#d0b163', borderColor: '#d0b163', color: '#000' }}>
                      {isOtpSent && OTPtimer === "BankAED" ? FormatTime(otpTimer) : 'Send OTP'}
                      </Btn>
                    <ErrorMessage name="OTP" component="div" className="text-danger" />
                </FormGroup>
                </Col>
              </Row>
            </CardBody>
            <CardFooter className="text-end">
              <Btn color="primary" disabled={isSubmitting}  type="submit">{UpdateProfile}
              {spinner.Action === true && spinner.FormName === 'bankAED' ?  <div className="spinner-border spinner-border-sm text-dark ms-2" role="status">
                    <span className="sr-only">Loading...</span>
                    </div> : ''}
              </Btn>
            </CardFooter>
          </Card>
        </Form>
      )}
        </Formik>
      </TabPane> 
      <TabPane tabId="4">
        <Formik
           initialValues={creditCardValues|| ActsettingCreditCard_Details}
           validationSchema={Cedit_Card_DetailsVailSchema}
           onSubmit={(values, { setSubmitting }) => {
            Update_Creaditcard(values)
             setSubmitting(false)
           }}
           enableReinitialize
        >
        <Form>
          <Card>
            <CardBody>
              <Row>
                <Col sm="4" md="4" >
                  <FormGroup>
                    <Label>Mobile Number</Label>
                    <Field type="text" name="CreditCardHolderMobileNo" autoComplete="off" className="form-control" placeholder="Account Holder Name" />
                    <ErrorMessage name="CreditCardHolderMobileNo" component="div" className="text-danger" />
                  </FormGroup>
                </Col>
                <Col sm="4" md="4" >
                  <FormGroup>
                    <Label>Credit Card Number</Label>
                    <Field type="text" name="CreditCardNo" autoComplete="off" className="form-control" placeholder="Account Number" />
                    <ErrorMessage name="CreditCardNo" component="div" className="text-danger" />
                  </FormGroup>
                </Col>
                <Col sm="4" md="4" >
                  <FormGroup>
                    <Label>Credit Card Holder Name</Label>
                    <Field type="text" name="CreditCardHolderName" autoComplete="off" className="form-control" placeholder="IBAN" />
                    <ErrorMessage name="CreditCardHolderName" component="div" className="text-danger" />
                  </FormGroup>
                </Col>
                <Col sm="4" md="4" >
                  <FormGroup style={{ position: 'relative' }}>
                    <Label>One Time Password</Label>
                    <Field type="text" name="OTP" autoComplete="off" className="form-control" placeholder="One Time Password" />
                    <ErrorMessage name="OTP" component="div" className="text-danger" />
                    <Btn color="info"   disabled={disablebtn}
                    onClick={() => {
                      handleSendOTP('CreditCard')
                    }}
                    style={{ position: 'absolute', right: '0px', top: '33px', backgroundColor: '#d0b163', borderColor: '#d0b163', color: '#000' }}>
                    {isOtpSent && OTPtimer === "CreditCard" ? FormatTime(otpTimer) : 'Send OTP'}
                      </Btn>
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>
            <CardFooter className="text-end">
              <Btn color="primary" type="submit">{UpdateProfile}
              {spinner.Action === true && spinner.FormName === 'creditCard' ? <div className="spinner-border spinner-border-sm text-dark ms-2" role="status">
                    <span className="sr-only">Loading...</span>
                    </div> : ''}
              </Btn>
            </CardFooter>
          </Card>
        </Form>
        </Formik>
      </TabPane>  
    </TabContent>
    </>
  );
};

export default BorderTabContent;
