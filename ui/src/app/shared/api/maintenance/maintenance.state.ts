import { Page } from '../../../utils/pageable';
import { Maintenance } from './maintenance.interface';

export class MaintenanceState {
    maintenances: Page<Maintenance> | null = null;
}

class MaintenanceStateFns {
    replaceMaintenances(
        state: MaintenanceState,
        maintenances: Page<Maintenance>
    ): MaintenanceState {
        return {
            ...state,
            maintenances
        };
    }
}

export const maintenanceStateFns = new MaintenanceStateFns();
