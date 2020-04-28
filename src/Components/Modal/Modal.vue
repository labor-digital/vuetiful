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
  - Last modified: 2020.04.21 at 13:20
  -->

<template>
	<transition name="fade" @after-leave="onCloseComplete">
		<div class="modal" v-if="value" @click="close" :class="classes">
			<!-- @slot The outer wrap around both background and scroll wrapper -->
			<slot name="outer-wrap">
				<!-- @slot The template of the modal backdrop -->
				<slot name="background">
					<div class="modal__background"></div>
				</slot>
				<div class="modal__scrollWrapper">
					<!-- @slot The wrapper around the modal content container -->
					<slot name="content-wrap">
						<div class="modal__content" @click.stop role="dialog" aria-modal="true">
							<!-- @slot The template of the content container's children -->
							<slot name="content">
								<div class="modal__close" @click="close">
									<!-- @slot The Icon to close the modal -->
									<slot name="close-icon-wrap">
										<div class="modal__closeIcon">
											<a href="#close" @click.prevent.stop="close">
												<!-- @slot The Icon to close the modal -->
												<slot name="close-icon">X</slot>
											</a>
										</div>
									</slot>
								</div>
								<!-- @slot The main content of the modal -->
								<slot></slot>
							</slot>
						</div>
					</slot>
				</div>
			</slot>
		</div>
	</transition>
</template>

<script lang="ts">
	import {ComponentProxy} from "@labor-digital/helferlein/lib/Entities/ComponentProxy";
	import {stopBodyScrolling} from "@labor-digital/helferlein/lib/Ui/stopBodyScrolling";
	
	/**
	 * A simple modal component, nothing more - nothing less
	 *
	 * There are additional SASS variables you can use to modify the sizes and paddings of the modal
	 */
	export default {
		name: "Modal",
		props: {
			/**
			 * Defines if the modal is currently open (TRUE) or not (FALSE)
			 * You can use this as v-model to open and close the modal for your component
			 */
			value: {
				type: Boolean,
				default: true
			},
			/**
			 * Set this to true to open a smaller version of the modal
			 * You can use the $modal-small-... sass variables to modify the size of the small version
			 */
			isSmall: {
				type: Boolean,
				default: false
			},
			/**
			 * By default the modal is attached to the top of the screen
			 * If you set this to TRUE the modal will be vertically centered on the screen
			 */
			isVerticallyCentered: {
				type: Boolean,
				default: false
			},
			/**
			 * Additional attributes to add to the modal container
			 * NOTE: "class" will not work here, as we bind the prop internally
			 */
			additionalModalAttr: {
				type: Object,
				default: () => {
				}
			}
		},
		data() {
			return {
				proxy: new ComponentProxy(this)
			};
		},
		computed: {
			classes() {
				return {
					"modal--small": this.isSmall,
					"modal--centerV": this.isVerticallyCentered
				};
			}
		},
		methods: {
			open() {
				if (this.value) return;
				stopBodyScrolling(true);
				this.proxy.bind(document, "keydown", this.onKeyDown);
				this.$emit("input", true);
			},
			close() {
				if (!this.value) return;
				this.proxy.unbind(document, "keydown", this.onKeyDown);
				this.$emit("input", false);
			},
			onCloseComplete() {
				stopBodyScrolling(false);
			},
			onKeyDown(e: KeyboardEvent) {
				if (e.key === "Escape") this.close();
			}
		},
		watch: {
			value(value) {
				if (value !== true) return;
				this.open();
			}
		},
		beforeMount() {
			if (this.value) this.open();
		},
		beforeDestroy(): void {
			this.proxy.destroy();
		}
	};
</script>

<style scoped lang="sass" src="./Modal.sass"></style>