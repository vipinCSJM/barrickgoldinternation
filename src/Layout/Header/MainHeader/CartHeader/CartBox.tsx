import { Btn, H5, Image, LI, SVG } from "../../../../AbstractElements";
import { dynamicImage } from "../../../../Service";
import { Link } from "react-router-dom";
import { Input } from "reactstrap";
import { cartHeaderData } from "../../../../Data/Layout/HeaderData";
import { useState } from "react";
import { CartHeaderDataType } from "../../../../Type/Layout/Header";

const CartBox = () => {
  const [defaultData,setDefaultData] = useState(cartHeaderData)
  const handleCart = (data:CartHeaderDataType) => {
    setDefaultData(defaultData.map((item)=>(item.title === data.title ? { ...item, show: true }  : item)))
  }
  const decrementQty = (item:any) => {
    setDefaultData(defaultData.map((data)=> (data.title === item.title ? data.value > 0 ? {...data , value : data.value - 1} : data : data)))
  }
  const incrementQty = (item:any) => {
    setDefaultData(defaultData.map((data)=> (data.title === item.title ? {...data , value : data.value + 1} : data)))
  }
  const handleValue = (data:any,e:any) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, ""); 
    setDefaultData(defaultData.map((item)=>(item.title === data.title ? {...data , value : Number(numericValue)}  : item)))
  }
  return (
    <>
      {defaultData.map((item, i) => (
        <LI className={`cartbox d-${item.show ? "none" : "flex"} bg-light-${item.color}`} key={i}>
          <div className={`flex-shrink-0 border-${item.color}`}>
            <Image src={dynamicImage(`dashboard2/product/${item.image}`)} alt="avatar"/>
          </div>
          <div className="touchpin-details">
            <Link to={`${process.env.PUBLIC_URL}/ecommerce/cart`}>
              <H5>{item.title}</H5>
            </Link>
            <span>{item.price}</span>
            <div className="touchspin-wrapper">
              <button className="decrement-touchspin btn-touchspin" onClick={()=>decrementQty(item)}>
                <SVG className="svg-color" iconId="minus" />
              </button>
              <Input className={`bg-light-${item.color}`} type="text" onChange={(e)=>handleValue(item,e)} value={item.value} />
              <button className="increment-touchspin btn-touchspin" onClick={()=>incrementQty(item)}>
                <SVG className="svg-color" iconId="plus" />
              </button>
            </div>
            <Btn className="btn-close" onClick={()=>handleCart(item)}/>
          </div>
        </LI>
      ))}
    </>
  );
};

export default CartBox;
