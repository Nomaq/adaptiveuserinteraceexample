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

    componentWillMount(){
        var data = sessionStorage.getItem('userid');
        if(data){
            console.log(data);
            this.props.history.push('/main');
            this.setState({userid : data});
        }
    }

    login(username, password) {
        let context = this;
        let isLogged=false;
        this.setState({ loading: true });
        if(!this.state.username || !this.state.password){
            alert("Please check your username or password");
            this.setState({ loading: false });
        }

        Profile.login(this.state.username, this.state.password, function(response){
            setTimeout(function () {
                if(response && response[0] && response[0].username == context.state.username ){
                    sessionStorage.setItem('userid', response[0].iduser );
                    sessionStorage.setItem('impairments', response[0].impairments );
                    sessionStorage.setItem('experience', response[0].experience );
                    context.setState({ loading: false });
                    context.props.history.push('/main');

                } else {
                    context.setState({ loading: false });
                    alert("Please check your username and/or password and try again");
                }
            }, 1000);
         });
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


                <span style={{color: this.props.currentUI.ColorPallete.fifthColor}} className="login100-form-title p-b-34 p-t-27">
                    Log in
            </span>

                <div className="wrap-input100 validate-input" data-validate="Enter username">
                    <input onChange={(username)=> this.setState({username:username.target.value})}  value={this.state.username} style={{
                                                                    color: this.props.currentUI.ColorPallete.fifthColor,
                                                                    fontSize: this.props.currentUI.Font.headingFS,
                                                                    fontWeight: this.props.currentUI.Font.headingFW }}
                                                                     className="input100" type="text" name="username" placeholder="Username"></input>
                    <span className="focus-input100" data-placeholder="&#xf207;"></span>
                </div>

                <div className="wrap-input100 validate-input" data-validate="Enter password">
                    <input onChange={(password)=> this.setState({password:password.target.value})}  value={this.state.password} style={{
                                                                    color: this.props.currentUI.ColorPallete.fifthColor,
                                                                    fontSize: this.props.currentUI.Font.headingFS,
                                                                    fontWeight: this.props.currentUI.Font.headingFW }} className="input100" type="password" name="pass" placeholder="Password"></input>
                    <span className="focus-input100" data-placeholder="&#xf191;"></span>
                </div>


                <div className="container-login100-form-btn">
                    <button style={{
                        fontSize: this.props.currentUI.Font.titleFS,
                    }} onClick={() => { this.login() }} className="login100-form-btn">
                Login
            </button>
                </div>

                <div className="text-center p-t-20">
                    <a style={{
                    color: this.props.currentUI.ColorPallete.fifthColor,
                    fontSize: this.props.currentUI.Font.headingFS,
                    fontWeight: this.props.currentUI.Font.headingFW }} className="txt1" href="#">
                        Forgot Password?
            </a>
                </div>
                <div className="text-center p-t-20">
                    <a style={{
                    color: this.props.currentUI.ColorPallete.fifthColor,
                    fontSize: this.props.currentUI.Font.headingFS,
                    fontWeight: this.props.currentUI.Font.headingFW }} onClick={()=> this.props.history.push('/register')}className="txt1" href="#">
                       Register
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
