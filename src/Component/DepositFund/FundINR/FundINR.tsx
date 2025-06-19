import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardBody, Col, Container, Row, FormGroup, Input, Label, CardFooter } from "reactstrap";
import { P, H4, Btn } from "../../../AbstractElements";
import { FundINRTitle, DepositFundTitle, Description, ScrollingModalHeading } from "../../../utils/Constant";
import Breadcrumbs from "../../../CommonElements/Breadcrumbs/Breadcrumbs";
import HistoryTable from "../../../CommonElements/SearchTable/SearchTable"
import { useSweetAlert } from '../../../Context/SweetAlertContext'
import Loader from '../../../CommonElements/Loader/Loader'
import { decryptData } from "../../../utils/helper/Crypto";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useApiHelper } from '../../../utils/helper/apiHelper';
import { DepositFundFormPropsType, DepositFundForminitialValues } from "../../../Type/Forms/FormsType";
import { useDepositFundService } from '../../../Service/DepositFund/DepositFundINRAED'
import CommonModal from './CommonModal';
const USDTTRC20PageContainer = () => {

  const location = useLocation();
  // Create a URLSearchParams object to parse the query string
  const queryParams = new URLSearchParams(location.search);
  const currency = queryParams.get('currency');
  const pageHeading = 'Request Fund ' + queryParams.get('currency');
  useEffect(() => {
    GetWalletBalance();
    if (currency) {
      GetDepsitBanks();
    }
  }, [currency]);
  const [scrollingModal, setScrollingModal] = useState(false);
  const scrollModalToggle = () => setScrollingModal(!scrollingModal);
  const [banks, setBanks] = useState<any>([]);
  const { getDepositWalletBalance, getBankByCurrency, getCurrencyValue, doDeposit, loading } = useDepositFundService();
  const [ClientID, setClientID] = useState(decryptData(localStorage.getItem("clientId") as string));
  const [walletBalance, setwalletBalance] = useState<number>(0);
  const [lastUpdated, setLastUpdatedDate] = useState("");
  const [imageUploaderLoading, setimageUploaderLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState("NA");
  const { showAlert, ShowSuccessAlert, ShowConfirmAlert } = useSweetAlert();
  // Validation schema
  const DepositFundSchema = Yup.object().shape({
    RequestAmount: Yup.string().required('Enter Request Amount'),
    USDTAmount: Yup.string().optional(),
    PaymentMode: Yup.string().required("Select Payment Mode"),
    Bank: Yup.string().required("Select Bank"),
    UploadReceipt: Yup.string().optional(),
    UTRNo: Yup.string().required("Enter UTR/ Transaction No."),
    Description: Yup.string().optional()
  });
  const GetWalletBalance = async () => {
    const param = {
      MemberId: ClientID,
      ActionMode: "Get"
    }
    const obj = {
      procName: 'GetMemberWalletAmount',
      Para: JSON.stringify(param),
    };
    const res = await getDepositWalletBalance(obj);
    setwalletBalance(res[0].ProductWallet);
    setLastUpdatedDate(res[0].LastUpdatedDate);
  }
  const GetDepsitBanks = async () => {
    const param = {
      MemberId: ClientID,
      Currency: currency,
      ActionMode: "GetCompanyBankDetails"
    }
    const obj = {
      procName: 'RequestFundINR',
      Para: JSON.stringify(param),
    };
    const res = await getBankByCurrency(obj);
    setBanks(res || []); // Set fetched banks
  }
  const handleBlur = async (e: React.FocusEvent<HTMLInputElement>, setFieldValue: (field: string, value: any) => void) => {
    const requestAmount = parseFloat(e.target.value);
    const param = {
      Currency: currency,
      ActionMode: "GetUsdtPrice"
    }
    const obj = {
      procName: 'ReportRequestFundINR',
      Para: JSON.stringify(param),
    };
    const res = await getCurrencyValue(obj);
    if (res) {
      const conversionRate = res[0].USDTPriceRequstFundINR; // Change this to your actual conversion rate
      const calculatedUSDT = requestAmount / conversionRate;
      setFieldValue('USDTAmount', calculatedUSDT);
    }
    // Set the calculated USDT to another field if needed

  };

  const { post } = useApiHelper();
  const uploadReceiptImage = async (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: any) => void) => {
    if (event.currentTarget.files?.[0]) {
      setimageUploaderLoading(true);
      const file = event.currentTarget.files?.[0];
      const foldername: string = '../APP/Uploads/FundRequestReciepts';
      const formData = new FormData();
      formData.append('imgData', file);
      formData.append('foldername', foldername as string);

      try {
        const response = await post(process.env.REACT_APP_API_URL + '/PostUserImage', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.Message) {
          // Assuming you want to set the filename somewhere
          // Replace this with your desired state or handling
          console.log('Uploaded file name:', response.Message);
          setSelectedFile(response.Message); // Set selected file in state  
          setimageUploaderLoading(false);       
        } else {
          setimageUploaderLoading(false);    
        }
      } catch (error) {
        setimageUploaderLoading(false);    
      }
    }
  };

  const handleDeposit = async (values: DepositFundFormPropsType, resetForm: () => void) => {
    if (selectedFile == "NA") {
      toast.error("Please attach receipt");
      return;
    }
    //console.log(values.Bank);
    //return;
    const param = {
      MemberId: ClientID,
      RequestAmount: values.RequestAmount,
      Reciept: selectedFile,
      PaymentMode: values.PaymentMode,
      TransactionNo: values.UTRNo,
      TransactionPWD: '',
      BankAccountId: values.Bank,
      Description: values.Description,
      ActionMode: 'RequestFund'
    }
    const res = await doDeposit(param);
    if (res[0].StatusCode == "1") {
      ShowSuccessAlert(res[0].Msg);
      resetForm();
    } else {
      showAlert(res[0].Msg);
    }
  }
  return (
    <>
      <Breadcrumbs mainTitle={pageHeading} parent={DepositFundTitle} ChildName={pageHeading} />
      <Container fluid>
        {imageUploaderLoading && <Loader />}
        {loading && <Loader />}
        <P className="pt-3">

          <Row>
            <Col xl="4">
              <H4>Send request for fund here</H4>
              <hr />
              <Card className="bg-primary">
                <CardBody>
                  <div className="gap-3 pills-blogger">
                    <Row>
                      <Col xl="3">
                        <div className="blog-wrapper">
                          <i className="icon-wallet f-60"></i>
                        </div>
                      </Col>
                      <Col xl="9">
                        <div className="blog-content">
                          <H4>Top-Up Wallet Balance</H4>
                          <hr />
                          <div className="f-26">${walletBalance}</div>
                        </div>
                      </Col>

                    </Row>
                  </div>
                </CardBody>
              </Card>
              <Col xl="12">
                <div className="badge badge-primary">Last Updated On {lastUpdated}</div>
              </Col>
              <hr />
              <Col xl="12" style={{ display: 'flex' }}>
                <div ><i className="fa fa-info-circle"></i></div><div style={{ paddingLeft: '10px' }}>
                  To top up your wallet, select the amount, scan the QR code to pay, and enter your transaction ID. Your balance will update once the payment is verified.
                </div>
              </Col>
              <Col xl="12">
                <hr />
                <Btn color="tertiary" type="button" onClick={scrollModalToggle}><i className="fa fa-bank"></i>&nbsp; OUR Bank & UPI Information</Btn>&nbsp;&nbsp;
                {/* <Btn color="tertiary" type="submit"><i className="fa fa-bank"></i>&nbsp;Bank Information</Btn> */}
                <CommonModal size="lg" isOpen={scrollingModal} toggle={scrollModalToggle} title={ScrollingModalHeading}>
                  {banks.map((bank: any, i: number) => (
                    <Card className="primaryCard">
                      <CardBody>
                        <Row>
                          <Col md="9">
                            <Row>
                              <Col md="8">
                                <div className="text-info">{bank.AccountHolderName}</div>
                              </Col>
                              <Col md="4">
                                <div className="badge badge-info">
                                  {bank.BankName}
                                </div>
                              </Col>
                            </Row>
                            <hr />
                            <div>
                              <Row>
                                <Col md="4">
                                  <div><small className="HeadBlue">ACCOUNT NUMBER</small></div>
                                  <div>{bank.AccountNo}</div>
                                </Col>
                                <Col md="4">
                                  <div><small className="HeadBlue">IFSC CODE</small></div>
                                  <div>{bank.IFSC}</div>
                                </Col>
                                <Col md="4">
                                  <div><small className="HeadBlue">UPI ID</small></div>
                                  <div>{bank.UPIId}</div>
                                </Col>
                              </Row>
                            </div>
                          </Col>
                          <Col md="3">
                            <div style={{ textAlign: 'center' }}>
                              <img src={process.env.REACT_APP_QR_URL + bank.QRCode} style={{ height: "120px", width: "120px" }}></img>
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  ))}
                </CommonModal>
              </Col>
            </Col>
            <Col xl="8">
              <Card>

                <CardBody>
                  <Formik
                    initialValues={DepositFundForminitialValues}
                    validationSchema={DepositFundSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                      handleDeposit(values, resetForm);
                      setSubmitting(false);
                    }}
                  >
                    {({ isSubmitting, setFieldValue, values }) => (
                      <Form>
                        <Row>

                          <Col md="4">
                            <FormGroup>
                              <Label>Request Amount</Label>
                              <Field type="text" name="RequestAmount"
                                onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleBlur(e, setFieldValue)}
                                placeholder="Enter Request Amount" className="form-control" />
                              <ErrorMessage name="RequestAmount" component="div" className="text-danger" />
                            </FormGroup>
                          </Col>
                          <Col sm="4" md="4" >
                            <FormGroup>
                              <Label>USDT</Label>
                              <Field type="text" name="USDTAmount" placeholder="USDT Amount" className="form-control" disabled />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Select Payment Mode</Label>
                              <Field as="select" name="PaymentMode" className="btn-square form-select">
                                <option value="">Select Payment Mode</option>
                                <option value='CASH'>{'CASH'}</option>
                                <option value='UPI'>{'UPI'}</option>
                                <option value='IMPS'>{'IMPS'}</option>
                                <option value='RTGS'>{'RTGS'}</option>
                                <option value='NEFT'>{'NEFT'}</option>
                              </Field>
                              <ErrorMessage name="PaymentMode" component="div" className="text-danger" />
                            </FormGroup>

                          </Col>

                          <Col md="4">
                            <FormGroup>
                              <Label>Bank where you deposited </Label>
                              <Field as="select" name="Bank" className="btn-square form-select">
                                <option value="">Select Bank</option>
                                {banks.map((bank: any) => (
                                  <option key={bank.BankAccountId} value={bank.BankAccountId}>
                                    {bank.BankName} ({bank.AccountNo})
                                  </option>
                                ))}
                              </Field>
                              <ErrorMessage name="Bank" component="div" className="text-danger" />
                            </FormGroup>
                          </Col>
                          <Col sm="4" md="4" >
                            <FormGroup>
                              <Label>Transaction Receipt</Label>
                              <Field type="file"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => uploadReceiptImage(e, setFieldValue)}
                                name='UploadReceipt' className="form-control" />
                              <ErrorMessage name="UploadReceipt" component="div" className="text-danger" />
                            </FormGroup>
                          </Col>
                          <Col sm="4" md="4" >
                            <FormGroup>
                              <Label>Transaction Number</Label>
                              <Field type="text" name='UTRNo' placeholder="UTR/Transaction No." className="form-control" />
                              <ErrorMessage name="UTRNo" component="div" className="text-danger" />
                            </FormGroup>
                          </Col>
                          <Col xl="12" style={{ display: 'flex' }}>
                            <div ><i className="fa fa-info-circle"></i></div><div style={{ paddingLeft: '10px' }}>
                              Please ensure that you select the correct bank where you made the deposit. Selecting the wrong bank may delay the processing of your transaction.
                            </div>
                          </Col>
                          <Col sm="12" md="12" >
                            <FormGroup className="mt-4">
                              <Label>Description</Label>
                              <Field type="text" name="Description" className="form-control" placeholder="Write any other details you want  to share" />
                            </FormGroup>
                          </Col>
                          <Col md="12">
                            <Btn color="primary" disabled={isSubmitting}>Submit</Btn>
                          </Col>
                        </Row>
                      </Form>
                    )}
                  </Formik>
                </CardBody>

              </Card>
            </Col>

            <Col xl="12" hidden>
              <Row>
                <Col md="3">
                  <FormGroup>
                    <Label>From Date</Label>
                    <Input type="date" placeholder="From Date" />
                  </FormGroup>
                </Col>
                <Col md="3">
                  <FormGroup>
                    <Label>To Date</Label>
                    <Input type="date" placeholder="From Date" />
                  </FormGroup>
                </Col>

                <Col md="3">
                  <FormGroup>
                    <Label>Select Status</Label>
                    <Input type='select' className="btn-square form-select">
                      <option>{'All Transaction'}</option>
                      <option>{'Pending'}</option>
                      <option>{'Approved'}</option>
                      <option>{'Cancelled'}</option>
                      <option>{'Rejected'}</option>
                      <option>{'Failed'}</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md="3">
                  <Btn color="info mt-4" type="submit">Search</Btn>
                </Col>
              </Row>
              {/* <HistoryTable /> */}
            </Col>
          </Row>

        </P>
      </Container>
    </>
  );
};

export default USDTTRC20PageContainer;
