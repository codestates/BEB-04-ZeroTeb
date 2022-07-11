// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@klaytn/contracts/KIP/token/KIP7/KIP7.sol";
import "hardhat/console.sol";

contract DSGToken is KIP7 {
    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _amount
    ) KIP7(_name, _symbol) {
        _mint(msg.sender, _amount * 10**uint256(decimals())); // ex) 1 Token = 1 * 10^18;
        console.log(
            "minting - name:'%s', symbol:'%s', amount:'%s'",
            _name,
            _symbol,
            _amount
        );
    }
}
