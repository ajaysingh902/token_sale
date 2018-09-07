pragma solidity ^0.4.2;
    
    contract DappToken {
        event Transfer(
            
            address indexed _from,
            address indexed _to,
            uint256 _value
        );

        event Approval(
            address indexed _owner,
            address indexed _spender,
            uint256 _value

        );

        //allowance

        mapping(address =>mapping(address=>uint256)) public allowance;
        
        uint256 public totalsupply;
        //name
        string public name="Dapp Token";
        
        //symbol
        string public symbol="symbol";
        //standard
        
        mapping(address => uint256) public  balanceof;

        function DappToken (uint _intSupply) public {
            balanceof[msg.sender]=_intSupply;
        totalsupply= _intSupply;
    }
    function transfer(address _to,uint256 _value) public returns(bool success){
        //condition that the balance should be greater than the value 
        require(balanceof[msg.sender]>=_value);
        //return the boolean 
        balanceof[msg.sender] -=_value;
        balanceof[_to] +=_value;
        Transfer(msg.sender, _to ,_value);
        //transfer the event 
        return true ;
         }
    function approve(address _spender,uint256 _value) public returns (bool success){
        allowance[msg.sender][_spender]=_value;
        
        Approval(msg.sender,_spender,_value);

        return true ;

    }
    function transferfrom(address _from ,address _to ,uint256 _value)public returns(bool success){   
        //require _from has enought tokens
        require(balanceof[_from]>=_value);
        //require allowance is big enough
        require(allowance[_from][msg.sender]>=_value);
        //change the balance 
        balanceof[_from] -=_value;
        balanceof[_to] += _value;
        //update the allowance
        allowance[_from][_to] -=_value;
        Transfer(_from,_to,_value);
        //return a boolean
        return true;
    }
}

/*pragma solidity ^0.4.2;

contract DappToken {
    // Constructor
    // Set the total number of tokens
    // Read the total number of tokens
    uint256 public totalSupply;

    function DappToken () public {
        totalSupply = 1000000;
    }
}
*/