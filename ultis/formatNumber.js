const nf = new Intl.NumberFormat('en');

export const secondsTimeToString = (time) => {
  let result = `${time} giây`;
  if (time <= 60) {
    result = `${time} giây`;
  } else if (time > 60 && time <= 3600) {
    result = `${nf.format((time / 60).toFixed(2))} phút`;
  } else if (time > 3600) {
    result = `${nf.format((time / 3600).toFixed(2))} giờ`;
  }
  return result;
};

export const customCurrency = (value) => {
  let result = nf.format(value);
  if (value < 900) {
    // Default
    result = nf.format(value);
  } else if (value < 900000) {
    // Thousand
    result = `${nf.format((value / 1000).toFixed(2))}K`;
  } else if (value < 900000000) {
    // Million
    result = `${nf.format((value / 1000000).toFixed(2))}M`;
  } else if (value < 900000000000) {
    // Billion
    result = `${nf.format((value / 1000000000).toFixed(2))}B`;
  } else {
    // Trillion
    result = `${nf.format((value / 1000000000000).toFixed(2))}T`;
  }
  return result;
};

export const formatCurrency = (type, currency) => {
  const nfUS = new Intl.NumberFormat('en-US');
  switch (type) {
    case CURRENCY_TYPE.VND.type:
      return `${new Intl.NumberFormat('de-DE').format(currency)} ${CURRENCY_TYPE.VND.currency}`;
    case CURRENCY_TYPE.USD.type:
      return `${CURRENCY_TYPE.USD.currency} ${nfUS.format(currency)}`;
    case CURRENCY_TYPE.EUR.type:
      return `${CURRENCY_TYPE.EUR.currency} ${nfUS.format(currency)}`;
    case CURRENCY_TYPE.GBP.type:
      return `${CURRENCY_TYPE.GBP.currency} ${nfUS.format(currency)}`;
    case CURRENCY_TYPE.JPY.type:
      return `${CURRENCY_TYPE.JPY.currency} ${nfUS.format(currency)}`;
    case CURRENCY_TYPE.SGD.type:
      return `${CURRENCY_TYPE.SGD.currency} ${nfUS.format(currency)}`;
    case CURRENCY_TYPE.KRW.type:
      return `${CURRENCY_TYPE.KRW.currency} ${nfUS.format(currency)}`;
    case CURRENCY_TYPE.THB.type:
      return `${CURRENCY_TYPE.THB.currency} ${nfUS.format(currency)}`;
    case CURRENCY_TYPE.CNY.type:
      return `${CURRENCY_TYPE.CNY.currency} ${nfUS.format(currency)}`;
    case CURRENCY_TYPE.AUD.type:
      return `${CURRENCY_TYPE.AUD.currency} ${nfUS.format(currency)}`;
    default:
      return `${new Intl.NumberFormat('de-DE').format(currency)} ${CURRENCY_TYPE.VND.currency}`;
  }
};

const CURRENCY_TYPE = {
  VND: {
    type: 'VND',
    currency: '₫',
  },
  USD: {
    type: 'USD',
    currency: '$',
  },
  EUR: {
    type: 'EUR',
    currency: '€',
  },
  GBP: {
    type: 'GBP',
    currency: '£',
  },
  JPY: {
    type: 'JPY',
    currency: '¥',
  },
  SGD: {
    type: 'SGD',
    currency: '$',
  },
  KRW: {
    type: 'KRW',
    currency: '₩',
  },
  THB: {
    type: 'THB',
    currency: '฿',
  },
  CNY: {
    type: 'CNY',
    currency: '¥',
  },
  AUD: {
    type: 'AUD',
    currency: '$',
  },
};

export const formatUSD = (m) => {
  const str = m.toString();
  let dotIndex = str.indexOf('.');
  if (dotIndex < 0) {
    dotIndex = str.length;
  }
  let firstPart = str.substring(0, dotIndex);
  let rs = '';
  while (firstPart !== '') {
    rs = `${firstPart.slice(-3)}${rs}`;
    firstPart = firstPart.slice(0, -3);
    if (firstPart !== '') {
      rs = `,${rs}`;
    }
  }
  if (dotIndex < 0) {
    return rs;
  }
  return `${rs}${str.substr(dotIndex, 3)}`;
};