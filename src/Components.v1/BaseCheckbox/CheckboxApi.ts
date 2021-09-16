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
 * Last modified: 2020.11.12 at 15:19
 */

import {PlainObject} from '@labor-digital/helferlein/lib/Interfaces/PlainObject';
import {ReactiveSet} from '../../Utils/ReactiveSet';

export class CheckboxApi
{
    protected _parent: PlainObject;

    constructor(parent: PlainObject)
    {
        this._parent = parent;
    }

    /**
     * Provide the group name to the children
     */
    public get name(): string
    {
        return this._parent.name;
    }

    /**
     * Internal api to allow child elements to enable their value
     * @param value
     */
    public enableValue(value): void
    {
        if (this.checked.indexOf(value) === -1) {
            this._parent.$emit('input', [...this.checked, value]);
        }
    }

    /**
     * Internal api to allow child elements to disable their value
     * @param value
     */
    public disableValue(value): void
    {
        if (this.checked.indexOf(value) !== -1) {
            const clone: Array<any> = [...this.checked];
            clone.splice(clone.indexOf(value), 1);
            this._parent.$emit('input', clone);
        }
    }

    /**
     * Internal api to allow child to register their value to the "valid" range
     * @param value
     */
    public registerValue(value): void
    {
        this.values.add(value);
    }

    /**
     * Internal api to allow children to remove their value from the "valid" range
     */
    public removeValue(value): void
    {
        this.values.delete(value);
    }

    /**
     * Internal api to allow child elements to check if their value is currently selected
     * @param value
     */
    public getStateFor(value): boolean
    {
        return this.checked.indexOf(value) !== -1;
    }

    /**
     * Returns true if we tell a child it should disable itself
     */
    public getDisabledStateFor(value): boolean
    {
        return this._parent.isLimitReached && this.checked.indexOf(value) === -1;
    }

    /**
     * Internal api to allow children to replace their value with a new one
     */
    public replaceValue(newValue, oldValue): void
    {
        this.values.delete(oldValue);
        this.values.add(newValue);

        if (this.checked.indexOf(oldValue) !== -1) {
            const clone: Array<any> = [...this.checked];
            clone.splice(clone.indexOf(oldValue), 1);
            this._parent.$emit('input', [...clone, newValue]);
        }
    }

    protected get values(): ReactiveSet<string>
    {
        return this._parent.values;
    }

    protected get checked(): Array<string>
    {
        return this._parent.checked;
    }
}
