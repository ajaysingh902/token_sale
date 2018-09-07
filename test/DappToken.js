///*
var DappToken = artifacts.require("./DappToken.sol");

contract('DappToken', function(accounts)
{    

     it('sets the total supply upon deployment', function(){
        return DappToken.deployed().then(function(instance) {
            tokeninstance = instance;
            return tokeninstance.name();
        }).then(function(name){
            assert.equal(name,"Dapp Token",'set the total supply to 100000');
            return tokeninstance.symbol();  
        }).then(function(symbol){
          assert.equal(symbol,"symbol","this is the name ");

        });
     });


     it('sets the total supply upon deployment', function(){
        return DappToken.deployed().then(function(instance) {
            tokeninstance = instance;
            return tokeninstance.totalsupply();
        }).then(function(totalsupply){
            assert.equal(totalsupply.toNumber(),10000,'set the total supply to 100000');
            return tokeninstance.balanceof(accounts[0]);
        })
        .then(function(balances)
        { 
          assert.equal(balances.toNumber(),10000,'then first account has the maximum number of tokens')

        });
        
    });
      it('this is only made for the transfer function',function(){
      return DappToken.deployed().then(function(instance)
      {
        tokeninstance=instance;
        return tokeninstance.transfer.call(accounts[1],999999999999);
      }).then(assert.fail).catch(function(error){
        assert(error.message.indexOf('revert')>=0,"error message should contain revert");
        return tokeninstance.transfer(accounts[1],2500,{from: accounts[0]});
      
      }).then(function(reciept){
        assert.equal(reciept.logs.length,1,"trigger one event");
        assert.equal(reciept.logs[0].event,'Transfer',"should be the tansfer event ");
        assert.equal(reciept.logs[0].args._from,accounts[0],"trigger one event");
        assert.equal(reciept.logs[0].args._to,accounts[1],"trigger one event");
        assert.equal(reciept.logs[0].args._value,2500,"trigger one event");

        return tokeninstance.balanceof(accounts[1]);
      
      
      }).then(function(balance){
        assert.equal(balance.toNumber(),2500,"agar token barabar hai to tab ye chalega");

        
      });
    });
    
    it("this will check about the the the function ",function(){
      return DappToken.deployed().then(function(instance)
    {
      tokeninstance=instance ;
      return tokeninstance.approve.call(accounts[1],1000);
    }).then(function(success){
      assert.equal(success,true,"then this is true ");
      return tokeninstance.approve(accounts[1],2500,{from: accounts[0]});
      
      }).then(function(reciept){
        assert.equal(reciept.logs.length,1,"trigger one event");
        assert.equal(reciept.logs[0].event,'Approval',"should be the tansfer event ");
        return tokeninstance.allowance(accounts[0],accounts[1]);
    }).then(function(allowance){
      assert.equal(allowance.toNumber(),2500,"this is for the allowance ");
  });
    });

  it("this is for the transfer from",function(){
    return DappToken.deployed().then(function(instance){
      tokeninstance=instance;
      return tokeninstance.transferfrom(accounts[0],accounts[2],1500,{from : accounts[1]});
    }).then(function(balance)
    {
     return tokeninstance.balanceof(accounts[2]);
    }).then(function(data)
    {
      assert.equal(data.toNumber(),1500,"this should run on token transfer");
    });
  });

  

})
//*/

/*
var DappToken = artifacts.require("./DappToken.sol");

contract('DappToken', function(accounts) {

  it('sets the total supply upon deployment', function() {
    return DappToken.deployed().then(function(instance) {
      tokenInstance = instance;
      return tokenInstance.totalsupply();
    }).then(function(totalsupply) {
      assert.equal(totalsupply.toNumber(), 10000, 'sets the total supply to 1,000,000');
    });
  });
})
*/
