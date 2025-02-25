
const fs = require('fs');
const path = require('path');
const argv = require('minimist')(process.argv.slice(2));
const enJson = require('../../packages/base/public/defaultLang/en-Us.json')
const zhJson = require('../../packages/base/public/defaultLang/zh-CN.json')
const zhHKJson = require('../../packages/base/public/defaultLang/zh-HK.json')


async function loginAdmin(){
    const { SUPERADMIN, PASSWORD, ADMINURL } = argv;
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

async function deployLanguage(){
    // const { superAdmin, password, adminUrl } = argv;
    const avalibleLang = ['en-Us', 'zh-CN', 'zh-HK'];
    const langDir = path.join(__dirname,'../../packages/base/public/defaultLang')
    const token = await loginAdmin()
    console.log(token)
    // const data = await fetch(`${adminUrl}/docpal/relation/updateLanguage`,{
    //     method: 'POST',
    //     body: {
    //         locale: 'en-Us',
    //         languageKey: 'client',
    //         languageContent: JSON.stringify(enJson)
    //     },
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // }).then(res => {
    //     console.log(res);
    // })
    // .catch(error => {
    //     console.log("error", error)
    // })
}

deployLanguage()