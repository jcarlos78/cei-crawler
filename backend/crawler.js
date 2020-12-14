
const puppeteer = require('puppeteer');
const C = require('./constants');
const USERNAME_SELECTOR = '#ctl00_ContentPlaceHolder1_txtLogin';
const PASSWORD_SELECTOR = '#ctl00_ContentPlaceHolder1_txtSenha';


// await Promise.all([
//     page.click('#loginSubmit'),
//     page.waitForNavigation({ waitUntil: 'networkidle0' }),
// ]);

async function login() {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.setViewport({width: 1200, height: 720});
    await page.goto('https://cei.b3.com.br/CEI_Responsivo/', { waitUntil: 'networkidle0' }); // wait until page load
    await page.type(USERNAME_SELECTOR, C.username);
    await page.type(PASSWORD_SELECTOR, C.password);
    // click and wait for navigation
    await Promise.all([
        page.click('#ctl00_ContentPlaceHolder1_btnLogar'),
        page.waitForNavigation({ waitUntil: 'networkidle0' }),   
    ]).then(valores => {
        getData();
    }).catch(erro => {
        console.log(erro.message)
    });

}

async function getData(){
    //console.log(await page.evaluate(() => document.body.innerHTML));

        // const stories = await page.$$eval('.tabela-posicao', links =>
        //     links.map(link => link.textContent).slice(0, 10)
        // )
        // console.log(stories);

        const data = await page.evaluate(() => {
            const tds = Array.from(document.querySelectorAll('.tabela-posicao tr td'))
            return tds.map(td => td.innerText.trim())
        });

        let collection = {
            consolidated : []
        }

        let skip = false;
        for(let i in data){

            if(data[i] == 'Você não possui informações nesta categoria.'){
                continue;
            } else if(!skip){
                collection.consolidated.push({'item':data[i],'valor':data[++i]});
            }
            skip = !skip //- toggle value.
        }

        console.log(collection);
}

module.exports.login = login;