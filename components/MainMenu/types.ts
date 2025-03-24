export interface IButtonAction {
    id: number;
    name: string;
    action: (...args: any[]) => void;
    icon: string;
} 

export const accountButtonActions: IButtonAction[] = [
    {
        id: 1,
        name: 'chPass',
        action: (component) => component.openModal(),
        icon: 'i-dashicons:lock',
        
    }, 
    {
        id: 2,
        name: 'logOut',
        action: (component) => component.openModal(),
        icon: 'i-dashicons:exit'
    },
    {
        id: 3,
        name: 'deleteAccount',
        action: (component) => component.openModal(),
        icon: 'i-heroicons-solid:trash'
    }

]