# Auth App 
需要登陸的系統基本配置, 已包含 `../base` 的所有設定

### 主要功能有
- Login
- Logout
- User 的數據

### Composable
- useLoginHook  <- 放用戶登入後會執行的數列，可由其他模組插入需要再用戶登入後執行的邏輯
- usePublicPageState <- 網站內不用登入頁面的數列
- useAuthReadyState <- 用來記錄 KeyCloak 是否已經預備好
- useUserState <-  用戶資料
- useAuth
    - fetch <- 登入邏輯
    - useUserState <- 用戶資料, 如用戶沒有登入資料為null
    - logout <- 登出邏輯
    - loggedin <- 用戶是否已登入, 用useUserState 是否有資料來做判斷

### Component
- AuthState <- 根據 KeyCloak 是否已經預備好來 顯示插槽， Ready 時顯示預設插槽，未 Ready 顯示 placeholder 插槽. 

