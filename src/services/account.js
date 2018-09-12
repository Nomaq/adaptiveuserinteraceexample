let Account = {
    getAccountbyUserId(id){

        let data = localStorage.getItem('data');

       data = JSON.parse(data);
        return data;

    },
    getLastDenominations(id){

        var data = [370, 60, 80, 250];
        return data;
    },
};

export default Account;