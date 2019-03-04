import { SettingOption } from './image-settings.interface';

export const researchTypes = {
    SIMILAR: 'similar',
    NN: 'nn',
};

export const researchTypeOptions: SettingOption[] = [
    {
        name: 'Searching Similar Images',
        id: researchTypes.SIMILAR,
    },
    {
        name: 'Cancer Detection (Neural Networks)',
        id: researchTypes.NN,
    },
];