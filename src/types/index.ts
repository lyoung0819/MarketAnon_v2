// TYPES
export type UserBuyerType = {
  id: number,
  firstName: string,
  lastName: string,
  username: string,
  title: string,
  company: string,
  email: string,
  password: string
}

export type VendorType = {
  id: number,
  companyName: string
}

export type ReviewType = {
    id: number,
    title: string,
    body: string,
    rating: number
    date_created: string,
    author: UserBuyerType,
    vendor_id: number|string
  }
  
  
export type ReviewFormDataType = {
    title: string,
    body: string,
    vendor: string,
    rating: number
}

export type UserFormDataType = {
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  company: string,
  title: string,
  password: string,
  confirmPassword: string
}

export type CategoryType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'

export type TokenType = {
    token: string,
    tokenExpiration: string
}