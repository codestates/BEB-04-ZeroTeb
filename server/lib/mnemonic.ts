import { keystore } from 'eth-lightwallet';

const newMnemonic = () => {
  return keystore.generateRandomSeed();
};

export const newWallet = (address: string) =>
  new Promise<{ address: string; privateKey: string }>((resolve, reject) => {
    try {
      keystore.createVault(
        {
          password: address,
          seedPhrase: newMnemonic(),
          hdPathString: "m/0'",
        },
        (err, ks) => {
          if (err) throw err;
          ks.keyFromPassword(address, (err, pwDerivedKey) => {
            if (err) throw err;
            // 새로운 주소 생성
            ks.generateNewAddress(pwDerivedKey, ks.getAddresses().length);
            const newAddress = ks.getAddresses().toString();
            // const keystore = ks.serialize();
            const privateKey = ks.exportPrivateKey(newAddress, pwDerivedKey);
            resolve({
              address: newAddress,
              privateKey: privateKey,
            });
          });
        },
      );
    } catch (err) {
      reject(err);
    }
  });
