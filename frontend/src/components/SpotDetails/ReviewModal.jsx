import {useState} from 'react';

const ReviewModal = ({ isOpen, onClose, onSubmit }) => {
    const [reviewText, setReviewText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(reviewText);
        setReviewText(''); 
        onClose(); 
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Post Your Review</h2>
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Write your review here..."
                        required
                    />
                    <button type="submit">Submit</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default ReviewModal;