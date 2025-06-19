import { Card, CardBody, Col, Container, Row, FormGroup, Label } from "reactstrap";
import { P, Btn } from "../../../AbstractElements";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Breadcrumbs from "../../../CommonElements/Breadcrumbs/Breadcrumbs";
import CommonCardHeader from "../../../CommonElements/CommonCardHeader/CommonCardHeader";
import React, { useState, useEffect } from "react";
import OrgChartComponent from "../GenerationTree/D3Chart";
import * as d3 from "d3";
import { useSweetAlert } from '../../../Context/SweetAlertContext'
import { useApiHelper } from '../../../utils/helper/apiHelper';
import { decryptData } from "../../../utils/helper/Crypto";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { TreeFormPropsType, TreeForminitialValues } from "../../../Type/Forms/FormsType";
import Loader from '../../../CommonElements/Loader/Loader'
const GenerationTreeContainer = () => {
    const { post, loading } = useApiHelper();
    const { showAlert, ShowSuccessAlert, ShowConfirmAlert } = useSweetAlert();
    const [modalOpen, setModalOpen] = useState(false); // Modal is initially closed
    const [ClientID, setClientID] = useState(decryptData(localStorage.getItem("clientId") as string));
    const [data, setData] = useState<OrgNode[] | null>(null); // Data can be an array of OrgNode or null
    const [details, setDetails] = useState<any>([]);
    // Validation schema
    const TreeSchema = Yup.object().shape({
        Username: Yup.string().required("Enter Username")
    });
    // Define the type for your data
    interface OrgNode {
        id: number;
        name: string;
        parentId?: number;
    }
    const closeModal = () => {
        document.body.style.paddingRight = '';
        setModalOpen(false);
    };
    const handleNodeClick = (data: any) => {
        FetchNodeData(data.split("-")[1]);
    };
    const FetchNodeData = async (clientId: any) => {
        const param = {
            ClientId: clientId
        }
        const obj = {
            procName: 'GetNodeDetail',
            Para: JSON.stringify(param),
        };
        const res = await doAajxCall(obj);
        setDetails(res[0]);
        // console.log(res[0]);
        setModalOpen(true); // Open modal

    }
    const doAajxCall = async (payload: any) => {
        try {
            return await post(`${process.env.REACT_APP_ADMIN_API_URL}/ExecuteProcedure`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    };
    const parseNestedJsonStrings = (data: any) => {
        for (const key in data) {
            if (typeof data[key] === 'string') {
                try {
                    // Attempt to parse the property if it looks like JSON
                    data[key] = JSON.parse(data[key]);
                } catch (e) {
                    // If the property is not valid JSON, leave it as is
                    continue;
                }
            } else if (typeof data[key] === 'object' && data[key] !== null) {
                // If the property is an object, recursively parse it
                parseNestedJsonStrings(data[key]);
            }
        }
    };
    const handleSearch = (values: TreeFormPropsType) => {
        FetchData(values.Username)
    };
    const FetchData = async (username: string) => {
        const param = {
            LoggedClientId: ClientID,
            SearchUsername: username
        }
        const obj = {
            procName: 'OrgTree',
            Para: JSON.stringify(param),
        };
        const res = await doAajxCall(obj);
        if(res[0]?.StatusCode=="0"){
            showAlert(res[0].Msg);
            return;
        }
        // console.log(JSON.parse(res[0].OrganizationTree) );
        let parsedData = JSON.parse(res[0].OrganizationTree);
        // console.log(parsedData.length);
        if (parsedData.length > 1) {
            parseNestedJsonStrings(parsedData);
            setData(parsedData as OrgNode[]);
        }
    }
    useEffect(() => {
        FetchData(localStorage.getItem("UserName") as string);

    }, []); // Empty dependency array to ensure this runs only once on mount
    return (
        <>
            <Breadcrumbs mainTitle="Generation Tree" parent="Generation Tree" />
            <Container fluid>
                {loading && <Loader />}
                <Row>
                    <Col xl="12">
                        <Card>
                            {/* <CommonCardHeader title="" headClass="pb-0" /> */}
                            <CardBody>



                                <Formik
                                    initialValues={TreeForminitialValues}
                                    validationSchema={TreeSchema}
                                    onSubmit={(values, { setSubmitting }) => {
                                        handleSearch(values);
                                        setSubmitting(false);
                                    }}
                                >
                                    {({ isSubmitting, setFieldValue, values }) => (
                                        <Form>
                                            <Col xl="12">
                                                <Row>
                                                    <Col md="4">
                                                        <FormGroup>
                                                            <Label>Enter Username</Label>
                                                            <Field type="text" name="Username"

                                                                placeholder="Enter to Username" className="form-control" />
                                                            <ErrorMessage name="Username" component="div" className="text-danger" />
                                                            {/* {username == "Not Available" ? <span style={{ color: 'red' }}>Invalid Username</span> : <span style={{ color: 'green' }}>{username}</span>} */}
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md="3" className="d-flex align-items-center justify-content-start pb-2 pb-md-0">
                                                        <Btn color="primary mt-0 mt-md-3" type="submit">Search</Btn>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Form>
                                    )}
                                </Formik>




                                <div className="text-center">
                                    <hr className="my-4" style={{ borderTop: "2px solid #ccc" }} />

                                    <P className="font-primary fw-bold" style={{ fontSize: 25 }}>
                                        {data == null ? "No Team Found" :
                                            <OrgChartComponent data={data} onNodeClick={handleNodeClick} />}
                                    </P>
                                    <hr className="my-4" style={{ borderTop: "2px solid #ccc" }} />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Modal isOpen={modalOpen} toggle={closeModal} centered>
                    <ModalHeader toggle={closeModal} className="mymodal-header px-4">
                        {details.MemberName}
                    </ModalHeader>
                    <ModalBody className="mymodal-body text-center">
                        <div style={{ height: 'auto', width: '100%' }}>
                            <div className="text-start">
                                <table className="table table-bordered">

                                    <tbody>
                                        <tr>
                                            <td>Top Up Amount</td>
                                            <td>${details.TopUpAmount}</td>
                                        </tr>
                                        <tr>
                                            <td>Designation</td>
                                            <td>{details.RankName}</td>
                                        </tr>
                                        <tr>
                                            <td>ID Activation Date</td>
                                            <td>{details.IDActivationDate}</td>
                                        </tr>
                                        <tr>
                                            <td>Bot Status</td>
                                            <td>{details.BotStatus}</td>
                                        </tr>
                                        <tr>
                                            <td>Today Business</td>
                                            <td>${details.TodayBusiness}</td>
                                        </tr>
                                        <tr>
                                            <td>Stronger Business</td>
                                            <td>${details.LeftBusiness}</td>
                                        </tr>
                                        <tr>
                                            <td>Weaker Business</td>
                                            <td>${details.RightBusiness}</td>
                                        </tr>
                                        <tr>
                                            <td>Total Business</td>
                                            <td>${details.TotalBusiness}</td>
                                        </tr>
                                        <tr>
                                            <td>Stronger Team Bot Count</td>
                                            <td>{details.LeftTeamBotCount}</td>
                                        </tr>
                                        <tr>
                                            <td>Weaker Team Bot Count</td>
                                            <td>{details.RightTeamBotCount}</td>
                                        </tr>
                                        <tr>
                                            <td>Total Bot Count</td>
                                            <td>{details.TotalBotCount}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="text-end">
                                <Btn color="primary" onClick={closeModal}>
                                    Close
                                </Btn>
                            </div>
                        </div>
                    </ModalBody>
                </Modal>
            </Container>
        </>
    );
};

export default GenerationTreeContainer;
