import React, { useEffect, useState, useRef } from 'react';
import { Col, Container, Row } from "reactstrap";
import {Image } from "../../AbstractElements";
import { ActivateBot, buygold, KYC } from "../../utils/Constant";
import Breadcrumbs from "../../CommonElements/Breadcrumbs/Breadcrumbs";
import { useBotService } from '../../Service/ActivateBot/ActivateBot'
import { decryptData } from "../../utils/helper/Crypto";
import { Button } from 'react-bootstrap/lib/InputGroup';
import axios from 'axios';
import { useSweetAlert } from '../../Context/SweetAlertContext';
import { Left } from 'react-bootstrap/lib/Media';
import { useApiHelper } from '../../utils/helper/apiHelper';

const KYCComponent = () => {
      const [ClientID, setClientID] = useState(decryptData(localStorage.getItem("clientId") as string));
    
   const [aadharCardNo, setAadharCardNo] = useState('');
  const [aadharFront, setAadharFront] = useState<File | null>(null);
  const [aadharBack, setAadharBack] = useState<File | null>(null);
  const [aadharFrontPreview, setAadharFrontPreview] = useState('');
  const [aadharBackPreview, setAadharBackPreview] = useState('');

  const [panCardNo, setPanCardNo] = useState('');
  const [panCardFile, setPanCardFile] = useState<File | null>(null);
  const [panCardPreview, setPanCardPreview] = useState('');

const [imageUploaderLoading, setimageUploaderLoading] = useState(false);

  const [aadharFrontFileName, setAadharFrontFileName] = useState('');
const [aadharBackFileName, setAadharBackFileName] = useState('');
const [panCardFileName, setPanCardFileName] = useState('');
  const { ExecuteProcedure } = useBotService();
        const { showAlert, ShowSuccessAlert, ShowConfirmAlert } = useSweetAlert();
  


const { post } = useApiHelper();
const uploadReceiptImage = async (
  event: React.ChangeEvent<HTMLInputElement>,
  setFieldValue: (field: string, value: any) => void,
  setFileName: (filename: string) => void
) => {
  if (event.currentTarget.files?.[0]) {
    setimageUploaderLoading(true);
    const file = event.currentTarget.files[0];
   
    const formData = new FormData();
    formData.append('imgData', file);
    formData.append('pagename', 'KYC');

    try {
      const response = await post(process.env.REACT_APP_API_URL + '/PostUserImage', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.Message) {
        console.log('Uploaded file name:', response.Message);
        setFileName(response.Message); // ✅ Save filename to state
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setimageUploaderLoading(false);
    }
  }
};
 const handleImageUpload = (file: File, setPreview: (src: string) => void, setFile: (f: File) => void) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    setFile(file);
  };

const handleAadharFrontChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
    handleImageUpload(e.target.files[0], setAadharFrontPreview, setAadharFront);
    uploadReceiptImage(e, () => {}, setAadharFrontFileName);
  }
};

const handleAadharBackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
    handleImageUpload(e.target.files[0], setAadharBackPreview, setAadharBack);
    uploadReceiptImage(e, () => {}, setAadharBackFileName);
  }
};
const handlePanCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
    handleImageUpload(e.target.files[0], setPanCardPreview, setPanCardFile);
    uploadReceiptImage(e, () => {}, setPanCardFileName);
  }
};


  const handleSubmitAadhar = async() => {
   const aadharRegex = /^[2-9]{1}[0-9]{11}$/;

  if (!aadharCardNo) {
    showAlert('Enter Aadhar Card Number');
    return;
  }

  if (!aadharRegex.test(aadharCardNo)) {
    showAlert('Enter a valid 12-digit Aadhar number (should not start with 0 or 1)');
    return;
  }

  if (!aadharFrontFileName || !aadharBackFileName) {
      showAlert('Upload both Aadhar images');
      return;
  }

  console.log('Front Image:', aadharFrontFileName);
  console.log('Back Image:', aadharBackFileName);
    //alert('Aadhar submitted successfully');
      const param = {
            ClientId: ClientID,
            DocumentId : 4,
            DocumentNo :aadharCardNo,
            DocumentPath :aadharFrontFileName,
            DocumentBackSide :aadharBackFileName,
            ActionMode :'InsertKYC'
            }

            const obj = {
            procName: 'UpdateProfile',
            Para: JSON.stringify(param),
            };
          const res = await ExecuteProcedure(obj);
            if (res[0].StatusCode == "1") {
                ShowSuccessAlert(res[0].msg); 
            
            } else {
                showAlert(res[0].msg);
            }
};
useEffect(()=>{
    GetKYCDetails();
},[])

  const GetKYCDetails = async() => {
  const param = {
            ClientId: ClientID,
            ActionMode :'GetKYC'
            }
            const obj = {
            procName: 'UpdateProfile',
            Para: JSON.stringify(param),
         };
          const res = await ExecuteProcedure(obj);
            if (res[0]?.StatusCode == "1") {
                for(var i=0;res.length>i;i++){
                if(res[i].documentName=='aadharFront'){
                    setAadharCardNo(res[i].DocumentNumber)
                    setAadharFrontPreview(res[i].AttachmentPath)
                    setAadharFront(res[i].Attachment);
                }

                if(res[i].documentName=='aadharBack'){
                   setAadharBackPreview(res[i].AttachmentPath)
                    setAadharBack(res[i].Attachment);
                }
                if(res[i].documentName=='pan'){
                    setPanCardNo(res[i].DocumentNumber)
                    setPanCardPreview(res[i].AttachmentPath)
                    setPanCardFile(res[i].Attachment)
                }
                }
               
            }
 
};
const handleSubmitPan = async() => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

  if (!panCardNo) {
   showAlert('Enter PAN Card Number');
    return;
   }
    if (!panRegex.test(panCardNo)) {
    showAlert('Enter a valid PAN number (e.g., ABCDE1234F)');
    return;
    }

  if (!panCardFileName) {
    showAlert('Upload PAN card image');
      return;
  }
  console.log('PAN Number:', panCardNo);
  console.log('PAN Image:', panCardFileName);
  const param = {
            ClientId: ClientID,
            DocumentId : 1,
            DocumentNo :panCardNo,
            DocumentPath :panCardFileName,
            ActionMode :'InsertKYC'
            }
            const obj = {
            procName: 'UpdateProfile',
            Para: JSON.stringify(param),
         };
          const res = await ExecuteProcedure(obj);
            if (res[0].StatusCode == "1") {
                ShowSuccessAlert(res[0].msg); 
            
            } else {
                showAlert(res[0].msg);
            }
 /// alert('PAN submitted successfully');
};
  return (
    <>
      <Breadcrumbs mainTitle={KYC} parent={KYC} />
      <Container fluid>
        <Row>
       <div className="box-body">
      <div className="row" style={{ marginBottom: '20px' }}>
        <div className="col-md-12">
          <div className="alert alert-primary" id="kyc-errormessage" style={{ padding: '5px 10px', display: 'none' }}></div>
        </div>

        {/* Aadhar Section */}
        <div className="col-md-6">
          <h4 className="box-title text-info">
            <i className="ti-user mr-15"></i>Address Proof
          </h4>
          <hr className="mb-15 mt-0" />
          <div className="form-group">
            <label>Aadhar Card Number</label>
            <input
              type="number"
              className="form-control"
              value={aadharCardNo}
              onChange={(e) => setAadharCardNo(e.target.value)}
              maxLength={12}
            />
          </div>
          <div className="form-group"  style={{
    height: 'auto',
    width: '215px',
    border: 'dashed 2px #b9b5b5',
    padding: '10px',
    borderRadius: '10px',
    boxShadow: '1px 0px 15px 2px #f4cdd8',
    margin: 'auto',
     float: 'left', // ✅ Added float here
     marginRight: '20px',
    marginTop: '10px'
  }}>
            <label>Upload Aadhar Card Front Image</label>
            <input type="file" onChange={handleAadharFrontChange} style={{ marginBottom: '10px' }} />
            {aadharFrontPreview && <img src={aadharFrontPreview} alt="Aadhar Front" style={{ width: '200px', height: '145px' }} />}
          </div>
          <div className="form-group" style={{
    height: 'auto',
    width: '215px',
    border: 'dashed 2px #b9b5b5',
    padding: '10px',
    borderRadius: '10px',
    boxShadow: '1px 0px 15px 2px #f4cdd8',
    margin: 'auto',
     float: 'left', // ✅ Added float here
    marginTop: '10px'
  }}>
            <label>Upload Aadhar Card Back Image</label>
            <input type="file" onChange={handleAadharBackChange} />
            {aadharBackPreview && <img src={aadharBackPreview} alt="Aadhar Back" style={{ width: '200px', height: '145px' }} />}
          </div>
          <center style={{ marginTop: '15px' }}>
            <button className="btn btn-primary" onClick={handleSubmitAadhar} style={{marginTop: '10px'}}>
              Upload Aadhar
            </button>
          </center>
        </div>

        {/* PAN Section */}
        <div className="col-md-6">
          <h4 className="box-title text-info">
            <i className="ti-user mr-15"></i>PAN CARD&nbsp;
            <span className="badge badge-danger">Default</span>
          </h4>
          <hr className="mb-15 mt-0" />
          <div className="form-group">
            <label>PAN Number</label>
            <input
              type="text"
              className="form-control"
              value={panCardNo}
              onChange={(e) => setPanCardNo(e.target.value.toUpperCase())}
  maxLength={10}
            />
          </div>
          <div className="form-group" style={{
    height: 'auto',
    width: '215px',
    border: 'dashed 2px #b9b5b5',
    padding: '10px',
    borderRadius: '10px',
    boxShadow: '1px 0px 15px 2px #f4cdd8',
    margin: 'auto',
     float: 'left' ,// ✅ Added float here
     marginTop: '10px'
  }}>
            <label>Upload PAN Card Image</label>
            <input type="file" onChange={handlePanCardChange} style={{ marginBottom: '10px' }} />
            {panCardPreview && <img src={panCardPreview} alt="PAN Card" style={{ width: '200px', height: '145px' }} />}
          </div>
          <center style={{ marginTop: '15px', width: '225px' }}>
            <button className="btn btn-primary" onClick={handleSubmitPan} style={{marginTop: '10px'}}>
              Upload Image
            </button>
          </center>
        </div>
      </div>
      <hr className="mb-15 mt-0" />
    </div>
        </Row>
      </Container>
    </>
  );
};
export default KYCComponent;
