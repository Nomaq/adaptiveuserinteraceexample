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



const imageUrl = require(`../images/bg-01.jpg`);

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
    }

    componentDidMount() {
        this.loadAccountInfo();
    }

    loadAccountInfo() {
        let context = this;
        let accountdata = Account.getAccountbyUserId(1, function(response){
           context.setState({ accountdata:response});
           setTimeout(() => {
            $( "#primero" ).trigger('click');
           }, 500);
        });
        
    }

    gotoCOTab(route) {
        this.setState({ currentCOTab: route });
    }

    cashout() {
        this.setState({ cashoutSet: true });
    }
    cancelcashout() {
        console.log(this.state);

        for (var property in this.state.accountdata) {
            if (this.state.accountdata[property].idaccount.toString() === this.state.cashoutacc.idaccount.toString()) {

                this.state.accountdata[property].queued = this.previousvalue;
                this.previousvalue = 0;
                this.setState({ cashoutSet: false, cashoutamount: 0, cashoutacc: null, accountdata: this.state.accountdata  });

            }
        }

        

    }
    prepareCashout(id, value) {
        for (var property in this.state.accountdata) {
            console.log(this.state.accountdata[property]);
            if (this.state.accountdata[property].idaccount.toString() === id.toString()) {

                this.previousvalue = this.state.accountdata[property].queued;
                this.state.accountdata[property].queued = this.state.accountdata[property].queued - value;
                this.setState({ cashoutSet: true, cashoutamount: value, cashoutacc: this.state.accountdata[property], accountdata: this.state.accountdata });

            }
        }
    }


    render() {
        let prepareCashout = <div className="row">
            <div className="col-md-12">
                <div className="card card-nav-tabs">
                    <div className="card-header card-header-primary">
                        <div className="nav-tabs-navigation">
                            <ul className="nav nav-tabs" data-tabs="tabs">
                                <li className="nav-item">
                                    <a onClick={this.gotoCOTab.bind(this, "quickcashout")} className="nav-link active show" href="#quickcashout" data-toggle="tab">
                                        <i className="material-icons">offline_bolt</i>
                                        Quick Cashout
                        <div className="ripple-container"></div></a>
                                </li>
                                <li className="nav-item">
                                    <a onClick={this.gotoCOTab.bind(this, "cashout")} className="nav-link" href="#cashout" data-toggle="tab">
                                        <i className="material-icons">local_atm</i>
                                        Prepare cashout
                        <div className="ripple-container"></div></a>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div className="card-body ">
                        <div className="tab-content text-center">
                            <div className={(this.state.currentCOTab === "quickcashout" ? "tab-pane active show" : "tab-pane")} id="quickcashout">
                                <QuickCashout
                                    gotoCOTab={this.gotoCOTab.bind(this)}
                                    accountdata={this.state.accountdata}
                                    prepareCashout={this.prepareCashout.bind(this)}
                                    cashout={this.cashout.bind(this)} />
                            </div>
                            <div className={(this.state.currentCOTab === "denominate" ? "tab-pane active show" : "tab-pane")} id="denominateother">
                                <DenominateOther
                                    gotoCOTab={this.gotoCOTab.bind(this)}
                                    accountdata={this.state.accountdata}
                                    prepareCashout={this.prepareCashout.bind(this)}


                                />
                            </div>
                            <div className={(this.state.currentCOTab === "cashout" ? "tab-pane active show" : "tab-pane")} id="cashout">
                                <Cashout
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



        if (this.state.cashoutSet) {
            
            prepareCashout = <div className="row">
                <div className="col-md-12">
                    <div className="card card-nav-tabs">
                        <div className="card-header card-header-primary">
                            <div className="nav-tabs-navigation">
                                <h3> Prepared Cashout</h3>
                            </div>
                        </div>
                        <div className="card-body ">
                            <div className="tab-content text-center">
                                <div className="tab-pane active show" id="preparedcashout">
                                    <div className="row">
                                        <div className="col-md-4" >
                                            <h4>{this.state.cashoutacc.idaccount}</h4>
                                        </div>
                                        <div className="col-md-3" >
                                            <h4>{moment().format('YYYY.mm.DD')}</h4>
                                        </div>
                                        <div className="col-md-3" >
                                            <h4>{"$ " + this.state.cashoutamount}</h4>
                                        </div>
                                        <div className="col-md-2" >
                                            <button onClick={this.cancelcashout.bind(this)} type="button" className="btn btn-danger btn-round">
                                                <i className="material-icons">cancel </i>
                                            </button>
                                        </div>
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
                    <AccountInfo data={this.state.accountdata[i]} /> 
                </div>
            </div>
            accountinfo.push(div);
            }
        }
        return (
            <div className="landing-page sidebar-collapse" style={{ backgroundImage: `url(${imageUrl})` }}>
                <Navbar />
                <div className="page-header header-filter" data-parallax="true" >
                    <div className="container">

                    </div>
                </div>
                <div className="main main-raised">
                    <div className="container">
                        <div className="section text-center">
                            <div className="row">
                                <div className="col-md-12">
                                    <h3><small>Accounts</small></h3>

                                    <div className="card card-nav-tabs">
                                        <div className="card-header card-header-primary">
                                            <div className="nav-tabs-navigation">
                                                <div className="nav-tabs-wrapper">
                                                    <ul className="nav nav-tabs" data-tabs="tabs" >
                                                        <li className="nav-item">
                                                            <a className="nav-link" href="#account1" data-toggle="tab" id="primero">
                                                                <i className="material-icons">account_balance</i>
                                                                Main Account
                                                         <div className="ripple-container"></div></a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link" href="#account2" data-toggle="tab">
                                                                <i className="material-icons">monetization_on</i>
                                                                Savings Account
                                                        <div className="ripple-container"></div></a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link" href="#account3" data-toggle="tab">
                                                                <i className="material-icons">people</i>
                                                                Family Account
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
                            {prepareCashout
                            }
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Main;
