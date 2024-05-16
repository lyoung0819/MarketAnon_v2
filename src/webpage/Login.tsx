import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import { CategoryType, UserFormDataType } from '../types';
import { login } from '../lib/apiWrapper';
import { useNavigate } from 'react-router-dom';


type LoginProps = {
    flashMessage: (newMessage:string|undefined, newCategory:CategoryType|undefined) => void,
    logUserIn: () => void,
}

export default function Login({ flashMessage, logUserIn }: LoginProps) {
    const navigate = useNavigate();

    const [userFormData, setUserFormData] = useState<Partial<UserFormDataType>>(
        {
            username: '',
            password: '',
        }
    ) // possibly not recognizing without other params?

    const [seePassword, setSeePassword] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserFormData({...userFormData, [e.target.name]: e.target.value })
    }

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(userFormData)
        
        const response = await login(userFormData.username!, userFormData.password!)
        if(response.error){
            flashMessage(response.error, 'danger')
        } else {
            console.log(response.data)
            const token = response.data!.token
            const tokenExp = response.data!.tokenExpiration
            localStorage.setItem('token', token)
            localStorage.setItem('tokenExp', tokenExp);
            logUserIn();
            flashMessage('You have successfully logged in', 'success')
            navigate('/dash')
        }
    }

    return (
        <>
            <div>
            <h1 className="text-center mt-5 mb-4">Login:</h1>
            </div>
            <Row>
                <Col lg={3}>
                </Col>
                <Col lg={6}>
            <Card>
                <Card.Body>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Label htmlFor='username'>Username</Form.Label>
                        <Form.Control id='username' name='username' placeholder='Enter Username' value={userFormData.username} onChange={handleInputChange}/>

                        <Form.Label htmlFor='password'>Password</Form.Label>
                        <InputGroup>
                            <Form.Control id='password' name='password' type={seePassword ? 'text' : 'password'} placeholder='Enter Password' value={userFormData.password} onChange={handleInputChange}/>
                            <InputGroup.Text onClick={() => setSeePassword(!seePassword)}><i className={seePassword ? 'bi bi-eye-slash' : 'bi bi-eye'}></i></InputGroup.Text>
                        </InputGroup>

                        <Button type='submit' className='w-100 mt-3 button'>Login</Button>
                    </Form>
                </Card.Body>
            </Card>
            </Col>
            <Col lg={3}>
                </Col>
            </Row>
        </>
    )
}