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
                            <th>Type</th>
                            <th className="th-description">this</th>
                            <th className="th-description">Status</th>
                            <th className="text-right">Ammount include queued</th>
                            <th className="text-right">Amount</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="td-name">
                                <a href={"/accountdetail/"+ this.props.data.id }> {this.props.data.id}</a>
                            </td>
                            <td>
                                {this.props.data.type}
                             </td>
                            <td>
                            {this.props.data.currency}
                            </td>
                            <td className="td-number">
                            {this.props.data.status}
                              </td>
                            <td className="td-number">
                            {this.props.data.queued}
                            </td>
                            <td className="td-actions">
                            {this.props.data.total}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>);
    }
}

export default AccountInfo;
