import HeartIconVote from './HeartIconVote'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPanorama, faCar, faDumbbell, faMugHot, faPaw, faPersonSwimming, faTv, faWind, faShirt, faWifi } from '@fortawesome/free-solid-svg-icons'

const ApartmentCard = ({ apartment, setApartment }) => {
  // Controlla se esistono immagini
  const images = apartment.images;

  const getServiceIcon = (service) => {
    if (service === 'Wi-Fi gratuito') {
      return <FontAwesomeIcon icon={faWifi} /> // Icona Wi-Fi
    } else if (service === 'Parcheggio privato') {
      return <FontAwesomeIcon icon={faCar} /> // Icona Parcheggio
    } else if (service === 'Piscina') {
      return <FontAwesomeIcon icon={faPersonSwimming} /> // Icona Piscina
    } else if (service === 'Aria condizionata') {
      return <FontAwesomeIcon icon={faWind} /> // Icona Aria condizionata
    } else if (service === 'Lavatrice') {
      return <FontAwesomeIcon icon={faShirt} />// Icona Lavatrice
    } else if (service === 'Colazione inclusa') {
      return <FontAwesomeIcon icon={faMugHot} /> // Icona Colazione
    } else if (service === 'Palestra') {
      return <FontAwesomeIcon icon={faDumbbell} /> // Icona Palestra
    } else if (service === 'Animali ammessi') {
      return <FontAwesomeIcon icon={faPaw} /> // Icona Animali ammessi
    } else if (service === 'TV via cavo') {
      return <FontAwesomeIcon icon={faTv} />// Icona TV
    } else if (service === 'Terrazza panoramica') {
      return <FontAwesomeIcon icon={faPanorama} />
    }
    else {
      return null; // In caso di servizio non definito
    }
  }

  return (
    <>
      {apartment ? (
        <div>
          <div className="d-flex justify-content-between">
            <h2 style={{ fontSize: "2rem" }}>{apartment.title}</h2>
            <HeartIconVote data_apartment={apartment} setApartment={setApartment} />
          </div>

          <div className="mt-3 mb-3">
            <div className="card mb-3 border-0">
              <div className="row g-0">
                {/* Colonna per l'immagine grande */}
                {!images ? (
                  <p>No images available</p>  // Se non ci sono immagini
                ) : (
                  <div className="col-12 col-md-6 p-1">
                    <img
                      src={images[0]} // Usa la prima immagine nell'array images
                      alt={apartment.title}
                      className="img-fluid"
                      style={{
                        height: "100%",
                        objectFit: "cover",
                        width: "100%",
                      }}
                    />
                  </div>
                )}

                {/* Colonna per le immagini piccole */}
                <div className="col-12 col-md-6 p-1">
                  <div className="row g-1">
                    {images && images.length > 1 && (
                      images.slice(1, 5).map((image, index) => ( // Prende le prime 4 immagini
                        <div key={index} className="col-6">
                          <div className="d-flex justify-content-center align-items-center">
                            <img
                              src={image} // Ogni immagine è un URL
                              alt={`${apartment.title} Small ${index + 1}`}
                              className="img-fluid"
                              style={{
                                objectFit: "cover", // Copri l'area senza distorcere l'immagine
                                width: "100%", // Imposta la larghezza al 100% del contenitore
                                height: "100%", // Imposta l'altezza fissa per tutte le immagini
                              }}
                            />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Display apartment details */}
            <div className="col-4">
              <p className="mb-1"><strong>Letti:</strong> {apartment.beds}</p>
              <p className="mb-1"><strong>Bagni:</strong> {apartment.bathrooms}</p>
              <p className="mb-1"><strong>Metri Quadri:</strong> {apartment.square_meters} m²</p>
              <p className="mb-1"><strong>Stanze:</strong> {apartment.rooms}</p>
              <p className="mb-1"><strong>Indirizzo:</strong> {apartment.address}</p>
              <p className="mb-1"><strong>Città:</strong> {apartment.city}</p>
            </div>

            {/* Display the services if available */}
            {apartment.services && apartment.services.length > 0 && (
              <div className="services-section">
                <hr />
                <h5>Servizi:</h5>
                <ul>
                  {apartment.services.map((service, index) => (
                    <li key={index} className="d-flex align-items-center justify-content-start">
                      <span className="me-2">{getServiceIcon(service)}</span>
                      <span>{service}</span>
                    </li>
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
