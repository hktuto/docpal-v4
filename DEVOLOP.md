### 快速開始
1. 在独立專案安裝包 
在对应專案(例如：apps/admin)t
```bash
pnpm i --shamefully-hoist
/ pnpm --filter client dev
```
2. 開始開發
```bash
   pnpm run dev 
```
3. 生成 api
```
pnpm -F api generate
```
4. Generate code deployment report
```
// 1. Excel script generation for language differences
// 1.1 Need to obtain comparison files first: libraries\deployment\oldSrc\en-US.json
// 2. Generate test excel document
// 2.2 Need to generate test files first  pnpm test
pnpm -F report start
```

