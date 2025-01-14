import React from 'react';

const ApartmentCard = ({ apartment }) => {
    return (
        <div className="card">
            <div className="card-header">
                <h2 className="card-title">{apartment.title}</h2>
            </div>
            <div className="card-body">
                {/* Check if the image exists and display it if true */}
                {apartment.image && (
                    <div className="apartment-image">
                        <img
                            src={apartment.image}
                            alt={apartment.title}
                            className="img-fluid"
                            style={{ maxWidth: "100%", height: "auto" }}
                        />
                    </div>
                )}
                {/* Display the apartment details */}
                <p><strong>Beds:</strong> {apartment.beds}</p>
                <p><strong>Bathrooms:</strong> {apartment.bathrooms}</p>
                <p><strong>Square Meters:</strong> {apartment.square_meters} m²</p>
                <p><strong>Rooms:</strong> {apartment.rooms}</p>
                <p><strong>Address:</strong> {apartment.address}</p>
            </div>
        </div>
    );
}

export default ApartmentCard;