import { VendorType } from "../types"
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

type VendorProps = {
    vendor: VendorType
    companyName: string
}

export default function Vendor({ vendor, companyName }: VendorProps){
    console.log(vendor)

    return (
           <Card className='my-2' bg='dark' text='white'>
            <Card.Header>
                <Card.Title as={Link} to={`/reviews/${companyName}`}>{vendor.companyName}</Card.Title>
            </Card.Header>
           </Card>
        )
    }


    // flask /reviews/<compnay_name>
    // /reviews/<int:user_id>