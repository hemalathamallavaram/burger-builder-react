import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axiosOrders';

const INGREDIENT_PRICES = {
    salad:0.5,
    bacon:0.4,
    cheese:0.3,
    meat:0.1
}

class BurgerBuilder extends Component{
    state = {
        ingredients:null,
        totalPrice:4,
        purchaseable:false,
        purchasing:false,
        loading:false,
        error:false
    }
    updatePurchaseState = (updatedIngredients)=>{
        const ingredients = {
            ...updatedIngredients
        }
        const sum = Object.keys(ingredients).map((igKey)=>{
            return ingredients[igKey]
        }).reduce((sum,ele)=>{
            return sum+ele
        },0);
        this.setState({purchaseable:sum>0});
    }
    addIngredientHandler = (type)=>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount+1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState(
            {
                totalPrice:newPrice,
                ingredients:updatedIngredients
            }
        );
        this.updatePurchaseState(updatedIngredients);
    }
    removeIngredientHandler = (type)=>{
        const oldCount = this.state.ingredients[type];
        if(oldCount <=0) return;
        const updatedCount = oldCount-1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;
        this.setState(
            {
                totalPrice:newPrice,
                ingredients:updatedIngredients
            }
        );
        this.updatePurchaseState(updatedIngredients);
    }
    purchaseHandler = ()=>{
        this.setState(
            {purchasing:true}
        )
    }
    puchaseCancelHandler = ()=>{
        this.setState({
            purchasing:false
        })
    }
    purchaseContinueHandler = ()=>{

        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price='+this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({pathname:'/checkout',
                                 search:'?'+queryString})
    }
    componentDidMount(){
        axios.get('https://react-burger-app-e24bf.firebaseio.com/ingredients.json')
                .then(response => {
                    this.setState({ingredients:response.data})
                })
                .catch(error => {
                    this.setState({error:true})
                });
    }
    render(){
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]<=0
        }
        let orderSummary = null;
        if(this.state.ingredients){
            orderSummary = <OrderSummary 
            price={this.state.totalPrice}
            ingredients={this.state.ingredients}
            purchaseCanceled = {this.puchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            />;
        }

        if(this.state.loading){
            orderSummary = <Spinner />;
        } 
        let burger = (this.state.error)?(<p>Ingrediants cant be loaded</p>):<Spinner />
        if(this.state.ingredients){
            burger = <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchaseable={this.state.purchaseable}
                    ordered={this.purchaseHandler}/>
            </Aux>;
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.puchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder,axios);