import React, { useEffect } from 'react';
import HeartIconVote from './HeartIconVote'

const ApartmentCard = ({ apartment, setApartments, setApartment }) => {


  return (
    <>
      {apartment ? <div>
        <div className='d-flex justify-content-between'>
          <h2 style={{ fontSize: "2rem" }}>{apartment.title}</h2>
          <HeartIconVote data_apartment={apartment} setApartment={setApartment} />
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
                    className="img-fluid "
                    style={{ borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px", height: "100%", objectFit: "cover", width: "100%" }}
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
                        className="img-fluid"
                        style={{ objectFit: "cover", width: "100%", height: "auto" }}
                      />
                    </div>
                    <div className="col-6 p-1">
                      <img
                        src={apartment.image}
                        alt={`${apartment.title} Small 2`}
                        className="img-fluid rounded-right"
                        style={{ borderTopRightRadius: "10px", objectFit: "cover", width: "100%", height: "auto" }}
                      />
                    </div>
                    <div className="col-6 p-1">
                      <img
                        src={apartment.image}
                        alt={`${apartment.title} Small 3`}
                        className="img-fluid "
                        style={{ objectFit: "cover", width: "100%", height: "auto" }}
                      />
                    </div>
                    <div className="col-6 p-1">
                      <img
                        src={apartment.image}
                        alt={`${apartment.title} Small 4`}
                        className="img-fluid "
                        style={{ borderBottomRightRadius: "10px", objectFit: "cover", width: "100%", height: "auto" }}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          {/* Display the apartment details*/}
          <div className='col-4'>
            <p className='mb-1'><strong>Letti:</strong> {apartment.beds}</p>
            <p className='mb-1'><strong>Bagni:</strong> {apartment.bathrooms}</p>
            <p className='mb-1'><strong>Metri Quadri:</strong> {apartment.square_meters} m²</p>
            <p className='mb-1'><strong>Stanze:</strong> {apartment.rooms}</p>
            <p className='mb-1'><strong>Indirizzo:</strong> {apartment.address}</p>
          </div>
          {/* Display the services if available */}
          {apartment.services && apartment.services.length > 0 && (
            <div className="services-section">
              <hr />
              <h5>Servizi:</h5>
              <ul>
                {apartment.services.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div> : <div>loading apartment</div>}
    </>
  );
}

export default ApartmentCard;
