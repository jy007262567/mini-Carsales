export type Vehicle = {
    id: number;
    make: string;
    model: string;
    vehicleTypeId: string;
}


export class VehicleProperty
    {
        id: number;
        vehicleTypeId: number;
        vehiclePropertyName: string;
        vehiclePropertyDataType: string;
    }

export type VehiclePropertyData =
    {
        vehicleId: number;
        vehiclePropertyId: number;
        propertyData: string;
    }

export class VehicleType
    {
        id: number;
        typeName: string;
    }


export class PropertyDataView
    {
        vehicleId: number;
        vehiclePropertyId: number;
        vehiclePropertyName: string;
        vehiclePropertyDataType :string;
        propertyData: string;

    }

export class  VehicleView
    {
        vehicleId: number;
        make: string;
        model: string;
        vehicleTypeId: number;
        typeName: string;
        vehicleDetail: PropertyDataView[];
    }



