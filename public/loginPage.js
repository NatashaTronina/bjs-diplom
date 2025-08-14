'use strict';

const userForm = new UserForm();

userForm.loginFormCallback = (data) => {
  ApiConnector.login(data, (response) => {
    if (response && response.success === true) {
      location.reload();
    } else {
      userForm.setLoginErrorMessage("Ошибка при входе")
    }
  });
};

userForm.registerFormCallback = (data) => {
  ApiConnector.register(data, (response) => {
    if (response && response.success === true) {
      location.reload();
    } else {
      userForm.setRegisterErrorMessage("Ошибка при регистрации")
    }
  });
};
