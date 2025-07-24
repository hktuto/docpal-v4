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
    { label: 'JPEG', value: 'JPEG' }
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
    { label: 'Profile_id', value: 'Profile_id' },
    { label: 'File_name', value: 'File_name' },
    { label: 'File', value: 'File' },
    { label: 'Original_path', value: 'Original_path' },
    { label: 'Capture_date(yyyy)', value: 'Capture_date(yyyy)' },
    { label: 'Capture_date(mm)', value: 'Capture_date(mm)' },
    { label: 'Capture_date(yyyy-mm-dd)', value: 'Capture_date(yyyy-mm-dd)' },
    { label: 'Invoice_number', value: 'Invoice_number' },
    { label: 'sales_name', value: 'sales_name' },
    { label: 'customer_name', value: 'customer_name' }
  ])
  const pathVOpts = useState('pathVOpts', () => [
    { label: 'Profile_id', value: 'Profile_id' },
    { label: 'File_name', value: 'File_name' },
    { label: 'Original_path', value: 'Original_path' },
    { label: 'Capture_date(yyyy)', value: 'Capture_date(yyyy)' },
    { label: 'Capture_date(mm)', value: 'Capture_date(mm)' },
    { label: 'Capture_date(yyyy-mm-dd)', value: 'Capture_date(yyyy-mm-dd)' },
    { label: 'Capture_date(yyyy-mm-ddTHH:mm:ss)', value: 'Capture_date(yyyy-mm-ddTHH:mm:ss)' }
  ])
  const fileNameVOpts = useState('fileNameVOpts', () => [
    { label: 'Profile_id', value: 'Profile_id' },
    { label: 'File_name', value: 'File_name' },
    { label: 'Capture_date(yyyy-mm-dd)', value: 'Capture_date(yyyy-mm-dd)' },
    { label: 'Capture_date(yyyy-mm-ddTHH:mm:ss)', value: 'Capture_date(yyyy-mm-ddTHH:mm:ss)' }
  ])
  // @ts-ignore
  async function initExternalStorageProfileOpts() {
    try {
      const data = await adminApi.api.getExternalstorage({} as any).then((res: any) => res.data)
      externalStorageProfileOpts.value = data.map((item: any) => ({
        label: item.name,
        value: item.id
      }))
    } catch (error: any) {
      console.error(error)
    }
  }
  async function getMetaOpts() {
    try {
      const { data }: any = await adminApi.api.getDocpaltypeSettingsMetadataDocumenttype('GlobalFile')
      const optionList = data.keywords.map((item: any) => ({
        ...item,
        label: item.name,
        value: item.name
      }))
      metaOpts.value = optionList
    } catch (error: any) {
      console.error(error)
    }
  }
  onMounted(async () => {
    initExternalStorageProfileOpts()
    getMetaOpts()
  })

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
