import serverCall from './serverCall';
let Transaction = {
    getTransactionbyAccId(id, responseFN){
        let body = JSON.stringify({
            accountid: id
        });
        serverCall.serverrequest("account/gettransactionsid",body,responseFN);
    },

    getTddransactionbyAccId(id){

        let transdata = localStorage.getItem('transdata');
        transdata = JSON.parse(transdata);
        transdata = transdata[id];
        console.log(transdata,id);
        return transdata;

    },
};

export default Transaction;