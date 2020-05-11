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
  - Last modified: 2020.05.10 at 19:50
  -->

<template>
	<div class="chips">
		<chip v-for="(item, index) in value" class="chips__item" :key="item" :item="item" @remove.stop="removeChip(item)">
			{{item}}
		</chip>
	</div>
</template>

<script lang="ts">
	import Chip from "./Chip.vue";
	
	export default {
		name: "Chips",
		components: {Chip},
		props: {
			value: Array
		},
		methods: {
			removeChip(item) {
				const index = this.value.indexOf(item);
				this.value.splice(index, 1);
				this.$emit("input", this.value);
				this.$emit("remove-chip", item, index);
			}
		}
	};
</script>

<style scoped lang="sass"></style>