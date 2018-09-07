pragma solidity ^0.4.2;
import "./DappToken.sol";
contract DappTokenSale {
    address admin;
    DappToken public tokencontract;
    uint256 public tokenprice;
    uint256 public tokensold;
    event sell(
        address _buyer,
        uint256 _amount
    );
    function DappTokenSale(DappToken _tokencontract,uint256 _tokenprice) public 
    {
        admin=msg.sender;
        tokencontract=_tokencontract;
        tokenprice=_tokenprice;
    }
    //multiply function
      function multiply(uint x, uint y) internal pure returns (uint z) {
        require(y == 0 || (z = x * y) / y == x);
    }
    function buytokens(uint256 _numberoftokens) public payable{
        //require  that value is equal to tokens
        require(msg.value==multiply(_numberoftokens,tokenprice));
        //require that the contract has enough tokens
        require(tokencontract.balanceof(this) >= _numberoftokens);
        //require that a transfer is successful
        require(tokencontract.transfer(msg.sender,_numberoftokens));
        tokensold +=_numberoftokens;
        sell(msg.sender,_numberoftokens);


    }

}