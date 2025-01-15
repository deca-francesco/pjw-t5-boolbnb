import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SingleApartment from "../components/SingleApartment"
import OwnerSingleApartment from "../components/OwnerSingleApartment"
import ReviewFormCard from "../components/ReviewFormCard";
import ContactOwner from "../components/ContactOwner";

export default function SingleApartmentPage() {
    //Retrieve the 'id' parameter from the URL using useParams.
    const { id } = useParams()
    const apiUrl = import.meta.env.VITE_EXPRESS_API_SERVER

    const [apartment, setApartment] = useState(null)
    const [showForm, setShowForm] = useState(false);


    //useEffect to load apartment details
    useEffect(() => {
        fetch(`${apiUrl}/apartments/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setApartment(data);
            }).catch(err => console.error(err))
    }, [id])

    const toggleForm = () => {
        setShowForm(!showForm);
    }

    return (
        <>
            <div className="container">
                {apartment && apartment.data ? (
                    // Pass the apartment data as a prop to the ApartmentCard component
                    <SingleApartment apartment={apartment.data} setApartments={setApartment} />
                ) : (
                    // Show a loading message while the apartment data is being fetched
                    <p>Loading...</p>
                )}


                {/* Display the OwnerInfo component if the owner information is available */}
                {apartment && apartment.data && apartment.data.owner && (
                    <OwnerSingleApartment owner={apartment.data.owner} />
                )}

                <div className="d-flex">
                    <button className='btn btn-primary m-4 text-dark' onClick={toggleForm}>
                        {showForm ? 'Close' : 'Add Review'}
                    </button>
                    {showForm && <ReviewFormCard apartment_id={id} />}
                    <ContactOwner></ContactOwner>
                </div>
            </div>

        </>
    )
}