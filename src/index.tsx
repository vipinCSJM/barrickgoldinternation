import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.scss";
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import Store from './ReduxToolkit/Store';
import './i18n'
import {SweetAlertProvider } from './Context/SweetAlertContext'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={Store}>
    <SweetAlertProvider>
    <App />
    </SweetAlertProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
