// components/OwnerInfo.jsx
import React from 'react';

// The OwnerInfo component receives the owner object as a prop and displays the owner's details.
const OwnerInfo = ({ owner }) => {
    // If the owner object is not available, return null to avoid rendering anything
    if (!owner) return null;

    return (
        <div className="owner-info">
            <h5>Owner</h5>
            <p><strong>Name:</strong> {owner.name}</p>
            <p><strong>Last name:</strong> {owner.last_name}</p>
            <p><strong>Email:</strong> {owner.email}</p>
            <p><strong>Phone number:</strong> {owner.phone_number}</p>
        </div>
    );
};

export default OwnerInfo;
