import React,{useState, useEffect} from 'react'
import '../display.css'
import {db} from '../firebase'
import CreateJobDialog from '../createJobDialog'
import JobCard from '../JobCard'



function Jobs() {
    const [Jobs, setJobs] = useState([])
   
    useEffect(() => {
        db.collection('Jobs').orderBy('building').onSnapshot(snapshot => {
          setJobs(snapshot.docs.map(doc => ({
            id: doc.id,
            Job: doc.data(),
            buildingname: doc.data().buildingname
           })) )
        })
     }, [])
     console.log(Jobs)
    return (
        <div>
            <h1 className="h1">Jobs</h1>
            <CreateJobDialog/>
            <div className="display__grid">
            {/* id, building, invoicedBy, jobType, timeQuoted, timeSpent, totalPrice, dateQuoted, dateInvoiced, materialsNotes */}

{
          Jobs.map(({id, Job}) => (
          <JobCard 
          id = {id} building = {Job.building.building} invoicedBy = {Job.invoicedBy.name} jobType = {Job.jobType.name} timeQuoted ={Job.timeQuoted} timeSpent={Job.timeSpentl} totalPrice = {Job.totalPrice}  
          dateQuoted ={Job.dateQuoted} dateInvoiced={Job.dateInvoiced} materialNotes = {Job.materialNotes}
          />
           ))
            }   
 
         
             </div>
        </div>
    )
}

export default Jobs
