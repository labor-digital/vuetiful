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
 * Last modified: 2020.11.12 at 13:30
 */

import {PlainObject} from '@labor-digital/helferlein/lib/Interfaces/PlainObject';
import {ReactiveMap} from '../../Utils/ReactiveMap';
import {ReactiveSet} from '../../Utils/ReactiveSet';

export class AccordionApi
{
    protected _parent: PlainObject;

    constructor(parent: PlainObject)
    {
        this._parent = parent;
    }

    /**
     * Returns the unique identifier of this accordion
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
        return this.openItems.has(identifier);
    }

    /**
     * Sets the item with the given identifier as open
     */
    public openItem(identifier: string): void
    {
        this._parent.openItem(identifier);
    }

    /**
     * Sets the item with the given identifier as closed
     */
    public closeItem(identifier: string): void
    {
        this._parent.closeItem(identifier);
    }

    /**
     * Registers a new item to be watched by this element
     */
    public registerItem(identifier: string, instance: PlainObject, disabled: boolean): void
    {
        this.registeredItems.add(identifier);
        this.itemInstances.set(identifier, instance);
        if (disabled) {
            this.disabledItems.add(identifier);
        }
    }

    /**
     * Removes an item from the list of watched elements
     */
    public removeItem(identifier: string): void
    {
        this.closeItem(identifier);
        this.registeredItems.delete(identifier);
        this.itemInstances.delete(identifier);
    }

    /**
     * Allows the children to set their current disabled state
     * @param identifier
     * @param disabled
     */
    public updateItem(identifier: string, disabled: boolean): void
    {
        if (disabled) {
            this.disabledItems.add(identifier);
            this._parent.forceValidValue();
        } else {
            this.disabledItems.delete(identifier);
        }
    }


    /**
     * Allows the child components to emit an event on the parent object
     */
    public emit(a, b, c, d): void
    {
        this._parent.$emit(a, b, c, d);
    }

    /**
     * Legacy support to pass the legacy container classes to the child elements
     * @deprecated
     */
    public legacyContainerClasses(): PlainObject
    {
        return this._parent.givenContainerClasses;
    }

    protected get itemInstances(): ReactiveMap<string, PlainObject>
    {
        return this._parent.itemInstances;
    }

    protected get registeredItems(): ReactiveSet<string>
    {
        return this._parent.registeredItems;
    }

    protected get disabledItems(): ReactiveSet<string>
    {
        return this._parent.disabledItems;
    }

    protected get openItems(): ReactiveSet<string>
    {
        return this._parent.openItems;
    }
}
