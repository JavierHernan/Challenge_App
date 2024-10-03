// import { useEffect } from 'react';
import { useDispatch} from 'react-redux';
// import { fetchBounties } from '../../store/bounty';
// import { useNavigate } from 'react-router-dom';
// import CommentCard from '../CommentCard/CommentCard';
import { removeBounty } from '../../store/bounty';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import UpdateBountyForm from '../BountyModals/UpdateBountyForm';


export default function BountyCard({bounty, userId}) {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(removeBounty(bounty.id));
    };
    return (
        <div className="BountyCard">
        <h3>{bounty.title}</h3>
        <p>{bounty.description}</p>
        {bounty.userId === userId && ( // Only show buttons for the owner
            <div className="BountyCard__actions">
                <OpenModalMenuItem
                    modalComponent={<UpdateBountyForm bounty={bounty} />} // You will create this component
                    itemText="Update"
                />
                <button onClick={handleDelete}>Delete</button>
            </div>
        )}
    </div>
    )
}