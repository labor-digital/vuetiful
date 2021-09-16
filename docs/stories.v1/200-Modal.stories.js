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

import {boolean, button, text, withKnobs} from '@storybook/addon-knobs';
import Vue from 'vue';
import Modal from '../src/Components/Modal/Modal';

// Global configuration of your component
export default {
    title: 'Modal',
    component: Modal,
    decorators: [withKnobs]
};

const bus = Vue.observable({});
Vue.set(bus, 'isOpen', true);

// Create the stories
export const Default = () => {
    return (
        {
            components: {Modal},
            template: `
                <modal v-model="isOpen" :isSmall="isSmall"
                       :isVerticallyCentered='isVerticallyCentered'>
                <span v-html="contentHtml"></span>
                </modal>`,
            data()
            {
                return {
                    isOpen: bus.isOpen
                };
            },
            computed: {
                contentHtml()
                {
                    return this.content.replace(/\r?\n/g, '<br>');
                }
            },
            created()
            {
                this.$watch(() => bus.isOpen, () => this.isOpen = bus.isOpen);
            },
            watch: {
                isOpen(v)
                {
                    if (v === false && bus.isOpen) {
                        bus.isOpen = false;
                    }
                }
            },
            props: {
                open: {
                    default: button('Toggle Modal', () => {
                        Vue.set(bus, 'isOpen', !bus.isOpen);
                    })
                },
                isSmall: {
                    default: boolean('Use Small', false)
                },
                isVerticallyCentered: {
                    default: boolean('Center vertically', false)
                },
                content: {
                    default: text('Content', 'Content of your modal')
                }
            }
        }
    );
};
