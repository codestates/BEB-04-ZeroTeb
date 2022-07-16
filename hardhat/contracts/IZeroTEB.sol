// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IZeroTEB {
    /*
     * 이벤트 등록
     */
    function createEvent(
        address _creator,
        string memory _eventName,
        uint256 _eventPrice,
        string memory _tokenImageUri
    ) external payable returns (uint256 _eventId);

    /*
     * 이벤트 토큰 발행
     */
    function mintEvent(
        uint256 _eventId,
        uint8 _tokenType,
        string memory _tokenUri
    ) external;

    /*
     * 이벤트 티켓 구매
     */
    function buyToken(
        uint256 _eventId,
        uint256 _tokenId,
        uint openTime,
        uint endTime
    ) external payable;

    /*
     * 이벤트 구매자 정보 목록 확인
     */
    function getEventBuyers(uint256 _eventId)
        external
        returns (address[] memory);

    /*
     * 이벤트 티켓 응모
     */
    function applyToken(
        uint256 _eventId,
        uint256 _tokenId,
        uint openTime,
        uint endTime
    ) external payable;

    /*
     * 이벤트 참여자 정보 목록 확인
     */
    function getEventParticipants(uint256 _eventId)
        external
        returns (address[] memory);

    /*
     * 이벤트 당첨자 권한 부여
     */
    function approveEventWinner(uint256 _eventId)
        external
        returns (address[] memory);

    /*
     * 이벤트 종료
     */
    function endEvent(uint256 _eventId, uint8 _eventEndStatus) external;
}
