import logo from '../assets/malogo.png'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';


// Home Webpage: Essentially pure HTML for our homepage

type HomeProps = {}

export default function Home({ }: HomeProps) {
  return (
    <div>
      <Row className='my-5'>
        <Col id='logo-parent'>
          <img src={logo} alt="Logo" id="home-logo" className='responsive' />
        </Col>
      </Row>
      <Row id='slogan-right' className='my-5'>
        <h5 className="text-center home-pink">Built for the decision maker.</h5>
      </Row>
      {/* <Row>
        <Button className='button' onClick={handleClick}>{isLoggedIn ? 'Log Out' : 'Log In'}</Button>
      </Row> */}
      <Row className="text-center my-5">
        <h4>How It Works</h4>
      </Row>
      <Row>
        <Col lg={4}>
          <Card bg='dark' text='white' border="light" >

            <Card.Title className='text-center mt-3 title'> Decision Makers
            </Card.Title>
            <Card.Body className='text-center'>Conduct research anonymously and get answers directly from vendor product specialists without revealing your identity</Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card bg='dark' text='white' border="light">

            <Card.Title className='text-center mt-3 title'> Procurement Teams
            </Card.Title>

            <Card.Body className='text-center'>Submit direct RFIs to vendors through the marketplace, without having to spend weeks in early sales cycle stages</Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card bg='dark' text='white' border="light">
            <Card.Title className='text-center mt-3 title'> Vendors and GTM
            </Card.Title>
            <Card.Body className='text-center'>Filter through unqualified leads and get direct access to educated, ready buyers</Card.Body>
          </Card>
        </Col>

      </Row>
    </div>
  )
}