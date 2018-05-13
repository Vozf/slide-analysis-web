import { Component, OnInit } from '@angular/core';
import {
    ImageSettingsOptions, ImageSettingsState, SettingOption,
} from './image-settings.interface';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { researchTypeOptions, researchTypes } from './image-settings.constants';

@Component({
    selector: 'app-image-settings',
    templateUrl: './image-settings.component.html',
    styleUrls: ['./image-settings.component.scss'],
    providers: [],
})
export class ImageSettingsComponent implements OnInit {

    settingsOptions: ImageSettingsOptions;
    settingsState$: BehaviorSubject<ImageSettingsState>;
    readonly researchTypeOptions: SettingOption[] = researchTypeOptions;
    readonly researchTypes = researchTypes;


    constructor(private route: ActivatedRoute,
    ) {
    }

    ngOnInit() {
        this.settingsOptions = this.route.snapshot.data.settingsOptions;
        const { similarImageSettingsOptions: { descriptors: [defaultDescriptor], similarities: [defaultSimilarity] } }
            = this.settingsOptions;

        this.settingsState$ = new BehaviorSubject<ImageSettingsState>({
            type: this.researchTypeOptions[0],
            descriptor: defaultDescriptor,
            similarity: defaultSimilarity,
        });
        console.log(this.settingsState$.getValue());

    }

    filtersChange(filter) {
        this.nextFilters(filters => ({ ...filters, ...filter }));
    }

    private nextFilters(reduce: (filters: ImageSettingsState) => ImageSettingsState) {
        const currentFilters = this.settingsState$.getValue();
        this.settingsState$.next(reduce(currentFilters));
    }


}
