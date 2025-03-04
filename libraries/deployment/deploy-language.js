
const fs = require('fs');
const path = require('path');
const argv = require('minimist')(process.argv.slice(2));
const enJson = require('./src/en-US.json')
const zhJson = require('./src/zh-CN.json')
const zhHKJson = require('./src/zh-HK.json')


const { SUPERADMIN, PASSWORD, ADMINURL } = argv;

async function loginAdmin(){
    const {data} = await fetch(`${ADMINURL}/auth/nuxeo/login`,{
        method:'POST',
        body: JSON.stringify({
            username: SUPERADMIN,
            password: PASSWORD
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(async(res) => await res.json())
    .catch(error => {
        console.log("error", error)
    })
    return data.access_token
}

async function updateLanguage(code, token){
    const {data} = await fetch(`${ADMINURL}/docpal/relation/queryLanguage?locale=${code}&languageKey=client`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(async(res) => await res.json())
    .catch(error => {
        console.log("error", error)
    })
    // const newJson = await fs.readFileSync(path.join(__dirname, `./lang/${code}.json`), {
    //     encoding: 'utf-8'
    // })
    const newJson = code === 'en-US' ? enJson : code === 'zh-CN' ? zhJson : zhHKJson
    const newData = {
        ...data[0],
        languageContent: JSON.stringify(newJson)
    }
    const res = await fetch(`${ADMINURL}/docpal/relation/updateLanguage`,{
        method: 'POST',
        body: JSON.stringify(newData),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(async(res) => {
        const data =  await res.json()
        if(data.code !== 200) {
            throw new Error(data.message)
        }
    })
    .catch(error => {
        console.log("error", error)
    })
    console.log('finish update language', code)
}

async function deployLanguage(){
    // const { superAdmin, password, adminUrl } = argv;
    const avalibleLang = ['en-US', 'zh-CN', 'zh-HK'];
    const token = await loginAdmin()
    console.log(token)
    for(let i=0; i<avalibleLang.length; i++){
        await updateLanguage(avalibleLang[i], token)
    }
    console.log('deploy language success')
}

deployLanguage()