import React from 'react';
import classes from './Order.css'

const Order = (props)=>{
    const ingredients =[];
    for(let ingredientName in props.ingredients){
        ingredients.push({name:ingredientName,
                        amount:props.ingredients[ingredientName]})
    }
    const ingOutput = ingredients.map(ig=>{
        return <span style={{
            textTransform:'capitalize',
            border:'1px solid black',
            margin:'5px'
        }}>{ig.name}({ig.amount})</span>
    })
    return(
        <div className={classes.Order}>
            <p >Ingrediants:{ingOutput}</p>
            <p>Price <strong>USD {(+(props.price)).toFixed(2)}</strong></p>
        </div>
    )
}

export default Order;