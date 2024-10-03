import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBounties } from '../../store/bounty';
import { useNavigate } from 'react-router-dom';
import BountyCard from '../BountyCard/BountyCard';

export default function SplashPage() {
    const dispatch = useDispatch();
    // const bounties = useSelector(state => state.bounties.bounties)
    const bounties = useSelector(state => state.bounties.bounties);
    const user = useSelector(state => state.session.user);
    console.log("bounties", bounties)
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchBounties()); 
    }, [dispatch]);

    //Handlers
    const goToBounty = (e, bounty) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(`/bounty/${bounty.id}`); 
    };
    const goToCreateBounty = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(`/create-bounty`);  // Navigate to the Create Bounty form
    };

    return(
        <>
            <div className="SplashPage">
                <div className="SplashPage__title">
                    <h1>Welcome to Challenge Bounty</h1>
                    <p>Discover all available bounties</p>
                </div>
                {user && ( // Show the button only if the user is logged in
                    <button className="SplashPage__createButton" onClick={goToCreateBounty}>
                        Create a Bounty
                    </button>
                )}
                <div className="SplashPage__bounties">
                    {bounties && bounties.map(bounty => (
                        <div key={bounty.id} className="SplashPage__bounty" onClick={(e) => goToBounty(e, bounty)}>
                            <BountyCard key={bounty.id} bounty={bounty} userId={user.id} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}