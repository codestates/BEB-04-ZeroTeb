import Axios from 'axios';
import FormData from 'form-data';

const ipfsImageUpload = async (file, metadata) => {
  const data = new FormData();
  data.append('file', file);
  data.append('pinataOptions', '{"cidVersion": 1}');
  data.append(
    'pinataMetadata',
    `{"name": "${metadata.name}-picture", "keyvalues": {"company": "Pinata"}}`,
  );

  const config = {
    method: 'post',
    url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
    headers: {
      Authorization: `Bearer ${process.env.PINATA_JWT}`,
    },
    data: data,
  };
  try {
    const uploadFileResponse = await Axios(config);
    return `ipfs://${uploadFileResponse.data.IpfsHash}`;
  } catch (err) {
    console.error(err);
  }
};

const ipfsMetadataUpload = async (metadata) => {
  const data = new FormData();
  const metadataFile = new File(
    [new Blob([JSON.stringify(metadata)])],
    `${metadata.name}-metadata.json`,
  );
  data.append('file', metadataFile);
  data.append('pinataOptions', '{"cidVersion": 1}');
  data.append(
    'pinataMetadata',
    `{"name": "${metadata.name}-metadata", "keyvalues": {"company": "Pinata"}}`,
  );

  const config = {
    method: 'post',
    url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
    headers: {
      Authorization: `Bearer ${process.env.PINATA_JWT}`,
    },
    data: data,
  };
  try {
    const metadataUploadResponse = await Axios(config);
    return `ipfs://${metadataUploadResponse.data.IpfsHash}`;
  } catch (err) {
    console.error(err);
  }
};

export { ipfsImageUpload, ipfsMetadataUpload };
