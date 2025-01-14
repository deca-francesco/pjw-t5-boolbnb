import { Link } from 'react-router-dom'
import HeartIconVote from './HeartIconVote'
export default function ApartmentCard({ apartment, setApartments }) {


    return (

        <>
            <div className='card bg-white text-dark p-3'>

                <Link to={`/apartments/${apartment.id}`} className='text-decoration-none text-dark'>
                    <img src={apartment.image} alt={apartment.title} className='img-fluid' style={{ height: '270px', objectFit: 'cover', width: '100%' }} />

                    <h3 className='title'><strong>{apartment.title}</strong></h3>

                    <p className='address'>{apartment.address}</p>

                </Link>
                <div className='d-flex align-items-center justify-content-end'>
                    <HeartIconVote data_apartment_id={apartment.id} setApartments={setApartments} />
                    <span className='ms-1'>{apartment.vote}</span>
                </div>

            </div>



        </>

    )
}