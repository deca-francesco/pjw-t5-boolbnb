import { useState } from "react"
export default function ReviewFormCard({apartment_id, success}) {

    //per il form creare: username, text, date, days(N), email(perchè email?non dovrebbe essere privata?)

    const [username, setUsername] = useState(' ')
    const [review, setReview] = useState(' ')
    const [days, setDays] = useState(' ')

    function handleFormSubmit(e){
        
        e.preventDefault()
        console.log('here');

        const formData = {

            username,
            review,
            days
        }
        console.log(formData);
        
        const base_api_url = import.meta.env.VITE_EXPRESS_API_SERVER
        const review_apartment_api_url = base_api_url + '/review/:id'
        console.log(review_apartment_api_url);

        fetch(review_apartment_api_url, {
            method:'POST',
            body: {
                "Content-Type": "application/json"
            }
        }).then(res=> res.json())
            .then(data =>{
                console.log(data);
                
                if (data.success) {
                    console.log('thans for your review')
                    
                    //reset the form fields
                    setUsername('')
                    setReview('')
                    setDays(0)

                    window.location.reload()
                }
            }).catch(err => console.log(err))
        
        

    }


    return(

        <>
            
            <div className="container">
                <div className="card m-4 bg-white text-dark">
                    <div className="card-body">
                        
                        <form onSubmit={handleFormSubmit}>
                       

                        <div className="mb-3">
                            <p>Name</p>
                            <input name="username" id="usarname" type="text" className="form-control" placeholder="name" value={username} onChange={(e)=> setUsername(e.target.value)} />
                        </div>
                        

                        <div className="mb-3">
                            <p>Write your review</p>
                            <textarea  className='w-100'name="review" id="review" value={review} onChange={(e)=> setReview(e.target.value)}></textarea>
                        </div>

                        <button type="submit" className="btn btn-primary "><strong>Send</strong></button>
                        </form>
                    </div>
                </div>
            </div>
        
        </>


    )
}