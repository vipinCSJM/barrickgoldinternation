import { MenuItem } from "../../Type/Layout/Sidebar";

export const MenuList: MenuItem[] = [
  {
    title: "",
    Items: [
     
      {
        icon: "Home",
        id: 1,
        active: false,
        title: "Dashboard",
        path: `${process.env.PUBLIC_URL}/dashboard`,
        type: "link",
        
      },
      {
        icon: "Profile",
        id: 1,
        active: false,
        title: "Profile",
        children: [
          { path: `${process.env.PUBLIC_URL}/myprofile`, title: "My Profile", type: "link" },
          { path: `${process.env.PUBLIC_URL}/docverification`, title: "Profile KYC", type: "link" },
          // { path: `${process.env.PUBLIC_URL}/Welcomeletter`, title: "Welcome Letter", type: "link" },
          { path: `${process.env.PUBLIC_URL}/myidcard`, title: "My ID-Card", type: "link" },
        ],
        
      },
      {
        icon: "Setting",
        id: 1,
        title: "Account Settings",
        path: `${process.env.PUBLIC_URL}/accountsettings`,
        type: "link",
      },
      // {
      //   icon: "Shield",
      //   id: 1,
      //   title: "Buy Gold",
      //   path: `${process.env.PUBLIC_URL}/BuyGold`,
      //   type: "link",
      // },
       {
        icon: "Paper",
        id: 1,
        active: false,
        title: "Gold Section",
        children: [
            { path: `${process.env.PUBLIC_URL}/BuyGold`, title: "Buy Gold", type: "link" },
            { path: `${process.env.PUBLIC_URL}/BuyGoldReport`, title: "Buy Gold Report", type: "link" },
              { path: `${process.env.PUBLIC_URL}/DigitalCertificatePage`, title: "Digital Certificate", type: "link" },
        ],
        
      },
      // {
      //   icon: "Shield",
      //   id: 1,
      //   title: "Activate Bot",
      //   path: `${process.env.PUBLIC_URL}/activatebot`,
      //   type: "link",
      // },
      // {
      //   icon: "Star",
      //   id: 1,
      //   active: false,
      //   title: "Reward",
      //   children: [
      //     { path: `${process.env.PUBLIC_URL}/bonanza`, title: "Bonanza", type: "link" },
      //     { path: `${process.env.PUBLIC_URL}/LifeTimeReward`, title: "Lifetime Reward", type: "link" },
         
      //   ],
        
      // },
      {
        icon: "Paper",
        id: 1,
        active: false,
        title: "Deposit Fund",
        children: [
          // { path: `${process.env.PUBLIC_URL}/fxstdeposit`, title: "FXST Deposit", type: "link" },
          // { path: `${process.env.PUBLIC_URL}/kycwallet`, title: "KYC Deposit", type: "link" },       
          // { path: `${process.env.PUBLIC_URL}/FxstTokenHistory`, title: "Token History", type: "link" },
          // { path: `${process.env.PUBLIC_URL}/trc20`, title: "USDT(TRC20)", type: "link" },
          // { path: `${process.env.PUBLIC_URL}/bep20`, title: "USDT(BEP20)", type: "link" },
          // { path: `${process.env.PUBLIC_URL}/DepositHistory`, title: "Deposit History", type: "link" },
          { path: `${process.env.PUBLIC_URL}/requestfund?currency=INR`, title: "Request Fund INR", type: "link" },
          // { path: `${process.env.PUBLIC_URL}/requestfund?currency=AED`, title: "Request Fund AED", type: "link" },  
          { path: `${process.env.PUBLIC_URL}/inrfundreport`, title: "Fund Report", type: "link" },    
          
        ],
        
      },
      {
        icon: "Wallet",
        id: 1,
        active: false,
        title: "Wallet Transfer",
        children: [
        
          // { path: `${process.env.PUBLIC_URL}/FxstockWallet`, title: "Fxstock Wallet", type: "link" },
          // { path: `${process.env.PUBLIC_URL}/fxstpaytocommission`, title: "FXST Pay Transfer", type: "link" },
          // { path: `${process.env.PUBLIC_URL}/FxstPayWallet`, title: "FXST Pay Wallet", type: "link" },
          // { path: `${process.env.PUBLIC_URL}/fxstockwalletreport`, title: "Wallet Report", type: "link" },
          { path: `${process.env.PUBLIC_URL}/p2ptransfer`, title: "P2P Transfer", type: "link" },
          { path: `${process.env.PUBLIC_URL}/p2pwalletreport`, title: "P2P Report", type: "link" },
        ],
      },
      // {
      //   icon: "Ticket",
      //   id: 1,
      //   active: false,
      //   title: "Lottery",
      //   children: [
      //     { path: `${process.env.PUBLIC_URL}/transfer`, title: "Wallet Transfer", type: "link" },
      //     { path: `${process.env.PUBLIC_URL}/transferlog`, title: "Transfer Report", type: "link" },
      //   ],
      // },
      // {
      //   icon: "Paper",
      //   id: 1,
      //   active: false,
      //   title: "Account Statement",
      //   path:`${process.env.PUBLIC_URL}/accountstatement`,
      // },


      {
        icon: "Filter",
        id: 1,
        active: false,
        title: "Withdraw",
        children: [
          { path: `${process.env.PUBLIC_URL}/RequestWithdraw`, title: "Request Withdraw", type: "link" },
          { path: `${process.env.PUBLIC_URL}/WithdrawHistory`, title: "Withdraw Report", type: "link" },
         
         
        ],
      },
      {
        icon: "Activity",
        id: 1,
        active: false,
        title: "Payout Income",
        children: [
           { path: `${process.env.PUBLIC_URL}/botlevelincome`, title: "Sponsor Income", type: "link" },
          { path: `${process.env.PUBLIC_URL}/monthlyprofitincome`, title: "Monthly Roi Income", type: "link" },
          { path: `${process.env.PUBLIC_URL}/profitsharing`, title: "Affiliate Income", type: "link" },
           //{ path: `${process.env.PUBLIC_URL}/profitsharing`, title: "Affiliate Income", type: "link" },
          // { path: `${process.env.PUBLIC_URL}/chashbacklevel`, title: "Cashback Level", type: "link" },
          // { path: `${process.env.PUBLIC_URL}/royaltylog`, title: "Royalty Log", type: "link" },
         
        ],
      },
      
      {
        icon: "Profile",
        id: 1,
        active: false,
        title: "Team Overview",
        children: [
          { path: `${process.env.PUBLIC_URL}/myteambusiness`, title: "Team Business", type: "link" },
          { path: `${process.env.PUBLIC_URL}/teamdownline`, title: "Team Downline", type: "link" },
          { path: `${process.env.PUBLIC_URL}/tree`, title: "Generation tree", type: "link" },
          { path: `${process.env.PUBLIC_URL}/sponsorlist`, title: "My Direct", type: "link" },
          { path: `${process.env.PUBLIC_URL}/levelwiseteamlist`, title: "Levelwise Report", type: "link" },
          // { path: `${process.env.PUBLIC_URL}/businessreport`, title: "Business Report", type: "link" },         
        ],
      },
      // {
      //   icon: "Work",
      //   id: 1,
      //   title: "Business Plan",
      //   path: `https://fxstockcorp.com/MemberPanel/BPlan.pdf`,
      //   type: "link",
      //   rel:"noopener noreferrer"
      // },
      {
        icon: "Ticket",
        id: 1,
        title: "Support Ticket",
        path: `${process.env.PUBLIC_URL}/supportticket`,
        type: "link",
      },
      {
        icon: "Logout",
        id: 1,
        title: "Logout",
        path: `#`,
        type: "link",
      },
    ],
  },
];
