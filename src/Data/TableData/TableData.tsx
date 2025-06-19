import Swal from 'sweetalert2';
import { TableColumn, TableRow } from "react-data-table-component";
import {useDispatch} from 'react-redux'
import axios from 'axios'
import { decryptData} from "../../utils/helper/Crypto";
import { refreshDataTable } from "../../ReduxToolkit/Reducers/BookmarkHeaderSlice";
import { useNavigate } from 'react-router-dom';
import CancelTransactionReq from '../../Component/CancelTransactionreq/CancelTransactionReq'
import {  
    ServerSideProcessingColumnsInterface,
    MonthlyProfitIncomeInterface, 
    ProfitSharingInterface,
    RoyalityLogInterface,
    CashbackLevelInterface,
    BonanzaReportInterface, 
    LifeTimeRewardInterface,
    LevelWiseTeamListInterface,
    BusinessListInterface,
    DepositHistoryInterface,
    FXSTTokenHistoryInterface,
    SponsorListInterface,
    WithDrawReportInterface,
    DownlineReportInterface,
    INRFundReportInterface,
    SupportTicketInterface,
    FXStockWalletInterface,
    FXDepositWalletInterface,
    FXstPayWalletInterface,
    P2PWalletReportInterface,
    FXstPayToCommissionWalletInterface,
    KingMakerzWalletReportInterface
   } from "../../Type/TableData/TableData";
import { useState } from 'react';

