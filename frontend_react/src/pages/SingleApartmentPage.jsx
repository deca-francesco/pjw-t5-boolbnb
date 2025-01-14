import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
                    // If the apartment data has been loaded, display the details
                    <div className="card">
                        <div className="card-header">
                            <h2 className="card-title">{apartment.title}</h2>
                        </div>
                        <div className="card-body">
                            <p><strong>Beds:</strong> {apartment.beds}</p>
                            <p><strong>Bathrooms:</strong> {apartment.bathrooms}</p>
                            <p><strong>Square Meters:</strong> {apartment.square_meters} m²</p>
                            <p><strong>Rooms:</strong> {apartment.rooms}</p>
                            <p><strong>Address:</strong> {apartment.adress}</p>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </>
    )
}