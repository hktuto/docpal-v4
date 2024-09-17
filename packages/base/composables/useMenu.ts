

export const appMenu = useState<MenuItem[]>('app-menu', () =>([
    {
        id:'browse',
        icon: 'lucide:folder',
        label: "Browse",
        component:"LazyBrowsePage",
        draggable: true,
    },
    {
        id:'search',
        icon: 'lucide:search',
        label: "Search",
        draggable: false
    },
    {
        id:'collection',
        icon:"material-symbols:collections-bookmark-outline-rounded",
        label: "Collection",
        draggable: false,
    },
    {
        id:'workflow',
        icon: 'lucide:workflow',
        label:"workflow",
        draggable:true
    },
    {
        id:'dashboard',
        icon: 'lucide:chart-pie',
        label:"Dashobard",
        draggable:true
    },
]))
export const menuKey = Symbol('menu');
export const useMenuDrop =() => {

    function isMenuData(data:any) {
        return data[menuKey] === true
    }

    function getMenuData(data:MenuItem) {
        return {
            [menuKey]:true, menuId: data.id, data
        }
    }
    return {
        menuKey,
        getMenuData,
        isMenuData
    }
}