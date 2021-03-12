const puppeteer = require('puppeteer-core');
const fs = require('fs');
const URL = require('url');
const completed = {};
const pending = [];
async function crawl(browser, page, url, parent) {
  console.log('OPEN: ' + url);
  const content = await get(page, url, parent);
  const matches = [...content.matchAll(/href="([^"]+)"?/gm)];
  const { protocol, hostname } = URL.parse(url);
  const host = protocol + '//' + hostname + '/';
  for (const match of matches) {
    let path = match[1];
    if (!path.includes('data:') && !path.includes('css')) {
      if (path.startsWith('/')) {
        path = host + path.substr(1);
      } else if (!path.startsWith('http')) {
        path = host + path;
      }
      if (path.startsWith(host)) {
        if (path.includes('#')) {
          path = path.split('#')[0];
        }
        if (path === host || path.includes('/app/')) {
          continue;
        }
        if (!completed.hasOwnProperty(path)) {
          completed[path] = 0;
          pending.push(path);
        }
        completed[path] ++;
      }
    }
  }
  if (pending.length > 0) {
    return await crawl(browser, page, pending.pop(), url);
  }
  let sitemap = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">';
  const paths = {};
  for (const path in completed) {
    const priority = parseInt(completed[path]);
    if (!paths.hasOwnProperty(priority)) {
      paths[priority] = [];
    }
    paths[priority].push(path);
  }
  sitemap += '\n';
  for (const [index, entries] of Object.entries(paths).reverse()) {
    console.log(index);
    for(const path of entries.sort()) {
      sitemap += '  <url>\n  <loc>' + path.replace(hostname, 'www.myabakus.com') + '</loc>\n  </url>\n';
    }
  }
  sitemap += '</urlset>';
  fs.writeFileSync('./sitemap.xml', sitemap);
  await browser.close();
}

async function get(page, path, parent) {
  await page.goto(path);
  const title = await page.title();
  if (title  === 'Error 404') {
    throw new Error('Not found: ' + path + ' -> ' + parent);
  }
  return await page.content();
}

setTimeout(async() => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/usr/bin/google-chrome'
  });
  const pages = await browser.pages();
  await crawl(browser, pages[0], 'https://www.localhost.org/home')
}, 0);

