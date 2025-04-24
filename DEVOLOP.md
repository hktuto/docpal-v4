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
4. 生成测试 excel文档
```
pnpm -F unit-test start
```
5. Excel script generation for language differences
```
pnpm -F deployment compare
```
