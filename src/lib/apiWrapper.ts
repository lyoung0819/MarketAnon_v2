import axios from 'axios';
import { ReviewFormDataType, ReviewType, VendorType, TokenType, UserFormDataType, UserBuyerType } from '../types';


const baseURL:string = 'https://marketanon.onrender.com'
const userEndpoint:string = '/users'
const reviewEndpoint:string = '/reviews' // do I need to add param here?
const tokenEndpoint:string = '/token'
const vendorEndpoint:string = '/vendors'


const apiClientNoAuth = () => axios.create({
    baseURL: baseURL
})


const apiClientBasicAuth = (username:string, password:string) => axios.create({
    baseURL: baseURL,
    headers: {
        Authorization: 'Basic ' + btoa(username + ':' + password)
    }
})

const apiClientTokenAuth = (token:string) => axios.create({
    baseURL: baseURL,
    headers: {
        Authorizatoin: 'Bearer ' + token
    }
})

type APIResponse<T> = {
    data?: T,
    error?: string
}


async function register(newUserData:UserFormDataType): Promise<APIResponse<UserBuyerType>> {
    let data;
    let error;
    try{
        const response = await apiClientNoAuth().post(userEndpoint, newUserData);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}

async function login(username:string, password:string): Promise<APIResponse<TokenType>> {
    let data;
    let error;
    try{
        const response = await apiClientBasicAuth(username, password).get(tokenEndpoint)
            data = response.data
    } catch(err){
        if(axios.isAxiosError(err)){
        error = err.response?.data.error
    } else {
        error = 'Something went wrong'
    }
}
    return { data, error }
}

async function getMe(token:string): Promise<APIResponse<UserBuyerType>> {
    let data;
    let error;
    console.log(token, 'token inside of getme')
    try {
        // const response = await apiClientTokenAuth(token).get(userEndpoint + '/me')
        const response = await fetch('https://marketanon.onrender.com/users/me', {
            method:"GET", 
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        data = await response.json()
        console.log(response, "we're inside of get me")
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
            console.log(err, "error inside of get me")
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}


async function getAllVendors(): Promise<APIResponse<VendorType[]>> {
    let data;
    let error;
    try{
        const response = await apiClientNoAuth().get(vendorEndpoint);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}


async function getAllReviews(): Promise<APIResponse<ReviewType[]>> {
    let data;
    let error;
    try{
        const response = await apiClientNoAuth().get(reviewEndpoint);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}

async function createReview(token:string, reviewData:ReviewFormDataType): Promise<APIResponse<ReviewType>> {
    let data;
    let error;
    const url = 'https://marketanon.onrender.com/reviews'
    const options = {
        method:"POST",
        headers: {
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            title:reviewData.title,
            body:reviewData.body,
            rating:reviewData.rating,
            vendor:reviewData.vendor
        })
    }
    try {
        //const response = await apiClientTokenAuth(token).post(reviewEndpoint, reviewData)
        const response = await fetch(url, options)
        data = await response.json()
        console.log(data, 'data from create review')
        console.log(data.status, 'status from create review')
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}


async function getReviewById(reviewId:string|number): Promise<APIResponse<ReviewType>> {
    let data;
    let error;
    try{
        const response = await apiClientNoAuth().get(reviewEndpoint + '/' + reviewId)
        data= response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}

async function getReviewsByCompany(companyName:string): Promise<APIResponse<ReviewType[]>> {
    let data;
    let error;
    try{
        const response = await apiClientNoAuth().get(reviewEndpoint + '/' + companyName)
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}


async function editReviewById(reviewId:string|number, token:string, editedReviewData:ReviewFormDataType): Promise<APIResponse<ReviewType>> {
    let data;
    let error;
    const url = `https://marketanon.onrender.com/reviews/${reviewId}`
    const options = {
        method:"PUT",
        headers: {
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            title: editedReviewData.title,
            body: editedReviewData.body,
            rating: editedReviewData.rating
        })}
        try{
            const response = await fetch(url, options)
            console.log(response, 'response inside of editReview')
            data = await response.json()
            console.log(data, 'response inside of editReview')
        }    
        catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data?.error || `Post with ID ${reviewId} does not exist`
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}

async function deleteReviewById(reviewId:string|number, token:string): Promise<APIResponse<string>> {
    let data;
    let error;
    const url = `https://marketanon.onrender.com/reviews/${reviewId}`
    //const returnurl = `https://marketanon.onrender.com/reviews/${company}`
    console.log(url, 'review URL to be deleted')
    const options = {
        method:"DELETE",
        headers: {
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`}}
    try {
        const response = await fetch(url, options)
        console.log(response, 'fetch response inside delete rev by ID')
        data = await response.json()
        console.log(data, 'data .json after fetch req in delete rev by ID')
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data?.error || `Post with ID ${reviewId} does not exist`
        } else {
            error = 'Something went wrong'
        }
    }
    return { error }
}




export {
    register,
    getAllVendors,
    getAllReviews,
    login,
    getMe,
    createReview,
    getReviewsByCompany,
    getReviewById,
    editReviewById,
    deleteReviewById,
    apiClientTokenAuth
}