

const DigitalGoldCertificate = ({
  fullName = "[Purchaser’s Full Name]",
  contactInfo = "[Optional Contact Info]",
  quantity = "10 grams",
  purity = "99.99% Pure Gold (24K)",
  value = "₹ [Amount]",
  purchaseMode = "Online/Direct Purchase/Wallet Transfer",
  certificateId = "BG-2025-0001",
  issueDate = "21st May 2025",
}) => {
  return (
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
  );
};

export default DigitalGoldCertificate;
