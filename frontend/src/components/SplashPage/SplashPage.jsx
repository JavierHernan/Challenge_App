import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBounties, removeBounty } from '../../store/bounty';
import { useNavigate } from 'react-router-dom';
import BountyCard from '../BountyCard/BountyCard';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import UpdateBountyForm from '../BountyModals/UpdateBountyForm';
import './SplashPage.css'

export default function SplashPage() {
    const dispatch = useDispatch();
    // const bounties = useSelector(state => state.bounties.bounties)
    const bounties = useSelector(state => state.bounties.bounties);
    console.log("BOUNTIES SPLASHPAGE", bounties, )
    const user = useSelector(state => state.session.user);
    console.log("USER SPLASHPAGE", user)
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
        navigate(`/bounty/new`);  // Navigate to the Create Bounty form
    };
    const handleDelete = (bountyId) => {
        console.log("Deleting Bounty ID:", bountyId);
        dispatch(removeBounty(bountyId));
    };

    return(
        <>
            <div className="SplashPage">
                <div className="SplashPage-title">
                    <h1>Welcome Challenger</h1>
                    <p>Discover all available Bounties</p>
                </div>
                {user && ( // Show the button only if the user is logged in
                    <button className="create-bounty-button" onClick={goToCreateBounty}>
                        Create a Bounty
                    </button>
                )}
                {/* <div className="bounties-section">
                    {bounties && bounties.map(bounty => (
                            <div className="SplashPage-bounty" key={bounty.id}>
                                <div onClick={(e) => goToBounty(e, bounty)}>
                                    <BountyCard bounty={bounty} userId={user ? user.id : null} />
                                </div>
                                {user && bounty.userId === user.id && (
                                    <div className="BountyCard-update-delete">
                                        <button>
                                            <OpenModalMenuItem
                                                modalComponent={<UpdateBountyForm bounty={bounty} />}
                                                itemText="Update Bounty"
                                            />
                                        </button>
                                        <button className='BountyCard-delete-button' onClick={() => handleDelete(bounty.id)}>Delete Bounty</button>
                                    </div>
                                )}
                            </div>
                    ))}
                </div> */}
                <div className="bounties-section">
                    {bounties && bounties.length > 0 ? ( //are there bounties?
                        bounties.filter(bounty => bounty !== null).map(bounty => ( //filter for existing bounties and map
                            <div className="SplashPage-bounty" key={bounty.id}>
                                <div onClick={(e) => goToBounty(e, bounty)}>
                                    {/* <BountyCard bounty={bounty} userId={user ? user.id : null} /> */}
                                    <BountyCard bounty={bounty} />
                                </div>
                                {user !== null && bounty.userId === user.id && ( //does this bounty belong to current user? if so, show update/delete button
                                    <div className="BountyCard-update-delete">
                                        <button>
                                            <OpenModalMenuItem
                                                modalComponent={<UpdateBountyForm bounty={bounty} />}
                                                itemText="Update Bounty"
                                            />
                                        </button>
                                        <button
                                            className="BountyCard-delete-button"
                                            onClick={() => handleDelete(bounty.id)}
                                        >
                                            Delete Bounty
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No bounties available at the moment.</p>  // Fallback message if no bounties
                    )}
                </div>
                <div className="gif-container">
                    <iframe
                        src="https://giphy.com/embed/MxYQrB9jeGzza"
                        width="480"
                        height="473"
                        frameBorder="0"
                        allowFullScreen
                        title="giphy"
                    ></iframe>
                </div>
            </div>
        </>
    )
}