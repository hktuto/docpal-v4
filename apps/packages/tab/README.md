# Tab Manager

this package is to manage multiple tabs

### Tasks
- [x] render multiple splitpanes
- [x] display tab in splitpanes
- [ ] remove tab action ( notify manager if no tabs and change layout)
- [ ] drag and drop tabs between tab
- [ ] drag and drop tabs between layout
- [ ] render custom component in tabpanel
- [ ] test scroll in tab

### Component 結構 

```mermaid
flowchart TB;
 TabManager[**TabManger** 
 Manage 只有一個 Layout, 用來做整體的 store , 會provide layout 到子項] 
 --> 
 TabLayout[
 **TabLayout**
 layout 會 Loop 子項，有機會是 TabLayout 或是 TabPanel, 
 需要 listen drop 事件
 ]
 TabLayout -.-> TabLayout 
 TabLayout --> TabPanel
 TabPanel[**TabPanel**
    頁面上的 Pane,
 ] --> TabTabs
 TabTabs[**TabTabs**
 一個 Tabs 組件可以render 多個 component, 
 當所有紙項目都被刪除時需要透過 inject 來的 state 來通知manager修改 layout
 ] --> TabComponent[**TabComponent** 
 根據單個Tab的設定來渲染 component]

```

# 留意
Global Component 不能 deconstruct props

這是不可以的
```ts
const { tab} = defineProps<{tab:any}>()
```
只能這樣
```ts
const props = defineProps<{tab:any}>()
```

### Global Component 測試

- [x] provide inject
- [x] api 會不會增加 import 大小 ( 不會，api 只會異部加載)





