import { Link } from "react-router-dom";
import { H5, LI, SVG, UL } from "../../../../AbstractElements";
import { Cart, Checkout, Href, Total } from "../../../../utils/Constant";
import { useState } from "react";
import CartBox from "./CartBox";

const CartHeader = () => {
  const [show, setShow] = useState(false)
  return (
    <LI className="custom-dropdown">
      <Link to={Href} onClick={()=>setShow(!show)}>
        <SVG className="svg-color" iconId="Bag" />
      </Link>
      <div className={`custom-menu cart-dropdown py-0 overflow-hidden ${show ? "show" : ""}`}>
        <H5 className="title bg-primary-light">{Cart}
          <span>
            {Total} : <span className="font-primary">4350.9</span>
          </span>
        </H5>
        <UL>
          <CartBox />
          <LI className="mt-3 p-0 d-flex justify-content-center">
            <div>
              <Link className="btn btn-secondary" to={`${process.env.PUBLIC_URL}/ecommerce/checkout`}>{Checkout}</Link>
            </div>
          </LI>
        </UL>
      </div>
    </LI>
  );
};

export default CartHeader;
