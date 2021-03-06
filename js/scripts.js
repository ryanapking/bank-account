// back end logic
function Account(name, deposit){
  var nameArray = name.split(" ");
  nameArray = nameArray.map(function(word) {
    word = word.toLowerCase();
    word = word.charAt(0).toUpperCase() + word.slice(1);
    return word;
  })
  this.name = nameArray.join(" ");
  if (isNaN(deposit)) {
    this.balance = 0;
  } else this.balance = deposit;
  this.transactionHistory = [];
  this.transactionHistory.push("<li>+ $" + this.balance.toFixed(2)+ "</li>");
};

Account.prototype.processTransaction = function(deposit, withdrawal) {
  if (!isNaN(deposit)) {
    this.balance += deposit;
    this.transactionHistory.push("<li>+ $" + deposit.toFixed(2) + "</li>");
  }
  if (!isNaN(withdrawal)) {
    this.balance -= withdrawal;
    this.transactionHistory.push("<li>- $" + withdrawal.toFixed(2) + "</li>");
  }
};

//front end logic
Account.prototype.displayBalance = function() {
  $('#balanceDisplay').text("$" + this.balance.toFixed(2));
  $("#history").html("");
  this.transactionHistory.forEach(function(transaction) {
    $("#history").prepend(transaction);
  })
};

Account.prototype.changeSelection = function(selection) {
  $("#userList").children().removeClass("backgroundColor");
  $(selection).addClass("backgroundColor");
  $(".currentUser").text(this.name + "'s");
};

$(document).ready(function(){
  var users = [];
  var currentUser = -1;
  $('form#registerForm').submit(function(event){
    event.preventDefault();
    var inputtedName = $('#nameInput').val();
    var inputtedInitialDeposit = parseFloat($('#initialDepositInput').val());
    user = new Account(inputtedName, inputtedInitialDeposit);
    users.push(user);
    var index = users.length - 1;
    users[index].displayBalance();
    $("#userList").append("<li><span class='users'>" + users[index].name + "</span></li>");
    currentUser = index;
    users[currentUser].changeSelection($(".users").last().parent());

    $("#userList li").last().click(function() {
      currentUser = index;
      users[currentUser].displayBalance();
      users[currentUser].changeSelection(this);
    });
    $("#nameInput").val("");
    $("#initialDepositInput").val("");
  });

  $('#depositForm').submit(function(event) {
    event.preventDefault();
    var withdrawalInput = parseFloat($('#withdrawalInput').val());
    var depositInput = parseFloat($('#depositInput').val());
    users[currentUser].processTransaction(depositInput, withdrawalInput);
    users[currentUser].displayBalance();
    $("#withdrawalInput").val("");
    $("#depositInput").val("");
  });

});
