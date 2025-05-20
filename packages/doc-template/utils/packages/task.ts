
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'

export const TaskSetting = [
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
]
