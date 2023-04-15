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
        for (let index = 0; index < res[0].length; index += 2) {
          const flightInfo = res[0][index]
            .split('\n')
            .filter((item, index) => index !== 3);
          const flightPrice = res[0][index + 1]
            .split('\n')
            .filter((item, index) => index !== 2);

          const element = flightInfo.concat(flightPrice);
          formatData.push(element);
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
}
