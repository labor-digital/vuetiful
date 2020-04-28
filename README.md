# Vuetiful - Vue UI Component Skeletons
This is a library of Vue.js UI components. Contrary to what you find in most other libraries on the interwebs vuetiful aims to be "ugly". Wait what? Yes, we want to provide the implementation of components without any unnecessary styling. The components are provided as skeletons with only the required css you need for them to function. All other theming has to be done by yourself. But why? Because for highly customized projects it is always a hassle to use a material/bootstrap library and convert the styles to match your designer's layouts.

## Documentation
We provide a complete documentation of all components in our [storybook online](http://vuetiful.labor.tools/).

## Usage and installation
We don't provide a pre-build version of the components but the sources as .vue files. This means your asset-building setup (probably webpack) should be able to process single-file components, as well as SASS files.
For server side rendering make sure you don't exclude the source files using the "webpack-node-externals" plugin. 

**Shameless self promotion: we have an easy to use [webpack asset-builder setup](https://github.com/labor-digital/asset-building) you can use with almost zero configuration**

* Install the npm dependency:
```
npm install --save-dev @labor-digital/vuetiful
```
* Create a new project specific component like "ProjectSelectBox.vue"
* For a simple adjustment of the styles you can just extend the base component like:
```vue
<script lang="ts">
	import BaseSelectBox from "@labor-digital/vuetiful/src/Components/SelectBox/SelectBox.vue";
	export default {
		name: "ProjectSelectBox",
		extends: BaseSelectBox
	};
</script>

<style scoped lang="sass">
// Your styles go here...
</style>
```
* If you want to modify a slot/the template or add custom behaviour you have to adjust file like so:
```vue
<template>

	<!-- Note how we bind this.$props to pass our child props to the parent.
		 You can also bind additional event listeners or static props -->
	<BaseSelectBox v-bind="this.$props" @click.native="onClick" data-foo-bar="asdf">
		<!-- Overwrite the template of a single slot like so: -->
		<template v-slot:input-end>
			After your input
		</template>
	</BaseSelectBox>
</template>

<script lang="ts">
	import BaseSelectBox from "@labor-digital/vuetiful/src/Components/SelectBox/SelectBox.vue";
	export default {
		name: "ProjectButton",
		// Note how e use the base component as a base template while, at the same time
		// extending its functionality
		components: {BaseSelectBox},
		// Register your custom props
		props: {
			yourProp: String
		},
		extends: BaseSelectBox,
		methods: {
			onClick() {
				console.log("THIS CLICK", this.$props);
			}
		}
	};
</script>

<style scoped lang="sass">
// Your styles go here...
</style>
```

## Other open source components
This package does not only contain components written by us but also components
we found online over the course of the last years. All components we use are included via npm but adjusted in some way or another to fit the other components in this package.

Included external packages are:

- SelectBox: uses [vue-cool-select](https://github.com/iliyaZelenko/vue-cool-select) as a base implementation

**If you like their implementation make sure to give them a star on github!**

## Postcardware

You're free to use this package, but if it makes it to your production environment, we highly appreciate you sending us a postcard from your hometown, mentioning which of our package(s) you are using.

Our address is: LABOR.digital - Fischtorplatz 21 - 55116 Mainz, Germany.

We publish all received postcards on our [company website](https://labor.digital). 
