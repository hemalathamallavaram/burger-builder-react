import React,{Component} from 'react';
import axios from '../../axiosOrders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
class Orders extends Component{
    state={
        orders:[],
        loading:true
    }
    componentDidMount(){
        axios.get('/orders.json')
            .then(res=>{
                this.setState({loading:false})
                const fetchedOrders = [];
                for(let key in res.data){
                    fetchedOrders.push({
                        ...res.data[key],
                        id:key
                    });
                }
                this.setState({orders:fetchedOrders});
            })
            .catch(err=>{
                this.setState({loading:false})
            })
    }
    render(){
        return(
            <div>
                {this.state.orders.map(order=>(
                    <Order key={order.id} ingredients={order.ingredients} price={order.totalPrice}/>
                ))}
            </div>
            
        );
    }
}

export default withErrorHandler(Orders,axios);