import React, { Component } from 'react';
import logoImg from '../images/bandcamp-brands.gif';


const imageUrl = require(`../images/bg-01.jpg`);

class AccountInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
     }


    render() {

        return (
            <div className="table-responsive">
                <table className="table table-shopping">
                    <thead>
                        <tr>
                            <th className="text-center"></th>
                            <th style={{
                                                                    color: this.props.currentUI.ColorPallete.firstColor,
                                                                    fontSize: this.props.currentUI.Font.headingFS,
                                                                    fontWeight: this.props.currentUI.Font.headingFW }}>Type</th>
                            <th style={{
                                                                    color: this.props.currentUI.ColorPallete.firstColor,
                                                                    fontSize: this.props.currentUI.Font.headingFS,
                                                                    fontWeight: this.props.currentUI.Font.headingFW }} className="th-description">this</th>
                            <th style={{
                                                                    color: this.props.currentUI.ColorPallete.firstColor,
                                                                    fontSize: this.props.currentUI.Font.headingFS,
                                                                    fontWeight: this.props.currentUI.Font.headingFW }} className="th-description">Status</th>
                            <th style={{
                                                                    color: this.props.currentUI.ColorPallete.firstColor,
                                                                    fontSize: this.props.currentUI.Font.headingFS,
                                                                    fontWeight: this.props.currentUI.Font.headingFW }} className="text-right">Ammount include queued</th>
                            <th style={{
                                                                    color: this.props.currentUI.ColorPallete.firstColor,
                                                                    fontSize: this.props.currentUI.Font.headingFS,
                                                                    fontWeight: this.props.currentUI.Font.headingFW }} className="text-right">Amount</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="td-name">
                                <a style={{   color: this.props.currentUI.ColorPallete.fourthColor,
                                           fontSize: this.props.currentUI.Font.textFS,
                                           fontWeight: this.props.currentUI.Font.textFW }} href={"/accountdetail/"+ this.props.data.idaccount }> {this.props.data.idaccount}</a>
                            </td>
                            <td style={{   color: this.props.currentUI.ColorPallete.fourthColor,
                                           fontSize: this.props.currentUI.Font.textFS,
                                           fontWeight: this.props.currentUI.Font.textFW }}>
                                {this.props.data.type}
                             </td>
                            <td style={{   color: this.props.currentUI.ColorPallete.fourthColor,
                                           fontSize: this.props.currentUI.Font.textFS,
                                           fontWeight: this.props.currentUI.Font.textFW }}>
                            {this.props.data.currency}
                            </td>
                            <td style={{   color: this.props.currentUI.ColorPallete.fourthColor,
                                           fontSize: this.props.currentUI.Font.textFS,
                                           fontWeight: this.props.currentUI.Font.textFW }} className="td-number">
                            {this.props.data.status}
                              </td>
                            <td style={{   color: this.props.currentUI.ColorPallete.fourthColor,
                                           fontSize: this.props.currentUI.Font.textFS,
                                           fontWeight: this.props.currentUI.Font.textFW }} className="td-number">
                            {this.props.data.queued}
                            </td>
                            <td style={{   color: this.props.currentUI.ColorPallete.fourthColor,
                                           fontSize: this.props.currentUI.Font.textFS,
                                           fontWeight: this.props.currentUI.Font.textFW }} className="td-actions">
                            {this.props.data.total}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>);
    }
}

export default AccountInfo;
