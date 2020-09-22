  const values = [
    ["PENNY", 0.01], 
    ["NICKEL", 0.05], 
    ["DIME", 0.1], 
    ["QUARTER", 0.25], 
    ["ONE", 1.0], 
    ["FIVE", 5.0], 
    ["TEN", 10.0], 
    ["TWENTY", 20.0], 
    ["ONE HUNDRED", 100.0]
  ];


  function checkCashRegister(price, cash, cid) {

    var moneyInRegister = totalMoney(cid);
    var change = cash - price; 

    if(moneyInRegister - change < 0){
      return {status : "INSUFFICIENT_FUNDS" , change: []}
    }
    else if (moneyInRegister - change == 0){
      return {status : "CLOSED" , change: cid}
    }

    return resolveOpen (change, cid);
  }


  function totalMoney (cid) {
    var total=0;
    for (var i=0; i < cid.length; i++){
      total += cid[i][1];
    }

    return total;
  }


  function resolveOpen (difference , cid) {
    var account = [];

    
    for (var i = values.length - 1; i >= 0; i--){
        
        var currency_type = [...values][i][0];
        var currency_value = [...values][i][1];

         
        while (currency_value <= difference && currency_value <= cid[i][1]) {

          difference = Math.round( (difference - currency_value) * 100 ) / 100;
          cid[i][1] = Math.round( (cid[i][1] - currency_value) * 100 ) / 100;

          
          if(account.length && 
            account[account.length - 1][0] === currency_type) 
          {
            account[account.length - 1][1] = account[account.length - 1][1] + currency_value;
          } else {
            account.push( values[i] );
          }

        } 
      } 

      if(difference > 0)
        return {status: "INSUFFICIENT_FUNDS", change: []} 

      return {status: "OPEN", change: account} 
  }

  // checkCashRegister(19.5, 20, [
  //   ["PENNY", 1.01], 
  //   ["NICKEL", 2.05], 
  //   ["DIME", 3.1], 
  //   ["QUARTER", 4.25], 
  //   ["ONE", 90], 
  //   ["FIVE", 55], 
  //   ["TEN", 20], 
  //   ["TWENTY", 60], 
  //   ["ONE HUNDRED", 100]
  // ]);

  console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
