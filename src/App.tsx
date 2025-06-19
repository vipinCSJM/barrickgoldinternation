import { ToastContainer } from "react-toastify";
import {useEffect, useState} from 'react'
import RouterData from "./Routes";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useAppDispatch, useAppSelector } from "./ReduxToolkit/Hooks";
declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any; // Declare google as any since it's dynamically loaded
  }
}

function App() {
  const {mix_layout} = useAppSelector((state)=>state.themeCustomizer)
  // useEffect(() => {
  //   // Load Google Translate script dynamically
  //   const addGoogleTranslateScript = () => {
  //     const script = document.createElement("script");
  //     script.type = "text/javascript";
  //     script.defer  = true;
  //     script.src =
  //       "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  //     document.body.appendChild(script);
  //   };

  //   // Initialize the Google Translate Element
  //   window.googleTranslateElementInit = () => {
  //     new window.google.translate.TranslateElement(
  //       { pageLanguage: "en",
  //         includedLanguages: 'en,hi,es,de,ja,fr,ar,zh-CN,ml,mr,kn,gu,bn,ta,te,ur,th',
  //        }, // You can change 'ar' to any language code
  //       "google_translate_element"
  //     );
  //   };

  //   addGoogleTranslateScript();
  // }, []); // Empty dependency array means this effect runs once on mount


  return (
  <>
  <SkeletonTheme baseColor={mix_layout === "dark" ? "#22262c" : "#f9f3f2"} highlightColor={mix_layout === "dark" ? "#101114" : "#daf5ee"}>
    <RouterData />
    <ToastContainer />
    </SkeletonTheme>
  </>
  );
}

export default App;
