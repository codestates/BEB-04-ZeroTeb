import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosRequestConfig } from 'axios';
import Caver, { AbiItem, Contract, KeyringContainer } from 'caver-js';
import { ipfsMetadataUpload } from 'lib/pinata';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/auth/schemas/user.schema';
import { HoldingType } from 'src/token/schemas/holding.schema';

import CONTRACT_ABI from '../../lib/abi_ZeroTEB.json';
import { ContractEventDto, ContracCreateEventkDto, ContractEventClassType } from './klaytn.entity';
const CONTRACT_ADDRESS =
  process.env.CONTRACT_ADDRESS || '0x44163C4Fae147f5041250fd81020e3F94D13C807';
const GAS = '10000000';

const OWNER_PRIVATE_KEY = process.env.OWNER_PRIVATE_KEY;
const OWNER_ADDRESS = process.env.OWNER_ADDRESS;

const KAS_ACCESS_KEY_ID = process.env.KAS_ACCESS_KEY_ID ?? '';
const KAS_SECRET_ACCESS_KEY = process.env.KAS_SECRET_ACCESS_KEY ?? '';

@Injectable()
export class KlaytnService {
  private contract: Contract | null;

  constructor(
    @Inject('Klaytn') private readonly caver: Caver,
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>,
  ) {
    if ([CONTRACT_ABI, CONTRACT_ADDRESS].every(Boolean)) {
      const contractInstance = this.caver.contract.create(
        CONTRACT_ABI as AbiItem[],
        CONTRACT_ADDRESS,
      );
      this.contract = contractInstance;
    } else {
      this.contract = null;
    }
  }

  /**
   * @description caver.wallet는 인메모리 지갑에서 Keyring 인스턴스를 관리하는 패키지입니다.
   * caver.wallet는 모든 SingleKeyring, MultipleKeyring, RoleBasedKeyring을 받으며,
   * 주소를 기준으로 관리합니다. */
  get wallet() {
    return this.caver.wallet as KeyringContainer;
  }

  /**
   * @description caver.account는 계정 업데이트시 사용 되며 Account에 관련된 기능을 제공하는 패키지입니다. */
  get account() {
    return this.caver.account;
  }

  /**
   * @description caver.rpc는 Klaytn 노드에 RPC 호출을 하는 기능을 제공하는 패키지입니다.
   */
  get rpc() {
    return this.caver.rpc;
  }

  /**
   * @description Keyring은 Klaytn 계정의 주소와 개인 키를 포함하는 구조입니다. */
  keyring() {
    const randomHex = this.caver.utils.randomHex(32);
    return this.wallet.keyring.generate(randomHex);
  }

  /**
   * @description SingleKeyring은 개인 키를 가지고 있는 키링 패키지입니다.
   * @param address
   * @param privateKey
   */
  singleKeyring(address: string, privateKey: string) {
    return this.wallet.newKeyring(address, privateKey);
  }

  /**
   * @description 주어진 주소가 올바른 주소인지 체크
   * @param address
   */
  isAddress(address: string) {
    return this.caver.utils.isAddress(address);
  }

  /**
   * @description 모든 KLAY 단위를 보여줍니다. */
  klayUnit() {
    return this.caver.utils.klayUnit;
  }

  async eventOf(tokenId: number): Promise<number> {
    return await this.contract.methods.eventOf(tokenId).call();
  }

  async createEvent(event: ContracCreateEventkDto): Promise<void> {
    const inputData = [
      event.creator,
      event.eventName,
      event.eventType,
      event.eventUri,
      event.classNames,
      event.classPrices,
      event.classCounts,
      event.openTime,
      event.closeTime,
      event.startTime,
      event.endTime,
    ];
    let price = 0;
    if (event.eventType === 0) {
      for (let i = 0; i < event.classPrices.length; i++) {
        price += event.classPrices[i] * event.classCounts[i];
      }
      price *= 0.05;
    } else if (event.eventType === 1) {
      for (let i = 0; i < event.classPrices.length; i++) {
        price += 5 * event.classCounts[i];
      }
      price *= 0.05;
    }
    price *= 10 ** 18;
    // const user = await this.UserModel.findOne({ address: event.creator });
    const user = await this.UserModel.findOne({ test_address: event.creator });
    if (!this.caver.wallet.isExisted(user.test_address)) {
      this.singleKeyring(user.test_address, user.test_private_key);
    }
    console.log('address :', user.test_address);
    console.log(
      'balance :',
      this.caver.utils.fromPeb(await this.caver.klay.getBalance(user.test_address), 'KLAY'),
      'KLAY',
    );
    console.log(
      'Send :',
      this.caver.utils.fromPeb(this.caver.utils.toPeb(price, 'peb'), 'KLAY'),
      'KLAY',
    );
    const receipt = await this.contract.methods.createEvent(...inputData).send({
      from: user.test_address,
      gas: GAS,
      value: this.caver.utils.convertToPeb(String(price), 'peb'),
    });
    console.log(receipt);
  }

