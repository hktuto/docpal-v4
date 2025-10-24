

type MenuOption = 'stack' | 'full'
type FullMenuStateOption = 'stack'|'float'

export const menuKey = Symbol('menu');
export const useMenuStyle = () => useState<MenuOption>('menuStyle', () => 'stack');
export const useFullMenuState = () => useState('fullMenuState', () => 'stack')
export const fullMenuStorageKey = 'fullMenuStateKey'
export const menuOptions:MenuOption[] = ['stack','full']
export const fullMenuOption:FullMenuStateOption[] = ['stack','float']
