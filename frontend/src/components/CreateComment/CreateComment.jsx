import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createComment, fetchComments } from '../../store/comment';
import { useModal } from '../../context/Modal';
import './CreateComment.css'

export default function CreateComment({bountyId, onCommentCreated}) {
    const [comment, setComment] = useState('');
    // const [errors, setErrors] = useState([]);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const isValidForm = () => {
        let errors = {};
        if (comment.trim().length === 0) {
            errors.comment = "Comment is required.";
        }
        if (comment.length > 300) {
            errors.comment = "Comment cannot exceed 300 characters.";
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // e.stopPropagation();
        if (!isValidForm()) return;
        const newComment = {
            comment,
            bountyId
        };

        const result = await dispatch(createComment(
            bountyId,
            newComment
        ));

        if (result.errors) {
            // setErrors(result.errors);
            setErrors({ general: result.errors });
        } else {
            onCommentCreated(result)
            await dispatch(fetchComments(bountyId))
            closeModal(); // Close modal on successful comment submission
        }

    };
    return(
        <>
            <form className='create-comment-form' onSubmit={handleSubmit}>
                <h2>Leave a Comment</h2>
                {/* {errors.length > 0 && (
                    <ul>
                        {errors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                )} */}
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                />
                {errors.comment && <p className='error-message'>{errors.comment}</p>}
                <div className='create-comment-form-update-button'>
                    <button type="submit">Submit Comment</button>
                </div>
            </form>
        </>
    )
}