import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class AppService {
  getHello() {
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
        const url =
          'https://www.vemaybay.vn/flight-result?request=HANSGN25042023-1-0-0';
        await page.goto(url);
        // Wait and click on first result

        const res = await page.$$eval('.ftl-flight-main', (rows) => {
          return Array.from(rows, (row) => {
            const columns = row.querySelectorAll('ul');
            return Array.from(columns, (column) => column.innerText);
          });
        });

        dataObj['flightList'] = res[0];

        await browser.close();
        return resolve(dataObj);
      } catch (e) {
        return reject(e);
      }
    });
    return 'Hello World!';
  }
}
