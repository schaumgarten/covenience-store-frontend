import React, {Component} from 'react';
import axios from 'axios'
import SearchBar from './SearchBar'
import ProductsBox from './ProductsBox'
import Cart from './Cart'
import Modal from './Modal'

class Store extends Component {
    constructor(props){
        super(props);
        this.state = {
            store: {},
            products: [],
            filterdProducts: [],
            productsInCart: [],
            total: 0,
            paymentError: '',
            user: JSON.parse(localStorage.getItem('user'))
        }
    }

    componentDidMount(){
        const id = this.props.match.params.id;
        axios.get(`http://localhost:3000/api/user/${id}`)
            .then(res => {
                this.setState({store: res.data.user})
            });
        axios.get(`http://localhost:3000/api/product/${id}`)
            .then(res => {
                this.setState({products: res.data.products})
                this.setState({filterdProducts: res.data.products})
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleSearchBar = (e) => {
        let filter = e.target.value.toLowerCase();
        let {products} = this.state;
        let filterdProducts = products.filter(product => {
            return product.name.toLowerCase().includes(filter)
        });
        this.setState({filterdProducts});
    };

    handleAddCart = (e, productName) => {
        e.preventDefault();
        let quant = parseInt(e.target.quantity.value);
        console.log("=====>",quant, typeof(quant))
        let {products, productsInCart} = this.state;
        let index = products.findIndex(f => f.name === productName);
        if (productsInCart.indexOf(index) === -1 && quant > 0){
            productsInCart.push(index);
        }
        products[index].quantity = quant;
       this.setState({products, productsInCart});
       this.calculateTotal();
    };

    calculateTotal = () => {
        let total = 0;
        const {productsInCart, products} = this.state;
        productsInCart.forEach(i => {
            total += (products[i].price * products[i].quantity)
        });
        this.setState({total: total});
    };

    handleCloseModal = () => {
        document.querySelector('.modal').classList.remove('is-active')
    };

    deleteToday = (e ,index) => {
        const {productsInCart,products} = this.state;
        products[index].quantity = 0;
        for (let i = 0; i<productsInCart.length; i++){
            if(productsInCart[i] === index){
                productsInCart.splice(i,1);
            }
        }
        this.setState({productsInCart, products});
        this.calculateTotal();
    };


    handlePayButton = () => {
        document.querySelector('.modal').classList.add('is-active')
    }

    handlePayment = (e) => {
        e.preventDefault();
        if (this.state.user) {
            console.log("vamos a crear una venta")
        } else {
            const email = e.target.email.value;
        const password = e.target.password.value;   
        axios.post('http://localhost:3000/api/user/login',{email, password})
            .then(res => {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                this.setState({user: res.data.user});
                console.log('logueado')
            })
        }
        
    } 

    handleChangeAccount = () => {
        localStorage.clear();
        this.setState({user:null});
    }

    render (){
        return (
            <div>
                <header>
                    <h1 className="title is-2">{this.state.store.name}</h1>
                </header>
                <SearchBar onchange={this.handleSearchBar}/>
                <Cart productsInCart={this.state.productsInCart} products={this.state.products} total={this.state.total} onClick={this.deleteToday} handlePay={this.handlePayButton}/> 
                {this.state.filterdProducts.map((product, index) => <ProductsBox key={index} product={product} onSubmit={this.handleAddCart} />)}
                <Modal handleChangeAccount={this.handleChangeAccount} user={this.state.user} closeModal={this.handleCloseModal} total={this.state.total} onSubmit={this.handlePayment}/>
                
            </div>
        );
    }
}

export default Store;