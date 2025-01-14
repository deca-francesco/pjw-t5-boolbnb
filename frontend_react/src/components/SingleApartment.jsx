import React from 'react';

const ApartmentCard = ({ apartment }) => {
    return (
        <div>
            <div>
                <h2>{apartment.title}</h2>
            </div>
            <div>
                {/* Check if the image exists and display it if true */}
                {apartment.image && (
                    <div className="apartment-image mb-3">
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