import { VehicleInfo, Engine } from '../../../vehicles/vehicle-stream/vehicle';
import { VehicleInfoFormModel } from './vehicle.interface';
import { Trade } from '../../../shared/api/trade/trade';

export class VehicleState {
    vehicle = null as VehicleInfo | null;
    loading = false;
}

export class VehicleStateFns {
    replaceVehicle(state: VehicleState, vehicle: VehicleInfo): VehicleState {
        return {
            ...state,
            vehicle
        };
    }

    replaceVehicleInfoFromForm(state: VehicleState, info: VehicleInfoFormModel): VehicleState {
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

    replaceSeller(state: VehicleState, seller: Trade): VehicleState {
        return {
            ...state,
            vehicle: {
                ...state.vehicle,
                seller
            }
        }
    }

    replaceBuyer(state: VehicleState, buyer: Trade): VehicleState {
        return {
            ...state,
            vehicle: {
                ...state.vehicle,
                buyer
            }
        }
    }

    replaceLoading(state: VehicleState, loading: boolean): VehicleState {
        return {
            ...state,
            loading
        };
    }
}

export const vehicleStateFns = new VehicleStateFns();