  // Event 전체 개수
  async getEventLength(): Promise<number> {
    return await this.contract.methods.totalEvent().call();
  }

  // Token 전체 개수
  async getTokenLength(): Promise<number> {
    return await this.contract.methods.totalToken().call();
  }

  // 이벤트 조회
  async getEvent(eventId: number): Promise<ContractEventDto> {
    const contractEventDto: ContractEventDto = new ContractEventDto();
    const event = await this.contract.methods.getEvent(eventId).call();
    const prices = [];
    for (let i = 0; i < Number(event._classCount); i++) {
      const receipt = await this.contract.methods.getEventClass(eventId, i).call();
      prices.push({
        class: receipt[0],
        price: Number(receipt[1]),
        count: Number(receipt[2]),
      });
    }
    contractEventDto.name = event._name;
    contractEventDto.eventUri = event._eventUri;
    contractEventDto.creator = event._creator.toLowerCase();
    contractEventDto.classCount = Number(event._classCount);
    contractEventDto.prices = prices;
    contractEventDto.openTime = Number(event._openTime);
    contractEventDto.closeTime = Number(event._closeTime);
    contractEventDto.startTime = Number(event._startTime);
    contractEventDto.endTime = Number(event._endTime);

    return contractEventDto;
  }

  // 이벤트 클래스 조회
  async getEventClass(eventId: number, eventClassId): Promise<ContractEventClassType> {
    const receipt = await this.contract.methods.getEventClass(eventId, eventClassId).call();

    return {
      class: receipt[0],
      price: Number(receipt[1]),
      count: Number(receipt[2]),
    };
  }

  // 이벤트 클래스 개수 조회
  async getEventClassCount(eventId: number): Promise<number> {
    return await this.contract.methods.getEventClassCount(eventId).call();
  }

  // 토큰 민팅
  async mintToken(eventId: number, tokenType: number, token_image_uri): Promise<void> {
    try {
      if (!this.caver.wallet.isExisted(OWNER_ADDRESS)) {
        this.singleKeyring(OWNER_ADDRESS, OWNER_PRIVATE_KEY);
      }
      const event = await this.getEvent(eventId);

      for (let classId = 0; classId < event.prices.length; classId++) {
        const price = event.prices[classId];
        for (let number = 0; number < price.count; number++) {
          // 민팅되었는지 확인
          const isMint = await this.contract.methods.isMint(eventId, classId, number).call();
          if (isMint) continue;

          const metaData = {
            title: event.name,
            class: price.class,
            number: number,
            token_image_uri: token_image_uri,
          };
          const name = `${metaData.title} class ${metaData.class} #${metaData.number}`;
          console.log(name);
          const tokenUri = await ipfsMetadataUpload(name, metaData);

          await this.contract.methods
            .mintToken(eventId, tokenType, classId, number, tokenUri)
            .send({
              from: OWNER_ADDRESS,
              gas: GAS,
            });
        }
        // await setMyInterval(async (i) => {}, 500, price.count);
      }

      console.log('민팅 완료!');
    } catch (err) {
      console.error(err);
    }
  }

  // 토큰 구매
  async buyToken(
    buyerAddress: string,
    eventId: number,
    classId: number,
    number?: number,
  ): Promise<boolean> {
    try {
      const isSelect = number !== undefined;
      number = isSelect ? number : 0;

      console.log('=== klaytn.service.ts ===');
      console.log(
        'buyerAddress :',
        buyerAddress,
        'eventId :',
        eventId,
        'classId :',
        classId,
        'number :',
        number,
      );
      // const user = await this.UserModel.findOne({ address: buyerAddress });
      const user = await this.UserModel.findOne({ test_address: buyerAddress });
      if (!user) throw new Error('user is undefined.');

      if (!this.caver.wallet.isExisted(user.test_address)) {
        this.singleKeyring(user.test_address, user.test_private_key);
      }

      const eventClass = await this.getEventClass(eventId, classId);

      console.log('address :', user.test_address);
      console.log(
        'balance :',
        this.caver.utils.fromPeb(await this.caver.klay.getBalance(user.test_address), 'KLAY'),
        'KLAY',
      );
      console.log(
        'Send :',
        this.caver.utils.fromPeb(this.caver.utils.toPeb(eventClass.price, 'KLAY'), 'KLAY'),
        'KLAY',
      );

      const receipt = await this.contract.methods
        .buyToken(eventId, classId, number, isSelect)
        .send({
          from: user.test_address,
          gas: GAS,
          value: this.caver.utils.toPeb(eventClass.price, 'KLAY'),
        });
      return false;
    } catch (err) {
      console.error(err);
      return true;
    }
  }

