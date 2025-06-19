import { H6, LI, UL } from "../../../AbstractElements";
import { LegBusinessData } from "../../../Data/Dashboard/Dashboard";

const CategoryOverviewDetails = (props:any) => {

  return (
    <UL>
      {props?.LegBOverviewData?.map((item:any, i:number) => (
        <LI className="d-flex align-items-center bg-light card-hover" key={i}>
          <div className="flex-shrink-0">
            <div className='circle-dot-primary'>
              <span />
            </div>
          </div>
          <div className="flex-grow-1">
            <H6 className="f-w-500 fs-6">{item.key}</H6>
            <span className="f-16 font-light">{item.value} </span>
          </div>
        </LI>
      ))}
    </UL>
  );
};

export default CategoryOverviewDetails;
