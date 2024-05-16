import Alert from 'react-bootstrap/Alert'
import { CategoryType } from '../types'

type AlertMessageProps = {
    message: string|undefined,
    category: CategoryType|undefined,
    flashMessage: (newMessage: string|undefined, newCategory:CategoryType|undefined) => void
}

export default function AlertMessage({ message, category, flashMessage }: AlertMessageProps) {
  return (
    <Alert className='mt-3' variant={category} dismissible onClose={() => flashMessage(undefined, undefined)} >
        {message}
    </Alert>
  )
}