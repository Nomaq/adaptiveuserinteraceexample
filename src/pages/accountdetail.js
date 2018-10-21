import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import transactions from '../services/transactions';



const imageUrl = require(`../images/bg-01.jpg`);

class AccountDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
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

    componentDidMount(){
        this.loadTransactions();
        console.log(this.props);
    }

    loadTransactions(){
        let context =this;
        transactions.getTransactionbyAccId(this.props.match.params.id, function(response){
        context.setState({data:response});
     
        });      
    }


    render() {

        let transactiondata = this.state.data;
        let transactions = [];

        if(transactiondata){
            for (let i = 0; i < transactiondata.length; i++) { 
                let Transaction = <tr>
                <td style={{
                    color: this.props.currentUI.ColorPallete.fourthColor,
                    fontSize: this.props.currentUI.Font.textFS,
                    fontWeight: this.props.currentUI.Font.textFW }}>
                {transactiondata[i].description}
                </td>
                <td style={{
                    color: this.props.currentUI.ColorPallete.fourthColor,
                    fontSize: this.props.currentUI.Font.textFS,
                    fontWeight: this.props.currentUI.Font.textFW }} className="td-number">
                {transactiondata[i].date}
                </td>
                <td style={{
                    color: this.props.currentUI.ColorPallete.fourthColor,
                    fontSize: this.props.currentUI.Font.textFS,
                    fontWeight: this.props.currentUI.Font.textFW }} className="td-number">
                {transactiondata[i].amount}
                </td>
                <td style={{
                    color: this.props.currentUI.ColorPallete.fourthColor,
                    fontSize: this.props.currentUI.Font.textFS,
                    fontWeight: this.props.currentUI.Font.textFW }} className="td-actions">
                {transactiondata[i].total}
                </td>
            </tr>;
               transactions.push(Transaction);
            }
        }


        
        let imageUrl = require('../images/bg-01.jpg');

        if(this.props.currentUI){
            imageUrl = require('../images/'+this.props.currentUI.Background);
        }
        console.log(this.props);
        return (
            <div className="landing-page sidebar-collapse" style={{ backgroundImage: `url(${imageUrl})` }}>
                <Navbar 
                history = {this.props.history}/>
                <div className="page-header header-filter" data-parallax="true" >
                    <div className="container">

                    </div>
                </div>
                <div className="main main-raised">
                    <div className="container">
                        <div className="section text-center">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card card-nav-tabs">
                                        <div className="card-header card-header-primary row">
                                           <span className="col-md-2"><button type="button" style={{
                                                                color: this.props.currentUI.ColorPallete.fifthColor,
                                                                fontSize: this.props.currentUI.Font.headingFS,
                                                                fontWeight: this.props.currentUI.Font.headingFW
                                                                }} onClick={() => window.history.back()} className="btn btn-primary ">Return</button></span>
                                           <span className="col-md-10"> <h3 style={{
                                            color: this.props.currentUI.ColorPallete.fifthColor,
                                            fontSize: this.props.currentUI.Font.titleFS,
                                            fontWeight: this.props.currentUI.Font.headingFW
                                            }} className= "text-right" >{"Account: "+this.props.match.params.id+ " detail"}</h3></span>
                                        </div>
                                        <div className="card-body ">
                                            <div className="tab-content text-center">
                                                <div className="tab-pane active show" id="settings">
                                                <div className="table-responsive">
                                                        <table className="table table-shopping">
                                                            <thead>
                                                                <tr>
                                                                    <th style={{
                                                                    color: this.props.currentUI.ColorPallete.firstColor,
                                                                    fontSize: this.props.currentUI.Font.headingFS,
                                                                    fontWeight: this.props.currentUI.Font.headingFW }} className="th-description">Description</th>
                                                                    <th style={{
                                                                    color: this.props.currentUI.ColorPallete.firstColor,
                                                                    fontSize: this.props.currentUI.Font.headingFS,
                                                                    fontWeight: this.props.currentUI.Font.headingFW }} className="th-description">Date</th>
                                                                    <th  style={{
                                                                    color: this.props.currentUI.ColorPallete.firstColor,
                                                                    fontSize: this.props.currentUI.Font.headingFS,
                                                                    fontWeight: this.props.currentUI.Font.headingFW }} className="th-description">Amount</th>
                                                                    <th style={{
                                                                    color: this.props.currentUI.ColorPallete.firstColor,
                                                                    fontSize: this.props.currentUI.Font.headingFS,
                                                                    fontWeight: this.props.currentUI.Font.headingFW }} className="th-description">Total</th>
                                                                    <th></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {transactions}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer currentUI = {this.props.currentUI} />
            </div>
        );
    }
}

export default AccountDetail
