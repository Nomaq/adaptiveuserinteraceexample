let DataInit = {
    initData(){

        let data = localStorage.getItem('data');
        let transdata = localStorage.getItem('transdata');
        if(!data || !transdata ){
            let data = {
            acc1: {id: 3243243243, type: "Checking Account", currency: "USD", status: "Active" , queued: 3000 , total: 3000,},
            acc2: {id: 5434300522, type: "Savings Account", currency: "USD", status: "Active" , queued: 10000 , total: 10000},
            acc3: {id: 5088999375, type: "Savings Account", currency: "USD", status: "Active" , queued: 8000 , total: 8000},
            }

            let transdata = {
                3243243243: [
                       {"descriptions": "Direct debit (Rent)", "date": "03/10/2018", "amount": -350, "total": 3000},
                       {"descriptions": "Withdraw ATM (Sudring)", "date": "15/09/2018", "amount": -500, "total": 3350},
                       {"descriptions": "Deposit", "date": "15/09/2018", "amount": 750, "total": 4850},
                       {"descriptions": "Direct debit (Rent)", "date": "03/09/2018", "amount": -350, "total": 3100},
                       {"descriptions": "Withdraw ATM (Shell)", "date": "22/09/2018", "amount": -350, "total": 3450},
                       {"descriptions": "Deposit", "date": "15/08/2018", "amount": 800, "total": 3800},
                       {"descriptions": "Direct debit (Rent)", "date": "03/08/2018", "amount": -350, "total": 3000},
                       {"descriptions": "Withdraw ATM (Gas station)", "date": "12/07/2018", "amount": -500,"total": 3350},
                       {"descriptions": "Direct debit (Rent)", "date": "03/07/2018", "amount": -350, "total": 3850},
                       {"descriptions": "Deposit", "date": "15/06/2018", "amount": 800, "total": 4200},
                       {"descriptions": "Withdraw ATM (Pad/gas)", "date": "15/06/2018", "amount": -400, "total": 3400},
                       {"descriptions": "Direct debit (Rent)", "date": "03/06/2018", "amount": -350, "total": 3800},
                       {"descriptions": "Withdraw ATM (Pad/gas)", "date": "05/05/2018", "amount": -500, "total": 4150},
                       {"descriptions": "Direct debit (Rent)", "date": "03/05/2018", "amount": -350, "total": 4650},
                       {"descriptions": "Deposit", "date": "01/05/2018", "amount": 5000, "total": 5000}],
                   5434300522: [
                    {"descriptions": "Deposit", "date": "01/10/2018", "amount" : 1000, "total": 10000},
                    {"descriptions": "Deposit", "date": "01/09/2018", "amount" : 1000, "total": 9000},
                    {"descriptions": "Deposit", "date": "01/08/2018", "amount": 1000, "total": 8000},
                    {"descriptions": "Deposit", "date": "01/07/2018", "amount": 1000, "total": 7000},
                    {"descriptions": "Deposit", "date": "01/06/2018", "amount": 1000, "total": 6000},
                    {"descriptions": "Deposit", "date": "01/05/2018", "amount": 1000, "total": 5000},
                    {"descriptions": "Deposit", "date": "01/04/2018", "amount": 1000, "total": 4000},
                    {"descriptions": "Deposit", "date": "01/03/2018", "amount": 1000, "total": 3000},
                    {"descriptions": "Deposit", "date": "01/02/2018", "amount": 1000, "total": 2000},
                    {"descriptions": "Deposit", "date": "01/01/2018", "amount": 1000, "total": 1000 }
                ],
                5088999375: [
                    {"descriptions": "Direct Debit (Private School)", "date": "03/10/2018", "amount": -200, "total": 8000},
                    {"descriptions": "Deposit", "date": "01/10/2018", "amount" : 1000, "total": 8200},
                    {"descriptions": "Direct Debit (Private School)", "date": "03/09/2018", "amount": -200, "total": 7200},
                    {"descriptions": "Deposit", "date": "01/09/2018", "amount" : 1000, "total": 7400},
                    {"descriptions": "Direct Debit (Private School)", "date": "03/08/2018", "amount": -200, "total": 6400},
                    {"descriptions": "Deposit", "date": "01/08/2018", "amount": 1000, "total": 6600},
                    {"descriptions": "Direct Debit (Private School)", "date": "03/07/2018", "amount": -200, "total": 5600},
                    {"descriptions": "Deposit", "date": "01/07/2018", "amount": 1000, "total": 5800},
                    {"descriptions": "Direct Debit (Private School)", "date": "03/06/2018", "amount": -200, "total": 4800},
                    {"descriptions": "Deposit", "date": "01/06/2018", "amount": 1000, "total": 5000},
                    {"descriptions": "Direct Debit (Private School)", "date": "03/05/2018", "amount": -200, "total": 4000},
                    {"descriptions": "Deposit", "date": "01/05/2018", "amount": 1000, "total": 4200},
                    {"descriptions": "Direct Debit (Private School)", "date": "03/04/2018", "amount": -200, "total": 3200},
                    {"descriptions": "Deposit", "date": "01/04/2018", "amount": 1000, "total": 3400},
                    {"descriptions": "Direct Debit (Private School)", "date": "03/03/2018", "amount": -200, "total": 2400},
                    {"descriptions": "Deposit", "date": "01/03/2018", "amount": 1000, "total": 2600},
                    {"descriptions": "Direct Debit (Private School)", "date": "03/02/2018", "amount": -200, "total": 1600},
                    {"descriptions": "Deposit", "date": "01/02/2018", "amount": 1000, "total": 1800},
                    {"descriptions": "Direct Debit (Private School)", "date": "03/01/2018", "amount": -200, "total": 800},
                    {"descriptions": "Deposit", "date": "01/01/2018", "amount": 1000, "total": 1000}
                ],
                }

            localStorage.setItem('data',JSON.stringify(data));
            localStorage.setItem('transdata',JSON.stringify(transdata));

        }

    }
};

export default DataInit;