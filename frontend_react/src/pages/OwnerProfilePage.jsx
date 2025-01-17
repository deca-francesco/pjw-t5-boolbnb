import { useEffect, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import ApartmentCard from "../components/ApartmentsComponents/ApartmentCard"

export default function OwnerProfilePage() {

    const { id } = useParams()
    const [ownerApartments, setOwnerApartments] = useState([])
    const [ownerName, setOwnerName] = useState("");
    const [loading, setLoading] = useState(true);
    const apiUrl = import.meta.env.VITE_EXPRESS_API_SERVER


    useEffect(() => {
        fetch(`${apiUrl}/owners/${id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                console.log(data);
                setOwnerApartments([data.data]);
                setOwnerName(data.data.owner.name)
                setLoading(false)
            }).catch(err => console.log(err))
    }, [id])

    if (loading) {
        return <div>Caricamento...</div>;
    }
    console.log(ownerApartments)
    return (
        <div className="container">
            <h1 style={{ fontSize: "4rem" }}>Benvenuto, {ownerName}</h1>
            <hr className="my-4" />
            <h3 className="my-4" style={{ fontSize: "3rem" }}> I tuoi appartamenti:</h3>
            <div className="row">
                {ownerApartments.length > 0 ? (
                    ownerApartments.map((apartment) => (
                        <div className="col-md-4 mb-4" key={apartment.id}>
                            <ApartmentCard
                                apartment={apartment}
                                setApartments={setOwnerApartments}
                            />
                        </div>
                    ))
                ) : (
                    <p className="text-center">Nessun appartamento trovato per questo proprietario.</p>
                )}
            </div>
        </div>
    )
}