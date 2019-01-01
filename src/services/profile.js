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
    register(username,password,name,impairments,experience,responseFN){
        let body = JSON.stringify({
            username: username,
            password: password,
            name: name,
            impairments: impairments,
            experience: experience
        });
        console.log(body);
        serverCall.serverrequest("user/register",body,responseFN);
    },

    updatedata(iduser,impairments,experience,responseFN){
        let body = JSON.stringify({
            iduser: iduser,
            impairments: impairments,
            experience: experience
        });
        console.log(body);
        serverCall.serverrequest("user/updatedata",body,responseFN);
    },
};

export default Account;