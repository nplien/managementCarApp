import {Platform, Dimensions, PixelRatio, StatusBar} from 'react-native';

import moment from 'moment';
import {showMessage} from 'react-native-flash-message';
import {BANG_GIA_CHUNG, KIND_OF_SCREEN} from 'common/Constants';
import {DATE_CODE, IDateRange} from 'views/app';
import MyStaticLocal from './MyStaticLocal';
import {
  BRAND_LIST,
  DELIVERY_LIST,
  EXPORT_LIST,
  IMPORT_LIST,
  INVOICE_LIST,
  SO_QUY_LIST,
  VOUCHER_LIST
} from 'configs/StatusConfig';
import {IProductSale} from 'models/Product.Model';

const {width, height} = Dimensions.get('screen');
let rootLoadingContext: any = null;

const imageDefault = require('../assets/images/imgDefault.jpg');

export default class Utilities {
  static showToast(
    title: string,
    message?: string,
    type: 'none' | 'default' | 'info' | 'success' | 'danger' | 'warning' = 'default',
    duration = 1850
  ) {
    showMessage({
      message: title,
      description: message,
      type: type,
      duration: duration
    });
  }

  static convertLinkImage(url?: string, size?: string) {
    try {
      if (!url) return imageDefault;
      if (
        url.startsWith('http://cdn-thumb-image') ||
        url.startsWith('https://cdn-thumb-image') ||
        url.startsWith('http://cdn-thumb-image-ccs') ||
        url.startsWith('https://cdn-thumb-image-ccs') ||
        url.startsWith('https://cdn-cocolux.csell.com.vn') ||
        url.startsWith('http://cdn-cocolux.csell.com.vn') ||
        url.startsWith('http://cdn.cocolux.com') ||
        url.startsWith('https://cdn.cocolux.com')
      ) {
        if (
          url.endsWith('.png') ||
          url.endsWith('.PNG') ||
          url.endsWith('.jpg') ||
          url.endsWith('.JPG') ||
          url.endsWith('.jpeg') ||
          url.endsWith('.JPEG') ||
          url.endsWith('.gif') ||
          url.endsWith('.GIF')
        ) {
          const arrUrls = String(url).split('.');
          let urlMix = '';

          urlMix = arrUrls.slice(0, arrUrls.length - 1).join('.');
          urlMix += size + '.' + arrUrls[arrUrls.length - 1];
          return {uri: urlMix};
        }
        return {uri: url};
      }
      return {uri: url};
    } catch (error) {
      return imageDefault;
    }
  }

  static isAndroid = () => {
    return Platform.OS === 'android';
  };

