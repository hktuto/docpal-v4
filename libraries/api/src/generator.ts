import path from "node:path";
import { generateApi } from "swagger-typescript-api";
import dotenv from 'dotenv'
dotenv.config({
    path:'../../env/.env.dev'
})


const endpoint = [
    {name: 'client', url:`${process.env.BASEURL}/v3/api-docs`, className:"Client"},
    {name: 'admin', url:`${process.env.BASEURL}/admin/v3/api-docs`, className:"Admin"},
]

async function generate(){
    endpoint.map( point => generateApi({
        name: point.name + '.ts',
        output: path.resolve(process.cwd(), "./src/generate"),
        url: point.url,
        httpClientType: "axios",
        generateClient:true,
        unwrapResponseData:true,
        apiClassName: point.className,
        singleHttpClient:false,
    }))
}


generate()