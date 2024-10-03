import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBounties } from '../../store/bounty';
import { fetchComments } from '../../store/comment';
import { useNavigate, useParams } from 'react-router-dom';
import CommentCard from '../CommentCard/CommentCard';

export default function BountyDetails() {
    const dispatch = useDispatch();
    const { bountyId } = useParams(); // Get the bountyId from the URL
    const bounty = useSelector(state => state.bounties.bounties.find(b => b.id === parseInt(bountyId)));
    const comments = useSelector(state => state.comments.allComments);
    console.log("COMMENTS", comments)
    // const comments = useSelector(state => Object.values(state.comments));

    useEffect(() => {
        dispatch(fetchBounties()); // Fetch bounties if not already fetched
        dispatch(fetchComments(bountyId));
    }, [dispatch, bountyId]);

    if (!bounty) return <div>Loading bounty details...</div>;

    const bountyComments = comments.filter(comment => comment.bountyId === parseInt(bountyId));
    console.log("BOUNTYCOMMENTS IN BOUNTYDETAILS.JSX", bountyComments)
    return (
        <>
            <div>
                <h1>{bounty.title}</h1>
                <p>{bounty.description}</p>
                {/* Add more details if needed */}
            </div>
            <div className="comments-section">
                <h2>Comments</h2>
                {bountyComments.length ? (
                    bountyComments.map(comment => (
                        <CommentCard key={comment.id} comment={comment} /> // Pass each comment to CommentCard
                    ))
                ) : (
                    <p>No comments yet. Be the first to comment!</p>
                )}
            </div>
        </>
    )
}

        // Will map over Comments with Comment bountyId matching id of current Bounty id.