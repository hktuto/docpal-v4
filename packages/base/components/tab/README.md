# Tab 組件

## Components
- TabManager
    - TabLayout
        - TabPanel (dropable)
            - TabHeaderList
                - TabHeaderItem ( dragable)
            - teleport target

## Composable
### `useTab`
 
| Name                      | type      | Description                               |
|---------------------------|-------    |-------------                              |
|  `useTabLayout`           | state     |  整個 Tab系統的 json                        |
| `useDropEventCallback`    | state     |  記錄那種 symbol Drop 到 tabPanel 的有有     |  
| `useTabsManager`          | function  | Tab Manager 用到的 fn , 主要有 initLayout   |


## Utils

```ts
// 傳入 layout 和 panelId, 
// 查看 layout 中是否有 panel 的 id 和 panelId 一樣
// 如果找不到，回傳  null
 type recursiveGetPanelById: (layout: TabLayout, panelId:string) => TabPanelContainer | TabLayout | null
```

```ts
// loop 整個 layout , 找出所有 component, 
// 只有 第一次生成 layout 時有用
 type recursiveLoopLayout: (layout: TabLayout, components:TabComponent[]) => TabComponent[]
```

## Events
