import React, {Component} from 'react';
import axios from 'axios';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: '',
                email:'',
                password: '',
                confirmPassword:'',
                role: props.match.params.role
            },
            errorMessage: ''
        }
    }

    handleChange = (e) => {
        const {user} = this.state;
        const field = e.target.name;
        user[field] = e.target.value;
        this.setState({user});
    };


    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.user)
        axios.post('http://localhost:3000/api/user/register',this.state.user)
            .then(() => {
                window.history.back();
            })
            .catch(err => {
                console.log(err)
                this.setState({errorMessage: "No se ha podido registrar"})
            })
        //register(this.state.user, this.props.history);
    };



    render(){
        return(
            <div className="centered">
                <form onSubmit={this.handleSubmit}>
                    <div><label>Nombre {this.state.user.role === "store" ? "de la tienda" : null}: <br/><input type="text" name="name" onChange={this.handleChange}></input></label></div>
                    <div><label>Correo electrónico: <br/><input type="text" name="email" onChange={this.handleChange}></input></label></div>
                    <div><label>Contraseña:<br/> <input type="password" name="password" onChange={this.handleChange}></input></label></div>
                    <div><label>Repetir constraseña:<br/> <input type="password" name="confirmPassword" onChange={this.handleChange}></input></label></div>
                    <button className="button is-success" >Registrarse</button>
                </form>
                <p style={{color: "#FF0000"}}>{this.state.errorMessage}</p>
            </div>
      
        )
    }
}


export default Register;

