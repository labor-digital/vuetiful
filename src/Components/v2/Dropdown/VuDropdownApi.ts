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
 * Last modified: 2020.11.23 at 01:07
 */
import {AbstractItemApi} from '../../../Utils/AbstractItemApi';
import VuDropdownAbstract from './VuDropdownAbstract.vue';

export class VuDropdownApi extends AbstractItemApi
{
    protected parent: VuDropdownAbstract;
    protected blurTimeout = 0;

    constructor(parent: VuDropdownAbstract)
    {
        super();
        this.parent = parent;
    }

    /**
     * Returns true if the element should be rendered as list box
     */
    public get isListBox(): boolean
    {
        return this.parent.asListBox;
    }

    /**
     * True when the dropdown is currently open
     */
    public get isOpen(): boolean
    {
        return this.parent.isOpen;
    }

    /**
     * Returns true if the dropdown element is disabled
     */
    public get isDisabled(): boolean
    {
        return this.parent.isDisabled;
    }

    /**
     * Toggles the dropdown
     */
    public toggle(): void
    {
        if (this.isOpen) {
            this.parent.close();
        } else {
            this.parent.open();
        }
    }

    /**
     * Sets the given item as focused
     * @param id
     */
    public focusItem(id: string): void
    {
        clearTimeout(this.blurTimeout);
        this.parent.focusedItem = id;
    }

    /**
     * Triggers a blur when the focus on a child was lost
     */
    public blurItem(): void
    {
        clearTimeout(this.blurTimeout);
        this.blurTimeout = setTimeout(() => {
            this.parent.close();
        }, 50) as any;
    }

    /**
     * Returns true if the item with the given id is currently focused
     * @param id
     */
    public isItemFocused(id: string): boolean
    {
        return this.parent.focusedItem === id;
    }

    /**
     * Allows the trigger element to provide it's id to the dropdown
     * @param id
     */
    public setTriggerId(id: string): void
    {
        this.parent.triggerId = id;
    }
}
