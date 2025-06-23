import { useEffect, useState } from "react";
import { useBotService } from "../../Service/ActivateBot/ActivateBot";
import { decryptData } from "../../utils/helper/Crypto";
import { useLocation, useParams } from "react-router-dom";


const DigitalGoldCertificate = ()=>
{
    const [ClientID, setClientID] = useState(decryptData(localStorage.getItem("clientId") as string));
          const [contactInfo, setContactInfo] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [purity, setPurity] = useState<string>('99.99% Pure Gold (24K)');
  const [value, setValue] = useState<string>('');
  const [purchaseMode, setPurchaseMode] = useState<string>('');
  const [certificateId, setCertificateId] = useState<string>('');
  const [issueDate, setIssueDate] = useState<string>('');
  
    const {ExecuteProcedure } = useBotService();

      const { id } = useParams<{ id: string }>();
  useEffect(() => {
    if (id) {
      debugger
      console.log("ID from URL:", id);
      GetDetails(id);
    }
  }, [id]);

  

  const GetDetails = async (id:string) => {
    const param = {
      ClientId: ClientID,
      InvestmentId:id,
      ActionMode: "GetCertificatedata"
    }
    const obj = {
      procName: 'PurchaseToken',
      Para: JSON.stringify(param),
    };
    const res = await ExecuteProcedure(obj);
    if (res && res.length > 0) {
      setContactInfo(res[0].ContactInfo || '');
      setFullName(res[0].FullName || '');
      setQuantity(res[0].Quantity || '10 grams');
      setPurity(res[0].Purity || '99.99% Pure Gold (24K)');
      setValue(`₹ ${res[0].Amount || '[Amount]'}`);
      setPurchaseMode(res[0].PurchaseMode || 'Online');
      setCertificateId(res[0].CertificateId || 'BG-2025-0001');
      setIssueDate(res[0].IssueDate || '21st May 2025');
    }
  }
  

  return (
<>
   <div className="certificate">
      <h1>DIGITAL GOLD OWNERSHIP CERTIFICATE</h1>

      <div className="logo-section">
        <div>
          <strong style={{ fontSize: "22px" }}>BG</strong>
          <br />
          <strong style={{ fontSize: "18px" }}>
            BARRICK GOLD INTERNATIONAL
          </strong>
        </div>
        
        <div style={{ textAlign: "right" }}>
          Certificate ID: <strong>{certificateId}</strong>
          <br />
          Date of Issue: <strong>{issueDate}</strong>
        </div>
      </div>

      <div className="details">
        <p>
          <strong>CERTIFIED TO:</strong> {fullName}
        </p>
        <p>
          <strong>Email/Phone:</strong> {contactInfo}
        </p>

        <p style={{paddingTop:'10px',paddingBottom:'10px',borderTop:'solid 1px #000',marginTop:'10px'}}>
          <strong>GOLD PURCHASE DETAILS:</strong>
        </p>
        <ul>
          <li>
            <strong>Quantity Purchased:</strong> {quantity}
          </li>
          <li>
            <strong>Purity:</strong> {purity}
          </li>
          <li>
            <strong>Transaction Value:</strong> {value}
          </li>
          <li>
            <strong>Purchase Mode:</strong> {purchaseMode}
          </li>
        </ul>
      </div>

      <div className="statement">
        <p>
          <strong>CERTIFICATION STATEMENT:</strong>
        </p>
        <p>
          This is to certify that the above-named individual has successfully
          purchased digital gold through Barrick Gold International. The gold is
          securely stored in insured vaults, and can be redeemed or liquidated
          at any time as per company policy.
        </p>
      </div>

      <div className="signature">
        <p>_______________________</p>
        <p>
          <strong>Head of Asset Management</strong>
        </p>
        <p>Barrick Gold International</p>
      </div>

      <div className="footer">
        Your investment is protected, transparent, and backed by physical gold
        reserves in Uganda.
      </div>
    </div>
<div className="footer" style={{ textAlign: 'center', marginTop: '20px' }}>
  <p>
    Your investment is protected, transparent, and backed by physical gold
    reserves in Uganda.
  </p>
 
</div>
<div className="footer" style={{ textAlign: 'center', marginTop: '20px' }}>
<button
    onClick={() => window.print()}
    style={{
      marginTop: '10px',
      padding: '10px 20px',
      fontSize: '16px',
      cursor: 'pointer',
      backgroundColor: '#d4af37',
      border: 'none',
      color: '#000',
      borderRadius: '5px',
    }}
  >

    🖨️ Print Certificate
  </button>
</div>

 
</>
 

  );
};

export default DigitalGoldCertificate;
