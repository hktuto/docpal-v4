const fs = require('fs');
const path = require('path');
function parseArgv() {
    const args = {};
    for (let i = 2; i < process.argv.length; i++) {
        let arg = process.argv[i];
        if (arg.startsWith('--')) {
            const key = arg.slice(2);
            let value = true;
            if (i + 1 < process.argv.length && !process.argv[i + 1].startsWith('--')) {
                value = process.argv[i + 1];
                i++;
            }
            args[key] = value;
        }
    }
    return args;
}
const argv = parseArgv();

function normalizeSetting(){
    let path = argv.path || '../api/src'
    const { CLIENT_URL, ADMIN_URL, PUBLIC_URL, TEMPLATE_URL } = argv
    if(!CLIENT_URL || !ADMIN_URL ) throw new Error('Missing arguments')
    
    return {
        path,
        setting:{
            CLIENT_URL,
            ADMIN_URL,
            PUBLIC_URL,
            TEMPLATE_URL
        }
    }
}

function generateJson(){
    const config = normalizeSetting()
    fs.writeFileSync(path.resolve(__dirname, `${config.path}/setting.json`), JSON.stringify(config.setting))
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

