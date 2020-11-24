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

import {forEach, isEmpty, isPlainObject, PlainObject} from '@labor-digital/helferlein';

/**
 * Merges the props given to the view component into the props of the
 * implementation object. However, empty props of the view component will be ignored
 * and filled with the props of the parent
 *
 * @param parentProps
 * @param localProps
 */
function mergeProps(parentProps: PlainObject, localProps: PlainObject)
{
    const props = {...parentProps};
    forEach(localProps, (v, k) => {
        if (!isEmpty(v) || isEmpty(parentProps[k])) {
            props[k] = v;
        }
    });
    return props;
}

/**
 * Helper to inherit the template props but without any required properties ->
 * If there is a missing property the real template component will still throw an error
 * but we, as a proxy should not
 * @param template
 */
function makeLocalProps(template)
{
    if (!isPlainObject(template.props)) {
        return {};
    }
    const localProps = {};
    forEach(template.props, (v, k) => {
        if (isPlainObject(v) && v.required) {
            v = {...v};
            v.required = false;
        }
        localProps[k] = v;
    });
    return localProps;
}

/**
 * Used to provide the View component definition on an abstract.
 * @param template The template component that should be wrapped with the props of it's parent
 * @param alternativeParent By default the generated component will inherit the context
 * from it's direct parent. You can use the second parameter to inject a different parent/context if required.
 */
export default function (template, alternativeParent?: PlainObject) {

    return {
        functional: true,
        inheritAttrs: false,
        props: makeLocalProps(template),
        render(h, ctx)
        {
            let parent = alternativeParent ?? ctx.parent;
            return h(template, {
                ref: 'view',
                ...ctx.data,
                on: {...ctx.listeners, ...parent.$listeners},
                props: mergeProps(parent.$props, ctx.props),
                scopedSlots: {...ctx.scopedSlots, ...parent.$scopedSlots}
            }, [parent.children ?? ctx.slots().default]);
        }
    };
};
