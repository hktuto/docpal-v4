
import type { InjectionKey } from 'vue'
import type { Graph } from '@antv/x6'

// create injecttion key for bpmn provider

export const BPMN_PROVIDER: InjectionKey<BPMNProvider> = Symbol('BPMN_PROVIDER_KEY')
export interface BPMNProvider {
    init(bpmnXml: string, x6Json?: any): Promise<void>
    graph: Ref<Graph>,
    key: symbol
}