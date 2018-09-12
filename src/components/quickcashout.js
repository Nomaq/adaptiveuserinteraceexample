import React, { Component } from 'react';
import Account from '../services/account';


class QuickCashout extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentWillMount() {
        this.loadAccountInfo();
    }

    loadAccountInfo(){
        let accountdata = Account.getAccountbyUserId(1);
        this.setState({accountdata});
    }

    confirm() {
        if(!this.state.selectedaccount){
            alert("Please select an account");
        }
        else if(this.state.value > this.state.selectedaccount.total ){
            alert("This account has insuficcient balance for this transaction")
        } else if (this.state.value > 500){
            alert("ATMs allow cashouts up to $500 maximum")
        }
        else if ((this.state.value % 10) !== 0){
            alert("Cashout value must be multiple of 10")
        }
        else if ( !this.state.value){
            alert("Please select or enter an amount to withdraw")
        } else{
            this.props.prepareCashout(this.state.selectedaccount.id,this.state.value);
        }
    }

    handleChange(event) {
        if(event.target.value){
            for (var property in this.state.accountdata) {
                console.log(this.state.accountdata[property]);
                if (this.state.accountdata[property].id.toString() === event.target.value.toString()) {

                    this.setState({account: event.target.value,selectedaccount: this.state.accountdata[property] });
                }
            }
            
        } else{
            this.setState({account: event.target.value,selectedaccount:null });

        }
      }

    render() {

        return (
        <form>
            <div className="form-row m-t-10">
                <div className="form-group col-md-6">
                    <label htmlFor="inputState">Please select the account</label>
                    <select onChange={this.handleChange.bind(this)} value={this.state.account} id="inputState" className="form-control">
                        <option  value= {null} selected>Choose...</option>
                        <option  value={this.state.accountdata.acc1.id}>{"Main account (Current: $" + this.state.accountdata.acc1.total  + ")" }</option>
                        <option  value={this.state.accountdata.acc2.id}>{"Savings account (Current: $" + this.state.accountdata.acc2.total  + ")" }</option>
                        <option  value={this.state.accountdata.acc3.id}>{"Family account (Current: $" + this.state.accountdata.acc3.total  + ")" }</option>
                    </select>
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="inputState">Choose one</label>
                    <button onClick={() => this.setState({value:50}) } type="button" className="btn btn-primary btn-round">50</button>
                    <button onClick={() => this.setState({value:100}) } type="button" className="btn btn-primary btn-round">100</button>
                    <button onClick={() => this.setState({value:200}) } type="button" className="btn btn-primary btn-round">200</button>
                    <button onClick={() => this.setState({value:500}) } type="button" className="btn btn-primary btn-round">500</button>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-3">
                    <label htmlFor="inputAddress">Amount $</label>
                    <input disabled={true} value={this.state.value} onChange={(value) => {(!isNaN(value) ? this.setState({value}) : this.setState({value:0}))} } type="number" className="form-control " id="total" placeholder="0"></input>
                </div>
                <div className="col-md-1"></div>
                <button onClick={this.confirm.bind(this)} type="button" className="btn btn-success btn-round col-md-2">Confirm Entry</button>
                <div className="col-md-1"></div>
                <button type="button" onClick={ () => this.props.gotoCOTab( "denominate")} className="btn btn-info btn-round col-md-4">Denominate other amount</button>
            </div>
        </form>
        );
    }
}

export default QuickCashout;