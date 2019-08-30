export interface MenuOption {
    page: MenuOptionPage;
    label: string;
    warning: number;
    icon: string;
}

export type MenuOptionPage =
    | 'dashboard'
    | 'info'
    | 'fuel'
    | 'costs'
    | 'tires'
    | 'technical'
    | 'maintenance'
    | 'repairs'
    | 'manuals'
    | 'settings';