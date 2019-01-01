var serverAddress = "http://192.168.179.106:3005/";
const axios = require('axios');

var apiCall = {
    serverrequest(request, body, responseFN) {

        console.log(request, body);

        let requestURL = serverAddress + request;
        axios.post(
            requestURL, 
            body,
            {
               headers: {
                Accept: 'application/json',
               'Content-Type': 'application/json',
               }
            }
        ).then(function (response) {
            // handle success
            responseFN(response.data);
            
          })
          .catch(function (error) {
            responseFN(false);
            console.log(error);
          })
    }
}
export default apiCall;