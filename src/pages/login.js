import React, { Component } from 'react';
import logoImg from '../images/bandcamp-brands.gif';
import Profile from '../services/profile';




class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    componentDidMount() {
        this.props.history.push('/');
    }

    login(username, password) {
        let context = this;
        this.setState({ loading: true });
        let isLogged = Profile.login(username, password);

        setTimeout(function () {
            if (isLogged) {
                context.props.history.push('/main');
            } else {
                context.setState({ loading: false });
                alert("Please check your username and/or password and try again");
            }
        }, 1500)
    }

    render() {

        let imageUrl = require('../images/bg-01.jpg');

        if(this.props.currentUI){
            imageUrl = require('../images/'+this.props.currentUI.Background);
        }

        let form = <div className="wrap-login100">
            <span className="login100-form-logo">
                <span> <i className="fab fa-bandcamp"></i></span>
            </span>
            <form className="login100-form validate-form">


                <span className="login100-form-title p-b-34 p-t-27">
                    Log in
            </span>

                <div className="wrap-input100 validate-input" data-validate="Enter username">
                    <input className="input100" type="text" name="username" placeholder="Username"></input>
                    <span className="focus-input100" data-placeholder="&#xf207;"></span>
                </div>

                <div className="wrap-input100 validate-input" data-validate="Enter password">
                    <input className="input100" type="password" name="pass" placeholder="Password"></input>
                    <span className="focus-input100" data-placeholder="&#xf191;"></span>
                </div>

                <div className="contact100-form-checkbox">
                    <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me"></input>
                    <label className="label-checkbox100" htmlFor="ckb1">
                        Remember me
            </label>
                </div>

                <div className="container-login100-form-btn">
                    <button onClick={() => { this.login() }} className="login100-form-btn">
                        Login
            </button>
                </div>

                <div className="text-center p-t-20">
                    <a className="txt1" href="#">
                        Forgot Password?
            </a>
                </div>
            </form>
        </div>;


        if (this.state.loading) {

            form = <div className="wrap-login100">
                <span className="login100-form-logo">
                    <img src={logoImg} />
                </span>
                <div>
                    <span className="login100-form-title p-b-34 p-t-27">
                        Loading ...
                     </span>
                </div>
            </div>;

        }


        return (
            <div className="limiter">
                <div className="container-login100" style={{ backgroundImage: `url(${imageUrl})` }}>
                    {form}
                </div>
            </div>
        );
    }
}

export default Login;
