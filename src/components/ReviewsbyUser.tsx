// import { useEffect, useState } from "react";
// import { ReviewType, UserBuyerType, CategoryType, ReviewFormDataType } from "../types"
// import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button'
// //import Form from 'react-bootstrap/Form'
// import Modal from 'react-bootstrap/Modal';
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
// import Form from 'react-bootstrap/Form'
// import { useNavigate } from 'react-router-dom'
// import { deleteReviewById, editReviewById, getAllVendors } from '../lib/apiWrapper'
// import { VendorType } from "../types";

// type ReviewsByUserProps = {
//     review: ReviewType,
//     // key: number,
//     currentUser: UserBuyerType|null,
//     flashMessage: (message:string, category:CategoryType) => void,
// }

// export default function ReviewsByUser({ review, currentUser, flashMessage }: ReviewsByUserProps) {
//     console.log(review);
//     const navigate = useNavigate();
//     const reviewId = review.id
//     const [vendors, setVendors] = useState<VendorType[]>([])

//     // Grab vendors from db
//   useEffect(() => {
//     async function fetchData(){
//       const response = await getAllVendors();
//       console.log(response)
//       if (response.data){
//         let vendors = response.data;
//         setVendors(vendors)
//       }
//     }
//     fetchData()
//   }, [])


//    vendors.forEach(vendor => {
//     if ('companyName' in vendor) {
//         return vendor.companyName
//     }
//    })


 
//     const [reviewToEditData, setReviewtToEditData] = useState<ReviewFormDataType>({title: '', body: '', rating:0, vendor: companyName})
//     const [showModalDel, setShowModalDel] = useState(false);
//     const [showModalEdit, setShowModalEdit] = useState(false);

//     const openModalDel = () => setShowModalDel(true);
//     const closeModalDel = () => setShowModalDel(false);
//     const openModalEdit = () => setShowModalEdit(true);
//     const closeModalEdit = () => setShowModalEdit(false);
//     //Edit:
//     const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setReviewtToEditData({...reviewToEditData, [event.target.name]:event.target.value})
//     }

//     const handleFormSubmit = async (event: React.FormEvent) => {
//         event.preventDefault()
//         const token = localStorage.getItem('token') || '';
//         const response = await editReviewById(reviewId!, token, reviewToEditData);
//         if (response.error){
//             flashMessage(response.error, 'danger')
//         } else {
//             flashMessage(`${response.data?.title} has been updated`, 'success');
//             closeModalEdit()
//             //re-render:
//             //renderfunc()
//             window.location.reload()
//         }
//     }

//     //Delete:
//     const handleDeleteClick = async () => {
//         const token = localStorage.getItem('token') || '';
//         const response = await deleteReviewById(reviewId!, token); // companyName deleted
//         if (response.error){
//             flashMessage(response.error, 'danger')
//         } else {
//             flashMessage(response.data!, 'primary')
//             flashMessage('Your review was deleted!', 'success')
//             navigate(`/myprofile`)
//         }
//     }
    


//     return (
//         <>
//         <Card className='my-2' bg='dark' text='white'>
//             <Card.Header>
//                 <Card.Title>{review.title} | ID: #{review.id} </Card.Title>
//                 <Card.Subtitle className="mb-1 text-pink">{review.author.username}</Card.Subtitle>
//             </Card.Header>
//             <Card.Body>
//                 <Card.Text className="">{review.body}</Card.Text>
//             </Card.Body>
//             <Row className='mb-1 p-3' >
//                 <Col lg={6} className='w-50'>
//                     {review.author.id === currentUser?.id && <Button className='button' onClick={openModalEdit}>Edit Review</Button>}
//                 </Col>
//                 <Col lg={6} className='w-50'>
//                     {review.author.id === currentUser?.id && <Button className='button' onClick={openModalDel}>Delete Review</Button>}
//                 </Col>
//             </Row>
//         </Card>
//         <Modal show={showModalEdit} onHide={closeModalEdit} id='EDIT-rev-modal'>
//             <Modal.Header closeButton>
//                 <Modal.Title >Edit: '{reviewToEditData.title}'</Modal.Title>
//             </Modal.Header>
//             <Modal.Body >
//                 <Form onSubmit={handleFormSubmit}>
//                     <Form.Label>Title:</Form.Label>
//                     <Form.Control name='title' value={reviewToEditData.title} onChange={handleInputChange} />
//                     <Form.Label>Review:</Form.Label>
//                     <Form.Control name='body' value={reviewToEditData.body} onChange={handleInputChange} />
//                     <Form.Label>Rating:</Form.Label>
//                     <Form.Control name='rating' value={reviewToEditData.rating} onChange={handleInputChange} /> 
//                 </Form>
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button variant='secondary' onClick={closeModalEdit}>Close</Button>
//                 <Button className='button' onClick={handleFormSubmit}>Edit Review</Button>
//             </Modal.Footer>
//         </Modal>
//         <Modal show={showModalDel} onHide={closeModalDel} id='DEL-rev-modal'>
//             <Modal.Header closeButton>
//                 <Modal.Title>Delete Your Review?</Modal.Title>
//             </Modal.Header>
//             <Modal.Body >
//                 Are you sure you want to delete your review? This action cannot be undone.
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button variant='secondary' onClick={closeModalDel}>Close</Button>
//                 <Button className='button' onClick={handleDeleteClick}>Delete Review</Button>
//             </Modal.Footer>
//         </Modal>
//     </>
//     )
// }
