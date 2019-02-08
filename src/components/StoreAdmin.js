import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import Sales from './Sales';

class StoreAdmin extends Component {
    constructor(props){
        super(props);
        this.state = {
            store:  JSON.parse(localStorage.getItem('user')),
            products:[],
            sales:[],
            toggleButton: false,
            newProduct: {
                name: '', 
                price: 0
            }
        }
    }

    componentDidMount(){
        this.getProducts();
        axios.get(`http://localhost:3000/api/sale/store/${this.state.store._id}`)
            .then(res => {
                this.setState({sales: res.data.sales})
                console.log(this.state.sales)
            })
       
    }
    

    showProductForm = () => {
        let {toggleButton} = this.state;
        toggleButton = !toggleButton;
        this.setState({toggleButton})
    }

    handleProductChange = (e) => {
        let {newProduct} = this.state;
        if (e.target.name === "name") {
            newProduct.name = e.target.value;
        } else {
            newProduct.price = e.target.value;
        }
        this.setState({newProduct})
    }

    handleProductSubmit = (e) => {
        e.preventDefault();
        const _store = this.state.store._id
        const {name, price} = this.state.newProduct;
        console.log(name, price, _store)
        axios.post('http://localhost:3000/api/product/new',{name, price, _store})
            .then(res => {
                console.log(res)
                this.getProducts();
            })
            .catch(err => {
                console.log(err)
            })
    }

    deleteProduct = (id) => {
        axios.delete(`http://localhost:3000/api/product/${id}`)
            .then(() => {
                this.getProducts();
            })
    }

    logout = () => {
        localStorage.clear();
    }

    getProducts = () => {
        const _store = this.state.store._id
        axios.get(`http://localhost:3000/api/product/${_store}`)
            .then(res => {
                this.setState({products: res.data.products})
            })
            .catch(err => {
                console.log(err)
            })
    }

    render(){
        return(
            <div>
                <nav>
                    <Link to={'/'} onClick={this.logout}>Salir</Link>
                </nav>
                <header>
                    <h1>{this.state.store.name}</h1>
                </header>
                <section>
                    <h1>Productos</h1>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                <td>Nombre</td>
                                <td>Precio</td>
                            </tr>
                            </thead>
                            <tbody>
                                {this.state.products.map(product => 
                                <tr>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td><button onClick={() => this.deleteProduct(product._id)}>Borrar</button></td>
                                </tr>
                            )}
                            </tbody>
                            
                        </table>
                        <h5>Agregar un producto nuevo</h5>
                        <button onClick={this.showProductForm}>+</button>
                        {this.state.toggleButton ? 
                            <form>
                              <div><label>Nombre del producto: <input type="text" name="name" value={this.state.newProduct.name} onChange={this.handleProductChange}/></label></div>
                              <div><label>Precio: <input type="number" name="price" value={this.state.newProduct.price} onChange={this.handleProductChange}/></label></div>   
                              <div><button onClick={this.handleProductSubmit}>Agregar</button></div>                       
                            </form> 
                        : null}
                    </div>
                </section>
                <section>
                    <h1>Ventas</h1>
                    <Sales sales={this.state.sales}/>
                </section>            
                
            </div>
        )
    }
}

export default StoreAdmin