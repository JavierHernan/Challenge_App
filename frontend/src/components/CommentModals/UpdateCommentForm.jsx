import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editComment } from '../../store/comment';
import { useModal } from '../../context/Modal';
import './UpdateComment.css'

export default function UpdateCommentForm({comment}) {
    const dispatch = useDispatch();
    const { closeModal, setLoadUpdate } = useModal();
    const [updatedComment, setUpdatedComment] = useState(comment.comment);
    const [errors, setErrors] = useState({});
    // console.log("COMMENT INSIDE UPDATECOMMENTFORM", comment)

    const isValidForm = () => {
        // return updatedComment.trim().length > 0 && updatedComment.length <= 500;
        let errors = {};
        if (updatedComment.trim().length === 0) {
            errors.comment = "Comment is required.";
        }
        if (updatedComment.length > 300) {
            errors.comment = "Comment cannot exceed 300 characters.";
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isValidForm()) return;
        await dispatch(editComment(
            comment.boungtyId,
            comment.id,
            { comment: updatedComment }
        ));
        //refetch comments to deal with User not loading issue 
        //in congruence with backend/routes/api/comment.js updatedComment
        // await dispatch(fetchComments(comment.bountyId)); //<<<<
        // window.location.reload(); //The worst fix ever
        setLoadUpdate(true)
        closeModal()

    };

    return (
        <>
            <form className='update-comment-form' onSubmit={handleSubmit}>
                <h2>Update Comment</h2>
                <label>
                    Comment:
                    <textarea
                        value={updatedComment}
                        onChange={(e) => setUpdatedComment(e.target.value)}
                    />
                </label>
                {errors.comment && <p className='error-message'>{errors.comment}</p>}
                <div className='update-comment-form-update-button'>
                    <button type="submit" >Update</button>
                </div>
            </form>
        </>
    )
}