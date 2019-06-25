export class SequelLocationUtil {
    static getPoint(lati: number, long: number): GeomPoint {
        return {
            type: 'Point',
            coordinates: [lati, long]
        }
    }
}

export interface GeomPoint {
    type: 'Point';
    coordinates: [number, number]   // [latitude, longitude]
}
