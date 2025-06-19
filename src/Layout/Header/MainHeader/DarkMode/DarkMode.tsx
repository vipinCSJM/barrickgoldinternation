import { LI, SVG, Btn } from "../../../../AbstractElements";
import { Link } from "react-router-dom";
import { Href } from "../../../../utils/Constant";
import { useState } from "react";
import { setMixLayoutType } from "../../../../ReduxToolkit/Reducers/ThemeCustomizerSlice";
import { useAppDispatch } from "../../../../ReduxToolkit/Hooks";

const DarkMode = () => {
  const [darkMode, setDarkMode] = useState(false);
  const dispatch = useAppDispatch();
  const handleDarkMode = (value: boolean) => {
    if (value) {
      setDarkMode(!darkMode);
      dispatch(setMixLayoutType("dark"));
    } else {
      dispatch(setMixLayoutType("light"));
      setDarkMode(!darkMode);
    }
  };
  return (
    <LI className="modes d-flex">
      <Link className={`dark-mode ${darkMode ? "active" : ""}`}  onClick={(e) => { e.preventDefault(); handleDarkMode(darkMode);}} to={Href}>
        {darkMode ? <SVG className="svg-color" iconId="Moon" /> : <SVG className="svg-color" iconId="Sun" />}
      </Link>
    </LI>
  );
};

export default DarkMode;
