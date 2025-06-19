import { useEffect, useState } from "react";
import { Image} from "../../AbstractElements";
import { dynamicImage } from "../../Service";

const Loader = () => {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(false);
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, [show]);
  return (
    <>
      {show && (
        // <div className="loader-wrapper">
        //   <div className="loader">
        //   </div>
        // </div>
        <div className="loader-wrapper">
          <Image className="image-flip" src={dynamicImage("preloader_img.png")} alt="preloader"/>
          <Image className="loader-text" src={dynamicImage("logo_text.png")} alt="preloader"/>
        </div>
      )}
    </>
  );
};

export default Loader;
