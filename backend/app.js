const express = require('express')
// const CeiCrawler = require('cei-crawler')
const crawler = require('./crawler')
const app = express()
const port = 3000

// let ceiCrawler = new CeiCrawler('CPE', 'SENHA', {/* options */});

app.get('/', (req, res) => {

  crawler.login();  

  res.send("OK");
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})