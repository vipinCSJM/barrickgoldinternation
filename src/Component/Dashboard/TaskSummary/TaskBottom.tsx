import { Badges, H2, H5, SVG } from "../../../AbstractElements";

const TaskBottom = () => {
  return (
    <div className="task-bottom d-flex align-items-center gap-2">
      <H5 className="font-light">Completion rate in terms of time:</H5>
      <H2 className="font-primary">83%</H2>
      <Badges className="bg-light f-14">
        <SVG iconId="right-3" className="svg-w-20 stroke-dark me-1" />
        3.4%
      </Badges>
    </div>
  );
};

export default TaskBottom;
