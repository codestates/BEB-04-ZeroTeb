export const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i) == null ? false : true;
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i) == null ? false : true;
  },
  IOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i) == null ? false : true;
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i) == null ? false : true;
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i) == null ? false : true;
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.IOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

export const decodeJwt = (jwt: string) => {
  console.log(jwt);
  const dataArray = jwt.split('.');
  console.log(dataArray);
  if (dataArray.length !== 3) return;
  return JSON.parse(Buffer.from(dataArray[1], 'base64').toString());
};

export const verifyJwt = (exp: number) => {
  const authExp = exp < 10 ** 10 ? exp * 10 ** 3 : exp;
  return Date.now() <= authExp;
};
