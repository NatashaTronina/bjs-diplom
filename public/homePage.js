'use strict';

const logoutUser = new LogoutButton();

logoutUser.action = () => {
    ApiConnector.logout((response) =>{
        if(response && response.success === true){
            location.reload();
        }else{
            userForm.setLoginErrorMessage(response.error);
        }
    });
};

ApiConnector.current((response) => {
  if (response && response.success === true && response.data) { 
    ProfileWidget.showProfile(response.data); 
  } else {
    console.error("Ошибка при получении данных текущего пользователя:", response.error);
  }
});

const ratesBoard = new RatesBoard();

function updateTable() {
    ApiConnector.getStocks((response) =>{
        if (response && response.success === true && response.data) {
            ratesBoard.clearTable(); 
            ratesBoard.fillTable(response.data);
        } else {
            console.error("Ошибка при получении данных:", response.error);
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
      moneyManager.setMessage(true, response.success);
    } else {
      moneyManager.setMessage(false, response.error);
    }
  });
};

moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (response) => {
        if(response && response.success === true && response.data) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, response.success);
        } else{
            moneyManager.setMessage(false, response.error);
        }
    });
};

moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (response) => {
        if(response && response.success === true && response.data) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, response.success);
        } else{
            moneyManager.setMessage(false, response.error);
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
    console.error("Ошибка при получении данных текущего пользователя:", response.error);
  }
});

favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, (response) => {
        if (response && response.success === true && response.data) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        } else{
            favoritesWidget.setMessage(false, response.error)
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
            favoritesWidget.setMessage(false, response.error)
        }
    });
};