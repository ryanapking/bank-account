function Account(name, deposit){
  this.name = name;
  this.balance = deposit;
}

Account.prototype.processTransaction = function(deposit, withdrawal) {
  if (!isNaN(deposit)) {
    this.balance += deposit;
  }
  if (!isNaN(withdrawal)) {
    this.balance -= withdrawal;
  }
};

$(document).ready(function(){
  var users = [];
  var currentUser = -1;
  $('form#registerForm').submit(function(event){
    event.preventDefault();
    var inputtedName = $('#nameInput').val();
    var inputtedInitialDeposit = parseFloat($('#initialDepositInput').val()).toFixed(2);
    user = new Account(inputtedName, inputtedInitialDeposit);
    debugger;
    users.push(user);
    var index = users.length - 1;
    $('#balanceDisplay').text(users[index].balance);
    $("ul").append("<li>" + users[index].name + "</li>");

    $("li").last().click(function() {

    });
  });
  $('#depositForm').submit(function(event) {
    var withdrawalInput = parseFloat($('#withdrawalInput').val()).toFixed(2);
    var depositInput = parseFloat($('#depositInput').val()).toFixed(2);
    user.processTransaction(depositInput, withdrawalInput);
    event.preventDefault();
    $('#balanceDisplay').text(user.balance);
  });

});
