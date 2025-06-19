import { Card, CardBody, Col, Table } from "reactstrap";
import CardHeaderCommon from "../../../CommonElements/CommonCardHeader/CardHeaderCommon";
import { RewardHighlightedHeading, Monthly, Weekly, Yearly } from "../../../utils/Constant";
import { GrAnnounce } from "react-icons/gr";
import { dynamicImage } from '../../../Service'
import { H2, Image, P,H4, H3, Btn } from '../../../AbstractElements'
import { object } from "yup";
interface MyComponentProps {
  LatestAnnouncement: string[];
}
const CoursesHighlighted = (props:MyComponentProps) => {
  const {LatestAnnouncement} = props
  return (
    <Col xl="6" md="6">
      <Card className="boxshadow">
        <CardHeaderCommon headClass="pb-0" title={RewardHighlightedHeading} firstItem={Weekly} secondItem={Monthly} thirdItem={Yearly} />
        <CardBody className="pt-0 course-table">
           <Col className="text-center"  style={{height:'240px', display:'block', overflow:'hidden'}}>
            {LatestAnnouncement.length > 0 ? <div className="vertical-marquee">
            <div>
            {LatestAnnouncement.map((itm:any, idx:number)=> <P key={idx} className="pt-4" dangerouslySetInnerHTML={{ __html: itm?.AnnouncementText }}/>)}
            </div>
            <div>
            {LatestAnnouncement.map((itm:any, idx:number)=> <P key={idx}  className="pt-4" dangerouslySetInnerHTML={{ __html: itm?.AnnouncementText }}/>)}
            </div>
          </div> : 
           <>
           <GrAnnounce size={60}/>
           <H4 className="py-3">There are no Announcement </H4>
           <P>Currently, there are no announcements to display. Please check back later for updates. We appreciate your patience and look forward to sharing news with you soon!</P>
           </>}
            </Col>
        </CardBody>
      </Card>
    </Col>
  );
};

export default CoursesHighlighted;
