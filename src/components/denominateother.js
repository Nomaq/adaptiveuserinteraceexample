import React, { Component } from 'react';
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
  } from "react-device-detect";

class DenominateOther extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tens: 0,
            twenties: 0,
            fifties: 0,
            hundreds: 0,
            value: 0,
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
            this.props.prepareCashout(this.state.selectedaccount.idaccount, this.state.value);
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

    return() {
        this.props.gotoCOTab("quickcashout");
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
            <div className="row">
             
                <div className="col-12">
                    <div className="card-text">
                        <h3  style={{
                                            color: this.props.currentUI.ColorPallete.firstColor,
                                            fontSize: this.props.currentUI.Font.titleFS,
                                            fontWeight: this.props.currentUI.Font.titleFW
                                            }} className="card-title m-b-20">Other Denomination</h3>
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
                        <BrowserView>
                        <div className="form-row m-t-10">
                            <div className="form-group col-2">
                                <h3 style={{
                                            color: this.props.currentUI.ColorPallete.firstColor,
                                           
                                            }}>$ 10</h3>
                            </div>
                            <div className="col-1"></div>
                            <div className="form-group col-2">
                                <h3 style={{
                                            color: this.props.currentUI.ColorPallete.firstColor,
                                           
                                            }}>$ 20</h3>
                            </div>
                            <div className="col-1"></div>
                            <div className="form-group col-2">
                                <h3 style={{
                                            color: this.props.currentUI.ColorPallete.firstColor,
                                           
                                            }}>$ 50</h3>
                            </div>
                            <div className="col-1"></div>
                            <div className="form-group col-2">
                                <h3 style={{
                                            color: this.props.currentUI.ColorPallete.firstColor,
                                           
                                            }}>$ 100</h3>
                            </div>

                        </div>
                        <div className="form-row">
                            <button onClick={() => { (this.setState({ tens: (this.state.tens + 10) })) }} type="button" className="btn btn-primary btn-round col-2">
                                <i className="fas fa-plus"></i>
                            </button>
                            <div className="col-1"></div>
                            <button onClick={() => { (this.setState({ twenties: (this.state.twenties + 20) })) }} type="button" className="btn btn-primary btn-round col-2">
                                <i className="fas fa-plus"></i>
                            </button>
                            <div className="col-1"></div>
                            <button onClick={() => { (this.setState({ fifties: (this.state.fifties + 50) })) }} type="button" className="btn btn-primary btn-round col-2">
                                <i className="fas fa-plus"></i>
                            </button>
                            <div className="col-1"></div>
                            <button onClick={() => { (this.setState({ hundreds: (this.state.hundreds + 100) })) }} type="button" className="btn btn-primary btn-round col-2">
                                <i className="fas fa-plus"></i>
                            </button>
                            <div className="col-1"></div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-2">
                                <input style={{   color: this.props.currentUI.ColorPallete.fourthColor,
                                           fontSize: this.props.currentUI.Font.textFS,
                                           fontWeight: this.props.currentUI.Font.textFW }} type="number" value={this.state.tens} disabled={true} className="form-control" id="inputAddress" placeholder="0"></input>
                            </div>
                            <div className="col-1"></div>
                            <div className="form-group col-2">
                                <input style={{   color: this.props.currentUI.ColorPallete.fourthColor,
                                           fontSize: this.props.currentUI.Font.textFS,
                                           fontWeight: this.props.currentUI.Font.textFW }} type="number" value={this.state.twenties} disabled={true} className="form-control" id="inputAddress" placeholder="0"></input>
                            </div>
                            <div className="col-1"></div>
                            <div className="form-group col-2">
                                <input type="number" style={{   color: this.props.currentUI.ColorPallete.fourthColor,
                                           fontSize: this.props.currentUI.Font.textFS,
                                           fontWeight: this.props.currentUI.Font.textFW }}  value={this.state.fifties} disabled={true} className="form-control" id="inputAddress" placeholder="0"></input>
                            </div>
                            <div className="col-1"></div>
                            <div className="form-group col-2">
                                <input type="number" style={{   color: this.props.currentUI.ColorPallete.fourthColor,
                                           fontSize: this.props.currentUI.Font.textFS,
                                           fontWeight: this.props.currentUI.Font.textFW }} value={this.state.hundreds} disabled={true} className="form-control" id="inputAddress" placeholder="0"></input>
                            </div>

                        </div>
                        <div className="form-row">
                            <button onClick={() => { (this.state.tens ? this.setState({ tens: (this.state.tens - 10) }) : null) }} type="button" className="btn btn-primary btn-round col-2">
                                <i className="fas fa-minus"></i>
                            </button>
                            <div className="col-1"></div>
                            <button onClick={() => { (this.state.twenties ? this.setState({ twenties: (this.state.twenties - 20) }) : null) }} type="button" className="btn btn-primary btn-round col-2">
                                <i className="fas fa-minus"></i>
                            </button>
                            <div className="col-1"></div>
                            <button onClick={() => { (this.state.fifties ? this.setState({ fifties: (this.state.fifties - 50) }) : null) }} type="button" className="btn btn-primary btn-round col-2">
                                <i className="fas fa-minus"></i>
                            </button>
                            <div className="col-1"></div>
                            <button onClick={() => { (this.state.hundreds ? this.setState({ hundreds: (this.state.hundreds - 100) }) : null) }} type="button" className="btn btn-primary btn-round col-2">
                                <i className="fas fa-minus"></i>
                            </button>
                            <div className="col-1"></div>
                        </div>
                        </BrowserView>
                <MobileView>
                <div className="form-row">
                <div className="btn-group col-12" role="group" aria-label="Basic example">
                         <button
                         onClick={() => { (this.state.tens ? this.setState({ tens: (this.state.tens - 10) }) : null) }}
                         type="button" className="btn btn-primary btn-round col-3"> <i className="fas fa-minus"></i></button>
                         <div className="col-6">
                         <h4  style={{
                                            color: this.props.currentUI.ColorPallete.firstColor,
                                            fontSize: this.props.currentUI.Font.titleFS,
                                            fontWeight: this.props.currentUI.Font.titleFW
                                            }}  >{"$ 10 ("+this.state.tens+")"}</h4>
                         </div>
                        <button type="button" 
                        onClick={() => { (this.setState({ tens: (this.state.tens + 10) })) }}
                        className="btn btn-primary btn-round col-3 "> <i className="fas fa-plus"></i></button>
                </div>
                </div>
                <div className="form-row">
                <div className="btn-group col-12" role="group" aria-label="Basic example">
                         <button 
                         onClick={() => { (this.state.twenties ? this.setState({ twenties: (this.state.twenties - 20) }) : null) }}
                         type="button" className="btn btn-primary btn-round col-3"> <i className="fas fa-minus"></i></button>
                          <div className="col-6">
                         <h4  style={{
                                            color: this.props.currentUI.ColorPallete.firstColor,
                                            fontSize: this.props.currentUI.Font.titleFS,
                                            fontWeight: this.props.currentUI.Font.titleFW
                                            }}  >{"$ 20 ("+this.state.twenties+")"}</h4>
                         </div>
                        <button type="button" 
                        onClick={() => { (this.setState({ twenties: (this.state.twenties + 20) })) }}
                        className="btn btn-primary btn-round col-3 "> <i className="fas fa-plus"></i></button>
                </div>
                </div>
                <div className="form-row">
                <div className="btn-group col-12" role="group" aria-label="Basic example">
                         <button
                         onClick={() => { (this.state.fifties ? this.setState({ fifties: (this.state.fifties - 50) }) : null) }}
                         type="button" className="btn btn-primary btn-round col-3"> <i className="fas fa-minus"></i></button>
                          <div className="col-6">
                         <h4  style={{
                                            color: this.props.currentUI.ColorPallete.firstColor,
                                            fontSize: this.props.currentUI.Font.titleFS,
                                            fontWeight: this.props.currentUI.Font.titleFW
                                            }}  >{"$ 50 ("+this.state.fifties+")"}</h4>
                         </div>
                        <button 
                        onClick={() => { (this.setState({ fifties: (this.state.fifties + 50) })) }}
                        type="button" className="btn btn-primary btn-round col-3"> <i className="fas fa-plus"></i></button>
                </div>
                </div>
                <div className="form-row">
                <div className="btn-group col-12" role="group" aria-label="Basic example">
                         <button
                         onClick={() => { (this.state.hundreds ? this.setState({ hundreds: (this.state.hundreds - 100) }) : null) }}
                         type="button" className="btn btn-primary btn-round col-3"> <i className="fas fa-minus"></i></button>
                          <div className="col-6">
                         <h4  style={{
                                            color: this.props.currentUI.ColorPallete.firstColor,
                                            fontSize: this.props.currentUI.Font.titleFS,
                                            fontWeight: this.props.currentUI.Font.titleFW
                                            }}  >{"$ 100 ("+this.state.hundreds+")"}</h4>
                         </div>
                        <button 
                        onClick={() => { (this.setState({ hundreds: (this.state.hundreds + 100) })) }}
                        type="button" className="btn btn-primary btn-round col-3 "> <i className="fas fa-plus"></i></button>
                </div>
                </div>
                </MobileView>
                        <div className="form-row">
                            <div className="form-group col-3 ">
                                <h4  style={{
                                            color: this.props.currentUI.ColorPallete.firstColor,
                                            fontSize: this.props.currentUI.Font.headingFS,
                                            fontWeight: this.props.currentUI.Font.headingFW,
                                            paddingTop: "35px"
                                            }} >Total Amount $</h4>
                            </div>
                            <div className="form-group col-6">
                                <input disabled={true} value={this.state.value} onChange={(value) => { (!isNaN(value) ? this.setState({ value }) : this.setState({ value: 0 })) }} type="number" className="form-control " id="total" placeholder="0"></input>
                            </div>
                        </div>

                        <div className="form-row">
                            <button style={{
                                                                color: this.props.currentUI.ColorPallete.fifthColor,
                                                                fontSize: this.props.currentUI.Font.headingFS,
                                                                fontWeight: this.props.currentUI.Font.headingFW
                                                                }}  onClick={this.confirm.bind(this)} type="button" className="btn btn-success btn-round col-4">
                                Confirm
                                                  </button>
                            <button style={{
                                                                color: this.props.currentUI.ColorPallete.fifthColor,
                                                                fontSize: this.props.currentUI.Font.headingFS,
                                                                fontWeight: this.props.currentUI.Font.headingFW
                                                                }}  onClick={this.reset.bind(this)} type="button" className="btn btn-info btn-round col-4">
                                Reset
                                                  </button>
                            <button style={{
                                                                color: this.props.currentUI.ColorPallete.fifthColor,
                                                                fontSize: this.props.currentUI.Font.headingFS,
                                                                fontWeight: this.props.currentUI.Font.headingFW
                                                                }}  onClick={this.return.bind(this, "quickcashout")} type="button" className="btn btn-danger btn-round col-3">
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
