function Bank() {
  this.members = [];
  this.currentId = 0;
}

Bank.prototype.addMember = function(member){
  member.id = this.addId();
  this.members.push(member);
};

Bank.prototype.addId = function(){
  this.currentId++;
  return this.currentId;
};

function Member(userName, firstName, lastName, phoneNumber, ssn, address, savings, checking){
  this.userName = userName;
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.ssn = ssn;
  this.address = address;
  this.savings = 0;
  this.checking = 0;
}

Bank.prototype.userNameCheck = function(userName){
  for (var i=0; i<this.members.length; i++){
    if (this.members[i].userName === userName){
      return this.members[i];
    };
  };
  return null;
};

Bank.prototype.signIn = function(userName){
  for (var i=0; i<this.members.length; i++){
    if (this.members[i]){
      if (this.members[i].userName === userName){
        return this.members[i];
      };
    };
  };
  return false;
};

var ashBank = new Bank ();

$(function(){
  $("form#signup-form").submit(function(event){
    event.preventDefault();
    var userNameInput = $("input#signUpUsername").val();
    var firstNameInput = $("input#signUpFirstName").val();
    var lastNameInput = $("input#signUpLastName").val();
    var addressInput = $("input#signUpAddress").val();
    var phoneNumberInput = $("input#signUpPhone").val();
    var ssnInput = $("input#signUpSsn").val();

    if (ashBank.userNameCheck(userNameInput) !== null){
      $("#userNameError").html("This username is taken, please select another.");
    } else {
      var newMember = new Member(userNameInput, firstNameInput, lastNameInput, phoneNumberInput, ssnInput, addressInput);
      ashBank.addMember(newMember);
      $("input#signUpUsername").val("");
      $("input#signUpFirstName").val("");
      $("input#signUpLastName").val("");
      $("input#signUpAddress").val("");
      $("input#signUpPhone").val("");
      $("input#signUpSsn").val("");
    };
  });

  $("form#signin-form").submit(function(event){
    event.preventDefault();
    var userNameInput = $("input#signInUsername").val();
    var user = ashBank.userNameCheck(userNameInput);
    console.log(user);
    if (user !== null){
      $("#home").hide();
      $("#dashboard").show();
      $("#savings").text("$" + user.savings);
      $("#checking").text("$" + user.checking);
    }

  });

});
