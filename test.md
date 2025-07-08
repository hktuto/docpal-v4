## order
1. 生成 json report 
pnpm test:reports

2. 生成 test-excel
pnpm -F report start

## 调试方法

```Javascript
console.log(wrapper.html()) // 检查 HTML 输出是否包含目标组件
console.log(wrapper.vm)

await wrapper.vm.$nextTick() // 等待组件渲染更新
await wrapper.vm.onActivated()

// 往表單寫入數據
wrapper.vm.formRef = {
  validate: vi.fn().mockReturnValue(true)
}

```

### 检查 watch

```Javascript
it('watches for detail changes', async () => {
  const newDetail = { id: 'test-id', name: 'Updated Name' };
  // setProps 重新设置 Props
  await wrapper.setProps({ detail: newDetail });
  expect(wrapper.vm.form.name).toBe(newDetail.name);
});
```

## nuxt项目expect注意事项

### 判断组件是否存在

```javascript
// 通过组件定义名（×）
expect(wrapper.findComponent({ name: 'ResponsiveFilter' }).exists()).toBe(true)

// 通过组件引用（√）
expect(wrapper.findComponent(ResponsiveFilter).exists()).toBe(true)

wrapper.find('.el-select').exists()
```

#### // 查找类名

```javascript
// el-select 为元素名（×）
expect(wrapper.find('el-select').exists()).toBe(true)
// .el-select为类名（√）
expect(wrapper.find('.el-select').exists()).toBe(true)
```

#### 函数解构方法检测

```javascript
const mockReload = vi.fn()
const mockCleanSelectedRows = vi.fn()
vi.mock('../../../packages/base/composables/useVxeTable', () => ({
  useVxeTable: vi.fn(() => ({
    tableConfig: {},
    tableEvent: {},
    tableRef: { value: null },
    reload: mockReload,
    cleanSelectedRows: mockCleanSelectedRows
  }))
}))
// beforeEach
mockReload.mockClear()
mockCleanSelectedRows.mockClear()

// test
expect(mockReload).toHaveBeenCalled() // 验证 reload 被调用
```

#### emitted检测

``` javascript
expect(wrapper.emitted('submit')).toBeTruthy();
expect(wrapper.emitted().submit[0][0]).toMatchObject({
  password: 'password',
  tokenLiveInMinutes: expect.any(Number),
  shareId: expect.any(String),
});
```
