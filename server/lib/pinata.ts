import Axios from 'axios';
import FormData from 'form-data';
import pinataSDK, { PinataPinOptions } from '@pinata/sdk';
import axios from 'axios';

const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_API_SECRET_KEY);

// const ipfsImageUpload = async (file, metadata) => {
//   const data = new FormData();
//   data.append('file', file);
//   data.append('pinataOptions', '{"cidVersion": 1}');
//   data.append(
//     'pinataMetadata',
//     `{"name": "${metadata.name}-picture", "keyvalues": {"company": "Pinata"}}`,
//   );

//   const config = {
//     method: 'post',
//     url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
//     headers: {
//       Authorization: `Bearer ${process.env.PINATA_JWT}`,
//     },
//     data: data,
//   };
//   try {
//     const uploadFileResponse = await Axios(config);
//     return `ipfs://${uploadFileResponse.data.IpfsHash}`;
//   } catch (err) {
//     console.error(err);
//   }
// };

const ipfsMetadataUpload = async (name, metadata) => {
  // const data = new FormData();
  // const metadataFile = new File(
  //   [new Blob([JSON.stringify(metadata)])],
  //   `${metadata.name}-metadata.json`,
  // );
  // data.append('file', metadataFile);
  // data.append('pinataOptions', '{"cidVersion": 1}');
  // data.append(
  //   'pinataMetadata',
  //   `{"name": "${metadata.name}-metadata", "keyvalues": {"company": "Pinata"}}`,
  // );

  // const config = {
  //   method: 'post',
  //   url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
  //   headers: {
  //     Authorization: `Bearer ${process.env.PINATA_JWT}`,
  //   },
  //   data: data,
  // };
  // try {
  //   const metadataUploadResponse = await Axios(config);
  //   return `ipfs://${metadataUploadResponse.data.IpfsHash}`;
  // } catch (err) {
  //   console.error(err);
  // }

  const options: PinataPinOptions = {
    pinataMetadata: {
      name: name,
    },
    pinataOptions: {
      cidVersion: 0,
    },
  };

  try {
    const result = await pinata.pinJSONToIPFS(metadata, options);
    return `ipfs://${result.IpfsHash}`;
  } catch (err) {
    console.error(err);
  }
};

const ipfsGetData = async (url: string, type: 'json' | 'file' = 'json') => {
  const baseUrl = 'https://gateway.pinata.cloud/ipfs/';
  const ipfsHash = url.replace('ipfs://', '');
  const contentType = {
    json: 'application/json',
    file: 'multipart/form-data',
  };
  try {
    const res = await axios.get(ipfsHash, {
      baseURL: baseUrl,
      headers: {
        'Content-Type': contentType[type],
      },
    });
    return res.data;
  } catch (error) {}
};

export {
  // ipfsImageUpload,
  ipfsMetadataUpload,
  ipfsGetData,
};
