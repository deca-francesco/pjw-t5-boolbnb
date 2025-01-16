import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SingleApartment from '../components/ApartmentsComponents/SingleApartment'
import OwnerSingleApartment from "../components/ApartmentsComponents/OwnerSingleApartment"
import ReviewFormCard from "../components/ApartmentsComponents/ReviewFormCard";
import ContactOwner from "../components/ApartmentsComponents/ContactOwner";
import ReviewCard from "../components/ApartmentsComponents/ReviewCard";

export default function SingleApartmentPage() {
    //Retrieve the 'id' parameter from the URL using useParams.
    const { id } = useParams()
    const apiUrl = import.meta.env.VITE_EXPRESS_API_SERVER

    const [apartment, setApartment] = useState(null)
    const [showForm, setShowForm] = useState(false);


    //useEffect to load apartment details
    useEffect(() => {
        const fetchApartmentDetails = async () => {
            try {
                const response = await fetch(`${apiUrl}/apartments/${id}`);
                const data = await response.json();
                console.log(data);
                setApartment(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchApartmentDetails()
    }, [id])

    const toggleForm = () => {
        setShowForm(!showForm);
    }

    return (
        <>
            <div className="container">
                {apartment ? (
                    // Pass the apartment data as a prop to the ApartmentCard component
                    <SingleApartment apartment={apartment.data} setApartment={setApartment} />
                ) : (
                    // Show a loading message while the apartment data is being fetched
                    <p>Loading...</p>
                )}


                {/* Display the OwnerInfo component if the owner information is available */}
                <hr />
                {apartment && apartment.data && apartment.data.owner && (
                    <OwnerSingleApartment owner={apartment.data.owner} />
                )}
                <hr />
                <div className="container d-flex align-items-center">
                    <div>
                        <button className='btn btn-dark m-4 text-white' onClick={toggleForm}>
                            {showForm ? 'Chiudi' : 'Inserisci Una Recesione'}
                        </button>
                        {showForm && <ReviewFormCard apartment_id={id} />}
                    </div>
                    <ContactOwner></ContactOwner>
                </div>
                <ReviewCard></ReviewCard>
            </div>

        </>
    )
}