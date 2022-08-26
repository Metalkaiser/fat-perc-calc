class user {
  constructor(id,email,password,name,lastname,birthdate,gender){

    this.id = id;
    this.email = email;
    this.password = password;
    this.details = {
      name : name,
      lastname : lastname,
      birthdate : birthdate,
      gender : gender,
    };
    this.history = {};
    this.diet = {};
  }

  id = "";
  email = "";
  password = "";
  details = {};
  history = {};
  diet = {};
}

module.exports = user;