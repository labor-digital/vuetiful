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
  - Last modified: 2020.11.19 at 22:30
  -->

<template></template>

<script lang="ts">
import {filter, isEmpty, isFunction, isNumber, isNumeric, isString, isUndefined, PlainObject} from '@labor-digital/helferlein';
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
import {resolveId} from '../../../Utils/resolveId';
import templateFactory from '../../../Utils/templateFactory';
import {FormInputFormatter, FormInputValidator, FormInputValueType, FormInputValueUpdateType} from './VuFormInput.interfaces';
import VuFormInputTemplate from './VuFormInputTemplate.vue';


@Component({
    name: 'VuFormInput',
    props: {
        // Props that have to be passed through to the real "input" field instead of the wrapper
        accept: null,
        alt: null,
        autofocus: null,
        autocomplete: null,
        form: null,
        formaction: null,
        list: null,
        maxlength: null,
        minlength: null,
        size: null,
        ariaInvalid: null,
        min: null,
        max: null
    },
    components: {
        VuTemplate: templateFactory(VuFormInputTemplate)
    }
})
export default class VuFormInputAbstract extends Vue
{
    readonly min: null | number | string;
    readonly max: null | number | string;
    readonly maxlength: null | number;
    readonly minlength: null | number;

    /**
     * The field defaults to a text input, but you can set the type prop
     * to one of the supported native browser HTML5 types
     */
    @Prop({type: String, default: 'text'})
    readonly type: string;

    /**
     * The field value to be injected via v-model
     */
    @Prop()
    readonly value: number | string | undefined;

    /**
     * This value is used when the field is "cleared".
     * It is set as a default every time the field would otherwise emit an empty value
     */
    @Prop({default: ''})
    readonly defaultValue: number | string | undefined;

    /**
     * If set to true the label will be rendered on the right instead of the left
     */
    @Prop({type: Boolean, default: false})
    readonly labelRight: boolean;

    /**
     * Allows you to provide an aria label for the input field
     */
    @Prop({type: String, default: null})
    readonly ariaLabel: string | null;

    /**
     * Allows you to manually set an error for this field
     */
    @Prop({type: String})
    readonly error: string;

    /**
     * A function that can be used to format the value of the input field.
     * The formatter receives the value and the type that lead to it's execution.
     * There are possible types:
     * - create: called once, when the input field is created
     * - input: called every time the input event is fired
     * - focus: called on focus of the field
     * - blur: called when the focus of the field was lost
     */
    @Prop({type: Function})
    readonly formatter: FormInputFormatter;

    /**
     * A function to validate the value of the input field.
     * The function should either return TRUE if the value is correct or a string defining the error message
     * It is overwritten by the "error" prop, because it forces the error state.
     * The validator receives the value and the type that lead to it's execution.
     * There are possible types:
     * - create: called once, when the input field is created
     * - input: called every time the input event is fired
     * - focus: called on focus of the field
     * - blur: called when the focus of the field was lost
     */
    @Prop({type: Function})
    readonly validator: FormInputValidator;

    /**
     * Allows you to modify the label that is shown when the validator did not return TRUE but also no
     * string value bug instead false
     */
    @Prop({type: String, default: 'This value is invalid'})
    readonly validatorFailedLabel: string;

    /**
     * Allows the translation of the label which is used on the clear field
     */
    @Prop({type: String, default: 'Clear field'})
    readonly ariaClearLabel: string;

    /**
     * If this flag is set to true, the field will be marked as disabled
     */
    @Prop({type: Boolean, default: false})
    readonly disabled: boolean;

    /**
     * A placeholder value to be shown in the field as long as no actual value was given
     */
    @Prop({type: String, default: null})
    readonly placeholder: string;

    /**
     * If this flag is set to true, the "clear" icon will not be shown
     */
    @Prop({type: Boolean, default: false})
    readonly noClear: boolean;

    /**
     * If this flag is set to true, the field is marked as read only.
     * NOTE: This will also disable all input events coming from the element
     */
    @Prop({type: Boolean, default: false})
    readonly readOnly: boolean;

    /**
     * If set to true the field will be shown as required
     */
    @Prop({type: Boolean, default: false})
    readonly required: boolean;

    /**
     * This field supports debouncing user input, updating the v-model after a period of
     * idle time from when the last character was entered by the user (or a change event occurs).
     * If the user enters a new character (or deletes characters) before the idle timeout expires,
     * the timeout is re-started.
     *
     * To enable debouncing, set the prop debounce to any integer greater than zero.
     * The value is specified in milliseconds. Setting debounce to 0 will disable debouncing.
     */
    @Prop({type: Number, default: 0})
    readonly debounce: number;

    /**
     * The unique id of this element
     */
    public id = resolveId(this);

    /**
     * True as long as the error prop contains something
     */
    protected hasError: boolean = false;

    /**
     * Contains true if the validator returned true, false if not
     */
    protected validationState: boolean = true;

