import { mount } from '@vue/test-utils'
import { describe, it, vi, expect, beforeEach, afterEach } from 'vitest'
import { DocTypeInfo } from '#components'

describe('[admin-document-type]DocTypeInfo', () => {
  let wrapper: any

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
    vi.clearAllMocks()
  })

  describe('Component Rendering', () => {
    it('renders correctly', async () => {
      wrapper = mount(DocTypeInfo, {
        props: {
          docType: {
            name: 'Test Document',
            isFolder: false
          }
        },
        global: {
          mocks: {
            $t: (msg: string) => msg, // Mock translation function
            $i18n: { t: (key: string) => key }
          }
        }
      })

      expect(wrapper.exists()).toBe(true)
    })

    it('renders card with header', () => {
      wrapper = mount(DocTypeInfo, {
        props: {
          docType: {
            name: 'Test Document',
            isFolder: false
          }
        },
        global: {
          mocks: {
            $t: (msg: string) => msg,
            $i18n: { t: (key: string) => key }
          }
        }
      })

      const card = wrapper.find('.el-card')
      expect(card.exists()).toBe(true)
      expect(wrapper.text()).toContain('common_info')
    })

    it('renders document name correctly', () => {
      wrapper = mount(DocTypeInfo, {
        props: {
          docType: {
            name: 'Test Document',
            isFolder: false
          }
        },
        global: {
          mocks: {
            $t: (msg: string) => msg,
            $i18n: { t: (key: string) => key }
          }
        }
      })

      expect(wrapper.html()).toContain('Test Document')
      expect(wrapper.text()).toContain('tableHeader_name')
    })

    it('renders file type information', () => {
      wrapper = mount(DocTypeInfo, {
        props: {
          docType: {
            name: 'Test Document',
            isFolder: false
          }
        },
        global: {
          mocks: {
            $t: (msg: string) => msg,
            $i18n: { t: (key: string) => key }
          }
        }
      })

      expect(wrapper.text()).toContain('docType_fileType')
      expect(wrapper.text()).toContain('common_file')
    })
  })

  describe('Document Type Display', () => {
    it('displays file type correctly', async () => {
      wrapper = mount(DocTypeInfo, {
        props: {
          docType: {
            name: 'Test Document',
            isFolder: false
          }
        },
        global: {
          mocks: {
            $t: (msg: string) => msg,
            $i18n: { t: (key: string) => key }
          }
        }
      })

      await wrapper.vm.$nextTick()
      expect(wrapper.html()).toContain('Test Document')
      expect(wrapper.html()).toContain('common_file')
    })

    it('displays folder type correctly', async () => {
      wrapper = mount(DocTypeInfo, {
        props: {
          docType: {
            name: 'Test Folder',
            isFolder: true
          }
        },
        global: {
          mocks: {
            $t: (msg: string) => msg,
            $i18n: { t: (key: string) => key }
          }
        }
      })

      await wrapper.vm.$nextTick()
      expect(wrapper.html()).toContain('Test Folder')
      expect(wrapper.html()).toContain('common_folder')
    })
  })

  describe('Props Handling', () => {
    it('accepts docType prop correctly', () => {
      const docTypeData = {
        name: 'Test Document Type',
        isFolder: false
      }

      wrapper = mount(DocTypeInfo, {
        props: {
          docType: docTypeData
        },
        global: {
          mocks: {
            $t: (msg: string) => msg,
            $i18n: { t: (key: string) => key }
          }
        }
      })

      expect(wrapper.vm.docType).toEqual(docTypeData)
    })

    it('handles different docType properties', () => {
      const docTypeData = {
        name: 'Complex Document Type',
        isFolder: true,
        category: 'Test Category',
        description: 'Test Description'
      }

      wrapper = mount(DocTypeInfo, {
        props: {
          docType: docTypeData
        },
        global: {
          mocks: {
            $t: (msg: string) => msg,
            $i18n: { t: (key: string) => key }
          }
        }
      })

      expect(wrapper.vm.docType.name).toBe('Complex Document Type')
      expect(wrapper.vm.docType.isFolder).toBe(true)
    })
  })

  describe('Conditional Rendering', () => {
    it('shows file type when isFolder is false', () => {
      wrapper = mount(DocTypeInfo, {
        props: {
          docType: {
            name: 'Test File',
            isFolder: false
          }
        },
        global: {
          mocks: {
            $t: (msg: string) => msg,
            $i18n: { t: (key: string) => key }
          }
        }
      })

      expect(wrapper.text()).toContain('common_file')
      expect(wrapper.text()).not.toContain('common_folder')
    })

    it('shows folder type when isFolder is true', () => {
      wrapper = mount(DocTypeInfo, {
        props: {
          docType: {
            name: 'Test Folder',
            isFolder: true
          }
        },
        global: {
          mocks: {
            $t: (msg: string) => msg,
            $i18n: { t: (key: string) => key }
          }
        }
      })

      expect(wrapper.text()).toContain('common_folder')
      expect(wrapper.text()).not.toContain('common_file')
    })
  })

  describe('Styling and Layout', () => {
    it('has correct CSS classes', () => {
      wrapper = mount(DocTypeInfo, {
        props: {
          docType: {
            name: 'Test Document',
            isFolder: false
          }
        },
        global: {
          mocks: {
            $t: (msg: string) => msg,
            $i18n: { t: (key: string) => key }
          }
        }
      })

      const card = wrapper.find('.el-card')
      const flexContent = wrapper.findAll('.flexContent')
      
      expect(card.exists()).toBe(true)
      expect(flexContent).toHaveLength(2) // Two flexContent divs for name and file type
    })

    it('applies ellipsis class to content', () => {
      wrapper = mount(DocTypeInfo, {
        props: {
          docType: {
            name: 'Test Document',
            isFolder: false
          }
        },
        global: {
          mocks: {
            $t: (msg: string) => msg,
            $i18n: { t: (key: string) => key }
          }
        }
      })

      const ellipsisElements = wrapper.findAll('.ellipsis')
      expect(ellipsisElements.length).toBeGreaterThan(0)
    })
  })

  describe('Accessibility', () => {
    it('has title attribute for document name', () => {
      wrapper = mount(DocTypeInfo, {
        props: {
          docType: {
            name: 'Test Document',
            isFolder: false
          }
        },
        global: {
          mocks: {
            $t: (msg: string) => msg,
            $i18n: { t: (key: string) => key }
          }
        }
      })

      const nameElement = wrapper.find('.ellipsis[title="Test Document"]')
      expect(nameElement.exists()).toBe(true)
    })
  })

  describe('Internationalization', () => {
    it('uses translation function for labels', () => {
      wrapper = mount(DocTypeInfo, {
        props: {
          docType: {
            name: 'Test Document',
            isFolder: false
          }
        },
        global: {
          mocks: {
            $t: (msg: string) => msg,
            $i18n: { t: (key: string) => key }
          }
        }
      })

      expect(wrapper.text()).toContain('common_info')
      expect(wrapper.text()).toContain('tableHeader_name')
      expect(wrapper.text()).toContain('docType_fileType')
    })

    it('translates file type labels correctly', () => {
      wrapper = mount(DocTypeInfo, {
        props: {
          docType: {
            name: 'Test Document',
            isFolder: false
          }
        },
        global: {
          mocks: {
            $t: (msg: string) => msg,
            $i18n: { t: (key: string) => key }
          }
        }
      })

      expect(wrapper.text()).toContain('common_file')
    })

    it('translates folder type labels correctly', () => {
      wrapper = mount(DocTypeInfo, {
        props: {
          docType: {
            name: 'Test Folder',
            isFolder: true
          }
        },
        global: {
          mocks: {
            $t: (msg: string) => msg,
            $i18n: { t: (key: string) => key }
          }
        }
      })

      expect(wrapper.text()).toContain('common_folder')
    })
  })

  describe('Edge Cases', () => {
    it('handles empty docType object', () => {
      wrapper = mount(DocTypeInfo, {
        props: {
          docType: {}
        },
        global: {
          mocks: {
            $t: (msg: string) => msg,
            $i18n: { t: (key: string) => key }
          }
        }
      })

      expect(wrapper.exists()).toBe(true)
      expect(wrapper.text()).toContain('common_file') // Default behavior when isFolder is undefined
    })

    it('handles docType with missing properties', () => {
      wrapper = mount(DocTypeInfo, {
        props: {
          docType: {
            name: 'Test Document'
            // isFolder is missing
          }
        },
        global: {
          mocks: {
            $t: (msg: string) => msg,
            $i18n: { t: (key: string) => key }
          }
        }
      })

      expect(wrapper.exists()).toBe(true)
      expect(wrapper.text()).toContain('Test Document')
      expect(wrapper.text()).toContain('common_file') // Default behavior when isFolder is undefined
    })

    it('handles very long document names', () => {
      const longName = 'A'.repeat(1000)
      wrapper = mount(DocTypeInfo, {
        props: {
          docType: {
            name: longName,
            isFolder: false
          }
        },
        global: {
          mocks: {
            $t: (msg: string) => msg,
            $i18n: { t: (key: string) => key }
          }
        }
      })

      expect(wrapper.exists()).toBe(true)
      expect(wrapper.html()).toContain(longName)
    })
  })

  describe('Component Structure', () => {
    it('has correct template structure', () => {
      wrapper = mount(DocTypeInfo, {
        props: {
          docType: {
            name: 'Test Document',
            isFolder: false
          }
        },
        global: {
          mocks: {
            $t: (msg: string) => msg,
            $i18n: { t: (key: string) => key }
          }
        }
      })

      // Check for card structure
      const card = wrapper.find('.el-card')
      expect(card.exists()).toBe(true)

      // Check for header
      const header = wrapper.find('.el-card__header')
      expect(header.exists()).toBe(true)

      // Check for flexContent divs
      const flexContentDivs = wrapper.findAll('.flexContent')
      expect(flexContentDivs).toHaveLength(2)
    })
  })
}) 
