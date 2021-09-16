import {Component, Inject, Mixins, Prop} from 'vue-property-decorator';
import {ElementIdAwareMixin} from '../../../Utils/Mixin/ElementIdAwareMixin';
import templateFactory from '../../../Utils/templateFactory';
import type {VuDropdownApi} from '../VuDropdownApi';
import VuDropdownTriggerTemplate from './VuDropdownTriggerTemplate.vue';

@Component({
    name: 'VuDropdownTrigger',
    components: {
        VuTemplate: templateFactory(VuDropdownTriggerTemplate)
    }
})
export default class VuDropdownTriggerAbstract extends Mixins(ElementIdAwareMixin)
{
    @Inject({from: 'dropdownApi'})
    readonly api!: VuDropdownApi;

    /**
     * The html tag to render for this trigger
     */
    @Prop({type: String, default: 'a'})
    readonly tag!: string;

    /**
     * Allows you to toggle the linked value
     * @api
     */
    public toggle(): void
    {
        if (!this.api.isDisabled) {
            this.api.toggle();
        }
    }

    public created()
    {
        this.id = this.api.makeItemId(this.id);
        this.api.setTriggerId(this.id);
    }

    public beforeDestroy()
    {
        this.api.setTriggerId('');
    }
}
