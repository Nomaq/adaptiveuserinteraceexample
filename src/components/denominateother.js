import React, { Component } from 'react';
import logoImg from '../images/bandcamp-brands.gif';
import Account from '../services/account';



const imageUrl = require(`../images/bg-01.jpg`);

class DenominateOther extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tens: 0,
            twenties: 0,
            fifties: 0,
            hundreds: 0,
            value: 0
        };
    }

    componentWillMount() {
        this.loadAccountInfo();
    }

    componentDidUpdate(prevProps, prevState) {
        let newvalue = this.state.tens + this.state.twenties + this.state.fifties + this.state.hundreds;
        if (prevState.value !== newvalue) {
            this.setState({
                value: (
                    this.state.tens + this.state.twenties + this.state.fifties + this.state.hundreds
                )
            });
        }

    }

    loadAccountInfo() {
        let accountdata = Account.getAccountbyUserId(1);
        this.setState({ accountdata });
    }

    confirm() {
        if (!this.state.selectedaccount) {
            alert("Please select an account");
        }
        else if (this.state.value > this.state.selectedaccount.total) {
            alert("This account has insuficcient balance for this transaction")
        } else if (this.state.value > 500) {
            alert("ATMs allow cashouts up to $500 maximum")
        }
        else if ((this.state.value % 10) !== 0) {
            alert("Cashout value must be multiple of 10")
        }
        else if (!this.state.value) {
            alert("Please select or enter an amount to withdraw")
        } else {
            this.props.prepareCashout(this.state.selectedaccount.id, this.state.value);
        }
    }

    reset() {
        this.setState({
            tens: 0,
            twenties: 0,
            fifties: 0,
            hundreds: 0,
            value: 0
        });
    }

    handleChange(event) {
        if (event.target.value) {
            for (var property in this.state.accountdata) {
                console.log(this.state.accountdata[property]);
                if (this.state.accountdata[property].id.toString() === event.target.value.toString()) {

                    this.setState({ account: event.target.value, selectedaccount: this.state.accountdata[property] });
                }
            }

        } else {
            this.setState({ account: event.target.value, selectedaccount: null });

        }
    }

    return() {
        this.props.gotoCOTab("quickcashout");
    }

    render() {

        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="card-text">
                        <h3 className="card-title m-b-20">Other Denomination</h3>
                    </div>
                    <form>
                        <div className="form-group col-md-12">
                            <label htmlFor="inputState">Please select the account</label>
                            <select onChange={this.handleChange.bind(this)} value={this.state.account} id="inputState" className="form-control">
                                <option value={null} selected>Choose...</option>
                                <option value={this.state.accountdata.acc1.id}>{"Main account (Current: $" + this.state.accountdata.acc1.total + ")"}</option>
                                <option value={this.state.accountdata.acc2.id}>{"Savings account (Current: $" + this.state.accountdata.acc2.total + ")"}</option>
                                <option value={this.state.accountdata.acc3.id}>{"Family account (Current: $" + this.state.accountdata.acc3.total + ")"}</option>
                            </select>
                        </div>
                        <div className="form-row m-t-10">
                            <div className="form-group col-md-2">
                                <h3>$ 10</h3>
                            </div>
                            <div className="col-md-1"></div>
                            <div className="form-group col-md-2">
                                <h3>$ 20</h3>
                            </div>
                            <div className="col-md-1"></div>
                            <div className="form-group col-md-2">
                                <h3>$ 50</h3>
                            </div>
                            <div className="col-md-1"></div>
                            <div className="form-group col-md-2">
                                <h3>$ 100</h3>
                            </div>

                        </div>
                        <div className="form-row">
                            <button onClick={() => { (this.setState({ tens: (this.state.tens + 10) })) }} type="button" className="btn btn-primary btn-round col-md-2">
                                <i className="fas fa-plus"></i>
                            </button>
                            <div className="col-md-1"></div>
                            <button onClick={() => { (this.setState({ twenties: (this.state.twenties + 20) })) }} type="button" className="btn btn-primary btn-round col-md-2">
                                <i className="fas fa-plus"></i>
                            </button>
                            <div className="col-md-1"></div>
                            <button onClick={() => { (this.setState({ fifties: (this.state.fifties + 50) })) }} type="button" className="btn btn-primary btn-round col-md-2">
                                <i className="fas fa-plus"></i>
                            </button>
                            <div className="col-md-1"></div>
                            <button onClick={() => { (this.setState({ hundreds: (this.state.hundreds + 100) })) }} type="button" className="btn btn-primary btn-round col-md-2">
                                <i className="fas fa-plus"></i>
                            </button>
                            <div className="col-md-1"></div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-2">
                                <input type="number" value={this.state.tens} disabled={true} className="form-control" id="inputAddress" placeholder="0"></input>
                            </div>
                            <div className="col-md-1"></div>
                            <div className="form-group col-md-2">
                                <input type="number" value={this.state.twenties} disabled={true} className="form-control" id="inputAddress" placeholder="0"></input>
                            </div>
                            <div className="col-md-1"></div>
                            <div className="form-group col-md-2">
                                <input type="number" value={this.state.fifties} disabled={true} className="form-control" id="inputAddress" placeholder="0"></input>
                            </div>
                            <div className="col-md-1"></div>
                            <div className="form-group col-md-2">
                                <input type="number" value={this.state.hundreds} disabled={true} className="form-control" id="inputAddress" placeholder="0"></input>
                            </div>

                        </div>
                        <div className="form-row">
                            <button onClick={() => { (this.state.tens ? this.setState({ tens: (this.state.tens - 10) }) : null) }} type="button" className="btn btn-primary btn-round col-md-2">
                                <i className="fas fa-minus"></i>
                            </button>
                            <div className="col-md-1"></div>
                            <button onClick={() => { (this.state.twenties ? this.setState({ twenties: (this.state.twenties - 20) }) : null) }} type="button" className="btn btn-primary btn-round col-md-2">
                                <i className="fas fa-minus"></i>
                            </button>
                            <div className="col-md-1"></div>
                            <button onClick={() => { (this.state.fifties ? this.setState({ fifties: (this.state.fifties - 50) }) : null) }} type="button" className="btn btn-primary btn-round col-md-2">
                                <i className="fas fa-minus"></i>
                            </button>
                            <div className="col-md-1"></div>
                            <button onClick={() => { (this.state.hundreds ? this.setState({ hundreds: (this.state.hundreds - 100) }) : null) }} type="button" className="btn btn-primary btn-round col-md-2">
                                <i className="fas fa-minus"></i>
                            </button>
                            <div className="col-md-1"></div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-3 ">
                                <h4 style={{ paddingTop: "35px" }} >Total Amount $</h4>
                            </div>
                            <div className="form-group col-md-6">
                                <input disabled={true} value={this.state.value} onChange={(value) => { (!isNaN(value) ? this.setState({ value }) : this.setState({ value: 0 })) }} type="number" className="form-control " id="total" placeholder="0"></input>
                            </div>
                        </div>

                        <div className="form-row">
                            <button onClick={this.confirm.bind(this)} type="button" className="btn btn-success btn-round col-md-2">
                                Confirm
                                                  </button>
                            <button onClick={this.reset.bind(this)} type="button" className="btn btn-info btn-round col-md-2">
                                Reset
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
