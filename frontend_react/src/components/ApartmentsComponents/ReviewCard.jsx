
export default function ReviewCard({ reviews }) {

    return (
        <>
            <h4>{reviews.length} Recensioni</h4>
            {reviews.length === 0 ? (
                <p>Nessuna recensione disponibile.</p>
            ) : (
                reviews.map((review, index) => (
                    <div className="card my-3 bg-light" key={index}>
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
        </>
    )
}