  static log(log: any) {
    if (__DEV__) {
      const Reactotron = require('reactotron-react-native');
      Reactotron.default.log(log);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static async logAnalytics(eventName: string) {
    // if (!__DEV__) {
    //     await analytics().logEvent(eventName);
    // }
  }

  static logException(nameComponent: any, error: any) {
    if (__DEV__) {
      console.log(`${nameComponent}.js`, error);
      Utilities.log(` | ${nameComponent}.js | ${String(error)} | ${String(JSON.stringify(error))}`);
    } else {
      //   crashlytics().recordError(
      //       error,
      //       `${'v. | '}${nameComponent}.js | ${String(error)} | ${String(JSON.stringify(error))}`
      //   );
    }
  }

  static getWidthScreen(isPixel?: any) {
    if (width < height) {
      if (isPixel) return PixelRatio.getPixelSizeForLayoutSize(width);
      return width;
    }
    if (isPixel) return PixelRatio.getPixelSizeForLayoutSize(height);
    return height;
  }

  static getHeightScreen(isPixel?: any) {
    if (width < height) {
      if (isPixel) return PixelRatio.getPixelSizeForLayoutSize(height);
      return height;
    }
    if (isPixel) return PixelRatio.getPixelSizeForLayoutSize(width);
    return width;
  }

  /**
   ** isInt: tạo ra số hay không
   ** maxInt: số lớn nhất có thể được tạo
   *
   */
  static randomNumber(isInt?: boolean, maxInt?: number) {
    if (isInt) {
      if (maxInt) {
        return Math.floor(Math.random() * Math.floor(maxInt));
      } else {
        return Math.floor(Math.random() * Math.floor(10000));
      }
    } else {
      return Math.random().toString(16).substring(2, 10);
    }
  }

  static convertUnixTimeByFormat(seconds?: number, format?: string, isFromNow?: boolean) {
    try {
      const formartTmp = format || 'DD/MM/YYYY HH:mm';
      /* convert time unix */
      if (typeof seconds === 'number') {
        if (isFromNow) {
          // qua 1 nam thi hien thi day du ngay gio
          // if (new Date().getTime() - dateTmp.getTime() >= 31622400000) {
          //   return time;
          // }
          return moment.unix(seconds).fromNow();
        }
        return moment.unix(seconds).format(formartTmp);
      }
      return '';
    } catch (error) {
      return '';
    }
  }

  static convertTimeByFormat(date?: any, format?: string, isFromNow?: boolean) {
    try {
      let dateTmp: Date;
      let time = '';
      if (!date) return '';
      if (typeof date === 'number') {
        const currentTimeMili = Date.now();
        const currentTimeMiliStr = (currentTimeMili / 1000).toFixed(0);
        if (String(date).length <= String(currentTimeMiliStr).length) {
          dateTmp = new Date(date * 1000);
          time = moment(dateTmp).format(format);
        }
      }
      /* convert time unix */
      // if (typeof date === 'number') {
      //   if (date < 0) {
      //     return moment.unix(date).format(format);
      //   }
      //   return moment(new Date(date * 1000)).format(format);
      // }
      if (!date || String(date).toLowerCase().includes('invalid')) {
        time = '';
      }

      const formartTmp = format || 'DD/MM/YYYY HH:mm';
      dateTmp = new Date(date);
      time = moment(dateTmp).format(formartTmp);
      if (isFromNow) {
        // qua 1 nam thi hien thi day du ngay gio
        // if (new Date().getTime() - dateTmp.getTime() >= 31622400000) {
        //   return time;
        // }
        time = moment(dateTmp).fromNow();
      }
      return time;
    } catch (error) {
      return '';
    }
  }

  static setHideRootLoading(context: any) {
    rootLoadingContext = context;
  }

  static showHideRootLoading(isShow: boolean, textBody?: string) {
    try {
      if (rootLoadingContext && isShow === false && rootLoadingContext.state.isShow === false)
        return;
      if (rootLoadingContext && isShow === true && rootLoadingContext.state.isShow === true) return;

      rootLoadingContext.setState({
        isShow,
        textBody: textBody || 'Loading...'
      });
    } catch (error) {
      Utilities.logException('showHideRootLoading', error);
    }
  }

  static setStatusOrderContent = (type: KIND_OF_SCREEN, status: string) => {
    let statusOrderContent = '';
    switch (type) {
      case KIND_OF_SCREEN.INVOICE:
        statusOrderContent = INVOICE_LIST.find(x => x.id === status)?.name || '';
        break;
      case KIND_OF_SCREEN.IMPORT:
        statusOrderContent = IMPORT_LIST.find(x => x.id === status)?.name || '';
        break;
      case KIND_OF_SCREEN.EXPORT:
        statusOrderContent = EXPORT_LIST.find(x => x.id === status)?.name || '';
        break;
      case KIND_OF_SCREEN.DELIVERY:
        statusOrderContent = DELIVERY_LIST.find(x => x.id === status)?.name || '';
        break;
      case KIND_OF_SCREEN.PAYMENT:
        statusOrderContent = SO_QUY_LIST.find(x => x.id === status)?.name || '';
        break;
      case KIND_OF_SCREEN.VOUCHER:
        statusOrderContent = VOUCHER_LIST.find(x => x.id === status)?.name || '';
        break;
      case KIND_OF_SCREEN.BRAND:
        statusOrderContent = BRAND_LIST.find(x => x.id === status)?.name || '';
        break;

      default:
        statusOrderContent = '';
        break;
    }

    return statusOrderContent || 'Không xác định';
  };

  static getDateFilter(typeDate: DATE_CODE): IDateRange {
    let formatOnServer = 'MM/DD/YYYY';
    let filterOfDate: IDateRange = {};
    let dateNow = new Date();
    switch (typeDate) {
      case 'TOAN_THOI_GIAN':
        const allTimeTo = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate());

        filterOfDate = {
          dateFrom: moment(0).format(formatOnServer),
          dateTo: moment(allTimeTo).format(formatOnServer)
        };
        break;
      case 'HOM_NAY':
        const today = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate());

        filterOfDate = {
          dateFrom: moment(today).format(formatOnServer),
          dateTo: moment(today).format(formatOnServer)
        };
        break;

      case 'HOM_QUA':
        const yesterday = new Date(
          dateNow.getFullYear(),
          dateNow.getMonth(),
          dateNow.getDate() - 1
        );
        filterOfDate = {
          dateFrom: moment(yesterday).format(formatOnServer),
          dateTo: moment(yesterday).format(formatOnServer)
        };
        break;
      case '7_NGAY_QUA':
        const bayngayqua = new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() - 6
        );

        filterOfDate = {
          dateTo: moment(new Date()).format(formatOnServer),
          dateFrom: moment(bayngayqua).format(formatOnServer)
        };

        break;
      case 'TUAN_NAY':
        const thisWeek = new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() - 1
        );

