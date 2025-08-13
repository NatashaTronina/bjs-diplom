'use strict';

const userForm = new UserForm();

userForm.loginFormCallback = (data) => {
  ApiConnector.login(data, (response) => {
    if (response && response.success === true) {
      location.reload();
    } else {
      console.error("Ошибка при входе:", response); 
    }
  });
};

userForm.registerFormCallback = (data) => {
  ApiConnector.register(data, (response) => {
    if (response && response.success === true) {
      location.reload();
    } else {
      console.error("Ошибка при регистрации:", response);
    }
  });
};
