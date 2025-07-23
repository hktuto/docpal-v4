import { adminApi } from 'api'

export const useOutputOptioins = () => {
  const documentTypeOpts = useState('documentTypeOpts', () => [
    { label: 'File', value: 'File' },
    { label: 'Folder', value: 'Folder' },
    { label: 'Link', value: 'Link' }
  ])
  const outputFormatOpts = useState('outputFormatOpts', () => [
    { label: 'PDF', value: 'PDF' },
    { label: 'Image', value: 'Image' },
    { label: 'Text', value: 'Text' },
    { label: 'Word', value: 'Word' },
    { label: 'Original File', value: 'originalFile' }
  ])
  const fileTypeOpts = useState('fileTypeOpts', () => [
    { label: 'TIFF', value: 'TIFF' },
    { label: 'JPEG', value: 'JPEG' },
    // { label: 'PNG', value: 'PNG' }
  ])
  const resolutionOpts = useState('resolutionOpts', () => [
    { label: 'Original', value: 'Original' },
    { label: '0.25x', value: '0.25x' },
    { label: '0.5x', value: '0.5x' }
  ])
  const colorOpts = useState('colorOpts', () => [
    { label: 'Original', value: 'original' },
    { label: 'Black & White', value: 'blackWhite' },
    { label: 'Gray Scale', value: 'grayScale' }
  ])
  const destinationOpts = useState('destinationOpts', () => [
    { label: 'External Storage Profile', value: 'external' },
    { label: 'DocPal', value: 'DocPal' },
    { label: 'Workflow', value: 'Workflow' }
  ])
  const externalStorageProfileOpts = useState('externalStorageProfileOpts', () => [
    { label: 'Network Drive', value: 'Network Drive' },
    { label: 'Local Drive', value: 'Local Drive' }
  ])
  const duplicateNameStrategyOpts = useState('duplicateNameStrategyOpts', () => [
    { label: 'Replace', value: 'Replace' },
    { label: 'Rename', value: 'Rename' },
    { label: 'Skip', value: 'Skip' }
  ])

  const fileOpts = useState('fileOpts', () => [
    { label: 'File', value: 'File' },
    { label: 'Folder', value: 'Folder' },
    { label: 'Link', value: 'Link' }
  ])
  const metaOpts = useState('metaOpts', () => [
    { label: 'invoice_number', value: 'invoice_number' },
    { label: 'invoice_date', value: 'invoice_date' },
    { label: 'invoice_amount', value: 'invoice_amount' }
  ])
  const documentNameOpts = useState('documentNameOpts', () => [
    { label: 'file_name', value: 'file_name' },
    { label: 'invoice_number', value: 'invoice_number' },
    { label: 'invoice_date', value: 'invoice_date' },
    { label: 'invoice_amount', value: 'invoice_amount' }
  ])
  const pathVOpts = useState('pathVOpts', () => [
    { label: '${File_name}', value: '${File_name}' },
    { label: '${Invoice_number}', value: '${Invoice_number}' },
    { label: '${Invoice_date}', value: '${Invoice_date}' },
    { label: '${Invoice_amount}', value: '${Invoice_amount}' }
  ])
  const fileNameVOpts = useState('fileNameVOpts', () => [
    { label: '${File_name}', value: '${File_name}' },
    { label: '${Invoice_number}', value: '${Invoice_number}' },
    { label: '${Invoice_date}', value: '${Invoice_date}' },
    { label: '${Invoice_amount}', value: '${Invoice_amount}' }
  ])
  // @ts-ignore

  onMounted(async () => {})

  return {
    documentTypeOpts,
    outputFormatOpts,
    fileTypeOpts,
    resolutionOpts,
    colorOpts,
    destinationOpts,
    externalStorageProfileOpts,
    duplicateNameStrategyOpts,
    pathVOpts,
    fileNameVOpts,
    metaOpts,
    documentNameOpts,
    fileOpts
  }
}
