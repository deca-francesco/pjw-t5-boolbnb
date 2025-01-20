import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function ReviewCard({ reviews }) {

    const { id } = useParams()
    /*     const apiUrl = import.meta.env.VITE_EXPRESS_API_SERVER
    
        useEffect(() => {
            fetch(`${apiUrl}/apartments/${id}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data.data);
                    setReviews(data.data.reviews);
                })
                .catch(err => console.error(err))
        }, [id]) */

    return (
        <div className="container mt-3 ms-1">
            <h2>Recensioni</h2>
            {reviews.length === 0 ? (
                <p>Nessuna recensione disponibile.</p>
            ) : (
                reviews.map((review, index) => (
                    <div className="card m-3 bg-light" key={index}>
                        <div className="card-body">
                            <h5 className="card-title">{review.username}</h5>
                            <h6 className="card-subtitle mb-2">
                                {review.days} giorni di soggiorno
                            </h6>
                            <p className="card-text">{review.review}</p>
                            <small className="text-muted">

                                Pubblicata il {new Date(review.date).toLocaleDateString()}
                            </small>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}