import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { CaseDashboard } from '#components'
import { clientApi } from './mock/api'

describe('[client-case]CaseManageDetailPage', () => {
  let wrapper: any
  beforeEach(() => {
    vi.clearAllMocks()
    sessionStorage.setItem('case-dashboard-id', '916d34ba-5332-4599-8cac-147fbc921f01')
    wrapper = mount(CaseDashboard, {
      global: {
        mocks: {
          $t: (msg: string) => msg,
          $i18n: { t: (key: string) => key }
        }
      },
      props: {
        instanceId: 'std-01',
        versionId: '1:92324144-1935-425b-870c-68e132ea057a'
      }
    })
  })

  it('should getDashboardList the component correctly', async () => {
    wrapper.vm.state.dashboardList = []

    const request = {
      data: [
        {
          caseDefinitionKey: 'sean_test_dashboard1',
          caseTypeId: '4b2831ca-0cf9-4aea-bc07-283ab630b020',
          cmmnVersionId: '1:92324144-1935-425b-870c-68e132ea057a',
          createdBy: 'sean-admin',
          createdDate: '2025-04-14T05:22:48Z',
          deploymentId: null,
          id: '916d34ba-5332-4599-8cac-147fbc921f01',
          label: 'admin',
          modifiedBy: 'sean-admin',
          modifiedDate: '2025-04-14T05:23:29Z',
          status: 'A',
          userGroup: 'administrators'
        }
      ]
    }
    vi.spyOn(clientApi.api, 'getCaseDashboardVersionCmmnversionidPermission').mockResolvedValue(request)

    const getCaseDashboardIdRequest = {
      data: {
        id: '916d34ba-5332-4599-8cac-147fbc921f01',
        caseTypeId: '4b2831ca-0cf9-4aea-bc07-283ab630b020',
        deploymentId: null,
        cmmnVersionId: '1:92324144-1935-425b-870c-68e132ea057a',
        label: 'admin',
        userGroup: 'administrators',
        status: 'A',
        styleJson: '[{"x":0,"y":0,"i":"1744608189296","label":"cmmnTaskPage","minW":2,"minH":2,"maxW":8,"maxH":12,"w":2,"h":3,"component":"TaskPage","setting":{},"moved":false},{"x":0,"y":3,"i":"1744608194195","label":"cmmnWorkflowPage","minW":6,"minH":4,"maxW":12,"maxH":12,"w":8,"h":4,"component":"WorkflowPage","setting":{},"moved":false},{"x":2,"y":0,"i":"1744608201666","label":"cmmnAction","minW":2,"minH":2,"maxW":4,"maxH":12,"w":2,"h":3,"component":"Action","setting":{},"moved":false}]',
        createdBy: 'sean-admin',
        modifiedBy: 'sean-admin',
        createdDate: '2025-04-14T05:22:48Z',
        modifiedDate: '2025-04-14T05:23:29Z'
      }
    }
    vi.spyOn(clientApi.api, 'getCaseDashboardId').mockResolvedValue(getCaseDashboardIdRequest)

    await wrapper.vm.getDashboardList()
    await wrapper.vm.$nextTick()
    expect(clientApi.api.getCaseDashboardVersionCmmnversionidPermission).toHaveBeenCalled()
    expect(wrapper.vm.state.dashboardList).toStrictEqual(request.data)
    expect(clientApi.api.getCaseDashboardId).toHaveBeenCalled()
    expect(wrapper.vm.state.layout).toEqual(JSON.parse(getCaseDashboardIdRequest.data.styleJson))
    expect(wrapper.vm.state.selectedDashboard).toStrictEqual(request.data[0])
    await new Promise(resolve => setTimeout(resolve, 3000))
    expect(wrapper.vm.state.loading).toBe(false)
  })

  it('should getLayout layout is not empty the component correctly', async () => {
    const getCaseDashboardIdRequest = {
      data: {
        id: '916d34ba-5332-4599-8cac-147fbc921f01',
        caseTypeId: '4b2831ca-0cf9-4aea-bc07-283ab630b020',
        deploymentId: null,
        cmmnVersionId: '1:92324144-1935-425b-870c-68e132ea057a',
        label: 'admin',
        layout: [
          {
            component: 'TaskPage',
            h: 3,
            i: '1744608189296',
            label: 'cmmnTaskPage',
            maxH: 12,
            maxW: 8,
            minH: 2,
            minW: 2,
            moved: false,
            setting: {},
            w: 2,
            x: 0,
            y: 0
          },
          {
            component: '"WorkflowPage"',
            h: 4,
            i: '1744608194195',
            label: 'cmmnWorkflowPage',
            maxH: 12,
            maxW: 12,
            minH: 4,
            minW: 5,
            moved: false,
            setting: {},
            w: 8,
            x: 0,
            y: 3
          },
          {
            component: 'Action',
            h: 3,
            i: '1744608201666',
            label: 'cmmnAction',
            maxH: 12,
            maxW: 4,
            minH: 2,
            minW: 2,
            moved: false,
            setting: {},
            w: 2,
            x: 2,
            y: 0
          }
        ],
        userGroup: 'administrators',
        status: 'A',
        createdBy: 'sean-admin',
        modifiedBy: 'sean-admin',
        createdDate: '2025-04-14T05:22:48Z',
        modifiedDate: '2025-04-14T05:23:29Z'
      }
    }

    await wrapper.vm.getLayout(
      '916d34ba-5332-4599-8cac-147fbc921f01',
      getCaseDashboardIdRequest.data
    )
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 3000))

    expect(wrapper.vm.state.layout).toStrictEqual(getCaseDashboardIdRequest.data.layout)
    expect(wrapper.vm.state.loading).toBe(false)
  })

  it('should getLayout layout is empty the component correctly', async () => {
    const getCaseDashboardIdRequest = {
      data: {
        id: '916d34ba-5332-4599-8cac-147fbc921f01',
        caseTypeId: '4b2831ca-0cf9-4aea-bc07-283ab630b020',
        deploymentId: null,
        cmmnVersionId: '1:92324144-1935-425b-870c-68e132ea057a',
        label: 'admin',
        userGroup: 'administrators',
        status: 'A',
        styleJson: '[{"x":0,"y":0,"i":"1744608189296","label":"cmmnTaskPage","minW":2,"minH":2,"maxW":8,"maxH":12,"w":2,"h":3,"component":"TaskPage","setting":{},"moved":false},{"x":0,"y":3,"i":"1744608194195","label":"cmmnWorkflowPage","minW":6,"minH":4,"maxW":12,"maxH":12,"w":8,"h":4,"component":"WorkflowPage","setting":{},"moved":false},{"x":2,"y":0,"i":"1744608201666","label":"cmmnAction","minW":2,"minH":2,"maxW":4,"maxH":12,"w":2,"h":3,"component":"Action","setting":{},"moved":false}]',
        createdBy: 'sean-admin',
        modifiedBy: 'sean-admin',
        createdDate: '2025-04-14T05:22:48Z',
        modifiedDate: '2025-04-14T05:23:29Z'
      }
    }

    vi.spyOn(clientApi.api, 'getCaseDashboardId').mockResolvedValue(getCaseDashboardIdRequest)

    await wrapper.vm.getLayout(
      '916d34ba-5332-4599-8cac-147fbc921f01',
      getCaseDashboardIdRequest.data
    )
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 3000))

    expect(wrapper.vm.state.layout).toEqual(JSON.parse(getCaseDashboardIdRequest.data.styleJson))
    expect(wrapper.vm.state.loading).toBe(false)
  })


})
