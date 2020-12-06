import React,{useState, useEffect} from 'react'
import ReviewCard from '../Card'
import '../display.css'
import {db} from '../firebase'
import Dropdown from '../dropdown'
import CompanyDialog from '../CompanyDialog'



 function Customer() {
    const [customers, setCustomers] = useState([])
    const [value, setValue] = useState(null)

    useEffect(() => {
        db.collection('Customers').orderBy('name').onSnapshot(snapshot => {
          setCustomers(snapshot.docs.map(doc => ({
            id: doc.id,
            customer: doc.data(),
            customername: doc.data().name
           })) )
        })
     }, [])
     function filterByValue(array, string) {
      return array.filter(o =>
          Object.keys(o).some(k => o[k].toLowerCase().includes(string.toLowerCase())));
  }
    
     
    
    return (
        <div>
             
             <h1 className="h1">Customers</h1>
             <div className="search">
             <Dropdown
                   className="dropdown"
                   prompt='Find customer...'
                   options={customers}
                   id='id'
                   label='customername'
                   value={value}
                   onChange={(val) => setValue(val)}
      /> 
      </div>
             <CompanyDialog functionname={'Customer'} heading='Create New Customer' id ='' title ='' subheader = '' emailadd = '' phonenum = '' notes2 = ''/>
             <div className="display__grid">

             {
        customers.map(({id, customer}) => (
          <ReviewCard type = "Customers" id={id} title={customer.name} subheader={customer.contact} email={customer.email} phone={customer.phone} notes={customer.notes}/>
            ))
           }   

        
            </div>
        </div>
    )
}

export default Customer
