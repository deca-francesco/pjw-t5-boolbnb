// components/OwnerInfo.jsx
import React from 'react';

// The OwnerInfo component receives the owner object as a prop and displays the owner's details.
const OwnerInfo = ({ owner }) => {
    // If the owner object is not available, return null to avoid rendering anything
    if (!owner) return null;

    return (
        <div className="owner-info p fs-5">
            <h5>Proprietario</h5>
            <p className='m-0'><strong><i className="bi bi-person-fill"></i></strong>{owner.name + " " + owner.last_name}</p>
            {owner.phone_number && <p className='m-0'><strong><i className="bi bi-telephone-fill"></i></strong> {owner.phone_number}</p>}
        </div>
    );
};

export default OwnerInfo;
