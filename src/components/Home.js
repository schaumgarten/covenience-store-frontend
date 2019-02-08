import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

class Home extends Component  {
    constructor(props){
        super(props)
        this.state = {
            stores: []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:3000/api/user/')
            .then(res => {
                this.setState({stores: res.data.users})
            })
            .catch(err => {
                console.log(err);
            })
    }

    render (){
        return(
            <div>
                <h1>Tiendas</h1>
                {this.state.stores.map(store => <div><Link to={`/store/${store._id}`} >{store.name}</Link></div>)}
                <Link to={'/login'}>Soy administrador de una tienda</Link>        
            </div>
        );
    }
} 

export default Home;