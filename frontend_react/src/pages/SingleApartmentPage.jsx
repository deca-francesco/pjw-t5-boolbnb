import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SingleApartment from '../components/ApartmentsComponents/SingleApartment'
import OwnerSingleApartment from "../components/ApartmentsComponents/OwnerSingleApartment"
import ReviewFormCard from "../components/ApartmentsComponents/ReviewFormCard";
import ContactOwner from "../components/ApartmentsComponents/ContactOwner";
import ReviewCard from "../components/ApartmentsComponents/ReviewCard";

export default function SingleApartmentPage() {
    //Retrieve the 'id' parameter from the URL using useParams.
    const { id, title } = useParams()
    // console.log(id, title);

    const apiUrl = import.meta.env.VITE_EXPRESS_API_SERVER

    const navigate = useNavigate()

    const [apartment, setApartment] = useState(null)
    const [showForm, setShowForm] = useState(false);
    const [reviews, setReviews] = useState([])


    //useEffect to load apartment details
    useEffect(() => {
        const fetchApartmentDetails = async () => {
            try {
                const formattedTitle = title.replace(/\s+/g, '-');
                // console.log(`Fetching: ${apiUrl}/apartments/${id}/${formattedTitle}`);
                navigate(`/apartments/${id}/${formattedTitle}`, { replace: true });
                const response = await fetch(`${apiUrl}/apartments/${id}/${formattedTitle}`);
                const data = await response.json();
                console.log(data.data);

                setApartment(data.data);
                setReviews(data.data.reviews);
            } catch (err) {
                console.error(err);
            }
        };

        fetchApartmentDetails()
    }, [id, title])

    useEffect(() => {
        // Qui possiamo fare qualcosa ogni volta che la lista delle recensioni cambia
        // console.log('Recensioni aggiornate:', reviews);
    }, [reviews]);

    const toggleForm = () => {
        setShowForm(!showForm);
    }

    return (
        <>
            <div className="container">
                {apartment ? (
                    // Pass the apartment data as a prop to the ApartmentCard component
                    <SingleApartment apartment={apartment} setApartment={setApartment} />
                ) : (
                    // Show a loading message while the apartment data is being fetched
                    <p>Loading...</p>
                )}


                {/* Display the OwnerInfo component if the owner information is available */}
                <hr />
                <div className=''>
                    {apartment && (
                        <OwnerSingleApartment owner={apartment.owner} />
                    )}
                    <ContactOwner apartmentId={id}></ContactOwner>
                </div>

                <hr />

                <div className="container">
                    <div>
                        <button className='btn btn-dark mt-5  mb-3 m-1 text-white' onClick={toggleForm}>
                            {showForm ? <i className="bi bi-x-circle-fill"></i> : 'Scrivi Una Recesione'}
                        </button>
                        {showForm && <ReviewFormCard apartment_id={id} setReviews={setReviews} />}
                    </div>

                </div>
                <ReviewCard reviews={reviews} setReviews={setReviews}></ReviewCard>
            </div>

        </>
    )
}