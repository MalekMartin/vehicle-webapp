import { Vehicle } from '../../../vehicles/vehicle-stream/vehicle';

export class VehicleStreamState {
    loading = false;
    vehicles = null as Vehicle[];
}

class VehicleStreamStateFns {
    replaceVehicles(state: VehicleStreamState, vehicles: Vehicle[]): VehicleStreamState {
        return {
            ...state,
            vehicles
        };
    }

    replaceLoading(state: VehicleStreamState, loading: boolean): VehicleStreamState {
        return {
            ...state,
            loading
        };
    }

    addVehicle(state: VehicleStreamState, vehicle: Vehicle): VehicleStreamState {
        return {
            ...state,
            vehicles: state.vehicles ? [...state.vehicles, vehicle] : [vehicle]
        };
    }

    removeVehicle(state: VehicleStreamState, vehicleId: string): VehicleStreamState {
        return {
            ...state,
            vehicles: state.vehicles.filter(v => {
                return v.id !== vehicleId;
            })
        };
    }

    updateVehicle(state: VehicleStreamState, vehicle: Vehicle): VehicleStreamState {
        return {
            ...state,
            vehicles: state.vehicles.map(v => {
                return v.id === vehicle.id ? vehicle : v;
            })
        };
    }
}

export const vehicleStreamStateFns = new VehicleStreamStateFns();
