## 调试方法
```
console.log(wrapper.html()) // 检查 HTML 输出是否包含目标组件
console.log(wrapper.vm)

await wrapper.vm.$nextTick() // 等待组件渲染更新
await wrapper.vm.onActivated()
```
### 检查 watch
```
it('watches for detail changes', async () => {
  const newDetail = { id: 'test-id', name: 'Updated Name' };
  // setProps 重新设置 Props
  await wrapper.setProps({ detail: newDetail });
  expect(wrapper.vm.form.name).toBe(newDetail.name);
});
```
## nuxt项目expect注意事项
### 判断组件是否存在
// 通过组件定义名（×）
expect(wrapper.findComponent({ name: 'ResponsiveFilter' }).exists()).toBe(true)
// 通过组件引用（√）
expect(wrapper.findComponent(ResponsiveFilter).exists()).toBe(true)

### wrapper.find('.el-select').exists()
查找类名
// el-select 为元素名（×）
expect(wrapper.find('el-select').exists()).toBe(true);
// .el-select为类名（√）
expect(wrapper.find('.el-select').exists()).toBe(true);

