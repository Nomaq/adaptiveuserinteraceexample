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
                <td>
                {transactiondata[i].description}
                </td>
                <td className="td-number">
                {transactiondata[i].date}
                </td>
                <td className="td-number">
                {transactiondata[i].amount}
                </td>
                <td className="td-actions">
                {transactiondata[i].total}
                </td>
            </tr>;
               transactions.push(Transaction);
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
                                    <div className="card card-nav-tabs">
                                        <div className="card-header card-header-primary row">
                                           <span className="col-md-2"><button type="button" onClick={() => window.history.back()} className="btn btn-primary ">Return</button></span>
                                           <span className="col-md-10"> <h3 className= "text-left" >Account 1 detail</h3></span>
                                        </div>
                                        <div className="card-body ">
                                            <div className="tab-content text-center">
                                                <div className="tab-pane active show" id="settings">
                                                <div className="table-responsive">
                                                        <table className="table table-shopping">
                                                            <thead>
                                                                <tr>
                                                                    <th className="th-description">Description</th>
                                                                    <th className="th-description">Date</th>
                                                                    <th className="text-right">Amount</th>
                                                                    <th className="text-right">Total</th>
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
                <Footer />
            </div>
        );
    }
}

export default AccountDetail
