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
                <h1>Login</h1>
                
                   
                        <form  id="reg-form" onSubmit={this.handleSubmit}>

                            <div className="row">
                                <div className="input-field col s12 m9">
                                    <input id="email" name="email" type="email" className="validate" minLength="6" onChange={this.handleChange} required/>
                                    <label htmlFor="email">Email</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12 m9">
                                    <input id="password" name="password" type="password" onChange={this.handleChange} required/>
                                    <label htmlFor="password">Password</label>
                                </div>
                            </div>

                            <div className="input-field col s12">
                                <button className="btn btn-large btn-register blue-background waves-effect waves-light center"
                                        type="submit" name="action">Login

                                </button>
                            </div>

                        </form>
                   
                
            </div>
        )
    }
}

export default Login