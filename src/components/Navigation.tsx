import { Link } from 'react-router-dom'
import logo from '../assets/malogo.png'
import { Container } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { UserBuyerType } from '../types'

type NavigationProps = {
    currentUser: UserBuyerType|null,
    logUserOut: () => void
}



export default function Navigation({ logUserOut, currentUser }: NavigationProps) {
    return (
        <Navbar expand='lg' data-bs-theme='dark' bg='dark'>
            <Container fluid>
                <Navbar.Brand as={Link} to='/'><img src={logo} alt="Logo" id='navlogo' /></Navbar.Brand>
                

                    <Nav className="justify-content-end" variant="underline">
                        { currentUser ? (
                            <> 
                            <Nav.Link as={Link} to='/dash'> Dashboard </Nav.Link>
                            <Nav.Link as={Link} to='/roadmap'> Roadmap </Nav.Link>
                            <Nav.Link as={Link} to='/myprofile'> My Profile </Nav.Link>
                            <Nav.Link as={Link} to='/' onClick={() => logUserOut()}> Logout </Nav.Link> 
                            </>
                            ) :
                            (
                            <>
                            <Nav.Link as={Link} to='/'> Home </Nav.Link>
                            <Nav.Link as={Link} to='/signup'> Sign Up </Nav.Link>
                            <Nav.Link as={Link} to='/login'> Login </Nav.Link>    
                            </>
                            )
                        }
                    </Nav>
               
            </Container>
        </Navbar>
      
    )
}