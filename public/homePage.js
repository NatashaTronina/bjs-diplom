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
  if (response && response.success === true && response.data) { 
    ProfileWidget.showProfile(response.data); 
  } else {
    console.error("Ошибка при получении данных текущего пользователя:", response);
  }
});

const ratesBoard = new RatesBoard();

function updateTable() {
    ApiConnector.getStocks((response) =>{
        if (response && response.success === true && response.data) {
            ratesBoard.clearTable(); 
            ratesBoard.fillTable(response.data);
        } else {
            console.error("Ошибка при получении данных:", response);
        }
    });
} 

updateTable();
setInterval(updateTable, 60000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (response) => {
    if (response && response.success === true && response.data) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, "Баланс успешно пополнен");
    } else {
      moneyManager.setMessage(false, "Не удалось пополнить баланс");
    }
  });
};

moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (response) => {
        if(response && response.success === true && response.data) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Валюта успешно конвертирована");
        } else{
            moneyManager.setMessage(false, "Не удалось конвертировать валюту");
        }
    });
};

moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (response) => {
        if(response && response.success === true && response.data) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Валюта успешно переведена");
        } else{
            moneyManager.setMessage(false, "Не удалось перевести валюту");
        }
    });
};

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((response) => {
  if (response && response.success === true) { 
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  } else {
    console.error("Ошибка при получении данных текущего пользователя:", response);
  }
});

favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, (response) => {
        if (response && response.success === true && response.data) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        } else{
            favoritesWidget.setMessage(false, "Не удалось добавить пользователя в список избранных")
        }
    });
};

favoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        if (response && response.success === true && response.data) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        } else{
            favoritesWidget.setMessage(false, "Не удалось удалить пользователя из списка избранных")
        }
    });
};