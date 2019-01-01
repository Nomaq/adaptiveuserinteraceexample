import React, { Component } from 'react';
import logoImg from '../images/bandcamp-brands.gif';
import Profile from '../services/profile';
import Account from '../services/account';


const imageUrl = require(`../images/bg-01.jpg`);
const instruction = require(`../images/source.gif`);
const withdraw = require(`../images/cash-in-hand.png`);

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            transactionDone:false,
            cashouts:false
        };
    }

    componentWillMount(){
        var data = localStorage.getItem('userid');
        if(!data){
            this.props.history.push('/');
           
        } else{
            this.setState({userid : data});
        }
    }

    componentDidMount(){
        var context = this;
        this.loadCashoutInfo();
        setInterval(function(){  context.loadCashoutInfo(); }, 3000);
    }

    makeTransaction(){
        if(!this.state.cashouts){
            alert("There are no prepared cashouts");
            return;
        } else{
            this.doTrasaction();
        }
    }

    doTrasaction(){
        let context = this;
        Account.doCashouts(this.state.cashouts,function(response){
        console.log(response);
       if(response){
         console.log(response);
         context.setState({transactionDone:true});
         setTimeout(function(){ 
            context.loadCashoutInfo();
            context.setState({transactionDone:false}); 

          }, 10000);
       } else{
        alert("Error while performing the cashout please try again");
       }
        });
         
    }

    loadCashoutInfo() {
        let context = this;
        Account.getCashouts(false,function(response){
        console.log(response);
       if(response && response[0]){
            context.setState({cashouts:response[0]});
       } else{
        context.setState({cashouts:false});
       }
        });
        
    }

    render() {

        let form = <div className="wrap-login100">
            <span className="login100-form-logo">
                <span> <i className="fab fa-bandcamp"></i></span>
            </span>
            <form className="login100-form ">


                <span className="login100-form-title p-b-34 p-t-27">
                    Place your device over the NFC reader to do your cashout
              </span>

              <div style={{textAlign:'center'}}>
                  <a >
                      <img style={{width:"100%"}} src={instruction}></img>
                  </a>
              </div>

              <button type="button" onClick={this.makeTransaction.bind(this)}>
                  Device is near
              </button>

            </form>
        </div>;

        if(this.state.transactionDone){
            form = <div className="wrap-login100">
            <span className="login100-form-logo">
                <span> <i className="fab fa-bandcamp"></i></span>
            </span>
            <form className="login100-form ">


                <span className="login100-form-title p-b-34 p-t-27">
                    Transaction completed, please take your money.
              </span>

              <div style={{textAlign:'center'}}>
                  <a >
                      <img style={{width:"100%"}} src={withdraw}></img>
                  </a>
              </div>

              <button type="button" onClick={this.makeTransaction.bind(this)}>
                  Device is near
              </button>

            </form>
        </div>;
        }



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
