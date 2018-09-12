let Account = {
    login(id,password){

        let success = false;

        let data = [
            {username:'user1',
            password:'user1',
            type:'costumer'},
            {username:'user2',
            password:'user2',
            type:'costumer'}
        ];

        for (let i = 0; i < data.length; i++) { 
            if(data.username === id && data.password === password ){
                success = true;
            }
        }

        return success;

    },
};

export default Account;