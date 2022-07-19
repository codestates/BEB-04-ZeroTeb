// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;

// import "./IZeroTEB.sol";
// import "@klaytn/contracts/access/Ownable.sol";
// import "@klaytn/contracts/utils/Counters.sol";

// contract ZeroTEB is IZeroTEB, Ownable {
//     using Counters for Counters.Counter;
//     Counters.Counter private _eventIds;
//     address public _nftContractAddress;
//     // address public _sbtContractAddress;

//     struct Event {
//         string name;
//         uint256 price;
//         string tokenImageUri;
//         address creator;
//         uint256 openTime;
//         uint256 closeTime;
//         uint256 endTime;
//         uint256[] tokens;
//         uint256 count;
//     }

//     mapping(uint => Event) _events;

//     constructor(address nftContractAddress_) {
//         _nftContractAddress = nftContractAddress_;
//         // _sbtContractAddress = sbtContractAddress_;
//     }

//     function getEvent(uint _eventId) public view returns (Event memory) {
//         return _events[_eventId];
//     }

//     function createEvent(
//         address _creator,
//         string memory _eventName,
//         uint256 _eventPrice,
//         string memory _tokenImageUri,
//         uint8 _count,
//         uint256 _openTime,
//         uint256 _closeTime,
//         uint256 _endTime
//     ) public override onlyOwner returns (uint256 _eventId) {
//         // 이벤트 아이디
//         uint256 _newEventId = _eventIds.current();

//         // 신규 이벤트 매핑
//         _events[_newEventId] = Event({
//             name: _eventName,
//             price: _eventPrice,
//             tokenImageUri: _tokenImageUri,
//             creator: _creator,
//             openTime: _openTime,
//             closeTime: _closeTime,
//             endTime: _endTime,
//             tokens: new uint[](_count),
//             count: 0
//         });

//         // 이벤트 아이디 증가
//         _eventIds.increment();

//         // 반환
//         _eventId = _newEventId;
//     }

//     // Test
//     function setNftContractAddress(address _contract) public returns (address) {
//         _nftContractAddress = _contract;
//         return _nftContractAddress;
//     }

//     function test(string memory _string) public returns (string memory) {
//         (bool result, bytes memory data) = _nftContractAddress.call(
//             abi.encodeWithSignature("test(string)", _string)
//         );
//         require(result, "error");
//         string memory _result = abi.decode(data, (string));
//         return _result;
//     }

//     function mintEvent(
//         uint256 _eventId,
//         uint8 _tokenType, // 0 : NFT, 1: SBT
//         string memory _tokenUri
//     ) public override returns (bool) {
//         require(_tokenType < 2, "tokenType is not defined");
//         require(_eventId < _eventIds.current(), "EventId is not defined");
//         bool _result = false;
//         bytes memory data;
//         // if (_tokenType == 0) {
//         (_result, data) = payable(_nftContractAddress).call(
//             abi.encodeWithSignature(
//                 "mintNFT(address, string, uint256, uint256, uint256, uint256)",
//                 _events[_eventId].creator,
//                 _tokenUri,
//                 _events[_eventId].price,
//                 _events[_eventId].openTime,
//                 _events[_eventId].closeTime,
//                 _events[_eventId].endTime
//             )
//         );
//         // } else if (_tokenType == 1) {
//         //     (_result, data) = _sbtContractAddress.call(
//         //         abi.encodeWithSignature(
//         //             "mintSBT(address, string)",
//         //             _events[_eventId].creator,
//         //             _tokenUri
//         //         )
//         //     );
//         // } else {
//         //     return false;
//         // }
//         require(_result, "Call function failed");

//         uint256 _tokenId = abi.decode(data, (uint256));

//         _events[_eventId].tokens[_events[_eventId].count] = _tokenId;
//         _events[_eventId].count += 1;

//         return true;
//     }

//     function buyToken(uint256 _eventId, uint8 _number) public payable override {
//         (bool _result, ) = payable(_nftContractAddress).call(
//             abi.encodeWithSignature(
//                 "buyToken(uint8, address)",
//                 _events[_eventId].tokens[_number],
//                 msg.sender
//             )
//         );
//         require(_result, "buyToken is error");
//     }

//     function getEventBuyers(uint256 _eventId)
//         public
//         override
//         returns (address[] memory)
//     {}

//     function applyToken(
//         uint256 _eventId,
//         uint256 _tokenId,
//         uint _openTime,
//         uint _endTime
//     ) public payable override {}

//     function getEventParticipants(uint256 _eventId)
//         public
//         override
//         returns (address[] memory)
//     {}

//     function approveEventWinner(uint256 _eventId)
//         public
//         override
//         returns (address[] memory)
//     {}

//     function endEvent(uint256 _eventId, uint8 _eventEndStatus)
//         public
//         override
//     {}
// }
