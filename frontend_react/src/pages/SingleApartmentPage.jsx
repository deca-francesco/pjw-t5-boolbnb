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
                    // If the apartment data is loaded, display the details
                    <div className="card">
                        <div className="card-header">
                            <h2 className="card-title">{apartment.data.title}</h2>
                        </div>
                        <div className="card-body">
                            {/* Check if the image exists and display it if true */}
                            {apartment.data.image && (
                                <div className="apartment-image">
                                    <img
                                        src={apartment.data.image}
                                        alt={apartment.data.title}
                                        className="img-fluid"
                                        style={{ maxWidth: "100%", height: "auto" }}
                                    />
                                </div>
                            )}
                            {/* Display the apartment details */}
                            <p><strong>Beds:</strong> {apartment.data.beds}</p>
                            <p><strong>Bathrooms:</strong> {apartment.data.bathrooms}</p>
                            <p><strong>Square Meters:</strong> {apartment.data.square_meters} m²</p>
                            <p><strong>Rooms:</strong> {apartment.data.rooms}</p>
                            <p><strong>Address:</strong> {apartment.data.address}</p>
                        </div>
                    </div>
                ) : (
                    // Show a loading message while the apartment data is being fetched
                    <p>Loading...</p>
                )}
            </div>
        </>
    )
}