        filterOfDate = {
          dateFrom: moment(
            new Date(thisWeek.setDate(thisWeek.getDate() - thisWeek.getDay() + 1))
          ).format(formatOnServer),
          dateTo: moment(
            new Date(thisWeek.setDate(thisWeek.getDate() - thisWeek.getDay() + 7))
          ).format(formatOnServer)
        };

        break;

      case 'TUAN_TRUOC':
        const lastWeek = new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() - 7
        );

        filterOfDate = {
          dateFrom: moment(
            new Date(lastWeek.setDate(lastWeek.getDate() - lastWeek.getDay() + 1))
          ).format(formatOnServer),
          dateTo: moment(
            new Date(lastWeek.setDate(lastWeek.getDate() - lastWeek.getDay() + 7))
          ).format(formatOnServer)
        };

        break;

      case 'THANG_NAY':
        const thisMonth = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate());

        filterOfDate = {
          dateFrom: moment(new Date(thisMonth.getFullYear(), thisMonth.getMonth(), 1)).format(
            formatOnServer
          ),
          dateTo: moment(new Date(thisMonth.getFullYear(), thisMonth.getMonth() + 1, 0)).format(
            formatOnServer
          )
        };
        break;

      case 'THANG_TRUOC':
        const lastMonth = new Date(
          dateNow.getFullYear(),
          dateNow.getMonth() - 1,
          dateNow.getDate()
        );
        filterOfDate = {
          dateFrom: moment(new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1)).format(
            formatOnServer
          ),
          dateTo: moment(new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0)).format(
            formatOnServer
          )
        };

        break;
      case 'NAM_NAY':
        const thisYear = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate());
        filterOfDate = {
          dateFrom: moment(new Date(thisYear.getFullYear(), 0, 1)).format(formatOnServer),
          dateTo: moment(new Date(thisYear.getFullYear() + 1, 0, 0)).format(formatOnServer)
        };

        break;
      case 'NAM_TRUOC':
        const lastYear = new Date(dateNow.getFullYear() - 1, dateNow.getMonth(), dateNow.getDate());
        filterOfDate = {
          dateFrom: moment(new Date(lastYear.getFullYear(), 0, 1)).format(formatOnServer),
          dateTo: moment(new Date(lastYear.getFullYear() + 1, 0, 0)).format(formatOnServer)
        };

        break;

      default:
        const defaultDate = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate());

        filterOfDate = {
          dateFrom: moment(defaultDate).format(formatOnServer),
          dateTo: moment(defaultDate).format(formatOnServer)
        };
        break;
    }

    return filterOfDate;
  }
  static getImageLogo = (widthLogo: number, heightLogo: number) => {
    const logo = `<svg width=${widthLogo} height=${heightLogo} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M37.4998 62.5C36.6757 62.5 35.8702 62.7444 35.185 63.2023C34.4998 63.6601 33.9657 64.3108 33.6503 65.0722C33.335 65.8336 33.2525 66.6713 33.4132 67.4796C33.574 68.2878 33.9708 69.0303 34.5536 69.613C35.1363 70.1957 35.8787 70.5925 36.687 70.7533C37.4952 70.9141 38.333 70.8316 39.0944 70.5162C39.8557 70.2008 40.5065 69.6668 40.9643 68.9816C41.4221 68.2964 41.6665 67.4908 41.6665 66.6667C41.6665 65.5616 41.2275 64.5018 40.4461 63.7204C39.6647 62.939 38.6049 62.5 37.4998 62.5ZM8.33317 58.3334C7.2281 58.3334 6.16829 58.7724 5.38689 59.5538C4.60549 60.3352 4.1665 61.395 4.1665 62.5V70.8334C4.1665 71.9384 4.60549 72.9983 5.38689 73.7797C6.16829 74.5611 7.2281 75 8.33317 75C9.43824 75 10.498 74.5611 11.2794 73.7797C12.0609 72.9983 12.4998 71.9384 12.4998 70.8334V62.5C12.4998 61.395 12.0609 60.3352 11.2794 59.5538C10.498 58.7724 9.43824 58.3334 8.33317 58.3334ZM91.6665 58.3334C90.5614 58.3334 89.5016 58.7724 88.7202 59.5538C87.9388 60.3352 87.4998 61.395 87.4998 62.5V70.8334C87.4998 71.9384 87.9388 72.9983 88.7202 73.7797C89.5016 74.5611 90.5614 75 91.6665 75C92.7716 75 93.8314 74.5611 94.6128 73.7797C95.3942 72.9983 95.8332 71.9384 95.8332 70.8334V62.5C95.8332 61.395 95.3942 60.3352 94.6128 59.5538C93.8314 58.7724 92.7716 58.3334 91.6665 58.3334ZM70.8332 29.1667H54.1665V23.8334C55.426 23.1062 56.4732 22.0622 57.2042 20.8049C57.9352 19.5477 58.3244 18.121 58.3332 16.6667C58.3332 14.4566 57.4552 12.337 55.8924 10.7742C54.3296 9.21135 52.21 8.33337 49.9998 8.33337C47.7897 8.33337 45.6701 9.21135 44.1073 10.7742C42.5445 12.337 41.6665 14.4566 41.6665 16.6667C41.6753 18.121 42.0645 19.5477 42.7955 20.8049C43.5264 22.0622 44.5737 23.1062 45.8332 23.8334V29.1667H29.1665C25.8513 29.1667 22.6719 30.4837 20.3277 32.8279C17.9835 35.1721 16.6665 38.3515 16.6665 41.6667V79.1667C16.6665 82.4819 17.9835 85.6613 20.3277 88.0055C22.6719 90.3498 25.8513 91.6667 29.1665 91.6667H70.8332C74.1484 91.6667 77.3278 90.3498 79.672 88.0055C82.0162 85.6613 83.3332 82.4819 83.3332 79.1667V41.6667C83.3332 38.3515 82.0162 35.1721 79.672 32.8279C77.3278 30.4837 74.1484 29.1667 70.8332 29.1667ZM57.1665 37.5L55.0832 45.8334H44.9165L42.8332 37.5H57.1665ZM74.9998 79.1667C74.9998 80.2718 74.5609 81.3316 73.7794 82.113C72.998 82.8944 71.9382 83.3334 70.8332 83.3334H29.1665C28.0614 83.3334 27.0016 82.8944 26.2202 82.113C25.4388 81.3316 24.9998 80.2718 24.9998 79.1667V41.6667C24.9998 40.5616 25.4388 39.5018 26.2202 38.7204C27.0016 37.939 28.0614 37.5 29.1665 37.5H34.2498L37.4998 51C37.728 51.9245 38.2659 52.743 39.024 53.3192C39.7821 53.8953 40.7147 54.1944 41.6665 54.1667H58.3332C59.285 54.1944 60.2176 53.8953 60.9757 53.3192C61.7338 52.743 62.2717 51.9245 62.4998 51L65.7498 37.5H70.8332C71.9382 37.5 72.998 37.939 73.7794 38.7204C74.5609 39.5018 74.9998 40.5616 74.9998 41.6667V79.1667ZM62.4998 62.5C61.6757 62.5 60.8702 62.7444 60.185 63.2023C59.4998 63.6601 58.9657 64.3108 58.6503 65.0722C58.335 65.8336 58.2525 66.6713 58.4132 67.4796C58.574 68.2878 58.9708 69.0303 59.5536 69.613C60.1363 70.1957 60.8787 70.5925 61.687 70.7533C62.4952 70.9141 63.333 70.8316 64.0943 70.5162C64.8557 70.2008 65.5065 69.6668 65.9643 68.9816C66.4221 68.2964 66.6665 67.4908 66.6665 66.6667C66.6665 65.5616 66.2275 64.5018 65.4461 63.7204C64.6647 62.939 63.6049 62.5 62.4998 62.5Z" fill="black"/>
    </svg>`;

    return logo;
  };
  static getHeaderRequest = () => {
    let access_token = MyStaticLocal.USER_TOKEN?.access_token || '';
    return {
      Authorization: 'Bearer ' + access_token
    };
  };

  static getStatusBarHeight(): number {
    if (Platform.OS === 'android') {
      return StatusBar.currentHeight || 30;
    } else {
      return 30;
    }
  }

  static convertCurrency(money?: number) {
    let mony = money || 0;
    const currentMony = Number(mony)
      .toFixed(0)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    if (currentMony.length > 12) {
      const sliceMony = currentMony.slice(0, currentMony.length - 9);
      return sliceMony + ' Tỷ';
    } else if (currentMony.length > 8) {
      const sliceMony = currentMony.slice(0, currentMony.length - 5);
      return sliceMony + ' Triệu';
    }
    return currentMony;
  }

  static convertCount(num?: number, dot?: number) {
    try {
      let count = Number(num || 0);
      const currentCount = count.toFixed(dot || 0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      return currentCount;
    } catch (error) {
      return '';
    }
  }

  static returnColorBangChuCai(character: string) {
    let mapColorCharacter: any = {
      '1': '#1e90ff',
      '2': '#008b8b',
      '3': '#483d8b',
      '4': '#6a5acd',
      '5': '#5f9ea0',
      '6': '#6495ed',
      '7': '#0000ff',
      '8': '#8a2be2',
      '9': '#00008b',
      A: '#00bfff',
      Ă: '#000000',
      Â: '#006400',
      B: '#8b008b',
      C: '#2f4f4f',
      D: '#00ced1',
      Đ: '#696969',
      E: '#228b22',
      Ê: '#4b0082',
      G: '#556b2f',
      H: '#8b0000',
      I: '#20b2aa',
      K: '#778899',
      L: '#800000',
      M: '#66cdaa',
      N: '#0000cd',
      O: '#3cb371',
      Ô: '#7b68ee',
      Ơ: '#6b8e23',
      P: '#800080',
      Q: '#663399',
      R: '#4169e1',
      S: '#2e8b57',
      T: '#a0522d',
      U: '#c0c0c0',
      Ư: '#87ceeb',
      V: '#708090',
      X: '#4682b4',
      Y: '#008080'
    };

    let uper = String(character).toUpperCase();
    if (mapColorCharacter[uper]) {
      return mapColorCharacter[uper];
    }
    return '#1e90ff';
  }
}

