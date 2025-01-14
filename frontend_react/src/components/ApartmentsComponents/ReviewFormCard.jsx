import { useState } from "react"
export default function ReviewFormCard({apartment_id, success}) {

    //per il form creare: username, text, date, days(N), email(perchè email?non dovrebbe essere privata?)

    const [username, setUsername] = useState(' ')
    const [email, setEmail] = useState ('')
    const [review, setReview] = useState(' ')
    const [days, setDays] = useState(' ')
    
    function handleFormSubmit(e){
        
        e.preventDefault()
        console.log('here');

        const formData = {

            username,
            email,
            review,
            days
        }
        console.log(formData);
        
        const base_api_url = import.meta.env.VITE_EXPRESS_API_SERVER
        const review_apartment_api_url = `${base_api_url}/apartments/review/${apartment_id}`
        console.log(review_apartment_api_url);

        fetch(review_apartment_api_url, {
            method:'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }).then(res=> res.json())
            .then(data =>{
                console.log(data);
                
                if (data.success) {
                    console.log('thanks for your review')
                    
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
                            <input name="username" id="username" type="text" className="form-control" placeholder="name" value={username} onChange={(e)=> setUsername(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <p>Email</p>
                            <input name="email" id="email" type="email" className="form-control" placeholder="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                        </div>
                        

                        <div className="mb-3">
                            <p>Write your review</p>
                            <textarea  className='w-100'name="review" id="review" value={review} onChange={(e)=> setReview(e.target.value)}></textarea>
                        </div>
                        
                        <input 
                            name="days" 
                            id="days" 
                            type="number" 
                            className="form-control" 
                            placeholder="days" 
                            value={days} 
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value >= 0) {
                                    setDays(value);
                                }
                            }} 
                        />


                        <button type="submit" className="btn btn-primary "><strong>Send</strong></button>
                        </form>
                    </div>
                </div>
            </div>
        
        </>


    )
}