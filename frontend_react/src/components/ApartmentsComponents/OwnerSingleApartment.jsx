// components/OwnerInfo.jsx
import React from 'react';

// The OwnerInfo component receives the owner object as a prop and displays the owner's details.
const OwnerInfo = ({ owner }) => {
    // If the owner object is not available, return null to avoid rendering anything
    if (!owner) return null;

    return (
        <div className="owner-info p-3">
            <h5>Proprietario</h5>
            <p><srong><i class="bi bi-person-fill m-1"></i></srong>{owner.name + " "+ owner.last_name}</p>
            <p></p>
            <p><strong><i class="bi bi-envelope-fill m-1"></i></strong> {owner.email}</p>
            <p><strong><i class="bi bi-telephone-fill m-1"></i></strong> {owner.phone_number}</p>
        </div>
    );
};

export default OwnerInfo;
