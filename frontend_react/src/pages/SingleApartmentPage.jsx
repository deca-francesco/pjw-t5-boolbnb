import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SingleApartment from "../components/SingleApartment"

export default function SingleApartmentPage() {
    //Retrieve the 'id' parameter from the URL using useParams.
    const { id } = useParams()
    const apiUrl = import.meta.env.VITE_EXPRESS_API_SERVER

    const [apartment, setApartment] = useState(null)


    //useEffect to load apartment details
    useEffect(() => {
        fetch(`${apiUrl}/apartments/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);

                setApartment(data);


            }).catch(err => console.error(err))
    }, [id])

    return (
        <>
            <div className="container">
                {apartment ? (
                    // Pass the apartment data as a prop to the ApartmentCard component
                    <SingleApartment apartment={apartment.data} />
                ) : (
                    // Show a loading message while the apartment data is being fetched
                    <p>Loading...</p>
                )}
            </div>
        </>
    )
}