const isValidHex = (hex: string) => /^#([A-Fa-f0-9]{3,4}){1,2}$/.test(hex);

const getChunksFromString = (st: any, chunkSize: any) =>
  st.match(new RegExp(`.{${chunkSize}}`, 'g'));

const convertHexUnitTo256 = (hexStr: string) => parseInt(hexStr.repeat(2 / hexStr.length), 16);

const getAlphafloat = (a: any, alpha: any) => {
  if (typeof a !== 'undefined') {
    return a / 255;
  }
  if (typeof alpha !== 'number' || alpha < 0 || alpha > 1) {
    return 1;
  }
  return alpha;
};

export const hexToRGBA = (hex: string, alpha: number) => {
  if (!isValidHex(hex)) {
    return hex;
  }
  const chunkSize = Math.floor((hex.length - 1) / 3);
  const hexArr = getChunksFromString(hex.slice(1), chunkSize);
  const [r, g, b, a] = hexArr.map(convertHexUnitTo256);
  return `rgba(${r}, ${g}, ${b}, ${getAlphafloat(a, alpha)})`;
};

export const getTongTienHang = (arrProductSale?: IProductSale[]): number => {
  let tongGia = 0;

  if (arrProductSale) {
    for (let index = 0; index < arrProductSale.length; index++) {
      const item = arrProductSale[index];

      const {price_books} = item.product;
      let price = item.product.price || 0;
      if (price_books) {
        let found = price_books.findIndex(x => x.id === item.price_books.id);
        if (found > -1) {
          price = price_books[found].price || item.product.price || 0;
        }
      }
      if (
        item.price_books.id === BANG_GIA_CHUNG.id &&
        item.product.discount &&
        item.product.price
      ) {
        price = item.product.price;
      }

      tongGia = tongGia + price * item.totalQty;
    }
  }

  return tongGia;
};
