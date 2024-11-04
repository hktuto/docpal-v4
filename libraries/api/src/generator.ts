import path from "node:path";
import fs from 'node:fs';
import { generateApi } from "swagger-typescript-api";
import dotenv from 'dotenv'
//@ts-ignore
import setting from './setting.json'




const endpoint = [
    {name: 'client', url:`${setting.API_URL}/v3/api-docs`, className:"Client"},
    {name: 'admin', url:`${setting.API_URL}/admin/v3/api-docs`, className:"Admin"},
]

async function generate(){
    try{
        
        await Promise.all(
            endpoint.map( 
                point => {
                    let finalRoute:Record<string, Record<string, string[]>> = {}
                    generateApi({
                        name: point.name + '.ts',
                        output: path.resolve(process.cwd(), "./src/generate"),
                        url: point.url,
                        httpClientType: "axios",
                        generateClient:true,
                        unwrapResponseData:true,
                        apiClassName: point.className,
                        singleHttpClient:false,
                        modular:false,
                        moduleNameIndex: 1,
                        moduleNameFirstTag:true,
                        prettier: {
                            // By default prettier config is load from your project
                            printWidth: 120,
                            tabWidth: 4,
                            trailingComma: "all",
                            parser: "typescript",
                        },
                        hooks:{
                            onCreateRouteName:(routeNameInfo, rawRouteInfo) => {
                                return routeNameInfo
                            },
                            onFormatRouteName: (routeInfo, templateRouteName) => {
                                // console.log(routeInfo);
                                const paths = routeInfo.route.replace('/api/','').split('/');
                                if(paths[paths.length -1] === '') {
                                    paths[paths.length -1] = 'deprecate'
                                }
                                const allPath = paths.reverse().reduce((all, curr, index) => {
                                    if(paths.length > 5 && all.length > 1) return all
                                    if(all.length > 0) return all
                                    if(curr && !curr.includes('{') ) {
                                        all.push(curr)
                                    }
                                    return all
                                },[]).reverse()
                               
                                let newName = routeInfo.method + toPascalCase(allPath.join('-'))
                                let oldName = newName;
                                if(!finalRoute[routeInfo.moduleName]){
                                    finalRoute[routeInfo.moduleName]= {}
                                }
                                if(!finalRoute[routeInfo.moduleName][oldName]) {
                                    finalRoute[routeInfo.moduleName][oldName] = []
                                }
                                if(finalRoute[routeInfo.moduleName][oldName].length > 0){
                                    newName += finalRoute[routeInfo.moduleName][oldName].length
                                }
                                finalRoute[routeInfo.moduleName][oldName].push(routeInfo.method +" : " + newName + " : " + routeInfo.route)
                                
                                return newName
                            }
                        }
                        
                    }
                    ).then(() => {
                        fs.writeFile( path.join(__dirname,`/generate/${point.name}.json`), JSON.stringify(finalRoute),{}, () => {
                            // console.log('complete')
                        })
                    })
                }
            )
        )
        
    }catch(error) {
        console.log(error)
    }
}

function toPascalCase(string) {
    return `${string}`
      .toLowerCase()
      .replace(new RegExp(/[-_]+/, 'g'), ' ')
      .replace(new RegExp(/[^\w\s]/, 'g'), '')
      .replace(
        new RegExp(/\s+(.)(\w*)/, 'g'),
        ($1, $2, $3) => `${$2.toUpperCase() + $3}`
      )
      .replace(new RegExp(/\w/), s => s.toUpperCase());
  }

generate()