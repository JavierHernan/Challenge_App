// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

export default function CommentCard({comment}) {
    console.log("COMMENT IN COMMENTCARD.JSX", comment)
    return (
        <>
            <div className="comment-card">
                <h3>{comment.User.username}</h3>
                <p>{comment.comment}</p>
            </div>
        </>
    )
}