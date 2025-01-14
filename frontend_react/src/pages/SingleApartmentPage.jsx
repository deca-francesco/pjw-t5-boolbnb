import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function SingleApartmentPage() {
    //Retrieve the 'id' parameter from the URL using useParams.
    const { id } = useParams()
    const apiUrl = import.meta.env.VITE_API_SERVER

    const [apartment, setApartment] = useState(null)


    //useEffect to load apartment details
    useEffect(() => {
        fetch(`${apiUrl}/apartments/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);

                setApartment(data)
                console.log(movie);

            }).catch(err => console.error(err))
    }, [id])

    return (
        <>
            <div className="container">
                {apartment && (
                    // If the apartment data has been loaded, display the details
                    <div>
                        <h1>{apartment.title}</h1>
                        <spam>{apartment.beds}</spam>
                        <spam>{apartment.bathrooms}</spam>
                        <spam>{apartment.square_meters}</spam>
                        <spam>{apartment.rooms}</spam>
                        <spam>{apartment.adress}</spam>

                    </div>
                )}
            </div>
        </>
    )
}