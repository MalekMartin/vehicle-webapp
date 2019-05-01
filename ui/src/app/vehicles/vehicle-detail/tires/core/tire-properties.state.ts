import { TireProperty } from '../tires.interface';

export class TirePropertiesState {
    properties = null as TireProperty[];
    loading = false;
}

class TirePropertiesStateFns {
    replaceLoading(state: TirePropertiesState, loading: boolean): TirePropertiesState {
        return {
            ...state,
            loading
        };
    }

    replaceProperties(state: TirePropertiesState, properties: TireProperty[]): TirePropertiesState {
        return {
            ...state,
            properties
        };
    }

    addProperty(state: TirePropertiesState, property: TireProperty): TirePropertiesState {
        return {
            ...state,
            properties: [...state.properties, property]
        };
    }

    updateProperty(state: TirePropertiesState, property: TireProperty): TirePropertiesState {
        return {
            ...state,
            properties: state.properties.map(p => {
                return property.id === p.id ? property : p;
            })
        };
    }

    deleteProperty(state: TirePropertiesState, property: TireProperty): TirePropertiesState {
        return {
            ...state,
            properties: state.properties.filter(p => p.id !== property.id)
        };
    }
}

export const tirePropertiesFns = new TirePropertiesStateFns();
