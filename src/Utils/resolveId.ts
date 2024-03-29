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
 * Last modified: 2020.11.20 at 23:23
 */
import {getGuid, inflectToDashed, isString} from '@labor-digital/helferlein';
import Vue from 'vue';
import {ReactiveMap} from './ReactiveMap';

const componentNameCache = new ReactiveMap<string, string>();

/**
 * Resolves a unique id for the given component
 * @param component
 */
export function resolveId(component: Vue): string
{
    let componentName = 'vue-el';
    if (isString(component.$options.name)) {
        componentName = component.$options.name;
        if (!componentNameCache.has(componentName)) {
            componentNameCache.set(componentName, inflectToDashed(componentName));
        }
        componentName = componentNameCache.get(componentName);
    }

    return (component.$attrs.id ?? component.$vnode.key ?? getGuid(componentName + '-')).toString();
}
