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
  - Last modified: 2020.11.05 at 21:52
  -->
<script lang="ts">
export default {
    name: "Item",
    isVuetifulItem: true,
    props: {
        /**
         * A generic label for an accordion, tab or chip
         */
        label: {
            type: String,
            required: true,
            default: ""
        },
        /**
         * Allows you to specify a unique id/key for this item.
         * This can be used in the parent to do stuff with this specific item.
         * You may open a tab programmatically or select a chip...
         */
        id: {
            type: [String, Number],
            default: null
        }
    },
    render() {
        return this.$slots.default;
    },
    computed: {
        isVuetifulItem(): boolean {
            return true;
        }
    }
};
</script>

<style scoped lang="sass"></style>
