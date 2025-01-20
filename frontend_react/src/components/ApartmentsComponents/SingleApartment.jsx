import HeartIconVote from './HeartIconVote'

const ApartmentCard = ({ apartment, setApartment }) => {
  // Controlla se esistono immagini
  const images = apartment.images;

  return (
    <>
      {apartment ? (
        <div>
          <div className='d-flex justify-content-between'>
            <h2 style={{ fontSize: "2rem" }}>{apartment.title}</h2>
            <HeartIconVote data_apartment={apartment} setApartment={setApartment} />
          </div>

          <div className='mt-3 mb-3'>
            <div className="card mb-3 border-0">
              <div className="row g-0">
                {/* Colonna per l'immagine grande */}
                {!images ? (
                  <p>No images available</p>  // Se non ci sono immagini
                ) : (
                  <div className="col-6 p-1">
                    <img
                      src={images[0]} // Usa la prima immagine nell'array images
                      alt={apartment.title}
                      className="img-fluid"
                      style={{
                        borderTopLeftRadius: "10px",
                        borderBottomLeftRadius: "10px",
                        height: "100%",
                        objectFit: "cover",
                        width: "100%",
                      }}
                    />
                  </div>
                )}

                {/* Colonna per le immagini piccole */}
                <div className="col-6 d-flex flex-wrap">
                  {images && images.length > 1 && (
                    images.slice(1).map((image, index) => ( // Salta la prima immagine se presente
                      <div key={index} className="col-6 p-1">
                        <img
                          src={image} // Ogni immagine è un URL
                          alt={`${apartment.title} Small ${index + 1}`}
                          className="img-fluid"
                          style={{
                            objectFit: "cover",
                            width: "100%",
                            height: "auto",
                          }}
                        />
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Display apartment details */}
            <div className='col-4'>
              <p className='mb-1'><strong>Letti:</strong> {apartment.beds}</p>
              <p className='mb-1'><strong>Bagni:</strong> {apartment.bathrooms}</p>
              <p className='mb-1'><strong>Metri Quadri:</strong> {apartment.square_meters} m²</p>
              <p className='mb-1'><strong>Stanze:</strong> {apartment.rooms}</p>
              <p className='mb-1'><strong>Indirizzo:</strong> {apartment.address}</p>
              <p className='mb-1'><strong>Città:</strong> {apartment.city}</p>
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
        </div>
      ) : (
        <div>Loading apartment...</div>
      )}
    </>
  );
}

export default ApartmentCard;
