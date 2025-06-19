/// <reference types="react-scripts" />
declare namespace NodeJS {
    interface ProcessEnv {
        REACT_APP_API_URL : string;
        REACT_APP_WEBSITEAPI_URL:string;
        REACT_APP_SECRET_KEY:any
        REACT_APP_POPUP_URL:string;
    }
}
