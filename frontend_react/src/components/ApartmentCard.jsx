export default function ApartmentCard({apartment}){


    return(

        <>
            <div className= 'card bg-white text-dark p-3'>
                
                <h3 className='title'><strong>{apartment.title}</strong></h3>
                <p className='address'>{apartment.address}</p>

            </div>

        
        
        </>

    )
}