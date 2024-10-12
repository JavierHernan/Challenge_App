import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateExistingBounty } from '../../store/bounty';
import { useModal } from '../../context/Modal';
import './UpdateBounty.css';

export default function UpdateBountyForm({bounty}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [title, setTitle] = useState(bounty.title);
    const [description, setDescription] = useState(bounty.description);
    const [errors, setErrors] = useState({});

    const isValidForm = () => {
        // return title.trim().length > 0 && description.trim().length > 0 && 
        //        title.length <= 50 && description.length <= 500;
        let errors = {};
        if (title.trim().length === 0) errors.title = "Title is required.";
        if (description.trim().length === 0) errors.description = "Description is required.";
        if (title.length > 50) errors.title = "Title cannot exceed 50 characters.";
        if (description.length > 500) errors.description = "Description cannot exceed 500 characters.";
        
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isValidForm()) return;
        const updatedBounty = {
            title,
            description,
        };
        dispatch(updateExistingBounty(bounty.id, updatedBounty));
        closeModal()
    };
    return (
        <form className='update-bounty-form' onSubmit={handleSubmit}>
            <h2>Update Bounty</h2>
            <label className='update-bounty-form-input-container'>
                Title:
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>
            {errors.title && <p className='error-message'>{errors.title}</p>}
            <label>
                Description:
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label>
            {errors.description && <p className='error-message'>{errors.description}</p>}
            <div className='update-bounty-form-update-button'>
                <button type="submit" >Update</button>
            </div>
        </form>
    )
}