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
 * Last modified: 2020.05.03 at 14:18
 */

export interface CheckboxInputs
{
    
    /*
    * Set label for the checkbox
     */
    label?: string,
    
    /**
     * The internal value to use for this input
     */
    value?: any,
    
    /*
    * hide input for filter list
     */
    show?: {
        type: boolean,
        default: true
    },
    
    /*
    * checks checkbox
     */
    checked?: {
        type: boolean,
        default: false
    },
    
    /*
    * sets required tag for the checkbox
     */
    required?: {
        type: boolean,
        default: false
    },
    
    /*
    * disable the checkbox
     */
    disabled?: {
        type: boolean,
        default: false
    },
    /*
    * error state
     */
    error?: boolean
    
}
