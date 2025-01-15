import React from 'react';
import HeartIconVote from './HeartIconVote'

const ApartmentCard = ({ apartment, setApartments }) => {

  return (
    <div>
      <div className='m-4'>
        <h2>{apartment.title}</h2>
        <HeartIconVote data_apartment={apartment} setApartments={setApartments} />
      </div>

      <div className='mt-3 mb-3'>
        <div className="card mb-3 border-0">
          <div className="row g-0">
            {/* Colonna per l'immagine grande - SISTEMARE BG CARD */}
            {apartment.image && (
              <div className="col-6 p-1">
                <img
                  src={apartment.image}
                  alt={apartment.title}
                  className="img-fluid rounded"
                  style={{ height: "100%", objectFit: "cover", width: "100%" }}
                />
              </div>
            )}

            {/* Colonna per le immagini piccole */}
            <div className="col-6 d-flex flex-wrap">
              {apartment.image && (
                <>
                  {/* Quattro immagini piccole */}
                  <div className="col-6 p-1">
                    <img
                      src={apartment.image}
                      alt={`${apartment.title} Small 1`}
                      className="img-fluid rounded"
                      style={{ objectFit: "cover", width: "100%", height: "auto" }}
                    />
                  </div>
                  <div className="col-6 p-1">
                    <img
                      src={apartment.image}
                      alt={`${apartment.title} Small 2`}
                      className="img-fluid rounded"
                      style={{ objectFit: "cover", width: "100%", height: "auto" }}
                    />
                  </div>
                  <div className="col-6 p-1">
                    <img
                      src={apartment.image}
                      alt={`${apartment.title} Small 3`}
                      className="img-fluid rounded"
                      style={{ objectFit: "cover", width: "100%", height: "auto" }}
                    />
                  </div>
                  <div className="col-6 p-1">
                    <img
                      src={apartment.image}
                      alt={`${apartment.title} Small 4`}
                      className="img-fluid rounded"
                      style={{ objectFit: "cover", width: "100%", height: "auto" }}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {/* Display the apartment details*/}
        <div className='col-4'>
          <p className='mb-1'><strong>Beds:</strong> {apartment.beds}</p>
          <p className='mb-1'><strong>Bathrooms:</strong> {apartment.bathrooms}</p>
          <p className='mb-1'><strong>Square Meters:</strong> {apartment.square_meters} m²</p>
          <p className='mb-1'><strong>Rooms:</strong> {apartment.rooms}</p>
          <p className='mb-1'><strong>Address:</strong> {apartment.address}</p>
        </div>
        {/* Display the services if available */}
        {apartment.services && apartment.services.length > 0 && (
          <div className="services-section">
            <h5>Servizi:</h5>
            <ul>
              {apartment.services.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default ApartmentCard;
