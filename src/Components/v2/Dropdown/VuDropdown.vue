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
  - Last modified: 2020.11.23 at 00:49
  -->

<template>
    <VuTemplate/>
</template>

<script lang="ts">
import VuDropdownAbstract from './VuDropdownAbstract.vue';

export * from './VuDropdownApi';
export {default as VuDropdownTemplate} from './VuDropdownTemplate.vue';
export {default as VuDropdownAbstract} from './VuDropdownAbstract.vue';
export {default as VuDropdownItem} from './Item/VuDropdownItem.vue';
export {default as VuDropdownItemAbstract} from './Item/VuDropdownItemAbstract.vue';
export {default as VuDropdownItemTemplate} from './Item/VuDropdownItemTemplate.vue';
export {default as VuDropdownTrigger} from './Trigger/VuDropdownTrigger.vue';
export {default as VuDropdownTriggerAbstract} from './Trigger/VuDropdownTriggerAbstract.vue';
export {default as VuDropdownTriggerTemplate} from './Trigger/VuDropdownTriggerTemplate.vue';

export default {
    name: 'VuDropdown',
    extends: VuDropdownAbstract
};
</script>

<style scoped lang="sass"></style>
