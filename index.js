var coins = get_Cookies_array();

create_table();

console.log(document.cookie)
console.log(coins)

load_coin_list();

function load_coin_list(){
  let list = document.getElementById('list');
  for(i = 0; i < values.length; i++){
    let option = document.createElement('option');
    option.setAttribute('value', values[i]);
    option.innerHTML = values[i];
    list.appendChild(option);
  }
}


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

  console.log('Request for : ' + coin + 'USDT');
  fetch('https://api.binance.com/api/v1/ticker/price?symbol=' + coin + 'USDT')
  .then(response=>response.json())
  .then(data => add_row(data.price));
}

function add_row(cur_price){
  let tr = document.createElement('tr');
  for(i = 0; i < 3; i++){
    let td = document.createElement('td');
    td.innerHTML = coins[coins.length - 1][i];
    tr.appendChild(td);
  }
  let td = document.createElement('td');
  td.innerHTML = cur_price;
  tr.appendChild(td);
  document.getElementById('table').appendChild(tr);

  td = document.createElement('td');
  td.innerHTML = (cur_price -coins[coins.length - 1][2]) * coins[coins.length-1][1];
  tr.appendChild(td);
  document.getElementById('table').appendChild(tr);

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
  document.cookie = "coins=";
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

async function create_table(){
  table = document.getElementById('table');
  if(!coins)
    return;

  for(let i = 0; i < coins.length; i++){
    let tr = document.createElement('tr');
    for(j = 0; j < 3; j++){
      let td = document.createElement('td');
      td.innerHTML = coins[i][j];
      tr.appendChild(td);
    }
    console.log('Request for : ' + coins[i][0] + 'USDT');
    let cur_price = await fetch('https://api.binance.com/api/v1/ticker/price?symbol=' +  coins[i][0] + 'USDT')
    .then(response=>response.json())
    .then(data=> data.price);

    let td = document.createElement('td');
    td.innerHTML = cur_price;
    tr.appendChild(td);

    td = document.createElement('td');
    td.innerHTML = (cur_price - coins[i][2]) * coins[i][1];
    tr.appendChild(td);

    table.appendChild(tr);
  }
}