export const serverColumn: TableColumn<ServerSideProcessingColumnsInterface>[] =
  [
    
    {
      name: "S.No.",
      selector: (row:any) => row['S.No.'],
      sortable: true,
      center: false,
      width:'100px'
    },
    {
      name: "FromMember",
      selector: (row:any) => row.FromMember,
      sortable: true,
      center: false,
      cell: row => (
        <div
          dangerouslySetInnerHTML={{ __html: row.FromMember }}
        />
      )
    },
    {
      name: "InvestmentAmount",
      selector: (row:any) => row.InvestmentAmount,
      sortable: true,
      center: false,
    },
    {
      name: "Percentage",
      selector: (row:any) => row.Percentage,
      sortable: true,
      center: false,
    },
    {
      name: "Income",
      selector: (row:any) => row.Income,
      sortable: true,
      center: false,
    },
    {
      name: "IncomeDate",
      selector: (row:any) => row.IncomeDate,
      sortable: true,
      center: false,
    },
  ];

  export const monthly_ProfitIncome:TableColumn<MonthlyProfitIncomeInterface>[] = [
    {
      name: "SrNo",
      selector: (row:any) => row['SrNo'],
      sortable: true,
      center: false,
      width:'100px'
    },
    {
      name: "InvestmentAmount",
      selector: (row:any) => row['InvestmentAmount'],
      sortable: true,
      center: false,
      width:'200px'
    },
    {
      name: "Monthly Roi(%)",
      selector: (row:any) => row['Monthly Roi(%)'],
      sortable: true,
      center: false,
    },
    // {
    //   name: "Daily ROI(%)",
    //   selector: (row:any) => row['Daily ROI(%)'],
    //   sortable: true,
    //   center: false,
    // },
    {
      name: "MonthlyIncome",
      selector: (row:any) => row['MonthlyIncome'],
      sortable: true,
      center: false,
    },
     {
      name: "MonthDays",
      selector: (row:any) => row['MonthDays'],
      sortable: true,
      center: false,
    },
    {
      name: "Income",
      selector: (row:any) => row['Income'],
      sortable: true,
      center: false,
    },
    {
      name: "PaidStatus",
      selector: (row:any) => row['PaidStatus'],
      sortable: true,
      center: false,
    },
    {
      name: "Income Date",
      selector: (row:any) => row['Income Date'],
      sortable: true,
      center: false,
      width:'200px'
    }
  ]

  export const profitSharingReport: TableColumn<ProfitSharingInterface>[]=[
    {
      name: "SrNo",
      selector: (row:any) => row['SrNo'],
      sortable: true,
      center: false,
      width:'100px'
    },
    {
      name: "FromMember",
      selector: (row:any) => row['FromMember'],
      sortable: true,
      center: false,
      cell: row => (
        <div
          dangerouslySetInnerHTML={{ __html: row.FromMember }}
        />
      )
    },
     {
      name: "Level",
      selector: (row:any) => row['Level'],
      sortable: true,
      center: false,
      cell: row => (
        <div
          dangerouslySetInnerHTML={{ __html: row.Level }}
        />
      )
    },
    
    {
      name: "FromInvestment",
      selector: (row:any) => row['FromInvestment'],
      sortable: true,
      center: false,
    },
    {
      name: "IncomePercentage",
      selector: (row:any) => row['IncomePercentage'],
      sortable: true,
      center: false,
       cell: row => (
        <div
          dangerouslySetInnerHTML={{ __html: row.IncomePercentage }}
        />
      )
    },
    {
      name: "Income",
      selector: (row:any) => row['Income'],
      sortable: true,
      center: false,
    },
    {
      name: "Income Date",
      selector: (row:any) => row['Income Date'],
      sortable: true,
      center: false,
      width:'200px'
    }
  ]

  export const royality_logData: TableColumn<RoyalityLogInterface>[]=[
    {
      name: "SNo",
      selector: (row:any) => row['SNo'],
      sortable: true,
      center: false,
      width:'100px'
    },
    {
      name: "TeamBusiness",
      selector: (row:any) => row['TeamBusiness'],
      sortable: true,
      center: false,
      width:'200px'
    },
    {
      name: "RoyalityPer",
      selector: (row:any) => row['RoyalityPer'],
      sortable: true,
      center: false,
    },
    {
      name: "Income",
      selector: (row:any) => row['Income'],
      sortable: true,
      center: false,
    },
    {
      name: "Date",
      selector: (row:any) => row['Date'],
      sortable: true,
      center: false,
    },
    {
      name: "IncomeType",
      selector: (row:any) => row['IncomeType'],
      sortable: true,
      center: false,
    },
  ]

  export const cash_backLevel : TableColumn<CashbackLevelInterface> [] =[
    {
      name: "S.No.",
      selector: (row:any) => row['S.No.'],
      sortable: true,
      center: false,
      width:'100px'
    },
    {
      name: "FromMember",
      selector: (row:any) => row['FromMember'],
      sortable: true,
      center: false,
      cell: row => (
        <div
          dangerouslySetInnerHTML={{ __html: row.FromMember }}
        />
      )
    },
    {
      name: "LevelNo",
      selector: (row:any) => row['LevelNo'],
      sortable: true,
      center: false,
    },
    {
      name: "Amount",
      selector: (row:any) => row['Amount'],
      sortable: true,
      center: false,
    },
    {
      name: "Percentage",
      selector: (row:any) => row['Percentage'],
      sortable: true,
      center: false,
    },
    {
      name: "Income",
      selector: (row:any) => row['Income'],
      sortable: true,
      center: false,
    },
    {
      name: "IncomeDate",
      selector: (row:any) => row['IncomeDate'],
      sortable: true,
      center: false,
      width:'200px'
    },
  ]

  export const Bonanza_Report : TableColumn<BonanzaReportInterface> [] =[
    {
      name: "S.No.",
      selector: (row:any) => row['S.No.'],
      sortable: true,
      center: false,
      width:'100px'
    },
    
    {
      name: "RewardName",
      selector: (row:any) => row['RewardName'],
      sortable: true,
      center: false,
      width:'150px',
      cell: row => (
        <div style={{ 
          whiteSpace: 'normal',
          wordBreak: 'break-word',
          wordWrap: 'break-word',
        }}>
          {row.RewardName}
        </div>
      ),
      
    },
    {
      name: "TeamBusiness",
      selector: (row:any) => row['TeamBusiness'],
      sortable: true,
      center: false,
      width:'200px'
    },
    {
      name: "StrongLegBusiness",
      selector: (row:any) => row['StrongLegBusiness'],
      sortable: true,
      center: false,
       width:'200px'
    },
    {
      name: "WeakLegBusiness",
      selector: (row:any) => row['WeakLegBusiness'],
      sortable: true,
      center: false,
      width:'200px'
    },
    {
      name: "Reward",
      selector: (row:any) => row['Reward'],
      sortable: true,
      center: false,
      width:'200px'
    },
    {
      name: "Status",
      selector: (row:any) => row['Status'],
      sortable: true,
      center: false,
      cell: row => (
        <div
          dangerouslySetInnerHTML={{ __html: row.Status }}
        />
      )
    },
  ]

  export const LifeTimeReward : TableColumn<LifeTimeRewardInterface> [] =[
    {
      name: "RewardNo",
      selector: (row:any) => row['RewardNo'],
      sortable: true,
      center: false,
       width:'150px'
    },
    {
      name: "RewardName",
      selector: (row:any) => row['RewardName'],
      sortable: true,
      center: false,
      width:'200px',
      cell: row => (
        <div style={{ 
          whiteSpace: 'normal',
          wordBreak: 'break-word',
          wordWrap: 'break-word',
        }}>
          {row.RewardName}
        </div>
      ),
    },
    {
      name: "RequiredBot",
      selector: (row:any) => row['RequiredBot'],
      sortable: true,
      center: false,
      width:'200px'
    },
    {
      name: "StrongerLegBot",
      selector: (row:any) => row['StrongerLegBot'],
      sortable: true,
      center: false,
      width:'200px'
    },
    {
      name: "WeakerLegBot",
      selector: (row:any) => row['WeakerLegBot'],
      sortable: true,
      center: false,
      width:'200px'
    },
    {
      name: "Reward",
      selector: (row:any) => row['Reward'],
      sortable: true,
      center: false,
    },
    {
      name: "RewardStatus",
      selector: (row:any) => row['RewardStatus'],
      sortable: true,
      center: false,
      width:'200px',
      cell: row => (
        <div
          dangerouslySetInnerHTML={{ __html: row.RewardStatus }}
        />
      )

    },
    {
      name: "Achievement Date",
      selector: (row:any) => row['Achievement Date'],
      sortable: true,
      center: false,
      width:'200px',
      cell: row => (
        <div
          dangerouslySetInnerHTML={{ __html: row['Achievement Date'] }}
        />
      )
    },
    {
      name: "PaidStatus",
      selector: (row:any) => row['PaidStatus'],
      sortable: true,
      center: false,
      width:'200px',
      cell: row => (
        <div
          dangerouslySetInnerHTML={{ __html: row.PaidStatus }}
        />
      )
    },
    {
      name: "PaidAmount",
      selector: (row:any) => row['PaidAmount'],
      sortable: true,
      center: false,
      width:'200px',
      cell: row => (
        <div
          dangerouslySetInnerHTML={{ __html: row.PaidAmount }}
        />
      )
    },
  ]

 

  export const BusinessReportList : TableColumn<BusinessListInterface> [] =[
    {
      name: "StrongerZoneBusiness",
      selector: (row:any) => row['StrongerZoneBusiness'],
      sortable: true,
      center: false,
    },
    {
      name: "WeakerZoneBusiness",
      selector: (row:any) => row['WeakerZoneBusiness'],
      sortable: true,
      center: false,
    },
    {
      name: "Total",
      selector: (row:any) => row['Total'],
      sortable: true,
      center: false,
    },

  

  ]

  export const DepositHistory : TableColumn<DepositHistoryInterface> [] =[
    {
      name: "SNo",
      selector: (row:any) => row['SNo'],
      sortable: true,
      center: false,
      width:'100px'
    },
    {
      name: "Deposited Date",
      selector: (row:any) => row['Deposited Date'],
      sortable: true,
      center: false,
    },
    {
      name: "Deposited Amount",
      selector: (row:any) => row['Deposited Amount'],
      sortable: true,
      center: false,
      cell: (row:any) => (
        <div
          dangerouslySetInnerHTML={{ __html: row['Deposited Amount'] }}
        />
      )
    },
    {
      name: "Coin",
      selector: (row:any) => row['Coin'],
      sortable: true,
      center: false,
    },
    {
      name: "TransactionNo",
      selector: (row:any) => row['TransactionNo'],
      sortable: true,
      center: false,
      cell: row => (
        <div
          dangerouslySetInnerHTML={{ __html: row.TransactionNo }}
        />
      )
      
    },
    {
      name: "Status",
      selector: (row:any) => row['Status'],
      sortable: true,
      center: false,
      cell: row => (
        <div
          dangerouslySetInnerHTML={{ __html: row.Status }}
        />
      )
    },
   
  ]
  
  export const FXSTTokenHistoryColumn : TableColumn <FXSTTokenHistoryInterface> [] =[
    {
      name: "SNo",
      selector: (row:any) => row['SNo'],
      sortable: true,
      center: false,
      width:'100px'
    },
    {
      name: "Deposited Date",
      selector: (row:any) => row['Deposited Date'],
      sortable: true,
      center: false,
      width:'200px'
    },
    {
      name: "Deposited Token",
      selector: (row:any) => row['Deposited Token'],
      sortable: true,
      center: false,
    },
    {
      name: "CoinRate",
      selector: (row:any) => row['CoinRate'],
      sortable: true,
      center: false,
    },
    {
      name: "CoinUSDValue",
      selector: (row:any) => row['CoinUSDValue'],
      sortable: true,
      center: false,
    },
    {
      name: "Txnhash",
      selector: (row:any) => row['Txnhash'],
      sortable: true,
      center: false,
      cell: row => (
        <div
          dangerouslySetInnerHTML={{ __html: row.Txnhash }}
        />
      )
      
    },
    {
      name: "Status",
      selector: (row:any) => row['Status'],
      sortable: true,
      center: false,
      cell: row => (
        <div
          dangerouslySetInnerHTML={{ __html: row.Status }}
        />
      )
    },
  ]


  // Team OverView

  export const LevelWiseTeamList : TableColumn<LevelWiseTeamListInterface> [] =[
    {
      name: "SNO",
      selector: (row:any) => row['SNO'],
      sortable: true,
      center: false,
    },
    {
      name: "Name",
      selector: (row:any) => row['Name'],
      sortable: true,
      center: false,
      width:'200px',
      cell: row => (
        <div style={{ 
          whiteSpace: 'normal',
          wordBreak: 'break-word',
          wordWrap: 'break-word',
        }}>
          {row.Name}
        </div>
      ),
    },
    {
      name: "Username",
      selector: (row:any) => row['Username'],
      sortable: true,
      center: false,
      width:'200px'
    },
    {
      name: "Level",
      selector: (row:any) => row['Level'],
      sortable: true,
      center: false,
      cell: row => (
        <div
          dangerouslySetInnerHTML={{ __html: row.Level }}
        />
      )
    },
    {
      name: "RoyalityAchiever",
      selector: (row:any) => row['RoyalityAchiever'],
      sortable: true,
      center: false,
      width:'200px',
      cell: row => (
        <div
          dangerouslySetInnerHTML={{ __html: row.RoyalityAchiever }}
        />
      )
    },
    {
      name: "Investment",
      selector: (row:any) => row['Investment'],
      sortable: true,
      center: false,
      width:'200px'

    },
    {
      name: "PaidStatus",
      selector: (row:any) => row['PaidStatus'],
      sortable: true,
      center: false,
      width:'200px',
      cell: row => (
          <div
            dangerouslySetInnerHTML={{ __html: row.PaidStatus }}
          />
        )
    },
    {
      name: "ActivationDate",
      selector: (row:any) => row['ActivationDate'],
      sortable: true,
      center: false,
      width:'200px'
    },
  

  ]

  export const SponsorList : TableColumn <SponsorListInterface> []=[
    {
      name: "SNo",
      selector: (row:any) => row['SNo'],
      sortable: true,
      center: false,
    },
    {
      name: "Name",
      selector: (row:any) => row['Name'],
      sortable: true,
      center: false,
    },
    {
      name: "MobileNo",
      selector: (row:any) => row['MobileNo'],
      sortable: true,
      center: false,
    },
    {
      name: "Username",
      selector: (row:any) => row['Username'],
      sortable: true,
      center: false,
    },
    {
      name: "RegistrationDate",
      selector: (row:any) => row['RegistrationDate'],
      sortable: true,
      center: false,
      width:'200px'
    },
    {
      name: "JoiningAmount",
      selector: (row:any) => row['JoiningAmount'],
      sortable: true,
      center: false,
    },
    {
      name:'BotStatus',
      selector: (row:any) => row['BotStatus'],
      sortable: true,
      center: false,
      cell: row => (
        <div
          dangerouslySetInnerHTML={{ __html: row.BotStatus }}
        />
      )
    },
    {
      name: "Status",
      selector: (row:any) => row['Status'],
      sortable: true,
      center: false,
      cell: row => (
        <div
          dangerouslySetInnerHTML={{ __html: row.Status }}
        />
      )
    }
  ]


  export const WithDrawReport : TableColumn <WithDrawReportInterface> []=[
    {
      name: "S.No",
      selector: (row:any) => row['S.No'],
      sortable: true,
      center: false,
      width:'100px'
    },
    {
      name: "Withdraw Date",
      selector: (row:any) => row['Withdraw Date'],
      sortable: true,
      center: false,
      width:'200px',
      cell: row => (
        <div
          dangerouslySetInnerHTML={{ __html: row['Withdraw Date']}}
        />
      )
    },
    {
      name: "Status",
      selector: (row:any) => row['Status'],
      sortable: true,
      center: false,
      width:'150px',
      cell: row => (
        <div
          dangerouslySetInnerHTML={{ __html: row.Status }}
        />
      )
    },
    {
      name: "Withdraw Amount",
      selector: (row:any) => row['Withdraw Amount'],
      sortable: true,
      center: false,
      width:'200px',
      cell: row => (
        <div
          dangerouslySetInnerHTML={{ __html: row['Withdraw Amount'] }}
        />
      )
    },
    {
      name: "Payment Mode",
      selector: (row:any) => row['Payment Mode'],
      sortable: true,
      center: false,
      width:'200px',
      cell: row => (
        <div
          dangerouslySetInnerHTML={{ __html: row['Payment Mode'] }}
        />
      )
    },
    {
      name: "WalletType",
      selector: (row:any) => row['WalletType'],
      sortable: true,
      center: false,
      width:'200px',
      cell: row => (
        <div
          dangerouslySetInnerHTML={{ __html: row?.WalletType }}
        />
      )
     
    },

    {
      name: "TransactionNo",
      selector: (row:any) => row['TransactionNo'],
      sortable: true,
      center: false,
      width:'fill'
    },
    {
      name: "Remarks",
      selector: (row:any) => row['Remarks'],
      sortable: true,
      center: false,
      width:'200px',
      cell: row => (
        <div style={{ 
          whiteSpace: 'normal',
          wordBreak: 'break-word',
          wordWrap: 'break-word',
        }}>
          {row.Remarks}
        </div>
      ),
    },

    {
      name: "Action",
      selector: (row:any) => row['Action'],
      sortable: true,
      center: false,
       width:'200px',
       cell: row => {
        const match = row['Action'].match(/CancelRequest\((\d+)\)/);
            const sponsorId = match ? match[1] : null; 
            const obj ={
              procName:"WithdrawFund",
              Para:JSON.stringify({OrderId :sponsorId, DepositToken:decryptData(localStorage.getItem('userToken') as string),  ActionMode:'CancelRequest', })
          }
        return (
           <>{sponsorId ? <CancelTransactionReq payload={obj} sponsorId/>: undefined }</> 
        )
       
      }
    },
  ]

  export const INRFundReports : TableColumn <INRFundReportInterface> []=[
    {
      name: "Request Date",
      selector: (row:any) => row['Request Date'],
      sortable: true,
      center: false,
      width:'150px'
    },
    {
      name: "Requested Amount",
      selector: (row:any) => row['Requested Amount'],
      sortable: true,
      center: false,
      width:'200px'
    },
    {
      name: "USDT",
      selector: (row:any) => row['USDT'],
      sortable: true,
      center: false,
    },
    {
      name: "Payment Mode",
      selector: (row:any) => row['Payment Mode'],
      sortable: true,
      center: false,
      width:'200px',
      cell: row => (
        <div
          dangerouslySetInnerHTML={{ __html: row['Payment Mode']}}
        />
      )
    },
    {
      name: "TransactionNo",
      selector: (row:any) => row['TransactionNo'],
      sortable: true,
      center: false,
      width:'200px'
    },
    {
      name: "Net Amt.",
      selector: (row:any) => row['Net Amt.'],
      sortable: true,
      center: false,
      width:'200px',
      cell: row => (
        <div
          dangerouslySetInnerHTML={{ __html: row['Net Amt.']}}
        />
      )
    },

    {
      name: "Status",
      selector: (row:any) => row['Status'],
      sortable: true,
      center: false,
      width:'200px',
      cell: row => (
        <div
          dangerouslySetInnerHTML={{ __html: row.Status}}
        />
      )
    },
    {
      name: "Remarks",
      selector: (row:any) => row['Remarks'],
      sortable: true,
      center: false,
      width:'200px'
    },
    {
      name: "Approved Date",
      selector: (row:any) => row['Approved Date'],
      sortable: true,
      center: false,
      width:'200px'
    },
    {
      name: "Action",
      selector: (row:any) => row['Action'],
      sortable: true,
      center: false,
      cell: row => {
        const match = row['Action'].match(/CancelRequest\((\d+)\)/);
        // console.log(match);
            const sponsorId = match ? match[1] : null; 
            const obj ={
              procName:"RequestFundINR",
              Para:JSON.stringify({OrderId :sponsorId, ActionMode:'CancelRequest', })
          }
        return (
            <>{sponsorId !== null ? <CancelTransactionReq payload={obj} sponsorId/> : undefined
             }</>
        )
       
      }
    },
  
  ]

  export const supportTicket : TableColumn <SupportTicketInterface> []=[
    {
      name: "SNo",
      selector: (row:any) => row['SNo'],
      sortable: true,
      center: false,
    },
    {
      name: "UserName",
      selector: (row:any) => row['UserName'],
      sortable: true,
      center: false,
    },
    {
      name: "QueryStatus",
      selector: (row:any) => row['QueryStatus'],
      sortable: true,
      center: false,
    },
    {
      name: "QueryDate",
      selector: (row:any) => row['QueryDate'],
      sortable: true,
      center: false,
    },
    {
      name: "ReplyStatus",
      selector: (row:any) => row['ReplyStatus'],
      sortable: true,
      center: false,
      cell: row => (
        <div
          dangerouslySetInnerHTML={{ __html: row.ReplyStatus}}
        />
      )
    },
  ]


