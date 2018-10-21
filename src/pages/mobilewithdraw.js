import React, { Component } from 'react';
import logoImg from '../images/bandcamp-brands.gif';
import Profile from '../services/profile';


const imageUrl = require(`../images/bg-01.jpg`);
const instruction = require(`../images/source.gif`);

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    componentWillMount(){
        var data = sessionStorage.getItem('userid');
        if(!data){
            this.props.history.push('/');
           
        } else{
            this.setState({userid : data});
        }
    }

    render() {

        let form = <div className="wrap-login100">
            <span className="login100-form-logo">
                <span> <i className="fab fa-bandcamp"></i></span>
            </span>
            <form className="login100-form ">


                <span className="login100-form-title p-b-34 p-t-27">
                    Please get the device near the ATM to cashout
              </span>

              <div style={{textAlign:'center'}}>
                  <a >
                      <img style={{width:"100%"}} src={instruction}></img>
                  </a>
              </div>

            </form>
        </div>;



        return (
            <div className="limiter" style={{textAlign: "center"}}>
                <div className="container-login100" style={{ backgroundImage: `url(${instruction})` }}>
                    {form}
                </div>
                <button onClick={() => this.props.history.push('/')} type="button" className="btn btn-danger btn-round ">
                <i className="material-icons">cancel </i>
                </button>
            </div>
        );
    }
}

export default Login;
