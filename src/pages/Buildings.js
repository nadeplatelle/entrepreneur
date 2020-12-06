import React, {useEffect, useState} from 'react'
import BuildingDialog from '../BuildingDialog'
import '../display.css'
import {db} from '../firebase'
import BuildingCard from '../BuildingCard'


function Buildings() {
    const [buildings, setBuildings] = useState([])
   
    useEffect(() => {
        db.collection('Buildings').orderBy('name').onSnapshot(snapshot => {
          setBuildings(snapshot.docs.map(doc => ({
            id: doc.id,
            building: doc.data(),
            buildingname: doc.data().name
           })) )
        })
     }, [])

    return (
        <div>
            
            <h1 className="h1">Buildings</h1>
            <BuildingDialog functionname='Building' heading='Create new Building'  bldgname = '' bldgcustomer= '' bldgaddress= ''
               bldginvoiceToname = '' bldginvoiceToemail = '' bldgNotes= ''/>
            <div className="display__grid">

{
          buildings.map(({id, building}) => (
          <BuildingCard 
          id = {id} name = {building.name} customer = {building.customer.customer} address = {building.address} invoiceToname ={building.invoiceToname} invoiceToemail={building.invoiceToemail} buildingNotes = {building.buildingNotes}
          />
           ))
            }   
 
         
             </div>
             
        </div>
    )
}

export default Buildings

