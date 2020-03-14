import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axiosOrders';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component{
    state = {
        name:'',
        email:'',
        address:{
            street:'',
            postalCode:''
        },
        loading:false
    }
    orderHandler =(event)=>{
        event.preventDefault();
        this.setState({loading:true});
        const order = {
            ingredients:this.props.ingredients,
            totalPrice:this.props.price,
            customer:{
                name:'Max',
                address:{
                    country:'UK',
                    street:'26 JohnHall Close',
                    zipcode:'BS149JY'
                },
                email:'test@test.com',

            },
            deliveryMethod:'fastest'
        }
        axios.post('/orders.json',order)
            .then(response =>{
                this.setState({loading:false})
                this.props.history.push('/');
            } )
            .catch(error => this.setState({loading:false}))
    }
    render(){
        let form=(                
        <form >
            <input className={classes.Input} type="text" name="name" placeholder="Enter your name" />
            <input className={classes.Input} type="text" name="email" placeholder="Enter your email" />

            <input className={classes.Input} type="text" name="street" placeholder="Enter your street" />
            <input className={classes.Input} type="text" name="postalCode" placeholder="Enter your postalCode" />
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>);
        if(this.state.loading){
            form=(<Spinner />);
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your contact data:</h4>
                {form}
            </div>
        )
    }
}
export default ContactData;