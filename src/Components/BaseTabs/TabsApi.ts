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
 * Last modified: 2020.11.12 at 10:49
 */

import {PlainObject} from '@labor-digital/helferlein';
import {ReactiveMap} from '../../Utils/ReactiveMap';
import {ReactiveSet} from '../../Utils/ReactiveSet';

export class TabsApi
{
    protected _parent: PlainObject;

    constructor(parent: PlainObject)
    {
        this._parent = parent;
    }

    /**
     * Returns the unique identifier of this tab list
     */
    get id(): string
    {
        return this._parent.identifier;
    }

    /**
     * Returns true if the given identifier is registered as "open"
     */
    public isOpen(identifier: string): boolean
    {
        return this._parent.selectedItem === identifier;
    }

    /**
     * Sets the item with the given identifier as open
     */
    public openItem(identifier: string): void
    {
        this._parent.openItem(identifier);
    }

    /**
     * Registers a new item to be watched by this element
     */
    public registerItem(identifier: string, label: string, disabled: boolean): void
    {
        this.registeredItems.set(identifier, label);
        if (disabled) {
            this.disabledItems.add(identifier);
        }
    }

    /**
     * Removes an item from the list of watched elements
     */
    public removeItem(identifier: string): void
    {
        this.registeredItems.delete(identifier);
        this._parent.forceValidValue();
    }

    /**
     * Allows the children to set their current disabled state
     * @param identifier
     * @param disabled
     * @param label
     */
    public updateItem(identifier: string, disabled: boolean, label: string): void
    {
        if (disabled) {
            this.disabledItems.add(identifier);
            this._parent.forceValidValue();
        } else {
            this.disabledItems.delete(identifier);
        }
        this.registeredItems.set(identifier, label);
    }

    protected get disabledItems(): ReactiveSet<string>
    {
        return this._parent.disabledItems;
    }

    protected get registeredItems(): ReactiveMap<string, string>
    {
        return this._parent.registeredItems;
    }
}
