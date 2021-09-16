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
 * Last modified: 2020.04.24 at 16:54
 */

import {withKnobs} from '@storybook/addon-knobs';
import VuLinkTag from '../../src/Components/LinkTag/VuLinkTag.vue';

// Global configuration of your component
export default {
    title: 'Elements/Link Tag',
    component: VuLinkTag,
    decorators: [withKnobs]
};

// Create the stories
export const Default = () => {
    return (
        {
            components: {VuLinkTag},
            template: `
                <div>
                <pre>Internal links will be dispatched using "router-link" or "nuxt-link" if the </pre>
                <pre>components are available in the current installation.</pre>
                <VuLinkTag link="/foo">Internal Link</VuLinkTag>
                <br>
                <VuLinkTag link="http://example.org">External Link</VuLinkTag>
                <br>
                <VuLinkTag link="0178667885445">Phone Number (Localized)</VuLinkTag>
                <br>
                <VuLinkTag link="+49178667885445">Phone Number (International)</VuLinkTag>
                <br>
                <VuLinkTag link="hello@example.org">Mail address</VuLinkTag>
                <br>
                <VuLinkTag link="https://disabled.org" disabled>Disabled: You can't touch this</VuLinkTag>
                <br>
                <VuLinkTag link="#js-action" @click="onClick" type="js">JS - Pseudo Link</VuLinkTag>
                </div>
            `,
            props: {},
            methods: {
                onClick()
                {
                    alert('You clicked something');
                }
            }
        }
    );
};
