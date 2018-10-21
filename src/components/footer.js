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
               
                <div className="copyright float-right">
                    &copy;
                 <a style={{   color: this.props.currentUI.ColorPallete.fourthColor,
                                           fontSize: this.props.currentUI.Font.textFS,
                                           fontWeight: this.props.currentUI.Font.textFW }}
                                            href="#" target="_blank">Komos copyright 2019.</a>
                </div>
            </div>
        </footer>
        );
    }
}

export default Footer
