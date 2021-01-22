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
 * Last modified: 2021.01.22 at 18:04
 */

import {ComponentProxy} from '@labor-digital/helferlein';
import {Component, Vue} from 'vue-property-decorator';

@Component
export class ProxyAwareMixin extends Vue
{
    /**
     * Holds the created reference to the component proxy
     * @protected
     */
    protected xElProxy: ComponentProxy = null;

    /**
     * Returns either the existing component proxy instance or a new once
     */
    public get proxy(): ComponentProxy
    {
        if (!this.xElProxy) {
            this.xElProxy = new ComponentProxy(this);
        }
        return this.xElProxy;
    }

    public beforeDestroy()
    {
        if (this.xElProxy) {
            this.xElProxy.destroy();
        }
    }
}
