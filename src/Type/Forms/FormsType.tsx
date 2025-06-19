export interface LoginFormPropsType {
    userid: string,
    password: string
}
// Create initial values based on the LoginFormPropsType interface
export const LoginForminitialValues: LoginFormPropsType = {
    userid: "",  // Replace with actual default values or leave empty if needed
    password: "", // Replace with actual default values or leave empty if needed
};

export interface RegistrationFormPropsType {
    SponsorUserName: string,
    FirstName: string,
    MobileNo: string,
    CountryId: string,
    EmailId: string,
    OTP: string,
    recaptchaResponse?: string,
    address?: string,
    sponsorName?: string
}
// Create initial values based on the LoginFormPropsType interface
export const RegistrationForminitialValues: RegistrationFormPropsType = {
    SponsorUserName: "",
    FirstName: "",
    MobileNo: "",
    CountryId: "",
    EmailId: "",
    OTP: "",
    recaptchaResponse: "",
    address: "",
    sponsorName: '',
};

export interface USDTwalletaddrespropsType {
    WalletAddress: string,
    FXSTRecievingAddress: string,
    OTP: string,
}
export const ActsettingCryptoWallet: USDTwalletaddrespropsType = {
    WalletAddress: '',
    FXSTRecievingAddress: '',
    OTP: ''
}

export interface Bank_INRpropsType {
    OTP: string,
    IFSC: string,
    BankName: string,
    BranchName: string,
    PassbookImage: string,
    AccountNo: string,
    AccountHolderName: string,
}

export const ActsettingBankINR: Bank_INRpropsType = {
    OTP: '',
    IFSC: '',
    BankName: '',
    BranchName: '',
    PassbookImage: '',
    AccountNo: '',
    AccountHolderName: '',
}

export interface BANK_AEDpropsType {
    AEDAccountHolderName: string,
    AEDAccountNumber: string,
    IBANNumber: string,
    SwiftCode: string,
    OTP: string,
}

export const ActsettingBank_AED: BANK_AEDpropsType = {
    AEDAccountHolderName: '',
    AEDAccountNumber: '',
    IBANNumber: '',
    SwiftCode: '',
    OTP: ''
}

export interface CreditCardDetails_propsType {
    CreditCardHolderMobileNo: string,
    CreditCardNo: string,
    CreditCardHolderName: string,
    OTP: string,
}

export const ActsettingCreditCard_Details: CreditCardDetails_propsType = {
    CreditCardHolderMobileNo: '',
    CreditCardNo: '',
    CreditCardHolderName: '',
    OTP: '',

}


// =========================  Profile Form Type Start Here

export interface Personal_Details_propsType {
    Title: string,
    FirstName: string,
    MobileNo: string,
    Gender: String,
    DateofBirth: Date | null,
    FathersName: string,
    MaritalStatus: string,
    AlternateNo: string,
    EmailId: string,
    CountryName: string,
    StateName: string,
    CityName: string,
    Pincode: string,
    Address: string,
}

export const Personal_Details: Personal_Details_propsType = {
    Title: '',
    FirstName: '',
    MobileNo: '',
    Gender: '',
    DateofBirth: null,
    FathersName: '',
    MaritalStatus: '',
    AlternateNo: '',
    EmailId: '',
    CountryName: '',
    StateName: '',
    CityName: '',
    Pincode: '',
    Address: '',
}

export interface Nominee_Details_propsType {
    NomineeName: string,
    NomineeDOB: string,
    NomineeRelation: string,
    NomineeNationalId: string,
    NomineeDrivingLicence: string,
    NomineePassportNumber: string,
}

export const Nominee_Details: Nominee_Details_propsType = {
    NomineeName: '',
    NomineeDOB: '',
    NomineeRelation: '',
    NomineeNationalId: '',
    NomineeDrivingLicence: '',
    NomineePassportNumber: ''
}

export interface Password_Change_PropsType {
    OldPassword: string,
    NewPassword: string,
    ConfirmPassword: string,
}

export const Change_Password: Password_Change_PropsType = {
    OldPassword: '',
    NewPassword: '',
    ConfirmPassword: ''
}

export interface SearchTableData_PropsType {
    FromDate: string,
    ToDate: string,
}

export const SearchingTableData: SearchTableData_PropsType = {
    FromDate: '',
    ToDate: '',
}

export interface SearchTicket_PropsType {
    QueryString: string,
    SearchString: string,
    StatusString: string
}

export const SearchTicketData: SearchTicket_PropsType = {
    QueryString: '',
    SearchString: '',
    StatusString: '',
}
export interface WithdrawFormPropsType {
    WalletType: string,
    ToUsername: string,
    WithdrawMode: string,
    WithdrawAmount: string,
    OTP: string
}
// Create initial values based on the LoginFormPropsType interface
export const WithdrawForminitialValues: WithdrawFormPropsType = {
    WalletType: "CommissionWallet",
    ToUsername: localStorage.getItem("UserName") as string,
    WithdrawMode: "",
    WithdrawAmount: "",
    OTP: "",
};
export interface TreeFormPropsType {
    Username: string,
}
// Create initial values based on the LoginFormPropsType interface
export const TreeForminitialValues: TreeFormPropsType = {
    Username: localStorage.getItem("UserName") as string
};
export interface DepositFundFormPropsType {
    RequestAmount: string,
    PaymentMode: string,
    Bank: string,
    UTRNo: string,
    Description: string
}
// Create initial values based on the LoginFormPropsType interface
export const DepositFundForminitialValues: DepositFundFormPropsType = {
    RequestAmount: "",
    PaymentMode: "",
    Bank: "",
    UTRNo: "",
    Description: "",
};