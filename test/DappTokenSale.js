var DappTokenSale = artifacts.require("./DappTokenSale.sol");
var DappToken=artifacts.require("./DappToken.sol");


contract('DappTokenSale',function(accounts){
    var tokensaleinstance;
    var tokenprice=1000000000000000;//in wei
    var numberoftokens;
    var tokenavailable=5500;
    var admin=accounts[0];
    it("this is for checking the new dapptoken",function()
    {
        return DappTokenSale.deployed().then(function(instance){
            //grab token instance first 
            
            tokensaleinstance=instance;
            return tokensaleinstance.address;
        }).then(function(address){
            assert.notEqual(address,0*0,'has contract address');
            return tokensaleinstance.tokencontract();
        }).then(function(address){
            assert.notEqual(address,0*0,'has taken contact address');
            return tokensaleinstance.tokenprice();
        }).then(function(price){
            assert.equal(price,tokenprice,'token price is correct');
        })
    });
     it("this is for checking the value of 5500",function(){
    return DappToken.deployed().then(function(instance){
        //grab token instance first
        tokeninstance=instance;
        return DappTokenSale.deployed();
    }).then(function(instance){ 
        tokensaleinstance=instance;
        return tokeninstance.transfer(tokensaleinstance.address,tokenavailable,{from: admin});
        //return tokeninstance.totalsupply();
    }).then(function(reciept){
        numberoftokens=10;
        
        return tokensaleinstance.buytokens(numberoftokens,{from: accounts[1],value: numberoftokens*tokenprice});

    }).then(function(reciept){
        assert.equal(reciept.logs.length,1,"trigger one event");
        assert.equal(reciept.logs[0].event,'sell',"should be the tansfer event ");
        assert.equal(reciept.logs[0].args._buyer,accounts[1],"trigger one event");
        assert.equal(reciept.logs[0].args._amount,numberoftokens,"trigger one event");
        
       return tokensaleinstance.tokensold();
    }).then(function(amount){
        assert(amount.toNumber(),numberoftokens,"increment the number of tokens sold");
        return tokeninstance.balanceof(tokensaleinstance.address);
    }).then(function(balance){
    assert.equal(balance.toNumber(),5490,"the balance should be 5500");
    
     });
  });
})
