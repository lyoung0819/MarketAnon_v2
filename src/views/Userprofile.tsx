import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { UserBuyerType, ReviewType, CategoryType } from '../types'
import { useEffect, useState } from 'react'
import { getAllReviews } from '../lib/apiWrapper'
import Review from '../components/Review'
// import { useParams } from 'react-router-dom'

type UserprofileProps = {
  currentUser: UserBuyerType|null,
  flashMessage: (newMessage: string | undefined, newCategory: CategoryType | undefined) => void
}

export default function Userprofile({ currentUser, flashMessage }: UserprofileProps) {
  const username = currentUser?.username
  const title = currentUser?.title
  const company = currentUser?.company
  const name = currentUser?.firstName
  //const user_id = currentUser?.id
  // const { companyName } = useParams()
  const [reviews, setReviews] = useState<ReviewType[]>([])

  useEffect(() => {
      async function fetchData() {
        const response = await getAllReviews(); 
        console.log(response.data)
        if (response.data) {
          let reviews = response.data;
          setReviews(reviews)
        }
      }
      fetchData()
    }, []) 

    let revs = reviews.filter( r => r.author.id==currentUser?.id)

    // let vendor_id;
    // reviews.map( r => vendor_id=r.vendor_id)

    // getAllVendors()
    // let company_name = vendor_id
  
  // Code to try and have edit/del buttons on reviews in userprofile
  //const displayed_reviews = reviews.filter(r => r.author==currentUser)
  //{displayed_reviews.map(r => <Review key={r.id} review={r} flashMessage={flashMessage} currentUser={currentUser}/>)}

  return (
    <>
    <Row>
      <Col className='mt-5 text-end'>
      <h1 className='text-pink'>{username}</h1>
      </Col>
    </Row>
    <div>
      <h2></h2>
    </div>
    <Row>
      <Col className='text-left' lg={8}>
      <h1>Hello, {name}! Welcome Back!</h1>   
      </Col>
      <Col className='text-end'>
      <h3>{company}</h3>
      <h4>{title}</h4>
      </Col>
    </Row>

    <Row className='mt-2 mb-3'>
    <Card bg='dark' text='white'>
              <Card.Subtitle className='pt-2'>
                <h3>My Reviews:</h3>
              </Card.Subtitle>
        </Card>
    </Row>
    <Row>
      {revs.map( r => <Review key={r.id} review={r} flashMessage={flashMessage} currentUser={currentUser} />)}
    </Row>
    </>
  )}
