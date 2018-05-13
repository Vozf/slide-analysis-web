export interface SettingOption {
    name: string;
    id: string;
}

export interface SimilarImageSettingsOptions {
    descriptors: SettingOption[];
    similarities: SettingOption[];
}

export interface NeuralNetworkEvaluateSettingsOptions {

}

export interface ImageSettingsOptions {
    similarImageSettingsOptions: SimilarImageSettingsOptions;
    neuralNetworkEvaluateSettingsOptions: NeuralNetworkEvaluateSettingsOptions;
}

export interface ImageSettingsState {
    type: SettingOption;
    descriptor: SettingOption;
    similarity: SettingOption;
}