export const FXStockWallet : TableColumn <FXStockWalletInterface> []=[
  {
    name: "SNo",
    selector: (row:any) => row['SNo'],
    sortable: true,
    center: false,
    width:'100px'
  },
  {
    name: "Name",
    selector: (row:any) => row['Name'],
    sortable: true,
    center: false,
    width:'300px',
    cell: row => (
      <div style={{ 
        whiteSpace: 'normal',
        wordBreak: 'break-word',
        wordWrap: 'break-word',
      }}>
        {row.Name}
      </div>
    ),

  },
  {
    name: "DepositAmount",
    selector: (row:any) => row['DepositAmount'],
    sortable: true,
    center: false,
  },
  {
    name: "DepositDate",
    selector: (row:any) => row['DepositDate'],
    sortable: true,
    center: false,
  },
  {
    name: "Status",
    selector: (row:any) => row['Status'],
    sortable: true,
    center: false,
    width:'200px',
    cell: row => (
      <div
        dangerouslySetInnerHTML={{ __html: row.Status}}
      />
    )
  },
]

export const FXDepositWallet : TableColumn <FXDepositWalletInterface> []=[
  {
    name: "S.No.",
    selector: (row:any) => row['S.No.'],
    sortable: true,
    center: false,
    width:'100px'
  },
  {
    name: "TransType",
    selector: (row:any) => row['TransType'],
    sortable: true,
    center: false,
    width:'200px'
  },
  {
    name: "PreWalletAmount",
    selector: (row:any) => row['PreWalletAmount'],
    sortable: true,
    center: false,
    width:'200px'
  },
  {
    name: "Amount",
    selector: (row:any) => row['Amount'],
    sortable: true,
    center: false,
    width:'200px'
  },
  {
    name: "AfterWalletAmount",
    selector: (row:any) => row['AfterWalletAmount'],
    sortable: true,
    center: false,
    width:'200px'
  },
  {
    name: "WalletType",
    selector: (row:any) => row['WalletType'],
    sortable: true,
    center: false,
    width:'200px'
  },{
    name: "Date",
    selector: (row:any) => row['Date'],
    sortable: true,
    center: false,
    width:'200px'
  },
]

