import React from 'react'
import FormDialog from './MakeModal'
import RecipeReviewCard from './Card'
import './display.css'

// import {db} from './firebase.js'

// const getNextReviews = async() => {
//     const ref = db.collection('Customers')
//     const data = await ref.get()

// }

function Customer() {
    
    return (
        <div>
             
             <h1>Customers</h1>
             <FormDialog/>
             <div className="display__grid">
            <RecipeReviewCard/>
            <RecipeReviewCard/>
            <RecipeReviewCard/>
            <RecipeReviewCard/>
            <RecipeReviewCard/>
            <RecipeReviewCard/>
            <RecipeReviewCard/>
            <RecipeReviewCard/>
            <RecipeReviewCard/>
            </div>
        </div>
    )
}

export default Customer
