/*
  <option value="1">Sedentario</option>
	<option value="1.2">Mínimo</option>
	<option value="1.375">Poco</option>
	<option value="1.55">Moderado</option>
  <option value="1.725">Fuerte</option>
	<option value="1.9">Intenso</option>
*/
function calculateDiet(user, request) {
  var cal, win,lose,pt, hc, fat;
  let today = new Date();
  let age = Math.floor((today - user.details.birthdate)/31536000000);
  if (user.details.gender == 'male') {
    cal = ((10*request.weight)+(6.25*request.height)-(5*age)+5)*request.activity;
  }else {
    cal = ((10*request.weight)+(6.25*request.height)-(5*age)-161)*request.activity;
  }

  win = cal*1.15;
  lose = cal*0.85;

  pt = 1.5*request.weight;
  hc = ((cal*0.9) - (pt*4))/4;
  fat = (cal*0.1)/9;

  return {
    'calories': cal.toFixed(2),
    'hc': hc.toFixed(2),
    'pt': pt.toFixed(2),
    'ft': fat.toFixed(2),
    'win': win.toFixed(2),
    'lose': lose.toFixed(2)
  }
}

module.exports = calculateDiet;