export const FXstPayWallet : TableColumn <FXstPayWalletInterface> []=[
  {
    name: "S.No.",
    selector: (row:any) => row['S.No.'],
    sortable: true,
    center: false,
    width:'100px'
  },
  {
    name: "TransferAmount",
    selector: (row:any) => row['TransferAmount'],
    sortable: true,
    center: false,
    width:'200px'
  },
  {
    name: "Charges",
    selector: (row:any) => row['Charges'],
    sortable: true,
    center: false,
    width:'200px',
    cell: row => (
      <div
        dangerouslySetInnerHTML={{ __html: row.Charges}}
      />
    )
  },
  {
    name: "FinalAmount",
    selector: (row:any) => row['FinalAmount'],
    sortable: true,
    center: false,
    width:'200px'
  },
  {
    name: "ConvertionRate",
    selector: (row:any) => row['ConvertionRate'],
    sortable: true,
    center: false,
    width:'200px'
  },
  {
    name: "ReceivedAmount",
    selector: (row:any) => row['ReceivedAmount'],
    sortable: true,
    center: false,
    width:'200px'
  },
  {
    name: "WalletType",
    selector: (row:any) => row['WalletType'],
    sortable: true,
    center: false,
    width:'200px'
  },
  {
    name: "TransferDate",
    selector: (row:any) => row['TransferDate'],
    sortable: true,
    center: false,
    width:'200px'
  },
  {
    name: "Status",
    selector: (row:any) => row['Status'],
    sortable: true,
    center: false,
    width:'200px',
    cell: row => (
      <div
        dangerouslySetInnerHTML={{ __html: row.Status}}
      />
    )
  },
]
export const FXstPayToCommissionWallet : TableColumn <FXstPayToCommissionWalletInterface> []=[
  {
    name: "SNo",
    selector: (row:any) => row['SNo'],
    sortable: true,
    center: false,
    width:'100px'
  },
  {
    name: "TransferAmount",
    selector: (row:any) => row['TransferAmount'],
    sortable: true,
    center: false,
    width:'200px'
  },
  {
    name: "5% Deduction(+)",
    selector: (row:any) => row['5% Deduction(+)'],
    sortable: true,
    center: false,
    width:'200px',
    cell: (row:any) => (
      <div
        dangerouslySetInnerHTML={{ __html: row['5% Deduction(+)']}}
      />
    )
  },
  {
    name: "FinalAmount",
    selector: (row:any) => row['FinalAmount'],
    sortable: true,
    center: false,
    width:'200px'
  },
  {
    name: "ConvertionRate",
    selector: (row:any) => row['ConvertionRate'],
    sortable: true,
    center: false,
    width:'200px'
  },
  {
    name: "ReceivedAmount",
    selector: (row:any) => row['ReceivedAmount'],
    sortable: true,
    center: false,
    width:'200px'
  },
  {
    name: "WalletType",
    selector: (row:any) => row['WalletType'],
    sortable: true,
    center: false,
    width:'200px'
  },
  {
    name: "TransferDate",
    selector: (row:any) => row['TransferDate'],
    sortable: true,
    center: false,
    width:'200px'
  },
  {
    name: "Status",
    selector: (row:any) => row['Status'],
    sortable: true,
    center: false,
    width:'200px',
    cell: row => (
      <div
        dangerouslySetInnerHTML={{ __html: row.Status}}
      />
    )
  },
]


