import { Link } from 'react-router-dom'
import HeartIconVote from './HeartIconVote'
export default function ApartmentCard({ apartment, setApartments }) {


    return (

        <>
            <div className="card bg-white text-dark border-0 shadow rounded" style={{ maxWidth: "22rem" }}>
                <Link
                    to={`/apartments/${apartment.id}`}
                    className="text-decoration-none text-dark"
                    style={{ height: "25rem" }}
                >
                    <img
                        src={apartment.image}
                        alt={apartment.title}
                        className="img-fluid rounded-top"
                        style={{
                            height: "270px",
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
                </Link>
                <div className="pt-2">
                    <HeartIconVote data_apartment={apartment} setApartments={setApartments} />
                </div>
            </div>




        </>

    )
}