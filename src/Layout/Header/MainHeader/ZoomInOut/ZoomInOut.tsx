import { useState } from "react";
import { Maximize } from "react-feather";
import { LI } from "../../../../AbstractElements";
import { Link } from "react-router-dom";
import { Href } from "../../../../utils/Constant";

const ZoomInOut = () => {
  const [fullScreen, setFullScreen] = useState(false);
  const fullScreenHandler = (isFullScreen: boolean) => {
    setFullScreen(isFullScreen);
    if (isFullScreen) {
      document.documentElement.requestFullscreen();
    } else {
      document?.exitFullscreen();
    }
  };

  return (
    <LI className="d-none d-md-inline-block">
      <Link
        onClick={() => fullScreenHandler(!fullScreen)}
        to={Href}
      >
        <Maximize className="svg-color" />
      </Link>
    </LI>
  );
};

export default ZoomInOut;
