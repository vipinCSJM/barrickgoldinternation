import React, { useEffect, useState, useRef } from 'react';
import { Col, Container, Row } from "reactstrap";
import { ActivateBot, buygold } from "../../utils/Constant";
import Breadcrumbs from "../../CommonElements/Breadcrumbs/Breadcrumbs";
import ActivateBotForm from "./ActivateBotForm";
import { useBotService } from '../../Service/ActivateBot/ActivateBot'
import { decryptData } from "../../utils/helper/Crypto";
import  "../../buygold.css";
import LivePriceBox from './LivePricerate';
import { Button } from 'react-bootstrap/lib/InputGroup';
import axios from 'axios';
import { useSweetAlert } from '../../Context/SweetAlertContext';

const BuyGoldComponent = () => {
  const { getFXSTWalletBalance, ExecuteProcedure, loading } = useBotService();
  const [walletBalance, setwalletBalance] = useState<number>(0);
  const [ClientID, setClientID] = useState(decryptData(localStorage.getItem("clientId") as string));
  const [botData, setbotData] = useState<any>([]);
  const [activationStatus, setactivationStatus] = useState(false);
      const { showAlert, ShowSuccessAlert, ShowConfirmAlert } = useSweetAlert();
  
  useEffect(() => {
    GetWalletBalance();
  }, [activationStatus]);
  //--------------------------------------------------------------------------------------
const [pricePerGramINR, setPricePerGramINR] = useState<number | null>(null);
const [pricePerOunceINR, setPricePerOunceINR] = useState<number | null>(null);
  const [Newloading, setNewlLoading] = useState(true);

    const [NLoading, setNLoading] = useState(false);

  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes = 300 seconds


  const gramsPerTroyOunce = 31.1035;

    const fetchGoldPrice = async () => {
    try {
      setNewlLoading(true);
      const goldRes = await axios.get('https://api.gold-api.com/price/XAU');
      const goldPriceUSD = goldRes.data.price;

      const res = await axios.get('https://api.frankfurter.app/latest?from=USD&to=INR');
      const usdToInr = res.data.rates.INR;

      const goldPriceINR = goldPriceUSD * usdToInr;
      const pricePerGram = goldPriceINR / gramsPerTroyOunce;

      setPricePerOunceINR(parseFloat(goldPriceINR.toFixed(2)));
      setPricePerGramINR(parseFloat(pricePerGram.toFixed(2)));
       setNewlLoading(false);

    } catch (error) {
         setNewlLoading(false);
      console.error("Error fetching gold price:", error);
    }
  };

  useEffect(() => {
    fetchGoldPrice(); // fetch once on mount

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          fetchGoldPrice(); // fetch every 5 minutes
          return 300; // reset to 5 minutes
        }
        return prev - 1;
      });
    }, 1000); // every second

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  // Format timer like "2:57"
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(1, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };
  //--------------------------------------------------------------------------------------

