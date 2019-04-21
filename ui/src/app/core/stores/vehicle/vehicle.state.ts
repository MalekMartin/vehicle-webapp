import { VehicleInfo, Engine } from '../../../vehicles/vehicle-stream/vehicle';
import { VehicleInfoFormModel } from './vehicle.interface';

export class VehicleState {
    vehicle = null as VehicleInfo | null;
}

export class VehicleStateFns {
    replaceVehicle(state: VehicleState, vehicle: VehicleInfo): VehicleState {
        return {
            ...state,
            vehicle
        };
    }

    replaceVehicleInfoFromForm(state: VehicleState, info: VehicleInfoFormModel) {
        return {
            ...state,
            vehicle: {
                ...state.vehicle,
                info: {
                    ...state.vehicle.info,
                    ...info
                }
            }
        };
    }

    replaceEngine(state: VehicleState, engine: Engine): VehicleState {
        return {
            ...state, 
            vehicle: {
                ...state.vehicle,
                engine
            }
        };
    }
}

export const vehicleStateFns = new VehicleStateFns();
