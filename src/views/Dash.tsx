import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import { VendorType } from '../types'
import Vendor from '../components/Vendor'
import { getAllVendors } from '../lib/apiWrapper';
//import { Link, useParams } from 'react-router-dom';



type DashProps = {}


export default function Dash({ }: DashProps) {
  //const { companyName } = useParams()
  const [vendors, setVendors] = useState<VendorType[]>([])

  // Grab vendors from db
  useEffect(() => {
    async function fetchData(){
      const response = await getAllVendors();
      console.log(response)
      if (response.data){
        let vendors = response.data;
        setVendors(vendors)
      }
    }
    fetchData()
  }, [])



  const [searchVendors, setSearchVendors] = useState('')
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setSearchVendors(e.target.value)
  }

// <Vendor key={v.id} vendor={v} />
// companyName={v.companyName}
  return (
    <>
      <Row>
        <Col xs={12} md={12} className='my-4'>
          <Form.Control value={searchVendors} placeholder='Search Vendors:' onChange={handleInputChange} />
        </Col>
        <Col>
          {vendors.filter(v => v.companyName.toLowerCase().includes(searchVendors.toLowerCase())).map(v => <Vendor key={v.id} vendor={v} companyName={v.companyName}/>)}
        </Col>
      </Row>
    </>
  )
}

