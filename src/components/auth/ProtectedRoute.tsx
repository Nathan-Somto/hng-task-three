import {User} from 'firebase/auth'
import {Navigate} from 'react-router-dom'
import Loader from './Loader'
type Props = {
    User: User | null,
    loading:boolean,
    children:React.ReactNode
}
export default function ProtectedRoute({User, loading, children}: Props){
    if(loading) return <Loader/>
    if(!User){
        return <Navigate to='/login' replace/>
    }
    return children;
}