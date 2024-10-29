# DocPal 的 網頁 Client



# 留意
Global Component 不能 deconstruct props

這是不可以的
```ts
const { tab} = defineProps<{tab:any}>()
```
只能這樣
```ts
const props = defineProps<{tab:any}>()