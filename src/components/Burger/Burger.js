import React from 'react';
import BurgerIngradient from './BurgerIngradient/BurgerIngradient';

import classes from './Burger.css';

const burger = (props) =>{
    let transformedIngradients = Object.keys(props.ingredients).map((key)=>{
        return [...Array(props.ingredients[key])].map((val,index)=>{
            return <BurgerIngradient key={key+index} type={key} />
        })
    }).reduce((arr,ele)=>{
        return arr.concat(ele)
    },[]);
    if(transformedIngradients.length === 0){
        transformedIngradients = <p>Please start adding ingredients</p>
    }
    console.log(transformedIngradients);
    return(
        <div className={classes.Burger}>
            <BurgerIngradient type="bread-top"/>
            {transformedIngradients}
            <BurgerIngradient type="bread-bottom"/>
        </div>
        
    );
}

export default burger;