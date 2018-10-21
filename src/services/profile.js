import serverCall from './serverCall';

let Account = {
    login(username,password,responseFN){
        let body = JSON.stringify({
            username: username,
            password:password
        });
        console.log(body);
        serverCall.serverrequest("user/login",body,responseFN);
    },
    register(username,password,name,impairment,experience,responseFN){
        let body = JSON.stringify({
            username: username,
            password: password,
            name: name,
            impairment: impairment,
            experience: experience
        });
        console.log(body);
        serverCall.serverrequest("user/register",body,responseFN);
    },

    updatedata(iduser,impairment,experience,responseFN){
        let body = JSON.stringify({
            iduser: iduser,
            impairment: impairment,
            experience: experience
        });
        console.log(body);
        serverCall.serverrequest("user/updatedata",body,responseFN);
    },
};

export default Account;