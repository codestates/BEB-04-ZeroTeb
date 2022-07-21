export const decodeJwt = (jwt: string) => {
  console.log('jwt :', jwt);
  const dataArray = jwt.split('.');
  console.log(dataArray);
  if (dataArray.length !== 3) return;
  return JSON.parse(Buffer.from(dataArray[1], 'base64').toString());
};
