import { Image } from './image.interface';
import { ImageCoordinates } from './image-coordinates.interface';

export interface ImageRegion extends Image {
    coordinates: ImageCoordinates;
}
