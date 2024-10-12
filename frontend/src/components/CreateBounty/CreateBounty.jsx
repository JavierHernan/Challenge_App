import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createBounty } from '../../store/bounty';
import { useSelector } from 'react-redux';
import './CreateBounty.css'

export default function CreateBounty() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector(state => state.session.user);
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    // const [errors, setErrors] = useState([]);
    const [errors, setErrors] = useState({});
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => { //submit button is disabled if title or description are empty
        if (title.trim() && description.trim()) { //trim() removed extra white space
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [title, description]);

    if (!currentUser) {
        navigate('/');
        return null;
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = {};
        // Frontend validation
        if (title.length > 50) {
            validationErrors.title = 'Title cannot be more than 50 characters';
        }
        if (description.length > 500) {
            validationErrors.description = 'Description cannot be more than 500 characters';
        }
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const bountyData = {
            title,
            description,
            userId: currentUser.id  // Set userId to the logged-in user's ID
        };

        try {
            await dispatch(createBounty(bountyData));
            navigate('/');  // Redirect to home after successful creation
        } catch (err) {
            // Handle errors if needed (e.g., validation errors)
            const responseErrors = await err.json();
            setErrors(responseErrors.errors || ['Something went wrong. Please try again.']);
        }
    };
    return (
        <>
            <form className='CreateBounty-form' onSubmit={handleSubmit}>
            <h2>Create a New Bounty</h2>
                {/* <ul>
                    {Object.values(errors).map((error, index) => <li key={index}>{error}</li>)}
                </ul> */}
                <label className='CreateBounty-title-label'>
                    Title:
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        // maxLength="50"
                    />
                </label>
                {errors.title && <p className="error">{errors.title}</p>}
                <label className='CreateBounty-description-label'>
                    Description:
                    <textarea 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        // maxLength="500"
                    />
                </label>
                {errors.description && <p className="error">{errors.description}</p>}
                <div className='CreateBounty-submit-container'>
                    <button type="submit" disabled={isButtonDisabled}>Create Bounty</button>
                </div>
            </form>
        </>
    )
}