export const P2PWalletReport : TableColumn <P2PWalletReportInterface> []=[
  {
    name: "S.No.",
    selector: (row:any) => row['S.No.'],
    sortable: true,
    center: false,
    width:'100px'
  },
  {
    name: "FromMember",
    selector: (row:any) => row['FromMember'],
    sortable: true,
    center: false,
    width:'200px',
    cell: row => (
      <div style={{ 
        whiteSpace: 'normal',
        wordBreak: 'break-word',
        wordWrap: 'break-word',
      }}>
        {row.FromMember}
      </div>
    ),
  },
  {
    name: "ToMember",
    selector: (row:any) => row['ToMember'],
    sortable: true,
    center: false,
    width:'200px',
    cell: row => (
      <div style={{ 
        whiteSpace: 'normal',
        wordBreak: 'break-word',
        wordWrap: 'break-word',
      }}>
        {row.ToMember}
      </div>
    ),
  },
  {
    name: "TransferAmount",
    selector: (row:any) => row['TransferAmount'],
    sortable: true,
    center: false,
    width:'200px'
  },
  {
    name: "Charges",
    selector: (row:any) => row['Charges'],
    sortable: true,
    center: false,
    width:'200px',
    cell: row => (
      <div
        dangerouslySetInnerHTML={{ __html: row.Charges}}
      />
    )
  },
  {
    name: "FinalAmount",
    selector: (row:any) => row['FinalAmount'],
    sortable: true,
    center: false,
    width:'200px'
  },
  {
    name: "WalletType",
    selector: (row:any) => row['WalletType'],
    sortable: true,
    center: false,
    width:'200px'
  },
  {
    name: "TransferDate",
    selector: (row:any) => row['TransferDate'],
    sortable: true,
    center: false,
    width:'200px'
  },
  {
    name: "Status",
    selector: (row:any) => row['Status'],
    sortable: true,
    center: false,
    cell: row => (
      <div
        dangerouslySetInnerHTML={{ __html: row.Status}}
      />
    )
  },
]

