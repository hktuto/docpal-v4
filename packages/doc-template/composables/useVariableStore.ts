import { ref, computed } from 'vue'
import type { Variable, VariableType } from '../types/variable'

interface CreateVariableInput {
  name: string
  type: VariableType
  value: any
  displayValue: string
  createdBy: string
}

export function useVariableStore(initialVariables: Variable[] = []) {
  const variables = ref<Variable[]>([...initialVariables])

  function isNameUnique(name: string, excludeId?: string) {
    return !variables.value.some(v => v.name.toLowerCase() === name.toLowerCase() && v.id !== excludeId)
  }

  function createVariable(input: CreateVariableInput): { success: boolean; error?: string } {
    if (!isNameUnique(input.name)) {
      return { success: false, error: 'Variable name must be unique.' }
    }
    const newVar: Variable = {
      id: crypto.randomUUID(),
      name: input.name,
      type: input.type,
      value: input.value,
      displayValue: input.displayValue,
      inUse: false,
      createdBy: input.createdBy,
      createdAt: new Date().toISOString(),
    }
    variables.value.push(newVar)
    return { success: true }
  }

  function updateVariable(id: string, updates: Partial<Omit<Variable, 'id' | 'createdBy' | 'createdAt'>>): { success: boolean; error?: string } {
    const idx = variables.value.findIndex(v => v.id === id)
    if (idx === -1) return { success: false, error: 'Variable not found.' }
    if (updates.name && !isNameUnique(updates.name, id)) {
      return { success: false, error: 'Variable name must be unique.' }
    }
    if (variables.value[idx].inUse && (updates.name || updates.type)) {
      return { success: false, error: 'Cannot edit name/type of variable in use.' }
    }
    variables.value[idx] = {
      ...variables.value[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    }
    return { success: true }
  }

  function deleteVariable(id: string): { success: boolean; error?: string } {
    const idx = variables.value.findIndex(v => v.id === id)
    if (idx === -1) return { success: false, error: 'Variable not found.' }
    if (variables.value[idx].inUse) {
      return { success: false, error: 'Cannot delete variable in use.' }
    }
    variables.value.splice(idx, 1)
    return { success: true }
  }

  function setVariableInUse(id: string, inUse: boolean) {
    const idx = variables.value.findIndex(v => v.id === id)
    if (idx !== -1) {
      variables.value[idx].inUse = inUse
    }
  }

  return {
    variables: computed(() => variables.value),
    createVariable,
    updateVariable,
    deleteVariable,
    isNameUnique,
    setVariableInUse,
  }
} 
