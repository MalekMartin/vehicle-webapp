import { Tire } from '../tires.interface';

export class TiresState {
    tires = null as Tire[];
    loading = false;
}

class TiresStateFns {
    replaceLoading(state: TiresState, loading: boolean): TiresState {
        return {
            ...state,
            loading
        };
    }

    replaceTires(state: TiresState, tires: Tire[]): TiresState {
        return {
            ...state,
            tires
        };
    }

    addTire(state: TiresState, tire: Tire): TiresState {
        return {
            ...state,
            tires: [
                ...state.tires,
                tire
            ]
        };
    }

    updateTire(state: TiresState, tire: Tire): TiresState {
        return {
            ...state,
            tires: state.tires.map(t => {
                return t.id === tire.id
                    ? tire
                    : t;
            })
        };
    }

    deleteTire(state: TiresState, tire: Tire): TiresState {
        return {
            ...state,
            tires: state.tires.filter(t => t.id !== tire.id)
        };
    }
}

export const tiresStateFns = new TiresStateFns();
