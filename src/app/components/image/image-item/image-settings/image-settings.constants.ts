import { SettingOption } from './image-settings.interface';

export const researchTypes = {
    SIMILAR: 'similar',
    NN: 'nn',
};

export const researchTypeOptions: SettingOption[] = [
    {
        name: 'Similar Images',
        id: researchTypes.SIMILAR,
    },
    {
        name: 'Neural Networks Evaluate',
        id: researchTypes.NN,
    },
];