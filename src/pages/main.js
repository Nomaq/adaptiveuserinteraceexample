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



const imageUrl = require(`../images/bg-01.jpg`);

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentCOTab: "quickcashout",
            cashoutSet: false,
            cashoutamount: 0
        };
    }

    componentDidMount() {
        this.loadAccountInfo();
    }

    loadAccountInfo() {
        let accountdata = Account.getAccountbyUserId(1);
        this.setState({ accountdata });
    }

    gotoCOTab(route) {
        this.setState({ currentCOTab: route });
    }

    cashout() {
        this.setState({ cashoutSet: true });
    }
    cancelcashout() {

        for (var property in this.state.accountdata) {
            if (this.state.accountdata[property].id.toString() === this.state.cashoutacc.id.toString()) {

                this.state.accountdata[property].queued = this.previousvalue;
                this.previousvalue = 0;
                this.setState({ cashoutSet: false, cashoutamount: 0, cashoutacc: null, accountdata: this.state.accountdata  });

            }
        }

        

    }
    prepareCashout(id, value) {
        for (var property in this.state.accountdata) {
            console.log(this.state.accountdata[property]);
            if (this.state.accountdata[property].id.toString() === id.toString()) {

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
                                    prepareCashout={this.prepareCashout.bind(this)}
                                    cashout={this.cashout.bind(this)} />
                            </div>
                            <div className={(this.state.currentCOTab === "denominate" ? "tab-pane active show" : "tab-pane")} id="denominateother">
                                <DenominateOther
                                    gotoCOTab={this.gotoCOTab.bind(this)}
                                    prepareCashout={this.prepareCashout.bind(this)}


                                />
                            </div>
                            <div className={(this.state.currentCOTab === "cashout" ? "tab-pane active show" : "tab-pane")} id="cashout">
                                <Cashout
                                    prepareCashout={this.prepareCashout.bind(this)}
                                    gotoCOTab={this.gotoCOTab.bind(this)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>;



        if (this.state.cashoutSet) {
            console.log(this.state);
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
                                            <h4>{this.state.cashoutacc.id}</h4>
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

        return (
            <div className="landing-page sidebar-collapse" style={{ backgroundImage: `url(${imageUrl})` }}>
            <BrowserView>
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
                                                    <ul className="nav nav-tabs" data-tabs="tabs">
                                                        <li className="nav-item">
                                                            <a className="nav-link active show" href="#account1" data-toggle="tab">
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
                                                <div className="tab-pane active show" id="account1">
                                                    <div className="table-responsive">
                                                        {this.state.accountdata ? < AccountInfo
                                                            data={this.state.accountdata.acc1} /> : null}
                                                    </div>
                                                </div>
                                                <div className="tab-pane" id="account2">
                                                    <div className="table-responsive">
                                                        {this.state.accountdata ? < AccountInfo
                                                            data={this.state.accountdata.acc2} /> : null}
                                                    </div>
                                                </div>
                                                <div className="tab-pane " id="account3">
                                                    <div className="table-responsive">
                                                        {this.state.accountdata ? < AccountInfo
                                                            data={this.state.accountdata.acc3} /> : null}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            {prepareCashout}
                        </div>
                    </div>
                </div>
                <Footer />
                </BrowserView>
                <MobileView>
                    <MobileWithdraw />
                </MobileView>
            </div>
        );
    }
}

export default Main;
