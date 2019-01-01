import serverCall from './serverCall';

let Account = {
    getAccountbyUserId(id, responseFN){
        console.log(id, responseFN)
        let body = JSON.stringify({
            userid: id
        });
        serverCall.serverrequest("account/byuserid",body,responseFN);
    },
    preparedCashout(iduser,amount,account,date,responseFN){
        console.log(iduser);
        let body = JSON.stringify({
            iduser: iduser,
            amount: amount,
            account: account,
            date: date,
        });
        serverCall.serverrequest("account/preparecashout",body,responseFN);
    },
    getCashoutbyUserId(iduser,responseFN){
        let body = JSON.stringify({
            iduser: iduser,
        });
        serverCall.serverrequest("account/getcashoutbyid",body,responseFN);
    },
    getCashouts(iduser,responseFN){
        
        let body = JSON.stringify({
            iduser: iduser,
        });
        serverCall.serverrequest("account/getcashouts",body,responseFN);
    },
    doCashouts(ids,responseFN){
        
        let body = JSON.stringify({
            id: ids,
        });
        serverCall.serverrequest("account/docashouts",body,responseFN);
    },
    deletecashout(iduser,responseFN){
        let body = JSON.stringify({
            iduser: iduser,
        });
        serverCall.serverrequest("account/deletecashout",body,responseFN);
    },
    getLastDenominations(id){

        var data = [370, 60, 80, 250];
        return data;
    },
};

export default Account;