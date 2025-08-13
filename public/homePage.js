'use strict';

const logoutUser = new LogoutButton();

logoutUser.action = () => {
    ApiConnector.logout((response) =>{
        if(response && response.success === true){
            location.reload()
        }
    });
};


