import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { Dashboard, DashboardPage } from "../../utils/Constant";
import { Btn, H2, H6, Image, LI, P, UL } from "../../AbstractElements";
import { useSweetAlert } from '../../Context/SweetAlertContext'
import Breadcrumbs from "../../CommonElements/Breadcrumbs/Breadcrumbs";
import { useNavigate, Link } from 'react-router-dom';
//import Incomes from "./Incomes/Incomes";
import Wallet from "./Wallet/Wallet";
import ProfileGreet from "./ProfileGreet/ProfileGreet";
import AccountOverview from "./AccountOverview/AccountOverview";
import Token from "./Token/Token";
import TotalInvestment from "./TotalInvestment/TotalInvestment";
import Investing from "./Investing/Investing";
import AllIncome from "./AllIncome/AllIncome"
// importing Dashboard Chart Data

// import MonthlyOverview from "./MonthlyOverview/MonthlyOverview";
import TaskSummary from "./TaskSummary/TaskSummary";
import TotalVisit from "./TotalVisit/TotalVisit";
import Notifications from "./Notifications/Notifications";
import CoursesHighlighted from "./CoursesHighlighted/CoursesHighlighted";
import DownloadApp from "./DownloadApp/DownloadApp";
import BusinessOverview from "./BusinessOverview/BusinessOverview";
import { useDashboardService } from '../../Service/Dashboard/DashboardService';
import { useCommonService } from '../../Service/CommonService/Commonservice';
import { objectEntriesToArray } from '../../../src/utils/helper/opreaton'
import { decryptData } from "../../utils/helper/Crypto";
import { dynamicImage } from "../../Service";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import DashboardSkeleton from '../Skeleton/DashboardSkeleton';

import FireworkCanvas from '../firework/FireworkCanvas';
import DailyBotTrading from './DailyBotTrading/DailyBotTrading';
import ThirdPartyCard from './Other_Party_Compotent/ThirdPartyCard';
import Other_Wallet from './OtherWallet/Other_Wallet';
import { FaRupeeSign } from "react-icons/fa";


