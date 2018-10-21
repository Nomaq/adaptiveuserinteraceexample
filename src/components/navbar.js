import React, { Component } from 'react';

class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    logOut(){
        sessionStorage.removeItem('userid');
        this.props.history.push('/');
    }

    render() {
        return (
                <nav className="navbar navbar-transparent navbar-color-on-scroll fixed-top navbar-expand-lg" color-on-scroll="100" id="sectionsNav">
                    <div className="container">
                        <div className="navbar-translate">
                            <i className="fab fa-bandcamp"></i>
                            <a className="navbar-brand" href="#">
                                KoMos </a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="navbar-toggler-icon"></span>
                                <span className="navbar-toggler-icon"></span>
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        </div>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="/main" >
                                        <i className="material-icons">account_box</i> Accounts
                                        </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/settings" >
                                        <i className="material-icons">settings</i> Settings
                                     </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={()=>this.logOut()} >
                                        <i className="material-icons">power_settings_new</i> Logout
                                     </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
        );
    }
}

export default Navbar;
