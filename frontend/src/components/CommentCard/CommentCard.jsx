import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { deleteComment } from '../../store/comment';
import { removeComment } from '../../store/comment';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import UpdateCommentForm from '../CommentModals/UpdateCommentForm';

export default function CommentCard({comment}) {
    const dispatch = useDispatch();
    const { bountyId } = useParams();
    const currentUser = useSelector(state => state.session.user);

    console.log("COMMENT INSIDE COMMENTCARD", comment)
    //handlers
    const handleDelete = () => {
        dispatch(removeComment(comment.bountyId, comment.id)); // Dispatch the delete action
    };

    if (!comment) return <div>No comment available</div>;

    return (
        <>
            <div className="comment-card">
                <h3>{comment.User.username}</h3>
                <p>{comment.comment}</p>
                {/* {comment.User ? (
                    <>
                        <h3>{comment.User.username}</h3>
                        <p>{comment.comment}</p>
                    </>
                ) : (
                    <h3>Loading user info...</h3> // A fallback if user is not yet loaded
                )} */}
                {currentUser && currentUser.id === comment.userId && (
                <div className="comment-actions">
                    <button>
                        <OpenModalMenuItem
                            modalComponent={<UpdateCommentForm comment={comment} />}
                            itemText="Update"
                            bountyId={bountyId}
                        />
                    </button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}
            </div>
        </>
    )
}