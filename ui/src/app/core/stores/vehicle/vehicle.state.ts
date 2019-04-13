import { VehicleInfo } from '../../../vehicles/vehicle-stream/vehicle';

export class VehicleState {
        vehicle = null as VehicleInfo | null;
}

export const vehicleStateFns = {
    replaceVehicle(state: VehicleState, vehicle: VehicleInfo): VehicleState {
        return {
            ...state,
            vehicle
        }
    }
}
