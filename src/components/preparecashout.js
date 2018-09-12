import React, { Component } from 'react';
import Account from '../services/account';

class DenominateOther extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            account: null
        };
    }

    componentWillMount() {
        this.loadAccountInfo();
        this.getLastDenominations();
    }

    loadAccountInfo(){
        let accountdata = Account.getAccountbyUserId(1);
        this.setState({accountdata});
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

    return(tab) {
        this.props.gotoCOTab(tab);
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

    getLastDenominations() {
        let denominations = Account.getLastDenominations();
        this.setState({ denominations });
    }

    render() {
        let cstmBtn = [];
        for (let i = 0; i < 4; i++) {
            let cstmDenomination = null;
            if (this.state.denominations && this.state.denominations[i]) {
                cstmDenomination = <button onClick={() => this.setState({value:this.state.denominations[i]}) } type="button" className="btn btn-info btn-round col-md-2">
                    <i className="material-icons">euro_symbol </i>
                    {this.state.denominations[i]}
                                    </button>;
            } else {
                cstmDenomination =  <button onClick={() => this.setState({value:100}) } type="button" className="btn btn-info btn-round col-md-2">
                    <i className="material-icons">euro_symbol </i>
                    100
                 </button>;
            }
            cstmBtn.push(cstmDenomination);
        }

        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="card-text">
                    </div>
                    <form>
                    <div className="form-group col-md-12">
                    <label htmlFor="inputState">Please select the account</label>
                    <select onChange={this.handleChange.bind(this)} value={this.state.account} id="inputState" className="form-control">
                        <option  value= {null} selected>Choose...</option>
                        <option  value={this.state.accountdata.acc1.id}>{"Main account (Current: $" + this.state.accountdata.acc1.total  + ")" }</option>
                        <option  value={this.state.accountdata.acc2.id}>{"Savings account (Current: $" + this.state.accountdata.acc2.total  + ")" }</option>
                        <option  value={this.state.accountdata.acc3.id}>{"Family account (Current: $" + this.state.accountdata.acc3.total  + ")" }</option>
                    </select>
                </div>
                        <div className="form-row" id="previous">
                            <h4>Last</h4>
                        </div>
                        <div className="form-row" id="previous">
                            {cstmBtn[0]}
                            <div className="col-md-1"></div>
                            {cstmBtn[1]}
                            <div className="col-md-1"></div>
                            {cstmBtn[2]}
                            <div className="col-md-1"></div>
                            {cstmBtn[3]}
                            <div className="col-md-1"></div>
                        </div>
                        <div className="form-row" id="previous">
                            <h4>Fix</h4>
                        </div>
                        <div className="form-row" id="previous">

                            <button onClick={() => this.setState({value:20}) } type="button" className="btn btn-primary btn-round col-md-2">
                                <i className="material-icons">euro_symbol </i>
                                20
                            </button>
                            <div className="col-md-1"></div>
                            <button onClick={() => this.setState({value:50}) } type="button" className="btn btn-primary btn-round col-md-2">
                                <i className="material-icons">euro_symbol </i>
                                50
                            </button>
                            <div className="col-md-1"></div>
                            <button onClick={() => this.setState({value:80}) }  type="button" className="btn btn-primary btn-round col-md-2">
                                <i className="material-icons">euro_symbol </i>
                                80
                            </button>
                            <div className="col-md-1"></div>
                            <button onClick={() => this.setState({value:100}) }  type="button" className="btn btn-primary btn-round col-md-2">
                                <i className="material-icons">euro_symbol </i>
                                100
                            </button>
                            <div className="col-md-1"></div>
                        </div>
                        <div className="form-row" id="previous">
                            <button onClick={() => this.setState({value:200}) }  type="button" className="btn btn-primary btn-round col-md-2">
                                <i className="material-icons">euro_symbol </i>
                                200
                            </button>
                            <div className="col-md-1"></div>
                            <button onClick={() => this.setState({value:300}) }  type="button" className="btn btn-primary btn-round col-md-2">
                                <i className="material-icons">euro_symbol </i>
                                300
                            </button>
                            <div className="col-md-1"></div>
                            <button onClick={() => this.setState({value:400}) }  type="button" className="btn btn-primary btn-round col-md-2">
                                <i className="material-icons">euro_symbol </i>
                                400
                            </button>
                            <div className="col-md-1"></div>
                            <button onClick={() => this.setState({value:500}) }  type="button" className="btn btn-primary btn-round col-md-2">
                                <i className="material-icons">euro_symbol </i>
                                500
                            </button>
                            <div className="col-md-1"></div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-3 ">
                                <h4 style={{ paddingTop: "35px" }} >Amount</h4>
                            </div>
                            <div className="form-group col-md-6">
                                <input value={this.state.value} onChange={(value) => {(!isNaN(value) ? this.setState({value}) : this.setState({value:0}))} } type="number" className="form-control " id="total" placeholder="0"></input>
                            </div>
                        </div>

                        <div className="form-row">
                            <button onClick={this.confirm.bind(this)} type="button" className="btn btn-success btn-round col-md-2">
                                Confirm
                            </button>
                            <button onClick={this.return.bind(this, "denominate")} type="button" className="btn btn-info btn-round col-md-4">
                                Denominate other amount
                            </button>
                            <button onClick={this.return.bind(this, "quickcashout")} type="button" className="btn btn-danger btn-round col-md-2">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default DenominateOther;
