'use strict';

const logoutUser = new LogoutButton();

logoutUser.action = () => {
    ApiConnector.logout((response) =>{
        if(response && response.success === true){
            location.reload();
        }else{
            userForm.setLoginErrorMessage("Не удалось выйти");
        }
    });
};

ApiConnector.current((response) => {
  if (response && response.success === true) { 
    ProfileWidget.showProfile(response.data); 
  } else {
    console.error("Ошибка при получении данных текущего пользователя:", response);
  }
});

