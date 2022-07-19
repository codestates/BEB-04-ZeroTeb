// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@klaytn/contracts/utils/Counters.sol";
import "@klaytn/contracts/access/Ownable.sol";
import "./SBTURIStorage.sol";
import "./SBT.sol";

contract MySBT is Ownable, SBTURIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor(string memory _name, string memory _symbol)
        SoulBoundToken(_name, _symbol)
    {}

    function mintSBT(address recipient, string memory tokenURI)
        public
        onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _safeMint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}
