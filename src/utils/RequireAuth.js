import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { reset } from '../features/authSlice';

const ToLogin = (props) => {

    const { location } = props;

    const dispatch = useDispatch();
    
    React.useEffect(() => {
        dispatch(reset());
    })
    return (
        <Navigate to="/login" state={{ from: location }} replace />
    );
}

const RequireAuth = () => {
    const location = useLocation();
    const token = localStorage.getItem('token');

    return (
        token ? <Outlet /> : <ToLogin {...location} />
    );
}

export default RequireAuth