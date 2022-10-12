const userDetails = require('../../src/config/userdb');

async function storeHistory(id, request) {
  var divider, result, tip, fat, muscle, lastHistory;
  let user = await userDetails.findOne({id: id});
  let gender = user.details.gender;
  let today = new Date();
  let age = Math.floor((today - user.details.birthdate)/31536000000);

  if (request.waist != "" && request.neck != "" && request.height != "") {
    if (gender == 'male') {
      divider = 1.0324+0.15456*Math.log10(parseFloat(request.height))-0.19077*Math.log10(parseFloat(request.waist)-parseFloat(request.neck));
      result = (495/divider)-450;
      if (age >= 20 && age < 40) {
        if(result > 25){
          tip = 'obesity';
        }else if(result < 8){
          tip = 'underweight';
        }else if(result >= 8 && result <= 14) {
          tip = 'healthy';
        }else if(result > 14 && result < 20) {
          tip = 'warning';
        }else if(result >= 20 && result <= 25) {
          tip = 'overweight';
        }
      }
      if (age >= 40 && age < 60) {
        if(result > 28){
          tip = 'obesity';
        }else if(result < 11){
          tip = 'underweight';
        }else if(result >= 11 && result <= 16) {
          tip = 'healthy';
        }else if(result > 16 && result < 22) {
          tip = 'warning';
        }else if(result >= 22 && result <= 28) {
          tip = 'overweight';
        }
      }
      if (age >= 60 && age < 80) {
        if(result > 30){
          tip = 'obesity';
        }else if(result < 13){
          tip = 'underweight';
        }else if(result >= 13 && result <= 19) {
          tip = 'healthy';
        }else if(result > 19 && result <= 25) {
          tip = 'warning';
        }else if(result > 25 && result <= 30) {
          tip = 'overweight';
        }
      }
    }
    if (gender == 'female') {
      if (typeof request.hip !== 'undefined' && request.hip != "") {
        divider = 1.29579+0.221*Math.log10(parseFloat(request.height))-0.35004*Math.log10(parseFloat(request.waist)+parseFloat(request.hip)-parseFloat(request.neck));
        result = (495/divider)-450;
        if (age >= 20 && age < 40) {
          if(result > 39){
            tip = 'obesity';
          }else if(result < 21){
            tip = 'underweight';
          }else if(result >= 21 && result <= 27) {
            tip = 'healthy';
          }else if(result > 27 && result < 33) {
            tip = 'warning';
          }else if(result >= 33 && result <= 39) {
            tip = 'overweight';
          }
        }
        if (age >= 40 && age < 60) {
          if(result > 40){
            tip = 'obesity';
          }else if(result < 23){
            tip = 'underweight';
          }else if(result >= 23 && result <= 29) {
            tip = 'healthy';
          }else if(result > 29 && result < 35) {
            tip = 'warning';
          }else if(result >= 35 && result <= 40) {
            tip = 'overweight';
          }
        }
        if (age >= 60 && age < 80) {
          if(result > 42){
            tip = 'obesity';
          }else if(result < 24){
            tip = 'underweight';
          }else if(result >= 24 && result <= 30) {
            tip = 'healthy';
          }else if(result > 30 && result <= 36) {
            tip = 'warning';
          }else if(result > 36 && result <= 42) {
            tip = 'overweight';
          }
        }
      } else {
        return "Missing fields";
      }
    }

    if (request.weight != "") {
      fat = parseFloat(request.weight)*result/100;
      muscle = parseFloat(request.weight) - fat;
    }
  }else {
    return "Missing fields";
  }
  
  if (Object.keys(user.history).length > 1) {
    lastHistory = user.history[(Object.keys(user.history).length)-1];
    var weekAgo = new Date();
    weekAgo.setDate(today.getDate() - 7);
  }
  if (Object.keys(user.history).length > 1 && lastHistory.date <= weekAgo || Object.keys(user.history).length == 1) {
    await userDetails.updateOne({id:id},{$push:{
      history:{
        'date':today,
        'height':request.height,
        'weight':request.weight,
        'pfat':result
      }
    }});
  }

  return {
    'result': result.toFixed(2),
    'tip': tip,
    'fat': fat.toFixed(2),
    'muscle': muscle.toFixed(2)
  };
}


module.exports = storeHistory;