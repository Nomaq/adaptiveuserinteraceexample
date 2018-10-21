import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Profile from '../services/profile';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';



const imageUrl = require(`../images/bg-01.jpg`);

class Settings extends Component {

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

    updatedata(){
        let context  = this;
        if(!this.state.experience || !this.state.impairments){
            alert("Please check your information");
            return;
        }
        Profile.updatedata(this.state.userid,this.state.impairments, this.state.experience, function(response){
            setTimeout(function () {
                console.log(response);
                if(response && response ){
                    sessionStorage.setItem('impairments', context.state.impairments );
                    sessionStorage.setItem('experience', context.state.experience );
                    context.setState({ loading: false });
                    context.props.history.push('/main');

                } else {
                    context.setState({ loading: false });
                    alert("something went wrong");
                }
            }, 1000);
         });

    }

    render() {
        let imageUrl = require('../images/bg-01.jpg');

        if(this.props.currentUI){
            imageUrl = require('../images/'+this.props.currentUI.Background);
        }
        
        return (
            <div className="landing-page sidebar-collapse" style={{ backgroundImage: `url(${imageUrl})` }}>
                <Navbar
                history = {this.props.history} />
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
                                        <div className="card-header card-header-primary">
                                            <h3 style={{
                                            color: this.props.currentUI.ColorPallete.fifthColor,
                                            fontSize: this.props.currentUI.Font.titleFS,
                                            fontWeight: this.props.currentUI.Font.headingFW
                                            }}>Settings</h3>
                                        </div>
                                        <div className="card-body ">
                                            <div className="tab-content text-center">
                                                <div className="tab-pane active show" id="settings">
                                                    <form>
                                                        <div className="form-row">
                                                            <div className="form-group col-md-12">
                                                                <label style={{
                                                                color: this.props.currentUI.ColorPallete.firstColor,
                                                                fontSize: this.props.currentUI.Font.headingFS,
                                                                fontWeight: this.props.currentUI.Font.headingFW
                                                                }} htmlFor="inputState">Do you have problems reading small fonts?</label>
                                                                <select style={{   color: this.props.currentUI.ColorPallete.fourthColor,
                                           fontSize: this.props.currentUI.Font.textFS,
                                           fontWeight: this.props.currentUI.Font.textFW }}  onChange={(impairments)=> this.setState({impairments:impairments.target.value})} value={this.state.impairments} id="inputStat" className="form-control">
                                                                <option selected>Choose...</option>
                                                                <option>No</option>
                                                                <option>Yes</option>
                                                            </select>
                                                            </div>
                                                        </div>
                                                        <div className="form-row">
                                                            <div className="form-group col-md-12">
                                                                <label style={{
                                                                color: this.props.currentUI.ColorPallete.firstColor,
                                                                fontSize: this.props.currentUI.Font.headingFS,
                                                                fontWeight: this.props.currentUI.Font.headingFW
                                                                }}htmlFor="inputState">Do you have experience with other banking systems?</label>
                                                                <select style={{   color: this.props.currentUI.ColorPallete.fourthColor,
                                           fontSize: this.props.currentUI.Font.textFS,
                                           fontWeight: this.props.currentUI.Font.textFW }}  id="inputSta" onChange={(experience)=> this.setState({experience:experience.target.value})} value={this.state.experience} className="form-control">
                                                                <option value={""} >Choose...</option>
                                                                <option value={0}>Not at all</option>
                                                                <option value={1}>A little</option>
                                                                <option value={2} >I use them sometimes</option>
                                                                <option value={3}>I use them often</option>
                                                            </select>
                                                            </div>
                                                        </div>
                                                        <h3 style={{
                                                            color: this.props.currentUI.ColorPallete.firstColor,
                                                            fontSize: this.props.currentUI.Font.titleFS,
                                                            fontWeight: this.props.currentUI.Font.headingFW
                                                            }}> Change Pin </h3>
                                                        <div className="form-row">
                                                            <div className="form-group col-md-6">
                                                                <label style={{
                                                                color: this.props.currentUI.ColorPallete.firstColor,
                                                                fontSize: this.props.currentUI.Font.headingFS,
                                                                fontWeight: this.props.currentUI.Font.headingFW
                                                                }}  htmlFor="inputPassword4">New Pin</label>
                                                                <input style={{
                                                                color: this.props.currentUI.ColorPallete.firstColor,
                                                                fontSize: this.props.currentUI.Font.headingFS,
                                                                fontWeight: this.props.currentUI.Font.headingFW
                                                                }}   type="password" className="form-control" id="inputPassword4" placeholder="Password"></input>
                                                            </div>
                                                            <div className="form-group col-md-6">
                                                                <label style={{
                                                                color: this.props.currentUI.ColorPallete.firstColor,
                                                                fontSize: this.props.currentUI.Font.headingFS,
                                                                fontWeight: this.props.currentUI.Font.headingFW
                                                                }}  htmlFor="inputPassword4">Confirm Pin</label>
                                                                <input style={{
                                                                color: this.props.currentUI.ColorPallete.firstColor,
                                                                fontSize: this.props.currentUI.Font.headingFS,
                                                                fontWeight: this.props.currentUI.Font.headingFW
                                                                }}  type="password" className="form-control" id="inputPassword4" placeholder="Password"></input>
                                                            </div>
                                                        </div>
                                                        <button style={{
                                                                color: this.props.currentUI.ColorPallete.fifthColor,
                                                                fontSize: this.props.currentUI.Font.headingFS,
                                                                fontWeight: this.props.currentUI.Font.headingFW
                                                                }}   onClick={() => this.updatedata()} type="button" className="btn btn-success">Confirm</button>
                                                        <button style={{
                                                                color: this.props.currentUI.ColorPallete.fifthColor,
                                                                fontSize: this.props.currentUI.Font.headingFS,
                                                                fontWeight: this.props.currentUI.Font.headingFW
                                                                }}   type="button" className="btn btn-warning">Reset</button>
                                                        <button style={{
                                                                color: this.props.currentUI.ColorPallete.fifthColor,
                                                                fontSize: this.props.currentUI.Font.headingFS,
                                                                fontWeight: this.props.currentUI.Font.headingFW
                                                                }}   onClick={() => window.history.back()} type="button" className="btn btn-danger">Cancel</button>
                                                    </form>
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

export default Settings;