const GOLD_PRICE_PER_GRAM = pricePerGramINR; // ₹ per gram

  const GetWalletBalance = async () => {
    const param = {
      ClientId: ClientID,
      ActionMode: "GetWalletBalance"
    }
    const obj = {
      procName: 'PurchaseToken',
      Para: JSON.stringify(param),
    };
    const res = await getFXSTWalletBalance(obj);
    setwalletBalance(res[0].WalletBalance);
  
  }
   const [buyIn, setBuyIn] = useState<'rupee' | 'grams'>('rupee');
  const [amount, setAmount] = useState('');
  const [convertedGrams, setConvertedGrams] = useState<number | null>(null);
    const [convertedPrice, setconvertedPrice] = useState<number | null>(null);

    const [WalletType, setWalletType] = useState('ProductWallet')
  

  const handleInputChange = (value: string) => {
    setAmount(value);
    debugger
      setconvertedPrice(0);
      setConvertedGrams(0);
      

    const numericValue = parseFloat(value);

   if (!isNaN(numericValue) && GOLD_PRICE_PER_GRAM !== null) {

  if (buyIn === 'rupee') {
    setConvertedGrams(numericValue / GOLD_PRICE_PER_GRAM);
    setconvertedPrice(numericValue);

  } 
  // else {
  //   setConvertedGrams(0.00);
  // }

  if (buyIn === 'grams') {
    setconvertedPrice(numericValue * GOLD_PRICE_PER_GRAM);
    setConvertedGrams(numericValue);
  } 
  // else {
  //    setconvertedPrice(0.00); // If needed
  // }
}
  else {
      setConvertedGrams(0);
       setconvertedPrice(0);
    }
   
  };

  
  const handleBuyClick = async () => {
    if(convertedPrice ===0){
      showAlert("Enter buy amount or weight");
      return
    }
    if(!ClientID){
      showAlert("Something went wrong!");
      return
    }
        const confirmed = await ShowConfirmAlert("Buy Gold", "Are you sure want to buy");
          if (confirmed) {

             setNLoading(true)

            const param = {
                ClientId: ClientID,
                buyIn:buyIn,
                pricePerGramINR:pricePerGramINR,
                convertedGrams:convertedGrams,
                convertedPrice:convertedPrice,
                TokenQty:convertedPrice,
                ActionMode:"PurchaseToken"
            }

            const obj = {
            procName: 'PurchaseToken',
            Para: JSON.stringify(param),
            };

          const res = await ExecuteProcedure(obj);
             setNLoading(false)

            if (res[0].StatusCode == "1") {
               GetWalletBalance();
                ShowSuccessAlert(res[0].Msg); 
                setConvertedGrams(0);
                setconvertedPrice(0);
                setAmount('');
            } else {
                showAlert(res[0].Msg);
            }
        } else {
            // console.log('do nothing.');
        }
    }

  return (
    <>
      <Breadcrumbs mainTitle={buygold} parent={buygold} />
      <Container fluid>
        <Row>
          <Col xl="12">
          <div className="cardbuy">
<button className="btn-info py-2 pe-2 gold-calculator livePrice_box" color="info" style={{ fontSize: '18px', textAlign: 'justify', width: '400px',marginBottom:'10px' }} type="button">
                Wallet Balance :<span> &nbsp;₹ {walletBalance}</span>
            </button>
          
{/* {pricePerGramINR !== null && (
  <LivePriceBox pricePerGram={pricePerGramINR} purity="24K 99.99%" />
)}     */}
 {Newloading ? <div className="spinner-border text-light text-center" style={{ width: '1rem', height: '1rem' }} role="status">
                </div> : pricePerGramINR !== null && (
  <LivePriceBox pricePerGram={pricePerGramINR} purity="24K 99.99%" />
)} 

      
      <div className="gold-calculator">
      <div className="form-group timer-div">
        <span className="time" id="Timer">{formatTime(timeLeft)}</span>
      </div>
      <div className="form-group gold-radio-container">
        <label className="form-check-inline gold-radio">
          <input
            type="radio"
            name="goldRadio"
            value="rupee"
            checked={buyIn === 'rupee'}
            onChange={() => {
              setBuyIn('rupee');
              setAmount('');
setconvertedPrice(0);  
  setConvertedGrams(null); 
         }}
          />
          <span></span>Buy in rupees
        </label>
        <label className="form-check-inline gold-radio">
          <input
            type="radio"
            name="goldRadio"
            value="grams"
            checked={buyIn === 'grams'}
            onChange={() => {
              setBuyIn('grams');
              setAmount('');
              setConvertedGrams(null);
              setconvertedPrice(0)
            }}
          />
          <span></span>Buy in grams
        </label>
      </div>

      <div className="measurement-input">
        <div className="input-group">
         {buyIn === 'rupee' ? '₹':'' }
          <input
  type="number"
  className="form-control input-lg"
  placeholder={buyIn === 'rupee' ? 'Enter amount in ₹' : 'Enter grams'}
  value={amount}
  onChange={(e) => {
    const value = e.target.value;
    if (value === '' || (/^\d*\.?\d*$/.test(value) && Number(value) >= 0)) {
      handleInputChange(value);
    }
  }}
  onKeyDown={(e) => {
    // Block minus and 'e' (for scientific notation)
    if (['-', 'e', 'E'].includes(e.key)) {
      e.preventDefault();
    }
  }}
  maxLength={9}
/>
          {buyIn === 'grams' ? 'g':'' }
          {convertedGrams !== null && buyIn === 'rupee' && (
            <span className="input-group-text">= {convertedGrams.toFixed(4)} g</span>
          )}
            {convertedPrice !== null && buyIn === 'grams' && (
            <span className="input-group-text">= ₹ {convertedPrice.toFixed(4)} </span>
          )}
        </div>
      </div>
{NLoading ? <div className="spinner-border text-light text-center" style={{ width: '1rem', height: '1rem' }} role="status">
                </div> : 
      <button className="buy-button" onClick={handleBuyClick}>
        Buy Gold →
      </button>}
    </div>
    
          </div>
          
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default BuyGoldComponent;
