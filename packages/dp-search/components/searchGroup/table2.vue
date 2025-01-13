<script lang="ts" setup>
import { formatter } from 'element-plus';
import dayjs from 'dayjs'
import {ArrowUp} from '@element-plus/icons-vue'
import {useVxeTable} from '#imports'

const listProvider = inject(SearchListProviderKey);

const { tableConfig, tableEvent, tableRef, reload, query} = useVxeTable({
    id: 'search-result',
    api: listProvider?.search,
    virtualScroll: false,
    columns:[
        {
            title:"tableHeader_name",
            slots:{
                default: "docIcon"
            }
        },
        {
            title:"docInfo.fileExtension",
            field:"mimeType2",
            width: 150
        },
        {
            title:"search.size",
            field:"properties.file:content.length",
            formatter:(row:any) => {
                return displayFileSize(row.properties['file:content']['length'])
            }
        },
        {
            title:"tableHeader_path",
            field:"logicalPath",
            slots:{
                default:"logicalPath"
            }
        },
        {
            title: "tableHeader.summary",
            field:"properties.summaryValue",
            slots:{
                default: "summary"
            }
        },
        {
            title:"search.authors",
            field:"createdBy"
        },
        {
            title:"search.contributors",
            field:"properties.dc:contributors",
            formatter:({ cellValue }: any) => {
                if(!cellValue) return '-';
                return cellValue.join(',')
            }
        },
        {
            title:"tableHeader_modifiedDate",
            field:"modifiedDate",
            formatter:({ cellValue }: any) => {
                const format = userDisplayTimeSetting();
                return dayjs(cellValue).format(format);
            }
        },
        {
            title:"dpTable_tags",
            slots:{
                default:"docTags"
            }
        }
    ],
    bodyActions:[

    ],
    dblClickAction: ({ row, column, event }:any) => {
        listProvider?.openDetail(row)
    },
})

defineExpose({
    reload
})
</script>


<template>
    <VxeGrid ref="tableRef" v-bind="tableConfig"  v-on="tableEvent">
        <template #toolbar_buttons>

        </template>
        <template #docTags="{ row, index }">
            <div v-if="row?.properties && row?.properties['nxtag:tags']">
                <el-tag v-for="item in row?.properties['nxtag:tags']" :key="item.label">{{item.label}}</el-tag>
            </div>
        </template>
        <template #logicalPath="{ row }">
            <PathTabButton :path="row.path" :fileName="row.name" :openParent="!row.isFolder" :displayPath="row.logicalPath" canOpen/>
        </template>
        <template #docIcon="{ row, index }">
            <div class="nameItem">
                <BrowseItemIcon v-if="!!row" :type="row.isFolder ? 'folder' : 'file'"/>
                <div class="label">{{row.name}}</div>
            </div>
        </template> 
        <template #summary="{ row }">
            <div v-if="row.properties && row.properties.summarys">
                <div v-if=" row.properties.summarys.length > 1" @click="row.expandSummary = !row.expandSummary" >
                    <el-icon :class="row.expandSummary ? 'revert' : 'rotate'">
                        <ArrowUp />
                    </el-icon>
                </div>
                <template v-if="row.properties.summarys.length <= 1 || row.expandSummary">
                    <div v-for="item in row.properties.summarys" class="summaryItem">
                        [{{item.summaryKey}}]: <b>{{item.summaryValue}}</b>
                    </div>
                </template>
            </div>
        </template>
    </VxeGrid>

</template>