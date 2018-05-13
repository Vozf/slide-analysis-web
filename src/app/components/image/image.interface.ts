export interface Image {
    name?: string;
    base64: string;
}

export interface ImageCoordinates {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface ImageCoordinatesWithScore extends ImageCoordinates {
    score: number;
}


export interface ImageDimensions {
    x: number;
    y: number;
}

export interface ImageRegion extends Image {
    coordinates: ImageCoordinates;
}

export interface ImageRegionWithScore extends Image {
    coordinates: ImageCoordinatesWithScore;
}
