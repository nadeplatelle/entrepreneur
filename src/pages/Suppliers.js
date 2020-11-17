import React, {useState, useEffect} from 'react'
import FormDialog from '../MakeModal'
import RecipeReviewCard from '../Card'
import '../display.css'
import {db} from '../firebase'

function Suppliers() {
    const [suppliers, setSuppliers] = useState([])

    useEffect(() => {
        db.collection('Suppliers').onSnapshot(snapshot => {
          setSuppliers(snapshot.docs.map(doc => ({
            id: doc.id,
            supplier: doc.data()
           })) )
        })
     }, [])
    return (
        <div>
           <h1 className="h1">Suppliers</h1> 
           <FormDialog functionname={'SaveSupplier'} />
           <div className="display__grid">
           {
        suppliers.map(({id, supplier}) => (
          <RecipeReviewCard type="Suppliers" id={id} title={supplier.name} subheader={supplier.contact} email={supplier.email} phone={supplier.phone} notes={supplier.notes}/>
            ))
           }   
            </div>
        </div>
    )
}

export default Suppliers
