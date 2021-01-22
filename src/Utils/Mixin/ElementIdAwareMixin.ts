/*
 * Copyright 2021 LABOR.digital
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
 * Last modified: 2021.01.22 at 17:53
 */

import {Component, Vue} from 'vue-property-decorator';
import {resolveId} from '../resolveId';

@Component
export class ElementIdAwareMixin extends Vue
{
    /**
     * Stores the unique id of this element
     */
    protected xElId: string = '';

    /**
     * Updates the unique id of this element
     */
    public set id(v)
    {
        this.xElId = v;
    }

    /**
     * Returns the unique id of this element.
     * An id is automatically created if none is set, yet.
     */
    public get id(): string
    {
        if (this.xElId === '') {
            this.xElId = resolveId(this);
        }

        return this.xElId;
    }
}
