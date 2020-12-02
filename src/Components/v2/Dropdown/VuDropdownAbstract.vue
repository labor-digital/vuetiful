<!--
  - Copyright 2020 LABOR.digital
  -
  - Licensed under the Apache License, Version 2.0 (the "License");
  - you may not use this file except in compliance with the License.
  - You may obtain a copy of the License at
  -
  -     http://www.apache.org/licenses/LICENSE-2.0
  -
  - Unless required by applicable law or agreed to in writing, software
  - distributed under the License is distributed on an "AS IS" BASIS,
  - WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  - See the License for the specific language governing permissions and
  - limitations under the License.
  -
  - Last modified: 2020.11.23 at 00:54
  -->

<template></template>

<script lang="ts">
import {ComponentProxy, PlainObject} from '@labor-digital/helferlein';
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
import {resolveId} from '../../../Utils/resolveId';
import templateFactory from '../../../Utils/templateFactory';
import {VuDropdownApi} from './VuDropdownApi';
import VuDropdownTemplate from './VuDropdownTemplate.vue';

@Component({
    name: 'VuDropdownItemAbstract',
    components: {
        VuTemplate: templateFactory(VuDropdownTemplate)
    },
    provide()
    {
        return {
            dropdownApi: new VuDropdownApi(this)
        };
    }
})
export default class VuDropdownAbstract extends Vue
{
    /**
     * Allows you to define a custom "type" of this dropdown.
     * This is useful if you want to specify multiple dropdown types in your css
     * as for the given type a css class like vuDropdown--$TYPE is added to the element
     */
    @Prop({type: String, default: 'default'})
    readonly type: string;

    /**
     * Allows to be bound via v-model to toggle the dropdown from the outside
     */
    @Prop({type: Boolean, default: false})
    readonly value: boolean;

    /**
     * If this property is set, the dropdown will be rendered as "block" instead of an "inline-block"
     */
    @Prop({type: Boolean, default: false})
    readonly asBlock: boolean;

    /**
     * By default the dropdown will get the role: "menu" and the items the role "presentation".
     * If you set this to true the dropdown will get the role: "listbox" and "option" for a single item
     */
    @Prop({type: Boolean, default: false})
    readonly asListBox: boolean;

    /**
     * By default the dropdown will use itself as "size" reference when being opened, meaning
     * it will pop above or below its own container.
     * If something was set to the "trigger" slot, the trigger slot content is used as reference instead.
     * As a third option, you can set this to true which tells the dropdown to use its parent element as a reference.
     */
    @Prop({type: Boolean, default: false})
    readonly parentIsReference: boolean;

    /**
     * Defines the direction in which the dropdown should open up
     */
    @Prop({
        type: String, default: 'down', validator(value: any): boolean
        {
            return ['down', 'up', 'left', 'right'].indexOf(value) !== -1;
        }
    })
    readonly direction: 'down' | 'up' | 'left' | 'right';

    /**
     * By default the dropdown will toggle to the opposite direction,
     * if there is not enough space left, if you set this prop to true this feature will be disabled
     */
    @Prop({type: Boolean, default: false})
    readonly noFlip: boolean;

    /**
     * If set to true the item will be shown as disabled
     */
    @Prop({type: Boolean, default: false})
    readonly disabled: boolean;

    /**
     * If you set this to true the dropdown will contain a small "arrow" pointing to the trigger element
     */
    @Prop({type: Boolean, default: false})
    readonly withArrow: boolean;

    /**
     * This describes the area that the element will be checked for overflow relative to.
     */
    @Prop({
        type: String, default: 'scrollParent', validator(value: any): boolean
        {
            return ['scrollParent', 'window', 'viewport'].indexOf(value) !== -1;
        }
    })
    readonly boundary: string;

    /**
     * Additional/raw options for the popper implementation
     * @see https://popper.js.org/docs/v2/
     */
    @Prop({type: Object, default: () => ({})})
    readonly popperOptions: PlainObject;

    /**
     * The unique id of this element
     */
    public id = resolveId(this);

    /**
     * The event handler proxy
     */
    public proxy = new ComponentProxy(this);

    protected listenForGlobalEvents: boolean = true;
    protected listenForGlobalEventsTimeout: number = 0;

    /**
     * Contains either the value of the currently focused item or null if there is nothing focused
     */
    public focusedItem: string | null = null;

    /**
     * If a trigger element is added, this contains it's id so we can link it for aria
     */
    public triggerId: string = '';

    /**
     * Returns true if the dropdown is currently open, false if not
     * @api
     */
    get isOpen(): boolean
    {
        return this.value === true;
    }

    /**
     * Returns true if the dropdown is disabled
     * @api
     */
    get isDisabled(): boolean
    {
        return this.disabled === true;
    }

    /**
     * Closes the dropdown
     * @api
     */
    public close()
    {
        if (this.isOpen) {
            this.$emit('input', false);
            this.focusedItem = null;
        }
    }

    /**
     * Opens the dropdown
     * NOTE: You can still open the dropdown through te api even if it is disabled!
     * @api
     */
    public open()
    {
        this.$emit('input', true);
    }

    public mounted()
    {
        this.proxy.bind(document, 'click', () => {
            if (this.listenForGlobalEvents) {
                this.close();
            }
        });
    }

    public beforeDestroy()
    {
        this.proxy.destroy();
    }

    @Watch('disabled')
    public watchDisabled(n)
    {
        if (n) {
            this.close();
        }
    }

    @Watch('value')
    public watchValue()
    {
        this.listenForGlobalEvents = false;
        this.proxy.clearTimeout(this.listenForGlobalEventsTimeout);
        this.listenForGlobalEventsTimeout = this.proxy.setTimeout(() => {
            this.listenForGlobalEvents = true;
        }, 250);
    }
}
</script>

