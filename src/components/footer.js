import React, { Component } from 'react';

class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        return (
        <footer className="footer footer-default">
            <div className="container">
                <nav className="float-left">
                    <ul>
                        <li>
                            <a href="#">
                                Account
                          </a>
                        </li>
                        <li>
                            <a href="#">
                                Settings
                             </a>
                        </li>
                    </ul>
                </nav>
                <div className="copyright float-right">
                    &copy;
                 <a href="#" target="_blank">Komos copyright 2019.</a>
                </div>
            </div>
        </footer>
        );
    }
}

export default Footer
