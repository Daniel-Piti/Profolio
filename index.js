var coins = get_Cookies_array();
var text  = document.getElementById("diff");

console.log(coins)


function add_coin(coin){
  let amount   = document.getElementById('amount').value;
  let buyPrice = document.getElementById('buyPrice').value;

  //VALID NUMS
  if(isNaN(amount) || isNaN(buyPrice) || amount == "" || buyPrice ==""){
    console.log("NAN");
    return;
  }

  //CHECK IF EXIST
  if(coins)
    for (let i = 0; i < coins.length; i++)
      if(coins[i][0] == coin)
        return;

  updateCookie(coin, amount, buyPrice);

  text.innerHTML += coins[coins.length - 1] + '<br>'
  // console.log('Request for : ' + coin + 'USDT');
  // fetch('https://api.binance.com/api/v1/ticker/price?symbol=' + coin + 'USDT')
  // .then(response=>response.json())
  // .then(data => console.log(data))
}

set_text();


function set_text(){
  text.innerHTML = "COIN AMOUNT BUY PRICE<br>"
  if(coins)
    for(let i = 0; i < coins.length; i++)
      text.innerHTML += coins[i] + '<br>';
  
}


var add_button = document.getElementById('add');

add_button.addEventListener('click', () => add_coin(document.getElementById('list').value));

function updateCookie(coin, amount, price){
  if(coins == undefined){
    document.cookie = "coins=" + coin + ':' + amount + ':' + price;
    coins = [[coin, amount, price]];
  }
  else{
    document.cookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('coins')) + ',' + coin + ':' + amount + ':' + price;
    coins[coins.length] = [coin, amount, price];
  }
  
}

function delete_cookies(){
  document.cookie.split(";")
  .forEach(function(c) { document.cookie = c.replace(/^ +/, "")
  .replace(/=.*/, "=;expires=" + new Date()
  .toUTCString() + ";path=/"); });
}

function get_Cookies_array(){
  cookies = document.cookie
  .split('; ')
  .find(row => row.startsWith('coins'))
  if(cookies == undefined)
    return null;
  else{
    cookies = cookies
    .split('=')[1]
    .split(',');
    for (let i = 0; i < cookies.length; i++)
      cookies[i] = cookies[i].split(':');
    return cookies;
  }
}