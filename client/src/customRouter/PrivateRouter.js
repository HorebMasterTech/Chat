import { Route, Navigate } from 'react-router-dom'

const PrivateRouter = (props) => {
    const firstLogin = localStorage.getItem('firstLogin')
    return firstLogin ? <Route {...props} /> : <Navigate to="/" replace={true} />
}

export default PrivateRouter;
