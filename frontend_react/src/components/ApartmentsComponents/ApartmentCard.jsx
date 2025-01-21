import { Link } from 'react-router-dom';
import HeartIconVote from './HeartIconVote';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBathtub, faBed, faDoorClosed } from '@fortawesome/free-solid-svg-icons';

export default function ApartmentCard({ apartment, setApartments, setFilteredApartments }) {
    // Se l'appartamento ha immagini
    const images = apartment.images && apartment.images.length > 0 ? apartment.images : [];

    return (
        <div className="card bg-white text-dark border-0 shadow rounded" style={{ maxWidth: "22rem" }}>
            <Link
                to={`/apartments/${apartment.id}/${apartment.title}`}
                className="text-decoration-none text-dark"
                style={{ height: "25rem" }}
            >
                {/* Mostra l'immagine principale se disponibile, altrimenti usa una predefinita */}
                <img
                    src={images.length > 0 ? images[0] : '/path/to/default-image.jpg'} // Usa la prima immagine o un'immagine di fallback
                    alt={apartment.title}
                    className="img-fluid rounded-top"
                    style={{
                        height: "250px",
                        objectFit: "cover",
                        width: "100%",
                    }}
                />
                <h3 className="title p-2 m-0" style={{ fontFamily: "'Montserrat', cursive", fontSize: "1.5rem" }}>
                    <strong>{apartment.title}</strong>
                </h3>
                <p className="address p-2 m-0 text-muted" style={{ fontSize: "1rem" }}>
                    {apartment.address}
                </p>
                <p className="address p-2 m-0 text-muted" style={{ fontSize: "1rem" }}>
                    <strong>{apartment.city}</strong>
                </p>
            </Link>
            <div className="pt-2 d-flex justify-content-between">
                <p className="address p-2 m-0 text-muted" style={{ fontSize: "1rem" }}>
                    <strong>
                        <FontAwesomeIcon icon={faDoorClosed} /> {apartment.rooms}
                    </strong>
                    <span className='ms-2'>
                        <strong>
                            <FontAwesomeIcon icon={faBed} /> {apartment.beds}
                        </strong>
                    </span>
                    <span className='ms-2'>
                        <strong>
                            <FontAwesomeIcon icon={faBathtub} /> {apartment.bathrooms}
                        </strong>
                    </span>
                </p>
                <HeartIconVote data_apartment={apartment} setApartments={setApartments} setFilteredApartments={setFilteredApartments} />
            </div>

        </div>
    );
}
