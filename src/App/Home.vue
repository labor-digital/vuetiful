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
  - Last modified: 2020.04.24 at 16:44
  -->

<template>
    <div class="vuetifulHome">
        <h1>Vuetiful - UI Skeletons</h1>
        <div class="container">
            <p>This is a library of Vue.js UI components. Contrary to what you find in most other libraries on the
                interwebs vuetiful aims to be "ugly".</p>
            <p>Wait what? Yes, we want to provide the implementation of components without any unnecessary styling. The
                components are provided as skeletons with only the required
                css you need for them to function. All other theming has to be done by yourself.</p>
            <p>But why? Because for highly customized projects it is always a hassle to use a material/bootstrap library
                and convert the styles to match your designer's layouts.
            </p>
        </div>
        <a href="https://github.com/labor-digital/vuetiful" target="_blank">Find the code on GitHub</a>
    </div>
</template>

<script lang="ts">
export default {
    name: 'Home.vue'
};
</script>

<style scoped lang="sass">
.vuetifulHome
    line-height: 1.4
    font-family: "Helvetica Neue", Helvetica, "Segoe UI", Arial, freesans, sans-serif

    .container
        max-width: 600px

    a
        color: #1e3c5a
        text-decoration: none
</style>
