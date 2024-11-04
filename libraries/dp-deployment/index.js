const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));

function normalizeSetting(){
    let path = argv.path || '../api/src'
    const { ADMINURL, CLIENTURL } = argv
    if(!CLIENTURL || !ADMINURL) throw new Error('Missing arguments')
    
    return {
        path,
        setting:{
            CLIENTURL,
            ADMINURL,
        }
    }
}

function generateJson(){
    const config = normalizeSetting()
    fs.writeFileSync(`${config.path}/setting.json`, JSON.stringify(config.setting))
    // update desktop app
    // if(argv.app === 'client') {
    //     const { DOCPAL_END_POINT } = argv
    //     electronJson.publish[0] = {
    //         "provider": "generic",
    //         "url": `https://${DOCPAL_END_POINT}/app`
    //     }
    //     fs.writeFileSync(`../../apps/desktop/electron-builder.json5`, JSON.stringify(electronJson))
    // }
}


generateJson()

