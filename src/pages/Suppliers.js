import React from 'react'
import FormDialog from '../MakeModal'
import RecipeReviewCard from '../Card'
import '../display.css'

function Suppliers() {
    return (
        <div>
           <h1 className="h1">Suppliers</h1> 
           <FormDialog functionname={'SaveSupplier'} />
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

export default Suppliers
