const puppeteer = require('puppeteer-core');
const fs = require('fs');
const URL = require('url');
const completed = {};
const pending = [];
const titles = {};
const descriptions = {};
async function crawl(browser, page, url, parent) {
  console.log('OPEN: ' + url);
  const matches = await links(page, url, parent);
  const { protocol, hostname } = URL.parse(url);
  const host = protocol + '//' + hostname + '/';
  if (!completed.hasOwnProperty(url)) {
    completed[url] = 0;
  }
  for (let path of matches) {
    if (path.startsWith(host)) {
      if (path.includes('#')) {
        path = path.split('#')[0];
      }
      if (path === host || path.includes('/app/') || path.includes('/agende') || path.includes('/schedule')) {
        continue;
      }
      if (!completed.hasOwnProperty(path)) {
        completed[path] = 0;
        pending.push(path);
      }
      completed[path] ++;
    } else {
      console.log('NOT H: ' + path);
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
  for (const [, entries] of Object.entries(paths).reverse()) {
    for(const path of entries.sort()) {
      sitemap += '  <url>\n  <loc>' + path.replace(hostname, 'www.myabakus.com') + '</loc>\n  </url>\n';
    }
  }
  sitemap += '</urlset>';
  fs.writeFileSync('./dist/sitemap.xml', sitemap);
  await browser.close();
}

async function links(page, path, parent) {
  await page.goto(path);
  const title = (await page.title()).trim();
  if (title  === 'Error 404') {
    throw new Error('Not found: ' + path + ' -> ' + parent);
  }
  if (titles.hasOwnProperty(title)) {
    console.log('S: "' + titles[title] + '"');
    console.log('N: "' + path + '"');
    throw 'Duplicate title: ' + title;
  }
  let description;
  try {
    description = await page.$eval('meta[name="description"]', e => e.getAttribute('content').trim());
  } catch (e) {
    description = path;
  }
  if (descriptions.hasOwnProperty(description)) {
    console.log('S: "' + descriptions[description] + '"');
    console.log('N: "' + path + '"');
    throw 'Duplicate description: ' + description;
  }
  titles[title] = path;
  descriptions[description] = path;
  return await page.$$eval('a[href]', links => links.map(link => link.href.trim()));
}

setTimeout(async() => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/usr/bin/google-chrome'
  });
  const pages = await browser.pages();
  await crawl(browser, pages[0], 'https://www.localhost.org/home')
}, 0);

