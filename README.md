這是 DocPal 4.0 的 REPO , 

# 開發計劃
這項目還在進中行，計劃分成 3 部份, 目標 1 月低前完成。

### 1. 測試可能性
![[libraries/api/README#使用 Swagger 生成 Axios 和 TypeScript|用Swagger. 來生成 Axios 和Typescript]] 

### 2. Migrate 舊頁面
- [ ] 設計多分頁頁面
- Client
	![[Browse Migration task|Browse]] 
		
	- [ ] Collection
	- [ ] Share
	- [ ] Workflow
	- [ ] 
	- [ ] ...
- Admin
	- [ ] User 
	- [ ] User Group
	- [ ] ...

### 3. 測試和部署



## 項目結構

- Apps
	- Web <- 網頁客氣端
	- Packages <- 所有功能
		- [[apps/packages/base/README|Base]] <- 所有不用Auth 的基本模組
			- [x] i18n
			- [ ] colorMode
			- [x] element-plus
			- [x] css variable
			- [ ] basic component
		- [[Authapp/README|AuthApp]] <- 所有需要 Auth 的基本模組
			- [ ] global keycloak
			- [ ] get user
			- [ ] refresh token
			- [ ] 403 logou
- Library 
	- [[libraries/api/README|API]] <- 從 Swagger 生成來的 Axios 客戶