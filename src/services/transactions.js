let Transaction = {
    getTransactionbyAccId(id){

        let transdata = localStorage.getItem('transdata');
        transdata = JSON.parse(transdata);
        transdata = transdata[id];
        console.log(transdata,id);
        return transdata;

    },
};

export default Transaction;