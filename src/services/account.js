import serverCall from './serverCall';

let Account = {
    getAccountbyUserId(id, responseFN){
        console.log(id, responseFN)
        let data = localStorage.getItem('data');
        data = JSON.parse(data);
        let body = JSON.stringify({
            userid: id
        });
        serverCall.serverrequest("account/byuserid",body,responseFN);
    },
    prepareCashout(id, responseFN){
        
    },
    getLastDenominations(id){

        var data = [370, 60, 80, 250];
        return data;
    },
};

export default Account;