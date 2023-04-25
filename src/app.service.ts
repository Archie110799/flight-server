import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class AppService {
  getHello(req) {
    getBrowserProxy: async (proxy) => {
      return await puppeteer.launch({
        headless: true,
        ignoreHTTPSErrors: true,
        args: [
          '--proxy-server=' + proxy,
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--start-maximized',
        ],
      });
    };

    return new Promise(async (resolve, reject) => {
      try {
        const browser = await puppeteer.launch();
        let dataObj = {};

        const page = await browser.newPage();
        const url = `https://www.vemaybay.vn/flight-result?request=${req}`;
        await page.goto(url);
        const res = await page.$$eval('.ftl-flight-main', (rows) => {
          return Array.from(rows, (row) => {
            const columns = row.querySelectorAll('ul');
            return Array.from(columns, (column) => column.innerText);
          });
        });

        const formatData = [];

        if (res[0]?.length) {
          for (let index = 0; index < res[0]?.length; index += 2) {
            const flightInfo = res[0][index]
              .split('\n')
              .filter((item, index) => index !== 3);
            const flightPrice = res[0][index + 1]
              .split('\n')
              .filter((item, index) => index !== 2);

            const element = flightInfo.concat(flightPrice);
            formatData.push(element);
          }
        }

        dataObj['flightList'] = formatData;

        await browser.close();
        return resolve(dataObj);
      } catch (e) {
        return reject(e);
      }
    });
    return 'Hello World!';
  }

  getProvinces() {
    return [
      { id: 1, value: 'HAN', lable: 'Hà Nội (HAN)' },
      { id: 2, value: 'SGN', lable: 'Hồ Chí Minh (SGN)' },
      { id: 3, value: 'DIN', lable: 'Điện Biên Phủ (DIN)' },
      { id: 4, value: 'HPH', lable: 'Hải Phòng (HPH)' },
      { id: 5, value: 'THD', lable: 'Thanh Hóa (THD)' },
      { id: 6, value: 'VII', lable: 'Vinh (VII)' },
      { id: 7, value: 'VDH', lable: 'Quảng Bình (VDH)' },
      { id: 8, value: 'VCL', lable: 'Quảng Nam (VCL)' },
      { id: 9, value: 'HUI', lable: 'Huế (HUI)' },
      { id: 10, value: 'PXU', lable: 'PleiKu (PXU)' },
      { id: 11, value: 'TBB', lable: 'Phú Yên (TBB)' },
      { id: 12, value: 'BMV', lable: 'Ban Mê Thuột (BMV)' },
      { id: 13, value: 'CXR', lable: 'Nha Trang (CXR)' },
      { id: 14, value: 'UIH', lable: 'Qui Nhơn (UIH)' },
      { id: 15, value: 'DLI', lable: 'Đà Lạt (DLI)' },
      { id: 16, value: 'VCA', lable: 'Cần Thơ (VCA)' },
      { id: 17, value: 'VKG', lable: 'Kiên Giang (VKG)' },
      { id: 18, value: 'CAH', lable: 'Cà Mau (CAH)' },
      { id: 19, value: 'PQC', lable: 'Phú Quốc (PQC)' },
      { id: 20, value: 'VCS', lable: 'Côn Đảo (VCS)' },
      { id: 21, value: 'VDO', lable: 'Vân Đồn (VDO)' },
    ];
  }
}
