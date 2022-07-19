// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@klaytn/contracts/KIP/token/KIP17/KIP17.sol";
import "@klaytn/contracts/utils/Counters.sol";
import "@klaytn/contracts/access/Ownable.sol";
import "@klaytn/contracts/KIP/token/KIP17/extensions/KIP17URIStorage.sol";

contract MyNFT is Ownable, KIP17URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address private immutable master;

    struct TokenExtention {
        uint price;
        uint openTime;
        uint closeTime;
        uint endTime;
        bool isTrade;
    }

    mapping(uint256 => TokenExtention) private _tokenExtentions;

    constructor(string memory _name, string memory _symbol)
        KIP17(_name, _symbol)
    {
        master = msg.sender;
    }

    modifier isEndEvent(uint256 _tokenId) {
        require(
            block.timestamp < _tokenExtentions[_tokenId].endTime,
            "This Event is not close."
        );
        _;
    }

    function mintNFT(
        address recipient,
        string memory tokenURI,
        uint256 _price,
        uint256 _openTime,
        uint256 _closeTime,
        uint256 _endTime
    ) public returns (uint256) {
        _tokenIds.increment();

        uint256 _newItemId = _tokenIds.current();
        _safeMint(recipient, _newItemId);
        _setTokenURI(_newItemId, tokenURI);

        _tokenExtentions[_newItemId] = TokenExtention({
            price: _price,
            openTime: _openTime,
            closeTime: _closeTime,
            endTime: _endTime,
            isTrade: true
        });

        return _newItemId;
    }

    function test(string memory _string) public pure returns (string memory) {
        return _string;
    }

    function getTokenPrice(uint _tokenId) public view returns (uint) {
        return _tokenExtentions[_tokenId].price;
    }

    function getTokenOpenTime(uint _tokenId) public view returns (uint) {
        return _tokenExtentions[_tokenId].openTime;
    }

    function getTokenCloseTime(uint _tokenId) public view returns (uint) {
        return _tokenExtentions[_tokenId].closeTime;
    }

    function getTokenEndTime(uint _tokenId) public view returns (uint) {
        return _tokenExtentions[_tokenId].endTime;
    }

    function buyToken(uint _tokenId, address _to) public payable {
        require(
            _tokenExtentions[_tokenId].isTrade,
            "This token is not traded."
        );
        require(
            _tokenExtentions[_tokenId].price == msg.value,
            "This amount is not the same."
        );
        require(
            _tokenExtentions[_tokenId].openTime < block.timestamp,
            "This time is not open."
        );
        require(
            block.timestamp < _tokenExtentions[_tokenId].closeTime,
            "The time is close."
        );
        address _owner = ownerOf(_tokenId);
        _transfer(_owner, _to, _tokenId);
    }

    /**
     * @dev See {IKIP17-transferFrom}.
     */
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override isEndEvent(tokenId) {
        //solhint-disable-next-line max-line-length
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "KIP17: transfer caller is not owner nor approved"
        );

        _transfer(from, to, tokenId);
    }

    /**
     * @dev See {IKIP17-safeTransferFrom}.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override isEndEvent(tokenId) {
        safeTransferFrom(from, to, tokenId, "");
    }

    /**
     * @dev See {IKIP17-safeTransferFrom}.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) public virtual override isEndEvent(tokenId) {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "KIP17: transfer caller is not owner nor approved"
        );
        _safeTransfer(from, to, tokenId, _data);
    }

    /**
     * @dev Safely transfers `tokenId` token from `from` to `to`, checking first that contract recipients
     * are aware of the KIP17/ERC721 protocol to prevent tokens from being forever locked.
     *
     * `_data` is additional data, it has no specified format and it is sent in call to `to`.
     *
     * This internal function is equivalent to {safeTransferFrom}, and can be used to e.g.
     * implement alternative mechanisms to perform token transfer, such as signature-based.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must exist and be owned by `from`.
     * - If `to` refers to a smart contract, it must implement {IKIP17Receiver-onKIP17Received}
     *   OR {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     *
     * Emits a {Transfer} event.
     */
    function _safeTransfer(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) internal virtual override isEndEvent(tokenId) {
        _transfer(from, to, tokenId);
        // require(
        //     _checkOnKIP17Received(from, to, tokenId, _data) ||
        //         _checkOnERC721Received(from, to, tokenId, _data),
        //     "KIP17: transfer to non IKIP17Receiver/IERC721Receiver implementer"
        // );
    }
}
