function validateTransaction(amount){
  if(amount <=0 || amount > 100000){
    throw new Error("Invalid amount");
  }
}

module.exports = validateTransaction;
