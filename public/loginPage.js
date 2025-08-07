'use strict';

const userForm = new UserForm();

userForm.loginFormCallback = (data) => {
  const handleLoginResponse = (response) => {
    if (response === true) { 
      location.reload();
    } else {
        alert("Пользователь с таким логином или паролем не найден"); 
    }
  };

  ApiConnector.login(data, handleLoginResponse);
};


userForm.registerFormCallback = (data) => {
  const handleRegisterResponse = (response) => {
    if (response === true) { 
      location.reload();
    } else {
        alert("Невозможно зарегистироваться!"); 
    }
  };

  ApiConnector.register(data, handleRegisterResponse);
};