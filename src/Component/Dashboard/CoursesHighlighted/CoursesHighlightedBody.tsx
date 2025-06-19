import { coursesHighlightedBodyData } from "../../../Data/Dashboard/Dashboard";
import { Btn, H6, Image } from "../../../AbstractElements";
import { dynamicImage } from "../../../Service";
import { Link } from "react-router-dom";
import { Href } from "../../../utils/Constant";

const CoursesHighlightedBody = () => {
  return (
    <>
      {coursesHighlightedBodyData.map((item, i) => (
        <tr key={i}>
          <td>
            <div className="d-flex align-items-center gap-2">
              <div className="flex-shrink-0">
                <Image src={dynamicImage(`dashboard1/invest/${item.image}`)}alt="avatar"/>
              </div>
              <div className="flex-grow-1">
                <Link to={Href}>
                  <H6 className="f-w-500">{item.course}</H6>
                </Link>
                <span className="font-light f-w-400 f-13">{item.time}</span>
              </div>
            </div>
          </td>
          <td>{item.amount}</td>
          <td>{item.study}</td>
          <td>
            <Btn className={`edge-btn f-13 w-100`} color={`light-${item.color}`}>
              {item.status}
            </Btn>
          </td>
        </tr>
      ))}
    </>
  );
};

export default CoursesHighlightedBody;
