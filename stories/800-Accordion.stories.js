/*
 * Copyright 2020 LABOR.digital
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Last modified: 2020.04.27 at 15:43
 */

import {boolean, object, text, withKnobs} from '@storybook/addon-knobs';
import BaseAccordion from '../src/Components/BaseAccordion/BaseAccordion.vue';
import '../src/Components/SelectBox/Storybook.sass';

// Global configuration of your component
export default {
    title: 'BaseAccordion',
    component: BaseAccordion,
    decorators: [withKnobs]
};

// Create the stories
export const Default = () => {
    return (
        {
            components: {BaseAccordion},
            template: `
                <div>
                    <base-accordion :items="items" :open-multiple="openMultiple" :item-label="itemLabel">
                        <template :slot="items[0].label">
                            <div style="padding-bottom: 30px">HALLO FOO</div>
                        </template>
                        <template :slot="items[1]">
                            <div style="padding-bottom: 30px">HALLO BAR</div>
                        </template>
                    </base-accordion>
                </div>`,
            props: {
                items: {
                    default: object('Input', [
                        {
                            'label': 'Acc Title 1'
                        },
                        'Acc Title 2'
                    ])
                },
                openMultiple: {
                    default: () => boolean('Multiple?', false)
                },
                itemLabel: {
                    default: () => text('key from array for label', 'label')
                }
            },
            data()
            {
                return {
                    v: []
                };
            }
        }
    );
};