export const KingMakerzWalletReport : TableColumn <KingMakerzWalletReportInterface> []=[
  {
    name: "S.No.",
    selector: (row:any) => row['S.No.'],
    sortable: true,
    center: false,
    width:'100px'
  },
  {
    name: "TransferAmount",
    selector: (row:any) => row['TransferAmount'],
    sortable: true,
    center: false,
    width:'200px'
  },

  {
    name: "WalletType",
    selector: (row:any) => row['WalletType'],
    sortable: true,
    center: false,
    width:'300px'
  },
  {
    name: "TransferDate",
    selector: (row:any) => row['TransferDate'],
    sortable: true,
    center: false,
    width:'300px'
  },
  {
    name: "TransactionNo",
    selector: (row:any) => row['TransactionNo'],
    sortable: true,
    center: false,
    width:'200px'
  },
  {
    name: "Status",
    selector: (row:any) => row['Status'],
    sortable: true,
    center: false,
    width:'200px',
    cell: row => (
      <div
        dangerouslySetInnerHTML={{ __html: row.Status}}
      />
    )
  },
]

  // export const DownlineReport : TableColumn <DownlineReportInterface> []=[
  //   {
  //     name: "SNO",
  //     selector: (row:any) => row['SNO'],
  //     sortable: true,
  //     center: false,
  //   },
  //   {
  //     name: "ID",
  //     selector: (row:any) => row['ID'],
  //     sortable: true,
  //     center: false,
  //   },
  //   {
  //     name: "NAME",
  //     selector: (row:any) => row['NAME'],
  //     sortable: true,
  //     center: false,
  //   },
  //   {
  //     name: "REGISTRATION DATE",
  //     selector: (row:any) => row['REGISTRATION DATE'],
  //     sortable: true,
  //     center: false,
  //   },
  //   {
  //     name: "ACTIVATION DATE",
  //     selector: (row:any) => row['ACTIVATION DATE'],
  //     sortable: true,
  //     center: false,
  //     cell: row => (
  //       <div
  //         dangerouslySetInnerHTML={{ __html: row['ACTIVATION DATE'] }}
  //       />
  //     )
  //   },
  //   {
  //     name: "JoiningAmount",
  //     selector: (row:any) => row['JoiningAmount'],
  //     sortable: true,
  //     center: false,     
  //   },

  //   {
  //     name: "ACTION",
  //     selector: (row:any) => row['ACTION'],
  //     sortable: true,
  //     center: false,
  //     cell: row => (
  //       <div
  //         dangerouslySetInnerHTML={{ __html: row['ACTION'] }}
  //         onClick={()=> GetSponsorData(row)}
  //       />
  //     )
  //   },

  // ]