const ContainerDashboard = () => {
  const { fetchDashboardData, loading } = useDashboardService();
  const { ApiCalling, } = useCommonService()
  const [profileName, setprofileName] = useState<any>({});
  const [modalOpen, setModalOpen] = useState(false); // Modal is initially closed
  const [showModal, setShowModal] = useState(false); // To control rendering of the modal
  const [nextModalOpen, setnextModalOpen] = useState(false);
  const [showNextModal, setShowNextModal] = useState(false); // To control rendering of the modal
  const [fxstModal, setfxstModal] = useState(false);
  const [allData, setallData] = useState<any>([])
  const [actOverview, setactOverview] = useState<any>([]);
  const [tokenData, settokenData] = useState<any>([]);
  const [allIncomes, setallIncomes] = useState<any>([]);
  const [myWallets, setmyWallets] = useState<any>([]);
  const [LegBOverview, setLegBOverview] = useState<any>()
  const [busniessoverView, setBusniessoverView] = useState<any>([])
  const [totalInvestment, setTotalInvestment] = useState<any>([])
  const [downloadappData, setdownloadappData] = useState<any>([])
  const [latestAnnouncement, setlatestAnnouncement] = useState<any>([])
  const [TeamData, setTeamData] = useState<any>([]);
  const [popImageURL, setpopImageURL] = useState<any>('')
  const [TotalEarning, setTotalEarning] = useState<any>([])
  const [LastLogin, setLastLogin] = useState<string>('')
  const [couponCode, setcouponCode] = useState<string>('')
  const [CoponCount, setCoponCount] = useState<any>(null)
  const [isCouponApplicable, setisCouponApplicable] = useState<string>('')
  const [airdropBalance, setAirdropBalance] = useState<string>('')
  const [giftWallet, setGiftWallet] = useState<string>('')
  const [bonanzaBalance, setBonanzaBalance] = useState<string>('')
  const { showAlert } = useSweetAlert()
  const navigate = useNavigate()

  const closeModal = () => {
    document.body.style.paddingRight = '';
    setModalOpen(false);
    // setnextModalOpen(true);
    // setShowNextModal(true)
  };

  // handling Next Modal
  const closeNextModal = () => {
    document.body.style.paddingRight = '';
    setnextModalOpen(false);
    setfxstModal(true);
  };
  const closeFXSTModal = () => {
    document.body.style.paddingRight = '';
    setfxstModal(false);
  };
  // Fetching dashboard Data 
  const fetchData = async () => {
    try {
      const data = await fetchDashboardData({ "MemberId": decryptData(localStorage.getItem("clientId") as string), "UserToken": decryptData(localStorage.getItem("userToken") as string), "CookieId": "", "ActionMode": "DashboardLoadCounts" });
      // console.log(data);
      if (data[0]?.StatusCode === "0") {
        showAlert('Your login is expired, Please relogin')
        localStorage.clear()
        navigate(`${process.env.PUBLIC_URL}/login`);
      }
      setallData(data)
      setprofileName({ memberName: data[0]?.SName, Rank: data[0]?.MyRank })
      setcouponCode(data[0]?.CouponCode);
      setCoponCount(data[0]?.CouponCount);
      setAirdropBalance(data[0]?.AirdropWallet);
      setGiftWallet(data[0]?.GiftWallet);
      setBonanzaBalance(data[0]?.BonanzaWallet);
      setisCouponApplicable(data[0]?.IsApplicableForCoupon);
      setactOverview(objectEntriesToArray({
        'Activation': data[0]?.ActivationDate == "" ? "--" : data[0]?.ActivationDate,
        "Registration": data[0]?.RegistrationDate,
        "Status": data[0]?.BotStatus
      }))
      setmyWallets(objectEntriesToArray({
        "My Wallet": `₹${data[0]?.CommissionBalance}`,
        "Deposit Wallet": `₹${data[0]?.ProductWallet}`
      }))

      // settokenData([
      //   data[0]?.DailyTradingProfit, `$${data[0]?.TotalEarned}`
      // ]
      // )
      settokenData(['₹'+data[0]?.FXSTToken, `₹${data[0]?.TotalEarned}`])

      setTotalEarning([data[0]?.DailyTradingProfit, `$${0}`])
      setallIncomes(objectEntriesToArray({
        "Direct Income": `₹${data[0]?.SponsorIncome}`,
        "Roi Income": `₹${data[0]?.DailyProfitIncome}`,
        "Affiliate Income": `₹${data[0]?.ProfitSharingIncome}`,
        "Promotion Club Income":`₹${data[0]?.PromotionClubIncome}`,
        "Royalty Income": `₹${data[0]?.RoyalityLog}`,
        
      }))
      setBusniessoverView(objectEntriesToArray({
        // 'Total Business': data[0]?.TotalZoneBusines,
        // 'Today Business': '$' + data[0]?.TodayBusiness
        "Level 4": data[0]?.Level4BV,
        "Level 5": data[0]?.Level5BV,
      }))
      setLegBOverview(objectEntriesToArray({
        "Level 1": data[0]?.Level1BV,
        "Level 2": data[0]?.Level2BV,
        "Level 3": data[0]?.Level3BV,
        
      }))

      setTotalInvestment(objectEntriesToArray({
        "Total": data[0]?.TotalInvestment,
        "Monthly": data[0]?.MonthlyInvestment,
        "Daily": data[0]?.DailyInvestment,
      }))

      setdownloadappData(data[0]?.BotRoyality !== "NA" ? JSON.parse(data[0]?.BotRoyality) : '')


      setLastLogin(data[0]?.LastLoginDate)


      const taskSummaryLeftData = [
        {
          icon: "Pie",
          color: "primary",
          title: "Total",
          count: data[0]?.MyTeamCount,
        },
        {
          icon: "Category",
          color: "secondary",
          title: "InDirect",
          count: data[0]?.InDirectTeamCount,
        },
        {
          icon: "Document",
          color: "tertiary",
          title: "Direct",
          count: data[0]?.SponsorCount,
        },
      ];
      setTeamData(taskSummaryLeftData)
      setlatestAnnouncement(JSON.parse(data[0]?.Announcements))

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const FetchModal = async () => {
    try {
      const data = await ApiCalling({ procName: 'MemberPopupImage', Para: JSON.stringify({ ActionMode: "ImgForMemberPanel" }) });
      // console.log(data);
      setpopImageURL(data[0]?.ImagePath)
    } catch (error) {

    }
  }

  useEffect(() => {
    fetchData();
   // setnextModalOpen(true);
  }, []);

  // useEffect(() => {
  //   FetchModal()
  //   const timer = setTimeout(() => {
  //     document.body.style.paddingRight = '';
  //     setShowModal(true);  // Modal content is ready to be shown[ Uncomment when QR is ready]
  //     setModalOpen(true);  // Modal is visible [ Uncomment when QR is ready]
  //     //setnextModalOpen(true); //[ Comment when QR is ready]
  //   }, 2000); // Delay of 2000ms (2 seconds)

  //   // Cleanup timer when the component unmounts
  //   return () => clearTimeout(timer);
  // }, [])

  const Go_docverfication = ()=>{
    closeNextModal()
  //  setTimeout(()=>{
    navigate(`${process.env.PUBLIC_URL}/docverification`)
  //  }, 2000)
  }

  return (
    <>
      <Breadcrumbs mainTitle={Dashboard} parent={DashboardPage} />
      {!loading ? <Container fluid className="default-dashboard">
        {/* <FireworkCanvas style={{ width: '100%', height: '100%' }}/>  */}
        <Row>
          <ProfileGreet profileName={profileName} loadingStatus={loading} />
          <AccountOverview actOverviewData={actOverview} LastLogin={LastLogin} />

          <Token tokenData={tokenData} />
          {/* <Investing couponCode={couponCode} isApplicable={isCouponApplicable} coponcout={CoponCount} /> */}

          <AllIncome incomeData={allIncomes} />
          <TotalInvestment TotalinvestmentData={totalInvestment} />
          <Wallet walletdata={myWallets} />
          <TaskSummary TeamData={TeamData} />
          <BusinessOverview LegBViewdata={LegBOverview} BOverviewData={busniessoverView} />
          {/* <DownloadApp downloadappData={downloadappData} /> */}
          {/* <MonthlyOverview/> */}
          {/* <DailyBotTrading DailyBotData={TotalEarning} /> */}
          {/* <TotalVisit TotalEarned={TotalEarning} /> */}
          <CoursesHighlighted LatestAnnouncement={latestAnnouncement} />
          <Notifications />
          {/* <Other_Wallet airdrop={airdropBalance} gitwallet={giftWallet} bonanza={bonanzaBalance} /> */}
          {/* <ThirdPartyCard /> */}
        </Row>
        {/* <div style={{ position:'absolute', top:'0', width: '98%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
         <FireworkCanvas style={{ width: '100%', height: '100%', }} soundSrc={dynamicImage("crackers-sound.mp3")} /> 
         </div> */}
        {/* <Modal isOpen={modalOpen} toggle={closeModal} centered>
          <ModalHeader toggle={closeModal} className="mymodal-header px-4">
            Scan the QR code below to complete your payment quickly and securely!
          </ModalHeader>
          <ModalBody className="mymodal-body text-center" >
            <div style={{ height: 'auto', width: '100%' }}>
              <Image className="img-fluid" alt='popimage' src={`${process.env.REACT_APP_POPUP_URL}/${popImageURL}`} />
            </div>
          </ModalBody>
        </Modal> */}
        <Modal isOpen={nextModalOpen} toggle={closeNextModal} centered>
          <ModalHeader toggle={closeNextModal} className="mymodal-header px-4">
            IMPORTANT NOTICE( KYC Verification)
          </ModalHeader>
          <ModalBody className="mymodal-body text-center" >
            <div style={{ height: 'auto', width: '100%' }}>

              <div className='text-start popup'>
                <p className='paratext'>We are delighted to announce an amazing opportunity for our members to participate in the U.S. Government Lottery Scheme starting this New Year!</p>
                <p className='paratext'>Purchase lottery tickets via USDT starting 1st January, with future support for FXST tokens; KYC is mandatory!</p>
                <h3>KYC Process and Requirements</h3>
                <UL>
                  <LI><span>1.</span> Identity Verification: An <b style={{color:'#E6B855'}}>Aadhaar card</b> is required to complete the KYC</LI>
                  <LI><span>2.</span> Fee: A nominal fee of <b style={{color:'#E6B855'}}>$100 (~₹8,500)</b> will be charged for the KYC process.</LI>
                  <LI><span style={{color:'red'}}><span>3. </span>Deadline: KYC must be completed between 1st and 3rd January.</span></LI>
                </UL>
                <p className='note' style={{color:'#E6B855',fontSize:14}}>Important: If KYC is not completed by 3rd January, your account will be temporarily blocked, and you will not be able to participate in the lottery or withdraw profits.</p>
                <h3>Key Dates</h3>

                <UL><LI><span>1.</span> 1st to 3rd January: Complete your KYC process</LI>
                <LI><span>2.</span> 4th January: Profit withdrawals begin!</LI>
                <LI><span style={{color:'green',fontSize:15}}><span>3.</span> 4th January: $100 will be credited to your KingzMaker Wallet as Bonus!</span></LI>
                
                </UL>
                <p className='paratext'>"Join the U.S. Government Lottery Scheme—complete your KYC now and start 2025 with exciting rewards! 🎉"</p>
                <center><Btn color='primary' onClick={ Go_docverfication}>
                  Click to Complete KYC <svg className="feather" style={{color:'#000'}}><use href="/fxstpanel/assets/svg/feather-icons/dist/feather-sprite.svg#chevron-right"></use></svg>
                </Btn></center>
              </div>
              <div className='text-end' style={{marginTop:10}}>
                <Btn color='primary' onClick={closeNextModal}>
                  Close
                </Btn>
              </div>
            </div>
          </ModalBody>
        </Modal>
        {/* <Modal isOpen={fxstModal} toggle={closeFXSTModal} centered>
          <ModalHeader toggle={closeFXSTModal} className="mymodal-header px-4">
            IMPORTANT NOTICE
          </ModalHeader>
          <ModalBody className="mymodal-body text-center" >
            <div style={{ height: 'auto', width: '100%' }}>
              <Image className="w-50" alt='popimage' title='popImage' src={dynamicImage("logo2.png")} />

              <div className='text-start'>
                <P className='py-4 text-success p-4'>
                  "Dear Fxstock Family Members,<br />
                  "Mark your calendars! 💥 From November 1st, withdraw your earnings in FXST Tokens and experience seamless, secure transactions. The future of finance is here!"💥
                </P>
              </div>
              <div className='text-end'>
                <Btn color='primary' onClick={closeFXSTModal}>
                  Close
                </Btn>
              </div>
            </div>
          </ModalBody>
        </Modal>  */}
        <Modal isOpen={fxstModal} toggle={closeFXSTModal} centered>
          <ModalHeader toggle={closeFXSTModal} className="bg-dark px-4 d-flex">
          <div>  🎉✨💥 Happy New Year 💥✨🎉</div>
          </ModalHeader>
          <ModalBody className="mymodal-body text-center newYear_Modal " >
            <div style={{ height: 'auto', width: '100%' }}>
              {/* <Image className="w-50" alt='popimage' title='popImage' src={dynamicImage("logo2.png")} /> */}

              <div className='text-start' style={{height:'60vh'}}>
                {/* <P className='py-4 text-success p-4'>
                  "Dear Fxstock Family Members,<br />
                  💥 "Congratulations and best wishes for a fantastic 2025, Surendra! May this year bring you success and happiness, from all of us at FXStock Corporation. Happy New Year!" 🎉✨💥
                </P> */}
              </div>
              <div className='text-end'>
                <Btn color='primary' onClick={closeFXSTModal}>
                  Close
                </Btn>
              </div>
            </div>
          </ModalBody>
        </Modal> 
      </Container>
        :
        <Container fluid className="default-dashboard">
          <DashboardSkeleton />
        </Container>
      }
    </>
  );
};

export default ContainerDashboard;
