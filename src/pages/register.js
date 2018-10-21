import React, { Component } from 'react';
import logoImg from '../images/bandcamp-brands.gif';
import Profile from '../services/profile';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import '../App.css';




class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            experience:""
        };
    }

    register() {
        console.log(this.state);
        let state = this.state;
        let context = this; 
        context.setState({ loading: true });

        if( state.password != state.repassword){
        alert("Your passwords do not match");
        }
        if(!state.username || !state.password || !state.fullname || !state.impairments || !state.experience ){
            alert("Please check your information");
            return;
        }

        Profile.register(state.username, state.password, state.fullname, state.impairments, state.experience, function(response){
            setTimeout(function () {
                console.log(response);
                if(response && response && response.insertId ){
                    sessionStorage.setItem('userid', response.insertId );
                    sessionStorage.setItem('impairments', state.impairments );
                    sessionStorage.setItem('experience', state.experience );
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


                <span  style={{color: this.props.currentUI.ColorPallete.fifthColor}} className="login100-form-title p-b-34 p-t-27">
                    Registration
            </span>

               
               <div className="wrap-input100 validate-input" data-validate="Enter username">
                    <input onChange={(username)=> this.setState({username:username.target.value})}  value={this.state.username} style={{
                                                                    color: this.props.currentUI.ColorPallete.fifthColor,
                                                                    fontSize: this.props.currentUI.Font.headingFS,
                                                                    fontWeight: this.props.currentUI.Font.headingFW }}  className="input100" type="text" name="username" placeholder="Username"></input>
                    <span className="focus-input100" data-placeholder="&#xf207;"></span>
                </div>

                <div className="wrap-input100 validate-input" data-validate="Enter password">
                    <input onChange={(password)=> this.setState({password:password.target.value})}  value={this.state.password} style={{
                                                                    color: this.props.currentUI.ColorPallete.fifthColor,
                                                                    fontSize: this.props.currentUI.Font.headingFS,
                                                                    fontWeight: this.props.currentUI.Font.headingFW }} className="input100" type="password" name="pass" placeholder="Password"></input>
                    <span className="focus-input100" data-placeholder="&#xf191;"></span>
                </div>
                <div className="wrap-input100 validate-input" data-validate="Re-enter password">
                    <input onChange={(password)=> this.setState({repassword:password.target.value})}  value={this.state.repassword} style={{
                                                                    color: this.props.currentUI.ColorPallete.fifthColor,
                                                                    fontSize: this.props.currentUI.Font.headingFS,
                                                                    fontWeight: this.props.currentUI.Font.headingFW }} className="input100" type="password" name="repass" placeholder="Re-enter Password"></input>
                    <span className="focus-input100" data-placeholder="&#xf191;"></span>
                </div>
                <div className="wrap-input100 validate-input" data-validate="Full Name">
                    <input onChange={(fullname)=> this.setState({fullname:fullname.target.value})}  value={this.state.fullname} style={{
                                                                    color: this.props.currentUI.ColorPallete.fifthColor,
                                                                    fontSize: this.props.currentUI.Font.headingFS,
                                                                    fontWeight: this.props.currentUI.Font.headingFW }} className="input100" type="text" name="fullname" placeholder="Full Name"></input>
                    <span className="focus-input100" data-placeholder="&#xf207;"></span>
                </div>
                <div className="form-row register">
                    <div className="form-group col-md-12">
                        <label htmlFor="inputState" style={{
                                                                    color: this.props.currentUI.ColorPallete.fifthColor,
                                                                    fontSize: this.props.currentUI.Font.headingFS,
                                                                    fontWeight: this.props.currentUI.Font.headingFW }}>Do you have problems reading small fonts?</label>
                        <select onChange={(impairments)=> this.setState({impairments:impairments.target.value})} value={this.state.impairments} id="inputState" className="form-control">
                            <option selected>Choose...</option>
                            <option>No</option>
                            <option>Yes</option>
                        </select>
                        <label htmlFor="inputState2" style={{
                                                                    color: this.props.currentUI.ColorPallete.fifthColor,
                                                                    fontSize: this.props.currentUI.Font.headingFS,
                                                                    fontWeight: this.props.currentUI.Font.headingFW }}>Do you have experience with other banking systems?</label>
                        <select id="inputState2" onChange={(experience)=> this.setState({experience:experience.target.value})} value={this.state.experience} className="form-control">
                            <option value={""} >Choose...</option>
                            <option value={0}>Not at all</option>
                            <option value={1}>A little</option>
                            <option value={2} >I use them sometimes</option>
                            <option value={3}>I use them often</option>
                        </select>
                    </div>
                  </div>
                <div className="container-login100-form-btn">
                    <button style={{
                        fontSize: this.props.currentUI.Font.titleFS,
                    }} type="button" onClick={() => { this.register() }} className="login100-form-btn">
                        Register
            </button>
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
