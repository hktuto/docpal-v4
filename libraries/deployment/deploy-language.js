
const fs = require('fs');
const path = require('path');
const argv = require('minimist')(process.argv.slice(2));
const enJson = require('../../packages/base/public/defaultLang/en-Us.json')
const zhJson = require('../../packages/base/public/defaultLang/zh-CN.json')
const zhHKJson = require('../../packages/base/public/defaultLang/zh-HK.json')

const { SUPERADMIN, PASSWORD, ADMINURL } = argv;

async function loginAdmin(){
    const {data} = await fetch(`${ADMINURL}/auth/nuxeo/login`,{
        method:'POST',
        body: JSON.stringify({
            username: SUPERADMIN,
            password: "2'KMzF}zK2ZmwQe"
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
    const {data} = await fetch(`${ADMINURL}//docpal/relation/queryLanguage?locale=${code}&languageKey=client`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(async(res) => await res.json())
    .catch(error => {
        console.log("error", error)
    })
    const newJson = code === 'en-Us' ? enJson : code === 'zh-CN' ? zhJson : zhHKJson
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
    }).then(async(res) => await res.json())
    .catch(error => {
        console.log("error", error)
    })
    console.log(res.data)
}

async function deployLanguage(){
    // const { superAdmin, password, adminUrl } = argv;
    const avalibleLang = ['en-Us', 'zh-CN', 'zh-HK'];
    const langDir = path.join(__dirname,'../../packages/base/public/defaultLang')
    const token = await loginAdmin()
    console.log(token)
    for(let i=0; i<avalibleLang.length; i++){
        await updateLanguage(avalibleLang[i], token)
    }
    console.log('deploy language success')
}

deployLanguage()