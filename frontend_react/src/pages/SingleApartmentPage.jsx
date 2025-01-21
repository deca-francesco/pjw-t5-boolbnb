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

    const [isOwner, setIsOwner] = useState(false)

    //useEffect to load apartment details
    useEffect(() => {
        const fetchApartmentDetails = async () => {
            try {
                const formattedTitle = title.replace(/\s+/g, '-');
                navigate(`/apartments/${id}/${formattedTitle}`, { replace: true });
                const response = await fetch(`${apiUrl}/apartments/${id}/${formattedTitle}`);
                const data = await response.json();
                console.log(data.data);

                setApartment(data.data);
                setReviews(data.data.reviews);

                // Recupera l'utente loggato
                const token = localStorage.getItem("authToken");
                if (token) {
                    const decodedToken = JSON.parse(atob(token.split(".")[1]));
                    if (decodedToken.id === data.data.owner.id) {
                        setIsOwner(true); // Verifica se l'utente è il proprietario
                    }
                }
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

                    {!isOwner && (
                        <ContactOwner apartmentId={id} />
                    )}

                </div>


                {!isOwner && (
                    <div>
                        <button className='btn btn-dark mt-5  mb-3 text-white' onClick={toggleForm}>
                            {showForm ? <i className="bi bi-x-circle-fill"></i> : 'Scrivi Una Recesione'}
                        </button>
                        {showForm && <ReviewFormCard apartment_id={id} setReviews={setReviews} />}
                    </div>
                )}
                <ReviewCard reviews={reviews} setReviews={setReviews}></ReviewCard>
            </div>

        </>
    )
}