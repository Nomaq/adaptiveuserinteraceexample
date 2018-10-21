import React, { Component } from 'react';
import Account from '../services/account';

class DenominateOther extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            account: ""
        };
    }

    componentWillMount() {
         this.loadAccountInfo();
        this.getLastDenominations();
    }

    loadAccountInfo(){
        let accountdata = this.props.accountdata;
        this.setState({accountdata});
    }
    handleChange(event) {
        if(event.target.value){
          
            for (var property in this.props.accountdata) {
                console.log(this.props.accountdata[property].idaccount.toString() === event.target.value.toString());
                if (this.props.accountdata[property].idaccount.toString() === event.target.value.toString()) {
                    console.log(this.props.accountdata[property]);
                    this.setState({account: event.target.value,selectedaccount: this.props.accountdata[property] });
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
            this.props.prepareCashout(this.state.selectedaccount.idaccount,this.state.value);
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
                cstmDenomination = <button style={{
                    fontSize: this.props.currentUI.Font.headingFS,
                    fontWeight: this.props.currentUI.Font.headingFW
                    }}  onClick={() => this.setState({value:this.state.denominations[i]}) } type="button" className="btn btn-info btn-round col-2">
                    <i className="material-icons">euro_symbol </i>
                    {this.state.denominations[i]}
                                    </button>;
            } else {
                cstmDenomination =  <button style={{
                    fontSize: this.props.currentUI.Font.headingFS,
                    fontWeight: this.props.currentUI.Font.headingFW
                    }}  onClick={() => this.setState({value:100}) } type="button" className="btn btn-info btn-round col-2">
                    <i className="material-icons">euro_symbol </i>
                    100
                 </button>;
            }
            cstmBtn.push(cstmDenomination);
        }

        let loading = "Loading ...";
        if(this.props.accountdata[0]){
            loading = <select style={{   color: this.props.currentUI.ColorPallete.fourthColor,
                fontSize: this.props.currentUI.Font.textFS,
                fontWeight: this.props.currentUI.Font.textFW }}  onChange={this.handleChange.bind(this)} value={this.state.account} id="inputState" className="form-control">
            <option  value= {""} selected>Choose...</option>
            <option  value={this.props.accountdata[0].idaccount}>{"Main account (Current: $" + this.props.accountdata[0].total  + ")" }</option>
            <option  value={this.props.accountdata[1].idaccount}>{"Savings account (Current: $" + this.props.accountdata[1].total  + ")" }</option>
            <option  value={this.props.accountdata[2].idaccount}>{"Family account (Current: $" + this.props.accountdata[2].total  + ")" }</option>
        </select>;
        }

        return (
            <div className="row">
                <div className="col-12">
                    <div className="card-text">
                    </div>
                    <form>
                    <div className="form-group col-12">
                    <label style={{
                                            color: this.props.currentUI.ColorPallete.firstColor,
                                            fontSize: this.props.currentUI.Font.headingFS,
                                            fontWeight: this.props.currentUI.Font.headingFW
                                            }} htmlFor="inputState">Please select the account</label>
                    {loading}
                </div>
                        <div style={{
                                            color: this.props.currentUI.ColorPallete.firstColor,
                                            fontSize: this.props.currentUI.Font.headingFS,
                                            fontWeight: this.props.currentUI.Font.headingFW
                                            }} className="form-row" id="previous">
                            Last
                        </div>
                        <div className="form-row" id="previous">
                            {cstmBtn[0]}
                            <div className="col-1 d-xs-none"></div>
                            {cstmBtn[1]}
                            <div className="col-1 d-xs-none"></div>
                            {cstmBtn[2]}
                            <div className="col-1 "></div>
                            {cstmBtn[3]}
                            <div className="col-1"></div>
                        </div>
                        <div style={{
                                            color: this.props.currentUI.ColorPallete.firstColor,
                                            fontSize: this.props.currentUI.Font.headingFS,
                                            fontWeight: this.props.currentUI.Font.headingFW
                                            }} className="form-row" id="previous">
                            Fix
                        </div>
                        <div className="form-row" id="previous">

                            <button style={{
                                                                fontSize: this.props.currentUI.Font.headingFS,
                                                                fontWeight: this.props.currentUI.Font.headingFW
                                                                }}  onClick={() => this.setState({value:20}) } type="button" className="btn btn-primary btn-round col-2">
                                <i className="material-icons">euro_symbol </i>
                                20
                            </button>
                            <div className="col-1"></div>
                            <button style={{
                                                                fontSize: this.props.currentUI.Font.headingFS,
                                                                fontWeight: this.props.currentUI.Font.headingFW
                                                                }}   onClick={() => this.setState({value:50}) } type="button" className="btn btn-primary btn-round col-2">
                                <i className="material-icons">euro_symbol </i>
                                50
                            </button>
                            <div className="col-1"></div>
                            <button style={{
                                                                fontSize: this.props.currentUI.Font.headingFS,
                                                                fontWeight: this.props.currentUI.Font.headingFW
                                                                }}  onClick={() => this.setState({value:80}) }  type="button" className="btn btn-primary btn-round col-2">
                                <i className="material-icons">euro_symbol </i>
                                80
                            </button>
                            <div className="col-1"></div>
                            <button style={{
                                                                fontSize: this.props.currentUI.Font.headingFS,
                                                                fontWeight: this.props.currentUI.Font.headingFW
                                                                }}  onClick={() => this.setState({value:100}) }  type="button" className="btn btn-primary btn-round col-2">
                                <i className="material-icons">euro_symbol </i>
                                100
                            </button>
                            <div className="col-1"></div>
                        </div>
                        <div className="form-row" id="previous">
                            <button style={{
                                                                fontSize: this.props.currentUI.Font.headingFS,
                                                                fontWeight: this.props.currentUI.Font.headingFW
                                                                }}  onClick={() => this.setState({value:200}) }  type="button" className="btn btn-primary btn-round col-2">
                                <i className="material-icons">euro_symbol </i>
                                200
                            </button>
                            <div className="col-1"></div>
                            <button style={{
                                                                fontSize: this.props.currentUI.Font.headingFS,
                                                                fontWeight: this.props.currentUI.Font.headingFW
                                                                }}  onClick={() => this.setState({value:300}) }  type="button" className="btn btn-primary btn-round col-2">
                                <i className="material-icons">euro_symbol </i>
                                300
                            </button>
                            <div className="col-1"></div>
                            <button style={{
                                                                fontSize: this.props.currentUI.Font.headingFS,
                                                                fontWeight: this.props.currentUI.Font.headingFW
                                                                }}  onClick={() => this.setState({value:400}) }  type="button" className="btn btn-primary btn-round col-2">
                                <i className="material-icons">euro_symbol </i>
                                400
                            </button>
                            <div className="col-1"></div>
                            <button style={{
                                                                fontSize: this.props.currentUI.Font.headingFS,
                                                                fontWeight: this.props.currentUI.Font.headingFW
                                                                }}  onClick={() => this.setState({value:500}) }  type="button" className="btn btn-primary btn-round col-2">
                                <i className="material-icons">euro_symbol </i>
                                500
                            </button>
                            <div className="col-1"></div>
                        </div>
                        <div className="form-row">
                            <div style={{
                                            color: this.props.currentUI.ColorPallete.firstColor,
                                            fontSize: this.props.currentUI.Font.headingFS,
                                            fontWeight: this.props.currentUI.Font.headingFW,
                                            paddingTop: "35px"
                                            }} className="form-group col-3 ">
                                Amount
                            </div>
                            <div className="form-group col-6">
                                <input value={this.state.value} onChange={(value) => {(!isNaN(value) ? this.setState({value}) : this.setState({value:0}))} } type="number" className="form-control " id="total" placeholder="0"></input>
                            </div>
                        </div>

                        <div className="form-row">
                            <button style={{
                                                                fontSize: this.props.currentUI.Font.headingFS,
                                                                fontWeight: this.props.currentUI.Font.headingFW
                                                                }}  onClick={this.confirm.bind(this)} type="button" className="btn btn-success btn-round col-3">
                                Confirm
                            </button>
                            <button style={{
                                                                fontSize: this.props.currentUI.Font.headingFS,
                                                                fontWeight: this.props.currentUI.Font.headingFW
                                                                }}  onClick={this.return.bind(this, "denominate")} type="button" className="btn btn-info btn-round col-6">
                                Denominate other amount
                            </button>
                            <button style={{
                                                                fontSize: this.props.currentUI.Font.headingFS,
                                                                fontWeight: this.props.currentUI.Font.headingFW
                                                                }}  onClick={this.return.bind(this, "quickcashout")} type="button" className="btn btn-danger btn-round col-2">
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
