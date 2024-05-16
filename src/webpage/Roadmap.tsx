import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

type RoadmapProps = {}
export default function Roadmap({}: RoadmapProps) {
  return (
    <>
    <Row>
      <Col className='text-center my-5 text-pink'>
          <div>
            <h1>
              Roadmap
            </h1>
          </div>
      </Col>
    </Row>

    <Row>
      <Col className='text-center my-5 text-pink'>
          <p>Cosmetic Updates</p>
          <p>Vendor Pages: ability to submit questions and RFP/RFI documents </p>
          <p> Content Library: abiity to look up whitepapers, pre-recorded demos, and third party reports</p>
          <p>Personal Collections: ability to save documents/content to your private collection accessible from your profile page</p>
          <p>Improved Roadmap UI/UX: ability for users see updates being worked on and to upvote what they want first</p>
      </Col>
    </Row>

    <Row>
      <Col className='text-center my-5'>
          <div>
            <h1>
              Check back later for more!
            </h1>
          </div>
      </Col>
    </Row>
    </>
  )
}