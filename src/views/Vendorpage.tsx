import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { ReviewFormDataType, UserBuyerType } from '../types'
import { ReviewType, CategoryType } from '../types'
import Form from 'react-bootstrap/Form';
import Review from '../components/Review'
import ReviewForm from '../components/ReviewForm'
import { createReview, getReviewsByCompany } from '../lib/apiWrapper';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom'

// THIS PAGE IS A PAGE FOR A SPECIFIC VENDOR & THEIR REVIEWS

 type VendorPageProps = {
  flashMessage: (newMessage: string | undefined, newCategory: CategoryType | undefined) => void
  loggedInUser: UserBuyerType
 }

 export default function Vendorpage({ flashMessage, loggedInUser }: VendorPageProps) {
  
  const [showForm, setShowForm] = useState(false)
  const [reviews, setReviews] = useState<ReviewType[]>([])
  const [fetchReviewData, setFetchReviewData] = useState(true);

  const { companyName } = useParams();

  // Grab reviews from db
  useEffect(() => {
    async function fetchData() {
      const response = await getReviewsByCompany(companyName!); 
      console.log(response.data)
      if (response.data) {
        let reviews = response.data;
        // console.log(reviews)
        setReviews(reviews)
      }
    }
    fetchData()
  }, [fetchReviewData]) 
 
  const [searchRevs, setSearchRevs] = useState('');
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchRevs(e.target.value)
  }

  const addNewReview = async (newReviewData: ReviewFormDataType) => {
    const token = localStorage.getItem('token') || '';
    const response = await createReview(token, newReviewData)
    if (response.error) {
      flashMessage(response.error, 'danger')
    } else if (response.data) {
      flashMessage(`${response.data.title} has been created`, 'success')
      setShowForm(false)
      setFetchReviewData(!fetchReviewData)
    }
  }



  return (
    <>
    <Container>
        <div className="my-4">
          <Button className='w-100 button' onClick={() => setShowForm(!showForm)}>{showForm ? 'Close' : 'Write Review'}</Button>
          {showForm && <ReviewForm addNewReview={addNewReview} companyName={companyName!}/>}
        </div>
      <Row classname="my-6">
          <Col>
            <Form.Control value={searchRevs} placeholder='Search Reviews' onChange={handleInputChange} />
          </Col>
      </Row>
      <Row>
        <Col>
        {reviews && Array.isArray(reviews) && reviews?.filter(r => r.title.toLowerCase().includes(searchRevs.toLowerCase())).map(r => <Review key={r.id} review={r} flashMessage={flashMessage} currentUser={loggedInUser} companyName={companyName!}/>)}
        </Col>
      </Row>
      </Container>
    </>
  )
}