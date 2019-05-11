export interface FileApiResponse {
    is_folder: boolean;
    name: string;
}

export interface FolderApiResponse extends FileApiResponse {
    children: (FileApiResponse | FolderApiResponse)[];
    recalculatable: boolean;
}

export interface Region {
    base64: string;
}

export interface Image extends FileApiResponse, Region {
}

export interface ImageFolder extends FileApiResponse {
    children: (ImageFolder | Image)[];
}

export type ImageListItems = (ImageFolder | Image)[];

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

export class Filter {
    search = '';
}
