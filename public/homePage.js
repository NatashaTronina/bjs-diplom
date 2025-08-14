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