  // 토큰 구매자 조회
  async getTokenHolders(eventId: number): Promise<HoldingType[]> {
    const eventClassCount = await this.contract.methods.getEventClassCount(eventId).call();
    // console.log(eventClassCount);
    const results = [];
    for (let eventClassId = 0; eventClassId < eventClassCount; eventClassId++) {
      const { _onwerArray, _tokenIdArray } = await this.contract.methods
        .getTokenBuyers(eventId, eventClassId)
        .call();
      for (let i = 0; i < _tokenIdArray.length; i++) {
        const buyers = {
          event_id: eventId,
          token_id: Number(_tokenIdArray[i]),
          address: _onwerArray[i].toLowerCase(),
          number: i,
        };
        results.push(buyers);
      }
    }
    return results;
  }

  // 토큰 응모
  async applyToken(applicantAddress: string, eventId: number): Promise<boolean> {
    try {
      // const user = await this.UserModel.findOne({ address: applicantAddress });
      const user = await this.UserModel.findOne({ test_address: applicantAddress });

      if (!this.caver.wallet.isExisted(user.test_address)) {
        this.singleKeyring(user.test_address, user.test_private_key);
      }

      const eventClass = await this.getEventClass(eventId, 0);
      await this.contract.methods.applyToken(eventId, 0).send({
        from: user.test_address,
        gas: GAS,
        value: this.caver.utils.toPeb(eventClass.price, 'KLAY'),
      });

      return false;
    } catch (err) {
      console.error(err);
      return true;
    }
  }

  // 응모자 조회
  async getEventParticipants(eventId: number): Promise<string[]> {
    const participants = await this.contract.methods.getEventParticipants(eventId).call();
    return participants.map((participant) => participant.toLowerCase());
  }

  // 이벤트 응모 당첨 트리거
  async transferEventWinner(eventId: number) {
    try {
      if (!this.caver.wallet.isExisted(OWNER_ADDRESS)) {
        this.singleKeyring(OWNER_ADDRESS, OWNER_PRIVATE_KEY);
      }
      const receipt = await this.contract.methods.transferEventWinner(eventId).send({
        from: OWNER_ADDRESS,
        gas: GAS,
      });
      console.log(receipt);
      return receipt;
    } catch (error) {
      console.error(error);
    }
  }

  // 이벤트 종료
  async endEvent(eventId: number, eventEndStatus: number) {
    try {
      if (!this.caver.wallet.isExisted(OWNER_ADDRESS)) {
        this.singleKeyring(OWNER_ADDRESS, OWNER_PRIVATE_KEY);
      }
      const receipt = await this.contract.methods.endEvent(eventId, eventEndStatus).send({
        from: OWNER_ADDRESS,
        gas: GAS,
      });
      return receipt;
    } catch (error) {
      console.error(error);
    }
  }

  async getTokens(cursor: string) {
    const axiosRequestConfig: AxiosRequestConfig = {
      method: 'GET',
      url: `https://th-api.klaytnapi.com/v2/contract/nft/${CONTRACT_ADDRESS}/token`,
      auth: {
        username: KAS_ACCESS_KEY_ID,
        password: KAS_SECRET_ACCESS_KEY,
      },
      headers: {
        'x-chain-id': '1001',
      },
      params: {
        size: 1000,
        cursor: cursor,
      },
    };
    const res = await axios(axiosRequestConfig);
    const data = res.data;
    if (data.message || !data.items) throw new Error(data.message);

    if (data.cursor !== '') {
      return {
        ...data,
        item: [...data.item, this.getTokens(data.cursor)],
      };
    } else {
      return data;
    }
  }

  async test() {
    console.log(await this.getTokens(''));
  }
}
