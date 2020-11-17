import React,{useState, useEffect} from 'react'
import FormDialog from '../MakeModal'
import RecipeReviewCard from '../Card'
import '../display.css'
import {db} from '../firebase'



 function Customer() {
    const [customers, setCustomers] = useState([])

    useEffect(() => {
        db.collection('Customers').onSnapshot(snapshot => {
          setCustomers(snapshot.docs.map(doc => ({
            id: doc.id,
            customer: doc.data()
           })) )
        })
     }, [])
    
    
    return (
        <div>
             
             <h1 className="h1">Customers</h1>
             <FormDialog functionname={'SaveCustomer'} />
             <div className="display__grid">

             {
        customers.map(({id, customer}) => (
          <RecipeReviewCard type = "Customers" id={id} title={customer.name} subheader={customer.contact} email={customer.email} phone={customer.phone} notes={customer.notes}/>
            ))
           }   

        
            </div>
        </div>
    )
}

export default Customer
