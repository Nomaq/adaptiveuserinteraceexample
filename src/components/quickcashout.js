import React, { Component } from 'react';
import Account from '../services/account';


class QuickCashout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            account: ""
        };
    }

    componentWillMount() {
       this.loadAccountInfo();
    }

    loadAccountInfo(){
        let accountdata = this.props.accountdata;
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
            this.props.prepareCashout(this.state.selectedaccount.idaccount,this.state.value);
        }
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

    render() {
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
        <form>
            <div className="form-row m-t-10">
                <div className="form-group col-md-6">
                    <label style={{
                                            color: this.props.currentUI.ColorPallete.firstColor,
                                            fontSize: this.props.currentUI.Font.headingFS,
                                            fontWeight: this.props.currentUI.Font.headingFW
                                            }} htmlFor="inputState">Please select the account</label>
                    {loading}
                </div>
                <div className="form-group col-md-6">
                    <label style={{
                                            color: this.props.currentUI.ColorPallete.firstColor,
                                            fontSize: this.props.currentUI.Font.headingFS,
                                            fontWeight: this.props.currentUI.Font.headingFW
                                            }} htmlFor="inputState">Choose one</label>
                    <button onClick={() => this.setState({value:50}) } type="button" className="btn btn-primary btn-round">50</button>
                    <button onClick={() => this.setState({value:100}) } type="button" className="btn btn-primary btn-round">100</button>
                    <button onClick={() => this.setState({value:200}) } type="button" className="btn btn-primary btn-round">200</button>
                    <button onClick={() => this.setState({value:500}) } type="button" className="btn btn-primary btn-round">500</button>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-3">
                    <label style={{
                                            color: this.props.currentUI.ColorPallete.firstColor,
                                            fontSize: this.props.currentUI.Font.headingFS,
                                            fontWeight: this.props.currentUI.Font.headingFW
                                            }} htmlFor="inputAddress">Amount $</label>
                    <input disabled={true} value={this.state.value} onChange={(value) => {(!isNaN(value) ? this.setState({value}) : this.setState({value:0}))} } type="number" className="form-control " id="total" placeholder="0"></input>
                </div>
                <div className="col-md-1"></div>
                <button  style={{
                                                                fontSize: this.props.currentUI.Font.headingFS,
                                                                fontWeight: this.props.currentUI.Font.headingFW
                                                                }}  onClick={this.confirm.bind(this)} type="button" className="btn btn-success btn-round col-md-2">Confirm Entry</button>
                <div className="col-md-1"></div>
                <button  style={{
                                                                fontSize: this.props.currentUI.Font.headingFS,
                                                                fontWeight: this.props.currentUI.Font.headingFW
                                                                }}  type="button" onClick={ () => this.props.gotoCOTab( "denominate")} className="btn btn-info btn-round col-md-4">Denominate other amount</button>
            </div>
        </form>
        );
    }
}

export default QuickCashout;
