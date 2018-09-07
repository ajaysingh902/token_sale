var DappToken = artifacts.require("./DappToken.sol");
var DappTokenSale = artifacts.require("./DappTokenSale.sol");

module.exports = function(deployer) {
  
  deployer.deploy(DappToken,10000).then(function(){
  var tokenprice=1000000000000000;  
  return deployer.deploy(DappTokenSale,DappToken.address,tokenprice);
  });
};
