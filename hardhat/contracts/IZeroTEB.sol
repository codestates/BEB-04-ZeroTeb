// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IZeroTEB {
    /*
     * 이벤트 등록
     */
    function createEvent(
        address _creator,
        string memory _eventName,
        uint8 _eventType,
        string memory _tokenImageUri,
        string[] memory _names,
        uint256[] memory _prices,
        uint256[] memory _counts,
        uint256 _openTime,
        uint256 _closeTime,
        uint256 _endTime
    ) external payable returns (uint256 _eventId);

    /*
     * 이벤트 토큰 발행
     */
    function mintToken(
        uint256 _eventId,
        uint8 _tokenType,
        uint8 _classId,
        string memory _tokenUri
    ) external returns (uint256);

    /*
     * 이벤트 티켓 구매
     */
    function buyToken(
        uint256 _eventId,
        uint8 _classId,
        uint8 _number
    ) external payable;

    /*
     * 이벤트 구매자 정보 목록 확인
     */
    function getEventBuyers(uint256 _eventId, uint8 _classId)
        external
        view
        returns (address[] memory);

    /*
     * 이벤트 티켓 응모
     */
    function applyToken(uint256 _eventId, uint8 _classId) external payable;

    /*
     * 이벤트 참여자 정보 목록 확인
     */
    function getEventParticipants(uint256 _eventId)
        external
        view
        returns (address[] memory);

    /*
     * 이벤트 당첨자 토큰 전송
     */
    function transferEventWinner(uint256 _eventId, uint8 _eventClassId)
        external
        returns (address[] memory);

    /*
     * 이벤트 종료
     * _eventEndStatus : 0 - 실패, 1 - 성공
     */
    function endEvent(uint256 _eventId, uint8 _eventEndStatus) external;
}
