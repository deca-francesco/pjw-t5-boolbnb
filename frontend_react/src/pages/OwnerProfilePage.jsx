import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import ApartmentCard from "../components/ApartmentsComponents/ApartmentCard"

export default function OwnerProfilePage() {

    const { id } = useParams()
    const navigate = useNavigate()
    const [ownerApartments, setOwnerApartments] = useState([])
    const [ownerName, setOwnerName] = useState("");
    const [loading, setLoading] = useState(true);
    const baseApiUrl = import.meta.env.VITE_EXPRESS_API_SERVER
    const show_api_url = baseApiUrl + `/owners/${id}`

    useEffect(() => {
        fetch(show_api_url)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                console.log(data);
                setOwnerName(data.data.owner.name)
                setOwnerApartments(data.data.apartments || []);  // Imposta un array vuoto se non ci sono appartamenti
                setLoading(false)
            }).catch(err => console.log(err))
    }, [id])

    const handleCreateApartment = () => {
        navigate("/new-apartment");  // Reindirizza alla pagina di creazione appartamento
    };

    return (
        <div className="container">
            <h1 style={{ fontSize: "4rem" }}>
                Benvenuto{ownerName && `, ${ownerName}`}
            </h1>
            <hr className="my-4" />
            <h3 className="my-4" style={{ fontSize: "3rem" }}>I tuoi appartamenti:</h3>
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
                    <>
                        <p className="text-center fs-3 pt-3">Non hai ancora appartamenti registrati. Premi il bottone per caricare il tuo primo appartamento</p>
                        <div className="d-flex justify-content-center align-items-center">
                            {/* Bottone grande per aggiungere un appartamento */}
                            <button
                                onClick={handleCreateApartment}
                                className="btn btn-primary btn-lg d-flex align-items-center justify-content-center mt-4"
                                style={{ height: "100px", width: "100px", borderRadius: "50%" }}
                            >
                                <div className="align-bottom pb-1" style={{ fontSize: "3rem" }}>+</div>
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