    /**
     * Contains the error message from the validator if there was one
     */
    protected validationError: string = '';

    /**
     * Contains the debounce handler that is currently waiting for it's execution
     */
    protected debounceHandler: Function | any;

    /**
     * Contains the currently waiting debounce handler id to kill the timeout again
     */
    protected debounceTimeout: 0;

    /**
     * This property is true when the validator returned TRUE and therefore the value is valid
     * @api
     * @public
     */
    get isValid(): boolean
    {
        if (this.hasError) {
            return false;
        }
        return this.validationState;
    }

    /**
     * @internal returns the attributes that must be placed on the input field itself
     */
    public get _inputFieldAttr(): PlainObject
    {
        const allowedAttrs = [
            'accept', 'alt', 'autofocus', 'autocomplete', 'form', 'formaction',
            'list', 'maxlength', 'minlength', 'size', 'ariaLabel', 'ariaInvalid',
            'min', 'max'
        ];
        return filter(this.$props, (v, k) => allowedAttrs.indexOf(k) !== -1);
    }

    /**
     * @internal helper to retrieve the correct error message
     */
    public get _error(): string | null
    {
        if (this.hasError) {
            return this.error;
        }
        if (!this.validationState) {
            return this.validationError;
        }

        return null;
    }

    /**
     * @internal value proxy
     */
    public get _value(): string
    {
        return isEmpty(this.value) ? '' : this.value + '';
    }

    /**
     * @internal value proxy
     */
    public set _value(v)
    {
        if (this.debounce > 0 && v !== null) {
            clearTimeout(this.debounceTimeout);
            this.debounceHandler = () => this.setValue(v, 'input');
            this.debounceTimeout = setTimeout(this.debounceHandler, this.debounce) as any;
        } else {
            this.setValue(v, 'input');
        }
    }

    /**
     * Internal helper to trigger a value update from the template
     * @internal
     */
    public _triggerProcessing(type: FormInputValueUpdateType): void
    {
        if (type === 'blur' && isFunction(this.debounceHandler)) {
            this.destroyDebounce();
        } else {
            this.setValue(this._value, type);
        }
    }

    /**
     * Internal helper to format, validate and update the value
     * @param v
     * @param type
     * @protected
     */
    protected setValue(v: FormInputValueType, type: FormInputValueUpdateType): void
    {
        // Set default min value if needed
        // We don't set the default on an input event -> This gives the user the chance to
        // clear the field and change the value
        if (isEmpty(v) && type !== 'input' || v === null) {
            let empty = '';
            switch (this.type) {
                case 'number':
                case 'range':
                    empty = isNumeric(this.min) ? this.min + '' : '0';
                    break;
            }
            v = empty;
        }

        // Apply field type validations
        if (this.type === 'range' || this.type === 'number' && (!isUndefined(this.min) || !isUndefined(this.max))) {
            const min = parseInt((this.min ?? '0') + '');
            const max = parseInt((this.max ?? '100') + '');
            const number = isNumber(v) ? (v as number) : parseFloat(v + '');
            v = Math.max(min, Math.min(max, isNaN(number) ? 0 : number));
        }

        // Validate the value
        if (isFunction(this.validator)) {
            const validatorResult = this.validator(v, type);
            const validatorResultIsString = isString(validatorResult);
            if (isString(validatorResult) || validatorResult !== true) {
                this.validationState = false;
                this.validationError = validatorResultIsString ? validatorResult as string : this.validatorFailedLabel;
            } else {
                this.validationState = true;
                this.validationError = '';
            }
        }

        // Format the value
        if (isFunction(this.formatter)) {
            v = this.formatter(v, type);
        }

        // Tell the world
        if (v !== this.value) {
            this.$emit('input', v);
        }
    }

    /**
     * Makes sure that all debounce related information is cleared
     * And the real value is emitted immediately
     */
    protected destroyDebounce(): void
    {
        if (isFunction(this.debounceHandler)) {
            clearTimeout(this.debounceTimeout);
            this.debounceHandler();
            this.debounceHandler = null;
        }
    }

    public mounted()
    {
        this._triggerProcessing('create');
    };

    public beforeDestroy()
    {
        this.destroyDebounce();
    }

    /**
     * Watch the error prop and update the local error flag
     * @param n
     * @protected
     */
    @Watch('error')
    protected watchError(n)
    {
        this.hasError = !isEmpty(n);
    }

    /**
     * Destroy the debounce handler when the debounce value was changed
     * @protected
     */
    @Watch('debounce')
    protected watchDebounce()
    {
        this.destroyDebounce();
    }

    /**
     * Kill the current debounce -> value was changed
     * @protected
     */
    @Watch('value')
    protected watchValue()
    {
        // Don't destroy the debounce but stop it's execution,
        // the value probably changed from the outside if this is somehow relevant,
        // therefore we just drop our internal value and accept the given one.
        clearTimeout(this.debounceTimeout);
    }

}
</script>
