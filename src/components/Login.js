import React, {Component} from 'react';
import axios from 'axios';

class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            user: {
                email: '',
                password: ''
            }
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
    axios.post('http://localhost:3000/api/user/login',this.state.user, this.props.history)
        .then(res => {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            this.props.history.push('/store-admin');
        })
        .catch(err => {
            console.error(err);
        })
};

    render (){
        return (
            <div>
                <h1 className="title">Login</h1>
                <form  onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <br/>
                        <input id="email" name="email" type="email" onChange={this.handleChange} required/>
                        
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <br/>
                        <input id="password" name="password" type="password" onChange={this.handleChange} required/>
                        
                    </div>
                        <button className="button" type="submit" name="action">Login </button>    
                        
                </form>        
            </div>
        )
    }
}

export default Login