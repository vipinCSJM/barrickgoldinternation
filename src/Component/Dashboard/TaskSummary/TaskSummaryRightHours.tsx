import ReactApexChart from "react-apexcharts";
import { H4, H6 } from "../../../AbstractElements";
import { Hours } from "../../../utils/Constant";
// import { taskSummaryChartData } from "../../../Data/Dashboard/DashboardChartData";

const TaskSummaryRightHours = () => {
  return (
    <div className="d-flex bg-light">
      <div className="flex-grow-1">
        <H6 className="f-16 font-light">{Hours}</H6>
        <H4>67</H4>
      </div>
      <div className="team-chart" id="team-chart" >
        {/* <ReactApexChart options={taskSummaryChartData} series={taskSummaryChartData.series} height={70} type={"line"} /> */}
      </div>
    </div>
  );
};

export default TaskSummaryRightHours;
