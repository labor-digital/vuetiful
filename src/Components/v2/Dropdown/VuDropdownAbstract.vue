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
import {ComponentProxy, forEach, isNull, PlainObject} from '@labor-digital/helferlein';
import {Component, Inject, Prop, Vue, Watch} from 'vue-property-decorator';
import {ReactiveMap} from '../../../Utils/ReactiveMap';
import {ReactiveSet} from '../../../Utils/ReactiveSet';
import {resolveId} from '../../../Utils/resolveId';
import templateFactory from '../../../Utils/templateFactory';
import {VuDropdownApi} from './VuDropdownApi';
import VuDropdownTemplate from './VuDropdownTemplate.vue';

/**
 * Allows the communication between all dropdowns in the current instance
 */
const vuDropdownBus = new ReactiveMap<string, Function>();

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
    @Inject({from: 'dropdownApi', default: null})
    readonly parent: VuDropdownApi;

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
    @Prop({type: [Boolean], default: null})
    readonly value: boolean | null;

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
     * By default the dropdown will close all other dropdowns if it is opened.
     * If you set this to true, this dropdown won't notify the other dropdowns if it was opened
     */
    @Prop({type: Boolean, default: false})
    readonly keepOthersOpenWhenOpened: boolean;

    /**
     * By default the dropdown will be closed when another dropdown is opened.
     * If you set this to true, this dropdown will ignore if another dropdown was opened.
     */
    @Prop({type: Boolean, default: false})
    readonly stayOpenWhenOtherOpens: boolean;

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
     * The list of related dropdowns that should be ignored on the global close event
     * This is only used if you work with nested dropdowns
     */
    public related: ReactiveSet<string>;

    /**
     * The list of child dropdowns that should be closed if this dropdown is closed itself
     */
    public children: ReactiveSet<string> = new ReactiveSet<string>();

    /**
     * Providing v-model is optional, if it is not set we use this as internal state handler
     */
    protected fallbackValue: boolean = false;

    /**
     * Returns true if the dropdown is currently open, false if not
     * @api
     */
    get isOpen(): boolean
    {
        return !isNull(this.value) ? this.value === true : this.fallbackValue === true;
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
     * Returns true if the dropdown is placed inside another dropdown
     * @api
     */
    get isNested(): boolean
    {
        return !!this.parent;
    }

    /**
     * Closes the dropdown
     * @api
     */
    public close()
    {
        if (this.isOpen) {
            this.fallbackValue = false;
            this.$emit('input', false);
            this.$emit('close');
            this.focusedItem = null;

            // Close all children
            forEach(this.children, childId => {
                if (vuDropdownBus.has(childId)) {
                    vuDropdownBus.get(childId)();
                }
            });
        }
    }

    /**
     * Opens the dropdown
     * NOTE: You can still open the dropdown through te api even if it is disabled!
     * @api
     */
    public open()
    {
        if (!this.isOpen) {
            this.fallbackValue = true;
            this.$emit('input', true);
            this.$emit('open');

            // Close other dropdowns
            if (!this.keepOthersOpenWhenOpened) {
                forEach(vuDropdownBus, (closer, id) => {
                    if (!this.related.has(id)) {
                        closer();
                    }
                });
            }
        }
    }

    public mounted()
    {
        this.proxy.bind(document, 'click', () => {
            if (this.listenForGlobalEvents) {
                this.close();
            }
        });
    }

    public created()
    {
        // Handle children an parent relations
        if (this.isNested) {
            this.related = this.parent.related;
            this.parent.children.add(this.id);
        } else {
            this.related = new ReactiveSet<string>();
        }
        this.related.add(this.id);

        // Register us for the global state management
        vuDropdownBus.set(this.id, () => {
            if (!this.stayOpenWhenOtherOpens) {
                this.close();
            }
        });
    }

    public beforeDestroy()
    {
        vuDropdownBus.delete(this.id);
        this.related.delete(this.id);
        if (this.isNested) {
            this.parent.children.delete(this.id);
        }
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