//   const CancelRequest = async (OBJ:any)=>{
//     const result = await Swal.fire({
//       title: 'Please confirm if you wish to delete request',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonText: 'Yes',
//       cancelButtonText: 'No'
//     });
// console.log(result?.value);

//     // console.log(result?.value);
//     // if(result?.value){
//     // try {
//     //   let res:any
//     //    res  = await axios.post(`${process.env.REACT_APP_API_URL}/ExecuteProcedure`, OBJ);
//     //   //  dispatch(refreshDataTable)
//     // } catch (error) {
//     //   // console.log(error);
//     //   console.error("Error making POST request:", error);
//     // }
    
//     // }
//   }


//   export const CancelfundRequest = (props:any)=> {
//     const dispatch = useDispatch()
//     const [reloadtable, setreloadtable] = useState(false)
//     const {payload, sponsorId} = props
//     const CancelRequest = async()=>{
//     const result = await Swal.fire({
//       title: 'Please confirm if you wish to delete request',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonText: 'Yes',
//       cancelButtonText: 'No'
//     });

// if(result?.value){
//     try {
//       let res:any
//        res  = await axios.post(`${process.env.REACT_APP_API_URL}/ExecuteProcedure`, payload);
//        if(res?.data[0]?.StatusCode === "1"){

//        }
//        dispatch(refreshDataTable(!reloadtable))
//     } catch (error) {
//       // console.log(error);
//       console.error("Error making POST request:", error);
//     }
    
