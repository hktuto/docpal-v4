// table
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'



export const TableSetting = [
  Table.configure({
      HTMLAttributes: {
        style: "width:100%; border-collapse: collapse; margin: 0; overflow: hidden; table-layout: fixed;"
      },
      resizable: false,
  }),
  TableRow,
  TableHeader.configure({
    HTMLAttributes:{
      style: "padding: 6px 8px; background-color: hsl(0, 0.00%, 67.80%);"
    }
  }),
  TableCell,
]
