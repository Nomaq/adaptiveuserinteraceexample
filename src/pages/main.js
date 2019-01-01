import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Account from '../services/account';
import DenominateOther from '../components/denominateother';
import Cashout from '../components/preparecashout';
import QuickCashout from '../components/quickcashout';
import AccountInfo from '../components/accountInfo';
import MobileWithdraw from '../pages/mobilewithdraw';
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
  } from "react-device-detect";
  
var moment = require('moment');
const $ = window.$;


class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentCOTab: "quickcashout",
            cashoutSet: false,
            cashoutamount: 0,
            accountdata:{

            }
        };
        this.loadCashoutInfo.bind(this);

    }

    componentWillMount(){
        var data = localStorage.getItem('userid');
        console.log(data);

        if(!data){
            this.props.history.push('/');
           
        } else{
            this.setState({userid : data});
        }
    }

    componentDidMount(){
        this.loadAccountInfo();
        this.loadUserSettings();
        
    }

    loadUserSettings(){

        let impairments = localStorage.getItem('impairments');
        let experience = localStorage.getItem('experience');
        experience = parseInt(experience);
        this.props.userSettings(impairments,experience);
    }

    loadAccountInfo() {
        let context = this;
        let accountdata = Account.getAccountbyUserId(1, function(response){
           context.setState({ accountdata:response});
           context.loadCashoutInfo();
           setTimeout(() => {
            $( "#primero" ).trigger('click');
            
           }, 500);
        });
        
    }

    loadCashoutInfo() {
        let context = this;
        Account.getCashoutbyUserId(this.state.userid, function(response){

       if(response && response[0] && response[0].idcashout){

        for (var property in context.state.accountdata) {
            if (context.state.accountdata[property].idaccount.toString() === response[0].account) {

                context.previousvalue = context.state.accountdata[property].queued;
                context.state.accountdata[property].queued =context.state.accountdata[property].queued - parseFloat(response[0].amount);
                context.setState({ cashoutSet: true, cashoutamount: response[0].amount, cashoutacc: context.state.accountdata[property], accountdata: context.state.accountdata, cashdate : response[0].date  });

            }
        }
       }
        });
        
    }

    gotoCOTab(route) {
        this.setState({ currentCOTab: route });
    }

    cashout() {
        this.setState({ cashoutSet: true });
    }
    cancelcashout() {
        let context= this;

        Account.deletecashout(context.state.userid, function(response){
       if(response && response){

        for (var property in context.state.accountdata) {
            if (context.state.accountdata[property].idaccount.toString() === context.state.cashoutacc.idaccount.toString()) {

                context.state.accountdata[property].queued = context.previousvalue;
                context.previousvalue = 0;
                context.setState({ cashoutSet: false, cashoutamount: 0, cashoutacc: null, accountdata: context.state.accountdata  });

            }
        }
       }
        });

       

        

    }
    prepareCashout(id, value) {
        var context = this;
        var date = moment().format('YYYY.mm.DD');
        Account.preparedCashout(context.state.userid,value,id,date, function(response){
           for (var property in context.state.accountdata) {
            if (context.state.accountdata[property].idaccount.toString() === id.toString()) {

                context.previousvalue = context.state.accountdata[property].queued;
                context.state.accountdata[property].queued =context.state.accountdata[property].queued - value;
                context.setState({ cashoutSet: true, cashoutamount: value, cashoutacc: context.state.accountdata[property], accountdata: context.state.accountdata,cashdate :date  });

            }
        }
         });

        
    }


    render() {

        let prepareCashout = <div className="row">
            <div className="col-md-12">
                <div className="card card-nav-tabs">
                    <div className="card-header card-header-primary">
                        <div className="nav-tabs-navigation">
                            <ul className="nav nav-tabs" data-tabs="tabs">
                                <li className="nav-item">
                                    <a style={{
                                            color: this.props.currentUI.ColorPallete.fifthColor,
                                            fontSize: this.props.currentUI.Font.headingFS,
                                            fontWeight: this.props.currentUI.Font.headingFW
                                            }} 
                                            onClick={this.gotoCOTab.bind(this, "quickcashout")} className="nav-link active show" href="#quickcashout" data-toggle="tab">
                                        <i className="material-icons">offline_bolt</i>
                                         {(this.props.currentUI.Information.showExtraInfo && this.props.currentUI.Information.showButtonText ) ? "Do a quick cashout" : ((!this.props.currentUI.Information.showExtraInfo && this.props.currentUI.Information.showButtonText) ? "Quick Cashout" : null )} 
                        <div className="ripple-container"></div></a>
                                </li>
                                <li className="nav-item">
                                    <a style={{
                                            color: this.props.currentUI.ColorPallete.fifthColor,
                                            fontSize: this.props.currentUI.Font.headingFS,
                                            fontWeight: this.props.currentUI.Font.headingFW
                                            }}  onClick={this.gotoCOTab.bind(this, "cashout")} className="nav-link" href="#cashout" data-toggle="tab">
                                        <i className="material-icons">local_atm</i>
                                        {(this.props.currentUI.Information.showExtraInfo && this.props.currentUI.Information.showButtonText) ? "Prepare custom cashout" : ((!this.props.currentUI.Information.showExtraInfo && this.props.currentUI.Information.showButtonText) ? "Prepare cashout" : null )} 
 
                        <div className="ripple-container"></div></a>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div className="card-body ">
                        <div className="tab-content text-center">
                            <div className={(this.state.currentCOTab === "quickcashout" ? "tab-pane active show" : "tab-pane")} id="quickcashout">
                                <QuickCashout
                                   currentUI = {this.props.currentUI}
                                    gotoCOTab={this.gotoCOTab.bind(this)}
                                    accountdata={this.state.accountdata}
                                    prepareCashout={this.prepareCashout.bind(this)}
                                    cashout={this.cashout.bind(this)} />
                            </div>
                            <div className={(this.state.currentCOTab === "denominate" ? "tab-pane active show" : "tab-pane")} id="denominateother">
                                <DenominateOther
                                    currentUI = {this.props.currentUI}
                                    gotoCOTab={this.gotoCOTab.bind(this)}
                                    accountdata={this.state.accountdata}
                                    prepareCashout={this.prepareCashout.bind(this)}


                                />
                            </div>
                            <div className={(this.state.currentCOTab === "cashout" ? "tab-pane active show" : "tab-pane")} id="cashout">
                                <Cashout
                                currentUI = {this.props.currentUI}
                                    prepareCashout={this.prepareCashout.bind(this)}
                                    accountdata={this.state.accountdata}
                                    gotoCOTab={this.gotoCOTab.bind(this)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>;

                                            console.log(this.props);
        if (this.state.cashoutSet) {
            
            prepareCashout = <div className="row">
                <div className="col-md-12">
                    <div className="card card-nav-tabs">
                        <div className="card-header card-header-primary">
                            <div className="nav-tabs-navigation">
                                <h3 style={{
                                            fontSize: this.props.currentUI.Font.titleFS,
                                            fontWeight: this.props.currentUI.Font.headingFW
                                            }}>  {this.props.currentUI.Information.showExtraInfo ?   "This cashout is ready to withdraw!" : "Prepared cashout" }</h3>
                            </div>
                        </div>
                        <div className="card-body ">
                            <div className="tab-content text-center">
                                <div className="tab-pane active show" id="preparedcashout">
                                    <div className="row">
                                        <div style={{   color: this.props.currentUI.ColorPallete.secondColor,
                                           fontSize: this.props.currentUI.Font.textFS,
                                           fontWeight: this.props.currentUI.Font.textFW }}  className="col-md-4" >
                                            {this.state.cashoutacc.idaccount}
                                        </div>
                                        <div style={{   color: this.props.currentUI.ColorPallete.secondColor,
                                           fontSize: this.props.currentUI.Font.textFS,
                                           fontWeight: this.props.currentUI.Font.textFW }}  className="col-md-3" >
                                            {this.state.cashdate}
                                        </div>
                                        <div style={{   color: this.props.currentUI.ColorPallete.secondColor,
                                           fontSize: this.props.currentUI.Font.textFS,
                                           fontWeight: this.props.currentUI.Font.textFW }}  className="col-md-3" >
                                            {"$ " + this.state.cashoutamount}
                                        </div>
                                        <BrowserView>
                                        <div  >
                                            <button onClick={this.cancelcashout.bind(this)} type="button" className="btn btn-danger btn-round ">
                                            <i className="material-icons">cancel </i>
                                             {this.props.currentUI.Information.showExtraInfo ?   "Cancel" : null}
                                            </button>
                                        </div>
                                        </BrowserView>
                                        <MobileView viewClassName='col-12'>
                                            
                                            <button onClick={()=>this.props.history.push('/cashoutatm')}   type="button" className="btn btn-primary btn-round col-5">
                                            <i className="material-icons">local_atm</i>
                                            {this.props.currentUI.Information.showExtraInfo ? "ATM" : null }
                                            </button>
                                            <button onClick={this.cancelcashout.bind(this)} type="button" className="btn btn-danger btn-round col-6">
                                            <i className="material-icons">cancel </i>
                                            {this.props.currentUI.Information.showExtraInfo ? "Cancel" : null}
                                            </button>
                                       
                                        </MobileView>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>;
        }
        let accountinfo = "Loading ..."
        if(this.state.accountdata){
            accountinfo = [];
            let data = [];
            for (let i = 0; i < this.state.accountdata.length; i++) { 
               let div = <div key={"account" + [i+1]}
               className={"tab-pane"} id={"account" + [i+1]}>
                <div className="table-responsive">
                    <AccountInfo currentUI = {this.props.currentUI} data={this.state.accountdata[i]} /> 
                </div>
            </div>
            accountinfo.push(div);
            }
        }

        let imageUrl = require('../images/bg-01.jpg');

        if(this.props.currentUI){
            imageUrl = require('../images/'+this.props.currentUI.Background);
        }
        return (
            <div className="landing-page sidebar-collapse" style={{ backgroundImage: `url(${imageUrl})` }}>
                <Navbar
                currentUI = {this.props.currentUI}
                history = {this.props.history}
                />
                <div className="page-header header-filter" data-parallax="true" >
                    <div className="container">

                    </div>
                </div>
                <div className="main main-raised">
                    <div className="container">
                        <div className="section text-center">
                            <div className="row">
                                <div className="col-md-12">

                                    <h3 style={{
                                            color: this.props.currentUI.ColorPallete.firstColor,
                                            fontSize: this.props.currentUI.Font.titleFS,
                                            fontWeight: this.props.currentUI.Font.titleFW
                                            }}>{this.props.currentUI.Information.showExtraInfo ?  "This section contains the states of all your accounts" :  "Accounts"  }</h3>

                                    <div className="card card-nav-tabs">
                                        <div className="card-header card-header-primary">
                                            <div className="nav-tabs-navigation">
                                                <div className="nav-tabs-wrapper">
                                                    <ul className="nav nav-tabs" data-tabs="tabs" >
                                                        <li className="nav-item">
                                                            <a style={{
                                                                color: this.props.currentUI.ColorPallete.fifthColor,
                                                                fontSize: this.props.currentUI.Font.headingFS,
                                                                fontWeight: this.props.currentUI.Font.headingFW
                                                                }}  className="nav-link" href="#account1" data-toggle="tab" id="primero">
                                                                <i className="material-icons">account_balance</i>
                                                                {(this.props.currentUI.Information.showExtraInfo && this.props.currentUI.Information.showButtonText) ? "Open main account" : ((!this.props.currentUI.Information.showExtraInfo && this.props.currentUI.Information.showButtonText) ? "Main Account" : null )} 
                                                         <div className="ripple-container"></div></a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a style={{
                                                                color: this.props.currentUI.ColorPallete.fifthColor,
                                                                fontSize: this.props.currentUI.Font.headingFS,
                                                                fontWeight: this.props.currentUI.Font.headingFW
                                                                }}  className="nav-link" href="#account2" data-toggle="tab">
                                                                <i className="material-icons">monetization_on</i>
                                                                {(this.props.currentUI.Information.showExtraInfo && this.props.currentUI.Information.showButtonText) ? "Open savings account" : ((!this.props.currentUI.Information.showExtraInfo && this.props.currentUI.Information.showButtonText) ? "Savings Account" : null )} 
                                                             
                                                        <div className="ripple-container"></div></a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a style={{
                                                                color: this.props.currentUI.ColorPallete.fifthColor,
                                                                fontSize: this.props.currentUI.Font.headingFS,
                                                                fontWeight: this.props.currentUI.Font.headingFW
                                                                }}  className="nav-link" href="#account3" data-toggle="tab">
                                                                <i className="material-icons">people</i>
                                                                {(this.props.currentUI.Information.showExtraInfo && this.props.currentUI.Information.showButtonText) ? "Open family account" : ((!this.props.currentUI.Information.showExtraInfo && this.props.currentUI.Information.showButtonText) ?   "Family Account" : null )} 
                                                        
                                                          <div className="ripple-container"></div></a>

                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body ">
                                            <div className="tab-content text-center">
                                               {accountinfo}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                           { this.state.cashoutSet ? null :
                                <h3 style={{
                                    color: this.props.currentUI.ColorPallete.firstColor,
                                    fontSize: this.props.currentUI.Font.titleFS,
                                    fontWeight: this.props.currentUI.Font.titleFW
                                    }}>{this.props.currentUI.Information.showExtraInfo ?   "Here you can prepare a cashout" : "Prepare cashout" }</h3>
                            }
                            
                            {prepareCashout}
                        </div>
                    </div>
                </div>
                <Footer currentUI = {this.props.currentUI} />
            </div>
        );
    }
}

export default Main;
