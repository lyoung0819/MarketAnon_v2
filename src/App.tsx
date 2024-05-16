import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import Dash from './views/Dash'
import Home from './webpage/Home'
import Vendorpage from './views/Vendorpage';
import Login from './webpage/Login';
import Userprofile from './views/Userprofile';
import Navigation from './components/Navigation';
import Signup from './webpage/Signup';
import Container from 'react-bootstrap/Container'
import AlertMessage from './components/AlertMessage'
import { UserBuyerType, CategoryType } from './types'
import Roadmap from './webpage/Roadmap';
import { getMe } from './lib/apiWrapper';


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') && new Date(localStorage.getItem('tokenExp')||0) > new Date() ? true : false );
  const [loggedInUser, setisLoggedInUser] = useState<UserBuyerType | null>(null)

  const [message, setMessage] = useState<string | undefined>(undefined)
  const [category, setCategory] = useState<CategoryType | undefined>(undefined)

  useEffect(() => {
    async function getLoggedinUser() {
      if (isLoggedIn) {
        const token = localStorage.getItem('token');
        const response = await getMe(token!);
        console.log(token, 'this should be token')
        if (response.data) {
          setisLoggedInUser(response.data);
          localStorage.setItem('currentUser', JSON.stringify(response.data))
        } else {
          setIsLoggedIn(false);
          console.log(response, 'we\'re here')
        }
      }
    }
    getLoggedinUser()
  }, [isLoggedIn])


  // const handleClick = () => {
  //   setIsLoggedIn(!isLoggedIn)
  // }

  const flashMessage = (newMessage: string | undefined, newCategory: CategoryType | undefined) => {
    setMessage(newMessage);
    setCategory(newCategory);
  }

  const logUserIn = () => {
    setIsLoggedIn(true)
  }

  const logUserOut = () => {
    setIsLoggedIn(false);
    setisLoggedInUser(null);
    localStorage.removeItem('token')
    localStorage.removeItem('tokenExp')
    localStorage.removeItem('currentUser')
    flashMessage('You have been logged out', 'dark')
  }

  return (
    <>
      <Navigation logUserOut={logUserOut} currentUser={loggedInUser}/>
      <Container>
        {message && <AlertMessage message={message} category={category} flashMessage={flashMessage} />}
        <Routes>
          <Route path='/dash' element={<Dash />} />
          <Route path='/signup' element={<Signup flashMessage={flashMessage} />} />
          <Route path='/' element={<Home />} />
          <Route path={'/reviews/:companyName'} element={<Vendorpage loggedInUser={loggedInUser!} flashMessage={flashMessage} />} />
          <Route path='/login' element={<Login flashMessage={flashMessage} logUserIn={logUserIn} />} />
          <Route path='/myprofile' element={<Userprofile currentUser={loggedInUser} flashMessage={flashMessage} />} />
          <Route path='/roadmap' element={<Roadmap />} />
        </Routes>
      </Container>
    </>
  )
}