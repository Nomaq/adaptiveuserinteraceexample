import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
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

    handleChange(date) {
        this.setState({
            startDate: date
        });
    }


    render() {

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
                                        <div className="card-header card-header-primary">
                                            <h3>Settings</h3>
                                        </div>
                                        <div className="card-body ">
                                            <div className="tab-content text-center">
                                                <div className="tab-pane active show" id="settings">
                                                    <form>
                                                        <div className="form-row">
                                                            <div className="form-group col-md-12">
                                                                <label htmlFor="inputState">Please select your date of birth</label>
                                                                <DatePicker
                                                                    selected={this.state.startDate}
                                                                    onChange={this.handleChange.bind(this)}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form-row">
                                                            <div className="form-group col-md-12">
                                                                <label htmlFor="inputState">Do you have problems reading small fonts?</label>
                                                                <select id="inputState" className="form-control">
                                                                    <option selected>Choose...</option>
                                                                    <option>No</option>
                                                                    <option>Yes</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="form-row">
                                                            <div className="form-group col-md-12">
                                                                <label htmlFor="inputState">Do you have experience with other banking systems?</label>
                                                                <select id="inputState" className="form-control">
                                                                    <option selected>Choose...</option>
                                                                    <option>Not at all</option>
                                                                    <option>A little</option>
                                                                    <option>I use them sometimes</option>
                                                                    <option>I use them often</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <h3> Change Pin </h3>
                                                        <div className="form-row">

                                                            <div className="form-group col-md-4">
                                                                <label htmlFor="inputEmail4">Current Pin</label>
                                                                <input type="email" className="form-control" id="inputEmail4" placeholder="Email"></input>
                                                            </div>
                                                            <div className="form-group col-md-4">
                                                                <label htmlFor="inputPassword4">New Pin</label>
                                                                <input type="password" className="form-control" id="inputPassword4" placeholder="Password"></input>
                                                            </div>
                                                            <div className="form-group col-md-4">
                                                                <label htmlFor="inputPassword4">Confirm Pin</label>
                                                                <input type="password" className="form-control" id="inputPassword4" placeholder="Password"></input>
                                                            </div>
                                                        </div>
                                                        <button type="button" className="btn btn-success">Confirm</button>
                                                        <button type="button" className="btn btn-warning">Reset</button>
                                                        <button onClick={() => window.history.back()} type="button" className="btn btn-danger">Cancel</button>
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
                <Footer />
            </div>
        );
    }
}

export default Settings;
