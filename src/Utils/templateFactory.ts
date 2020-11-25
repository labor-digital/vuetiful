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
 * Last modified: 2020.11.19 at 12:05
 */

import {filter, isPlainObject, map, PlainObject} from '@labor-digital/helferlein';
import {mergeData} from 'vue-functional-data-merge';

/**
 * Used to provide the View component definition on an abstract.
 * @param template The template component that should be wrapped with the props of it's parent
 * @param alternativeParent By default the generated component will inherit the context
 * from it's direct parent. You can use the second parameter to inject a different parent/context if required.
 */
export default function <T = any>(template: T, alternativeParent?: PlainObject): T {
    return {
        functional: true,
        props: map(isPlainObject((<any>template).props) ? (template as any).props : {}, v => null),
        render(h, ctx)
        {
            const parent = alternativeParent ?? ctx.parent;
            const localData = {
                ref: 'template',
                on: parent.$listeners,
                props: {
                    ...parent.$props,
                    ...filter(ctx.props, v => typeof v !== 'undefined')
                },
                scopedSlots: parent.$scopedSlots
            };
            return h(template, mergeData(ctx.data, localData), [ctx.children]);
        }
    } as any;
};
