// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IZeroTEB.sol";
import "@klaytn/contracts/access/Ownable.sol";
import "@klaytn/contracts/utils/Counters.sol";
import "@klaytn/contracts/KIP/token/KIP17/KIP17.sol";
import "@klaytn/contracts/KIP/token/KIP17/extensions/KIP17URIStorage.sol";

contract ZeroTEB is IZeroTEB, Ownable, KIP17URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _eventIds;
    Counters.Counter private _tokenIds;

    // 이벤트 구조체
    struct EventClass {
        string name;
        uint256 price;
        uint256 count;
        uint256[] tokens;
        address[] owners;
    }

    struct Event {
        string name;
        string tokenImageUri;
        address creator;
        uint256 classCount;
        uint256 openTime;
        uint256 closeTime;
        uint256 endTime;
        mapping(uint8 => EventClass) class;
    }

    // 토큰 확장 구조체
    struct TokenExtention {
        uint256 eventId;
        bool isTrade;
        uint8 tokenType;
    }

    /*
     * Mapping
     */
    mapping(uint256 => Event) _events;
    mapping(uint256 => TokenExtention) private _tokenExtentions;
    mapping(uint256 => address[]) _eventParticipants; // 이벤트 응모 참가자

    /*
     * Modifier
     */
    modifier isEndEvent(uint256 _eventId) {
        require(
            block.timestamp < _events[_eventId].endTime,
            "This Event is not close."
        );
        _;
    }
    modifier isNFT(uint256 _tokenId) {
        require(
            _tokenExtentions[_tokenId].tokenType == 0,
            "This Token is not NFT."
        );
        _;
    }

    constructor(string memory _name, string memory _symbol)
        KIP17(_name, _symbol)
    {}

    // function getEvent(uint _eventId) public view returns (Event memory) {
    //     return _events[_eventId];
    // }

    function eventOf(uint _tokenId) public view returns (uint) {
        return _tokenExtentions[_tokenId].eventId;
    }

    function createEvent(
        address _creator,
        string memory _eventName,
        string memory _tokenImageUri,
        string[] memory _names,
        uint256[] memory _prices,
        uint256[] memory _counts,
        uint256 _openTime,
        uint256 _closeTime,
        uint256 _endTime
    ) public override onlyOwner returns (uint256 _eventId) {
        // 이벤트 아이디
        uint256 _newEventId = _eventIds.current();

        // 신규 이벤트 매핑
        _events[_newEventId].name = _eventName;
        _events[_newEventId].tokenImageUri = _tokenImageUri;
        _events[_newEventId].creator = _creator;
        _events[_newEventId].openTime = _openTime;
        _events[_newEventId].closeTime = _closeTime;
        _events[_newEventId].endTime = _endTime;
        _events[_newEventId].classCount = _names.length;

        for (uint8 i = 0; i < _names.length; i++) {
            _events[_newEventId].class[i].name = _names[i];
            _events[_newEventId].class[i].count = _counts[i];
            _events[_newEventId].class[i].price = _prices[i];
            _events[_newEventId].class[i].tokens = new uint256[](_names.length);
            _events[_newEventId].class[i].owners = new address[](_names.length);
        }

        // 이벤트 아이디 증가
        _eventIds.increment();

        // 반환
        _eventId = _newEventId;
    }

    function mintToken(
        uint256 _eventId,
        uint8 _tokenType, // 0 : NFT, 1: SBT
        uint8 _classId,
        string memory _tokenUri
    ) public override onlyOwner returns (uint256) {
        for (uint8 i = 0; i < _events[_eventId].class[_classId].count; i++) {
            _tokenIds.increment();

            uint256 _newTokenId = _tokenIds.current();
            _safeMint(msg.sender, _newTokenId);
            _setTokenURI(_newTokenId, _tokenUri);

            _events[_eventId].class[_classId].tokens[i] = _newTokenId;

            _tokenExtentions[_newTokenId] = TokenExtention({
                eventId: _eventId,
                tokenType: _tokenType,
                isTrade: true
            });
        }

        return _eventId;
    }

    function buyToken(
        uint256 _eventId,
        uint8 _classId,
        uint8 _number
    ) public payable override {
        uint256 _tokenId = _events[_eventId].class[_classId].tokens[_number];
        require(
            _tokenExtentions[_tokenId].isTrade,
            "This token is not traded."
        );
        require(
            _events[_eventId].class[_classId].price == msg.value,
            "This amount is not the same."
        );
        require(
            _events[_eventId].openTime < block.timestamp,
            "This time is not open."
        );
        require(
            block.timestamp < _events[_eventId].closeTime,
            "The time is close."
        );
        address _owner = owner();
        _transfer(_owner, msg.sender, _tokenId);
        _events[_eventId].class[_classId].owners[_number] = msg.sender;
        _tokenExtentions[_tokenId].isTrade = false;
    }

    function getEventBuyers(uint256 _eventId, uint8 _classId)
        public
        view
        override
        returns (address[] memory)
    {
        return _events[_eventId].class[_classId].owners;
    }

    function applyToken(uint256 _eventId, uint8 _classId)
        public
        payable
        override
    {
        require(
            _events[_eventId].class[_classId].price == msg.value,
            "This amount is not the same."
        );
        require(
            _events[_eventId].openTime < block.timestamp,
            "This time is not open."
        );
        require(
            block.timestamp < _events[_eventId].closeTime,
            "The time is close."
        );
        _eventParticipants[_eventId].push(msg.sender);
    }

    function getEventParticipants(uint256 _eventId)
        public
        view
        override
        returns (address[] memory)
    {
        return _eventParticipants[_eventId];
    }

    function _eventWinner() private returns (address[] memory) {}

    function approveEventWinner(uint256 _eventId)
        public
        override
        returns (address[] memory)
    {}

    function endEvent(uint256 _eventId, uint8 _eventEndStatus)
        public
        override
    {}

    /**
     * @dev See {IKIP17-transferFrom}.
     */
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override isEndEvent(tokenId) isNFT(tokenId) {
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
    ) public virtual override isEndEvent(tokenId) isNFT(tokenId) {
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
    ) public virtual override isEndEvent(tokenId) isNFT(tokenId) {
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
    ) internal virtual override isEndEvent(tokenId) isNFT(tokenId) {
        _transfer(from, to, tokenId);
        // require(
        //     _checkOnKIP17Received(from, to, tokenId, _data) ||
        //         _checkOnERC721Received(from, to, tokenId, _data),
        //     "KIP17: transfer to non IKIP17Receiver/IERC721Receiver implementer"
        // );
    }
}
