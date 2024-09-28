import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBounties } from '../../store/bounty';
import { useNavigate } from 'react-router-dom';

export default function SplashPage() {

    return(
        <>
            <h1>THIS IS THE SPLASHPAGE</h1>
        </>
    )
}