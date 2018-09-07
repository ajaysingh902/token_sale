App={
    web3Provider: null,
    contracts: {},
    account: "0*0",
    loading: false,

    init: function(){
        console.log("app is ionitialized.....");
        return App.initWeb3();
    },
    initWeb3: function(){
        if (typeof web3 !== 'undefined') {
            //if a web3 instance is already provided by meta mask 
            App.web3Provider =web3.currentProvider;
            web3 = new Web3(web3.currentProvider);
          } else {
            // set default instance if no web3 instance provided
            App.web3Provider = new Web3.providers.HttpProvider("http://localhost:8545");
            web3=new Web3(App.web3Provider);
          }
          App.initContracts();

    },
    initContracts: function(){
        $.getJSON("DappTokenSale.json",function(dappTokenSale){
            App.contracts.DappTokenSale=TruffleContract(dappTokenSale);
            App.contracts.DappTokenSale.setProvider(App.web3Provider);
            App.contracts.DappTokenSale.deployed().then(function(dappTokenSale){
                console.log("Dapp Token Sale Address:",dappTokenSale.address);
            });
        }).done(function() {
            $.getJSON("DappToken.json",function(dappToken){
                App.contracts.DappToken=TruffleContract(dappToken);
                App.contracts.DappToken.setProvider(App.web3Provider);
                App.contracts.DappToken.deployed().then(function(dappToken){
                    console.log("Dapp Token Sale Address:",dappToken.address);
                });
                return App.render();
            });
        })
    },
    render: function(){
        if(App.loading)
        {
            return
        }
        App.loading =true;
        var content=$("#content");
        var loader=$("#loader");
        content.hide();
        loader.show();


        web3.eth.getCoinbase(function(err,account){
            if(err==null)
            {      console.log("account",account);
                App.account=account;
                $('#accountaddress').html("Your Account:"+ account);
                
            }
        }) 
        App.loading=false;
        content.show();
        loader.hide();
       

    }
}
$(function(){
    $(window).load(function(){
        App.init();
    })
})