//     }
     
//     }
//       return <>
//         <button
//             className="bg-danger border-0 rounded pb-1 px-2"
//             onClick={() => sponsorId && CancelRequest()}
//             >
//               Cancel
//               </button> 
//       </>
//   }


export const ActStatementColumns : TableColumn<DepositHistoryInterface> [] =[
  {
    name: "SNo",
    selector: (row:any) => row['SNo'],
    sortable: true,
    center: false,
    width:'100px'
  },
  {
    name: "TransactionNo",
    selector: (row:any) => row.TransactionNo,
    sortable: true,
    center: true,
    width:'auto'
  },
  {
    name: "TransactionDate",
    selector: (row:any) => row.TransactionDate,
    sortable: true,
    center: true,
    width:'250px'
  },
  {
    name: "TransType",
    selector: (row:any) => row.TransType,
    sortable: true,
    center: true,
    width:'150px',
    cell: (row:any) => (
      <div
        dangerouslySetInnerHTML={{ __html: row['TransType'] }}
      />
    )
  },

  {
    name: "Wallet",
    selector: (row:any) => row['Wallet'],
    sortable: true,
    center: true,
    width:'250px'
  },



  {
    name: "Description",
    selector: (row:any) => row['Description'],
    sortable: true,
    cell:(row:any)=>(
      <p  className="text-start text-light cursor-pointer" >
        {row?.Description}
      </p>  
    ),
    width:'250px',
    
  },

  {
    name: "Amount",
    selector: (row:any) => row['Amount'],
    sortable: true,
    center: true,
    width:'150px'
  },


 
]