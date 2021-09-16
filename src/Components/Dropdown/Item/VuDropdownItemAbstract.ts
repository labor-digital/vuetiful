import type {PlainObject} from '@labor-digital/helferlein';
import type {ComponentOptions} from 'vue';
import {Component, Inject, Mixins, Prop, Vue} from 'vue-property-decorator';
import {ElementIdAwareMixin} from '../../../Utils/Mixin/ElementIdAwareMixin';
import templateFactory from '../../../Utils/templateFactory';
// import VuLinkTag from '../../LinkTag/VuLinkTag.vue';
import type {VuDropdownApi} from '../VuDropdownApi';
import VuDropdownItemTemplate from './VuDropdownItemTemplate.vue';

@Component({
    name: 'VuDropdownItemAbstract',
    components: {
        VuTemplate: templateFactory(VuDropdownItemTemplate)
    }
})
export default class VuDropdownItemAbstract extends Mixins(ElementIdAwareMixin)
{
    @Inject({from: 'dropdownApi'})
    readonly api!: VuDropdownApi;

    /**
     * Defines the type of element to render
     */
    @Prop({
        type: String,
        default: 'default',
        validator(value: any): boolean
        {
            return ['default', 'text', 'header', 'line'].indexOf(value) !== -1;
        }
    })
    readonly type!: 'default' | 'text' | 'header' | 'line';

    /**
     * Allows you to override the VuLinkTag component which is used for the dropdown item body
     */
    @Prop({type: [Object, String], default: () => {}})
    readonly linkComponent!: ComponentOptions<Vue>;

    /**
     * Allows you to add additional props to be passed to the link component
     */
    @Prop({type: Object, default: () => ({})})
    readonly linkComponentProps!: PlainObject;

    /**
     * Can be a link if you want to open a certain url when the user clicks on the item
     */
    @Prop({type: String, default: ''})
    readonly link!: string;

    /**
     * If set to true the item will be shown as disabled
     */
    @Prop({type: Boolean, default: false})
    readonly disabled!: boolean;

    public created()
    {
        this.id = this.api.makeItemId(this.id);
        this.api.registerInstance(this.id, this);
    }

    public beforeDestroy()
    {
        this.api.removeInstance(this.id);
    }
}

