import { clientApi } from 'api';
import path from "node:path";
import * as fs from "fs";

import dotenv from 'dotenv'
dotenv.config({
    path:'../../env/.env.dev'
})

const locales = ["en-US", "zh-HK", 'zh-CN']

const languageKeys = ['client', 'meta', 'admin' ];

const baseURL = process.env.BASEURL

async function generate(){
    // loop through locales for generate text json
    for await( const locale of locales) {
        let outputJson:object ={};
        for await( const languageKey of languageKeys) {
            const {data} = await fetch(`${baseURL}/api/docpal/relation/queryLanguage?locale=${locale}&languageKey=${languageKey}`).then(res => res.json())
            if(!data) return
            if(data && data.length > 0 && data[0].languageContent) {
                
                    outputJson = Object.assign(outputJson,JSON.parse(data[0]?.languageContent))
            }
        }
        const jsonString = JSON.stringify(outputJson, null, 2);
        fs.writeFile(path.resolve(process.cwd(), `./dist/${locale}.json`), jsonString, (err) => {
            if (err) {
                console.error('Error writing file', err);
            } else {
                console.log('Successfully wrote file');
            }
        });
    }
}

generate().then( () => console.log("finish")).catch(err => console.log(err))