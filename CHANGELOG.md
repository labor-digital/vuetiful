# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.37.1](https://github.com/labor-digital/vuetiful/compare/v1.37.0...v1.37.1) (2021-07-29)


### Bug Fixes

* fix operator in string conversion ([80395a5](https://github.com/labor-digital/vuetiful/commit/80395a574237e2c9446ede625ce6bd4b7f890caa))
* update peer dependence ([172cc3d](https://github.com/labor-digital/vuetiful/commit/172cc3d2da2617e558f4ef89ea0d8f8190a656ee))

## [1.37.0](https://github.com/labor-digital/vuetiful/compare/v1.36.4...v1.37.0) (2021-07-29)


### Features

* update dependencies ([8cc9adb](https://github.com/labor-digital/vuetiful/commit/8cc9adb38cf2dfba6a1f62e74699e09b34121503))

### [1.36.4](https://github.com/labor-digital/vuetiful/compare/v1.36.3...v1.36.4) (2021-06-15)


### Bug Fixes

* **FormInput:** replace clear "button" with "a" tag, to avoid issues inside of <form> elements ([df4b609](https://github.com/labor-digital/vuetiful/commit/df4b6097f6bcbfcb9fa89d4c3bb16f059a25d640))
* **FormTypeahead:** fix broken return type ([c65457f](https://github.com/labor-digital/vuetiful/commit/c65457fce57150bff1f3cc6e2caa5d07432899e2))
* export nouislider dependent components only if the dependency actually exists ([7977656](https://github.com/labor-digital/vuetiful/commit/79776564597bf4a685412b65c0ed67eae13f4fe6))

### [1.36.3](https://github.com/labor-digital/vuetiful/compare/v1.36.2...v1.36.3) (2021-03-17)


### Bug Fixes

* prevent default event if closed outside of the modal ([4ba743f](https://github.com/labor-digital/vuetiful/commit/4ba743f96ee72f5a4564f21558b8f38b19645ff0))

### [1.36.2](https://github.com/labor-digital/vuetiful/compare/v1.36.1...v1.36.2) (2021-03-15)

### [1.36.1](https://github.com/labor-digital/vuetiful/compare/v1.36.0...v1.36.1) (2021-03-15)

## [1.36.0](https://github.com/labor-digital/vuetiful/compare/v1.35.1...v1.36.0) (2021-03-05)


### Features

* add filteredAttributes to textarea ([409b5b2](https://github.com/labor-digital/vuetiful/commit/409b5b248089cfb5f0d70e63fd5e0b81087f62cc))

### [1.35.1](https://github.com/labor-digital/vuetiful/compare/v1.35.0...v1.35.1) (2021-02-18)


### Bug Fixes

* update dependencies ([ce90aa4](https://github.com/labor-digital/vuetiful/commit/ce90aa4f47c99363f9ab9a8e87cb7e887e40af85))
* **LinkTag:** don't attach a http:// prefix for relative, external links ([734b067](https://github.com/labor-digital/vuetiful/commit/734b0673784465c98c9498b131d4301ea658c092))
* **VueDropdownItemTemplate:** pass on all props using v-bind to allow overrides ([5aa2a74](https://github.com/labor-digital/vuetiful/commit/5aa2a74a0b017f750f9a20f054b30e1547a91d68))

## [1.35.0](https://github.com/labor-digital/vuetiful/compare/v1.34.0...v1.35.0) (2021-01-22)


### Features

* **DropdownItem:** pass through link component props from a dropdown item ([89eb552](https://github.com/labor-digital/vuetiful/commit/89eb552c832ea50a4e77e2724fbb976ecef22282))


### Bug Fixes

* resolve issues with "this" in data definition ([7b0d788](https://github.com/labor-digital/vuetiful/commit/7b0d788bcd064d7608a930976df918b00623bd31))

## [1.34.0](https://github.com/labor-digital/vuetiful/compare/v1.33.0...v1.34.0) (2020-12-11)


### Features

* **Dropdown:** implement better interaction between dropdowns ([1dee47a](https://github.com/labor-digital/vuetiful/commit/1dee47aba2e4bf69249dd25006daf1576dac74f8))

## [1.33.0](https://github.com/labor-digital/vuetiful/compare/v1.32.0...v1.33.0) (2020-12-07)


### Features

* implement link tag component ([08242cb](https://github.com/labor-digital/vuetiful/commit/08242cb37e36d64fb28f94fd3b694d0a7182facc))


### Bug Fixes

* **BaseAccordion:** pass through legacy item slots ([586f241](https://github.com/labor-digital/vuetiful/commit/586f2418ddbbb2a60267b6a4f5c59edc1b71c694))
* **BaseAccordion:** reset labels correctly ([43fea3b](https://github.com/labor-digital/vuetiful/commit/43fea3bec4f27e65982ef68bbe38ead5f9883492))

## [1.32.0](https://github.com/labor-digital/vuetiful/compare/v1.31.2...v1.32.0) (2020-12-03)


### Features

* **VuFormRangeSlider:** add min and max as props ([d8c529c](https://github.com/labor-digital/vuetiful/commit/d8c529c8f6009db349f9ca1ad0cb09224782a1b9))

### [1.31.2](https://github.com/labor-digital/vuetiful/compare/v1.31.1...v1.31.2) (2020-12-03)


### Bug Fixes

* restructure component export to help IDEs a bit ([d8bb8b9](https://github.com/labor-digital/vuetiful/commit/d8bb8b9e8fb42ad188aad2858d3a1cf2e83cf322))

### [1.31.1](https://github.com/labor-digital/vuetiful/compare/v1.31.0...v1.31.1) (2020-12-03)


### Bug Fixes

* **FormRangeSlider:** add correct exports ([9665cc4](https://github.com/labor-digital/vuetiful/commit/9665cc426d2bbb6c1d2ed25e7d1aa9094950e35b))

## [1.31.0](https://github.com/labor-digital/vuetiful/compare/v1.30.2...v1.31.0) (2020-12-02)


### Features

* implement form range slider ([875428b](https://github.com/labor-digital/vuetiful/commit/875428b37c034ac60c42d0596394e54aa441b232))
* implement form range slider ([7aaf8c7](https://github.com/labor-digital/vuetiful/commit/7aaf8c775199f09d2adb49a1e615094a1dd578e5))

### [1.30.2](https://github.com/labor-digital/vuetiful/compare/v1.30.1...v1.30.2) (2020-11-30)


### Bug Fixes

* fix crash if container not exist ([74b2919](https://github.com/labor-digital/vuetiful/commit/74b29190bdad64e322350a271096bb0cc8f9a8b8))

### [1.30.1](https://github.com/labor-digital/vuetiful/compare/v1.30.0...v1.30.1) (2020-11-25)


### Bug Fixes

* **VuDropdownAbstract:** use parentIsReference instead of f as prop name ([fb272d9](https://github.com/labor-digital/vuetiful/commit/fb272d95bfe9bd8ce8e0b655c59e3a8dd99b7b2c))

## [1.30.0](https://github.com/labor-digital/vuetiful/compare/v1.29.1...v1.30.0) (2020-11-25)


### Features

* **VuDropdownAbstract:** implement parentIsReference prop ([fb4dbf6](https://github.com/labor-digital/vuetiful/commit/fb4dbf6fd1e52cd370dce81bddb8d1c6f6d883bb))


### Bug Fixes

* **FormTypeahead:** fix double down issue by arrowDown ([d32253b](https://github.com/labor-digital/vuetiful/commit/d32253b5c62b051b6dfc9c843728c6c2457a9d31))
* **templateFactory:** use "template" as ref key ([04fe721](https://github.com/labor-digital/vuetiful/commit/04fe7214e4e7978c09db243f8321d3445eb5deae))

### [1.29.1](https://github.com/labor-digital/vuetiful/compare/v1.29.0...v1.29.1) (2020-11-25)


### Bug Fixes

* **VuDropdown:** remove list style from dropdown items ([b65b7b6](https://github.com/labor-digital/vuetiful/commit/b65b7b6a12aea10f0c2c07cf57bae16358af8891))

## [1.29.0](https://github.com/labor-digital/vuetiful/compare/v1.28.1...v1.29.0) (2020-11-25)


### Features

* rename VuView to VuTemplate and viewFactory to templateFactory ([a6708f0](https://github.com/labor-digital/vuetiful/commit/a6708f031b093b10e97504c4c14e9e46211b63ea))

### [1.28.1](https://github.com/labor-digital/vuetiful/compare/v1.28.0...v1.28.1) (2020-11-24)


### Bug Fixes

* **viewFactory:** reimplement previous prop resolution ([503595c](https://github.com/labor-digital/vuetiful/commit/503595cafc0f5027f8df326dcfe296aa2b38cce0))
* **VuFormTypeahead:** implement missing loader controls ([8f3d958](https://github.com/labor-digital/vuetiful/commit/8f3d958cb5049a82e478407e1243b17829f1ed38))

## [1.28.0](https://github.com/labor-digital/vuetiful/compare/v1.27.0...v1.28.0) (2020-11-24)


### Features

* **FormInput:** consolidate events + add example ([5e26429](https://github.com/labor-digital/vuetiful/commit/5e264291d45ac4596342516dca8bdbc48429b98b))
* **VuFormTypeahead:** emit "select" event when "enter" is pressed or a dropdown item was selected ([3cb66f1](https://github.com/labor-digital/vuetiful/commit/3cb66f1073865877ffe3523cb4892143ce6cd3dc))
* use vue-functional-data-merge to merge view data ([40a3ec5](https://github.com/labor-digital/vuetiful/commit/40a3ec5421e7dabbb1f3c8906bd6f9bea5c2d0eb))

## [1.27.0](https://github.com/labor-digital/vuetiful/compare/v1.26.4...v1.27.0) (2020-11-24)


### Features

* **VuFormTypeahead:** emit "select" event when "enter" is pressed or a dropdown item was selected ([b586bec](https://github.com/labor-digital/vuetiful/commit/b586bec42dd5ce66d3117385797c322d03ba177d))

### [1.26.4](https://github.com/labor-digital/vuetiful/compare/v1.26.3...v1.26.4) (2020-11-24)


### Bug Fixes

* make InputField and VuFormInput compatible with NULL VALUES ([f992958](https://github.com/labor-digital/vuetiful/commit/f992958db7d8d7eae34c4a5252ee13e3d117ff8b))

### [1.26.3](https://github.com/labor-digital/vuetiful/compare/v1.26.2...v1.26.3) (2020-11-24)


### Bug Fixes

* **InputField:** compatibility to new VuFormInput ([9081a09](https://github.com/labor-digital/vuetiful/commit/9081a09e505a1768fb4784755f4230c9a2c233bf))
* **VuFormInputTemplate:** remove console spam ([235a0b9](https://github.com/labor-digital/vuetiful/commit/235a0b970c87adf461e775e675599cf52b6f3b6a))

### [1.26.2](https://github.com/labor-digital/vuetiful/compare/v1.26.1...v1.26.2) (2020-11-24)


### Bug Fixes

* fix build issues ([a269992](https://github.com/labor-digital/vuetiful/commit/a26999240d7fb32c4cc1a70fddb929b3ee66ed3f))
* fix build issues ([6f0f7ef](https://github.com/labor-digital/vuetiful/commit/6f0f7efb616f073898da184cc83dc68a679a8fc8))

### [1.26.1](https://github.com/labor-digital/vuetiful/compare/v1.26.0...v1.26.1) (2020-11-24)


### Bug Fixes

* fix build issues ([8eab389](https://github.com/labor-digital/vuetiful/commit/8eab389462e29be4eb05d0686441a5fe781878dc))

## [1.26.0](https://github.com/labor-digital/vuetiful/compare/v1.25.1...v1.26.0) (2020-11-24)


### Features

* begin to implement version 2 with FormInput element ([aaf4224](https://github.com/labor-digital/vuetiful/commit/aaf4224cdbee7b926b8c128810f1f4b310cdbf5a))
* implement build process for v2 components ([c3e86aa](https://github.com/labor-digital/vuetiful/commit/c3e86aa6025097c5bbcf0c1d0b2cfd6cbaf76327))
* implement typeahead ([ee45225](https://github.com/labor-digital/vuetiful/commit/ee45225f5c6f1f4fb55148ed98033bd7a9d3844a))
* implement v2 dropdown ([67f75eb](https://github.com/labor-digital/vuetiful/commit/67f75ebab9bdbbd3068e4bc9091faa996518e734))
* prepare build in the pipeline ([3f019a0](https://github.com/labor-digital/vuetiful/commit/3f019a040a761ee165fc25f51308e09c01c886ba))
* prepare es6 module export ([c491720](https://github.com/labor-digital/vuetiful/commit/c4917203abfbdf2f22816850f552e9ddb304614c))


### Bug Fixes

* **FormInput:** add Vu Prefix to all class names ([de2333b](https://github.com/labor-digital/vuetiful/commit/de2333b4bbb4b4adf273c15bab217d22c4017d36))
* **FormInput:** import sass file from template ([38b83f0](https://github.com/labor-digital/vuetiful/commit/38b83f0f41ac3d9c2bd5d1690c59b7e1220b1613))

### [1.25.1](https://github.com/labor-digital/vuetiful/compare/v1.25.0...v1.25.1) (2020-11-18)


### Bug Fixes

* **InputField:** allow numbers as value ([e70ed02](https://github.com/labor-digital/vuetiful/commit/e70ed0227f2e0966a5c1ae218d7044f30f5789c5))

## [1.25.0](https://github.com/labor-digital/vuetiful/compare/v1.24.1...v1.25.0) (2020-11-14)


### Features

* update dependencies ([1df0f43](https://github.com/labor-digital/vuetiful/commit/1df0f432a38d8742123c0210532d7bc9846c4bcd))
* **InputField:** pass through some attributes to the input field ([a5cdd4b](https://github.com/labor-digital/vuetiful/commit/a5cdd4b273846fd5071186309761a4a88ccba7f2))

### [1.24.1](https://github.com/labor-digital/vuetiful/compare/v1.24.0...v1.24.1) (2020-11-14)


### Bug Fixes

* **BaseAccordionItem:** pass the instance to the registerItem method ([1a713a6](https://github.com/labor-digital/vuetiful/commit/1a713a605e2e0650d344ef795497461d026dbf97))

## [1.24.0](https://github.com/labor-digital/vuetiful/compare/v1.23.0...v1.24.0) (2020-11-14)


### Features

* **BaseAccordion:** emit the child instance on open:wasOpen and close:wasClosed ([d78b75f](https://github.com/labor-digital/vuetiful/commit/d78b75f823b73108c20ee1d9609ed3cc56fa9c63))

## [1.23.0](https://github.com/labor-digital/vuetiful/compare/v1.22.6...v1.23.0) (2020-11-14)


### Features

* emit open:wasOpen / close:wasClosed events when accordion + tab items are triggered but already at the required state ([e469390](https://github.com/labor-digital/vuetiful/commit/e469390fd526633b093195e6dfc55684f87bdad9))

### [1.22.6](https://github.com/labor-digital/vuetiful/compare/v1.22.5...v1.22.6) (2020-11-14)


### Bug Fixes

* set --checked modifier correctly in baseRadio and baseCheckbox ([96f82dc](https://github.com/labor-digital/vuetiful/commit/96f82dc27eb5ddfad19ce74251a2bf7eaf2ba8c7))

### [1.22.5](https://github.com/labor-digital/vuetiful/compare/v1.22.4...v1.22.5) (2020-11-14)


### Bug Fixes

* don't override slot name with groupName in baseRadio and baseCheckbox ([c8bfa30](https://github.com/labor-digital/vuetiful/commit/c8bfa30bc377d94b7a92bde0f55c929bee7a001e))

### [1.22.4](https://github.com/labor-digital/vuetiful/compare/v1.22.3...v1.22.4) (2020-11-14)


### Bug Fixes

* register child components after they have been removed ([4c21c86](https://github.com/labor-digital/vuetiful/commit/4c21c869f1adb1217b8e26d6f38f3afef9b76392))
* **BaseAccordionItem:** fix multiple issues with opening and closing ([889397c](https://github.com/labor-digital/vuetiful/commit/889397c4e24b7a644e859fcafcc28565f8f82e87))

### [1.22.3](https://github.com/labor-digital/vuetiful/compare/v1.22.2...v1.22.3) (2020-11-13)


### Bug Fixes

* **BaseAccordionItem:** adjust some css classes for legacy compatibility ([4ad6ca2](https://github.com/labor-digital/vuetiful/commit/4ad6ca2aa890d95a79c4f6c727497a6745e9fa45))

### [1.22.2](https://github.com/labor-digital/vuetiful/compare/v1.22.1...v1.22.2) (2020-11-12)


### Bug Fixes

* **BaseAccordionItem:** emit this instead of el for transition events ([5b58f6d](https://github.com/labor-digital/vuetiful/commit/5b58f6d1834a793b619c3ac063a81b64b746ad25))

### [1.22.1](https://github.com/labor-digital/vuetiful/compare/v1.22.0...v1.22.1) (2020-11-12)

## [1.22.0](https://github.com/labor-digital/vuetiful/compare/v1.21.1...v1.22.0) (2020-11-12)


### Features

* **Chips:** refactoring + new api + aria support ([039c5e1](https://github.com/labor-digital/vuetiful/commit/039c5e1ad57b1a9a2015b5bd2bac5b406455619c))


### Bug Fixes

* resolve strange "value" bug for baseRadio and baseCheckbox stories ([378deab](https://github.com/labor-digital/vuetiful/commit/378deab6d77388653cf36a96414ee2139268096c))
* **BaseCheckbox:** set correct type hint for api ([2200b52](https://github.com/labor-digital/vuetiful/commit/2200b528a9c983c794eaa9df0dce8c6fb03d5bc2))
* **BaseRadio:** set correct type hint for api ([5802d9e](https://github.com/labor-digital/vuetiful/commit/5802d9ee74f788d76cc75fd9cf6d5246f6818610))
* **BaseTabs:** fix item order for numeric keys ([df53305](https://github.com/labor-digital/vuetiful/commit/df533052b91f35b9721c28c5e3af50a373bd6e73))
* **BaseTabs:** remove dev output ([0c50188](https://github.com/labor-digital/vuetiful/commit/0c50188aec4b11eb083ab4839091b68f64b409d4))

### [1.21.1](https://github.com/labor-digital/vuetiful/compare/v1.21.0...v1.21.1) (2020-11-12)


### Bug Fixes

* fix broken tabs and accordion story ([6277d3b](https://github.com/labor-digital/vuetiful/commit/6277d3b60441a93e31e5ef5dc8bba31e8d7a7226))

## [1.21.0](https://github.com/labor-digital/vuetiful/compare/v1.20.3...v1.21.0) (2020-11-12)


### Features

* update tabs and accordion story ([c3bda58](https://github.com/labor-digital/vuetiful/commit/c3bda5872399f18860b84873be301a5b8b29bc4f))
* **BaseAccordion:** refactoring + new api + aria support ([6a6128d](https://github.com/labor-digital/vuetiful/commit/6a6128d0926b4dfb11de096846e458df59e9a7de))
* **BaseCheckbox:** refactoring + new api ([b16d73b](https://github.com/labor-digital/vuetiful/commit/b16d73b45e1e9da82e3e802deff3a375e573fa3f))
* **BaseRadio:** refactoring + new api ([e68392f](https://github.com/labor-digital/vuetiful/commit/e68392fff5c076a572da30118c2904e80a5aa271))
* **BaseTabs:** refactoring + new api + aria support ([9e67da5](https://github.com/labor-digital/vuetiful/commit/9e67da5a4805f5497167fbf8addaa8a7caf8c16b))
* implement ReactiveMap and ReactiveSet to use in the refactoring process ([f4172dd](https://github.com/labor-digital/vuetiful/commit/f4172dd693d2167085c3bf31732964906c09f65e))


### Bug Fixes

* **BaseTabs:** let the legacy items use keys ([8e203ad](https://github.com/labor-digital/vuetiful/commit/8e203ad7597a70f61cc2a7f4a0726df9474e2f53))
* remove not required sass import from stories ([b100a4c](https://github.com/labor-digital/vuetiful/commit/b100a4ca2646f957c13c870c380642fe81979b06))
* **BaseAccordion:** multiple adjustments to support legacy definition correctly ([9f9168e](https://github.com/labor-digital/vuetiful/commit/9f9168ee3923f1bd38377ba3a4c1a0dddd752d02))

### [1.20.3](https://github.com/labor-digital/vuetiful/compare/v1.20.2...v1.20.3) (2020-11-09)


### Bug Fixes

* **BaseAccordion:** make sure contents stay reactive ([10d41ec](https://github.com/labor-digital/vuetiful/commit/10d41ec15ad51d43a65eec33e5e2a0be50396aa6))

### [1.20.2](https://github.com/labor-digital/vuetiful/compare/v1.20.1...v1.20.2) (2020-11-09)


### Bug Fixes

* fix ie11 includes with indexOf ([3dae190](https://github.com/labor-digital/vuetiful/commit/3dae1907106daab7c2cccf74c77dede9d95335e3))

### [1.20.1](https://github.com/labor-digital/vuetiful/compare/v1.20.0...v1.20.1) (2020-11-08)


### Bug Fixes

* **BaseAccordion:** fix broken click handler ([4abad8a](https://github.com/labor-digital/vuetiful/commit/4abad8a1c311c71b3463797f02bc04f3510ab4d2))

## [1.20.0](https://github.com/labor-digital/vuetiful/compare/v1.19.0...v1.20.0) (2020-11-08)


### Features

* **BaseAccordion:** implement a more speaking event concept ([820a47b](https://github.com/labor-digital/vuetiful/commit/820a47b5e85553246acda14f62e7f1f62c0c043c))


### Bug Fixes

* **BaseAccordion:** build given container classes correctly ([80e5b08](https://github.com/labor-digital/vuetiful/commit/80e5b08438ea037aeada7f96104a6dca2924de16))
* **BaseAccordion:** close the item using the internal api in onClickToggle ([5df0eed](https://github.com/labor-digital/vuetiful/commit/5df0eed43f0620440c2a78085d36b6836a80f652))
* **BaseAccordion:** emit close event for auto-closed items in openItem ([5bf1bbc](https://github.com/labor-digital/vuetiful/commit/5bf1bbcdc00131a5db0122aafd9585acf2687009))

## [1.19.0](https://github.com/labor-digital/vuetiful/compare/v1.18.0...v1.19.0) (2020-11-06)


### Features

* migrate to storybook 6 ([d252fe7](https://github.com/labor-digital/vuetiful/commit/d252fe747d4724476dcf3408ae94c4ec443eab59))
* update dependencies ([175f49d](https://github.com/labor-digital/vuetiful/commit/175f49dfa2ab72817d03b953c4fd4e7a258d930b))


### Bug Fixes

* remove item output ([b9359d8](https://github.com/labor-digital/vuetiful/commit/b9359d880f300222ff5bcf0f222319b1ad7c878b))

## [1.18.0](https://github.com/labor-digital/vuetiful/compare/v1.17.0...v1.18.0) (2020-11-05)


### Features

* use PSR-2 compliant code styles ([83b1809](https://github.com/labor-digital/vuetiful/commit/83b18091c8e981ab141562948418a014671dca89))


### Bug Fixes

* **BaseAccordion:** make sure onChangeOpen does not break with string items ([ace395b](https://github.com/labor-digital/vuetiful/commit/ace395b4d6a73917af278893a2a4f6b773434a43))

## [1.17.0](https://github.com/labor-digital/vuetiful/compare/v1.16.0...v1.17.0) (2020-11-05)


### Features

* **BaseAccordion:** implement new item api ([c718c55](https://github.com/labor-digital/vuetiful/commit/c718c55464ac98e860b804b997e61a1ae34f73a2))

## [1.16.0](https://github.com/labor-digital/vuetiful/compare/v1.15.2...v1.16.0) (2020-10-30)


### Features

* update dependencies ([36c8cef](https://github.com/labor-digital/vuetiful/commit/36c8cef108c7ba8e1a2e828fba89429079d8b8f6))
* update dependencies ([17ff0f1](https://github.com/labor-digital/vuetiful/commit/17ff0f173db2c40133571e80ad74930b9fb2b04a))


### Bug Fixes

* **BaseSelectBox:** fix bug when input offset is calculated ([bc33322](https://github.com/labor-digital/vuetiful/commit/bc33322c88357e1a9cf0ff0b5156c3ab1174c4c4))

### [1.15.2](https://github.com/labor-digital/vuetiful/compare/v1.15.1...v1.15.2) (2020-09-16)


### Bug Fixes

* **Basetabs:** add item prop to all slots ([77adf7e](https://github.com/labor-digital/vuetiful/commit/77adf7e2666e84f8beaf3394735bbcc3f200067a))

### [1.15.1](https://github.com/labor-digital/vuetiful/compare/v1.15.0...v1.15.1) (2020-08-27)


### Bug Fixes

* **InputField:** allow longer TDLs in email addresses ([77a30fa](https://github.com/labor-digital/vuetiful/commit/77a30fadd1de5ece6e13a00c690b089735f5126c))

## [1.15.0](https://github.com/labor-digital/vuetiful/compare/v1.14.1...v1.15.0) (2020-08-26)


### Features

* update dependencies ([0ab3785](https://github.com/labor-digital/vuetiful/commit/0ab37850e6da62e1a0e57318604c3587c59e310c))
* **BaseSelectBox:** fix multiple issues with non existent refs + code cleanup ([ec97fa8](https://github.com/labor-digital/vuetiful/commit/ec97fa8784d606c86e77a1a43baeae5fe1aba7ac))


### Bug Fixes

* update vuejs env package ([a4fc492](https://github.com/labor-digital/vuetiful/commit/a4fc4927489e87695d77dec09326c91da6af99ab))

### [1.14.1](https://github.com/labor-digital/vuetiful/compare/v1.14.0...v1.14.1) (2020-08-20)


### Bug Fixes

* fix default open tab if no prop ([0967ab2](https://github.com/labor-digital/vuetiful/commit/0967ab235b36bb4204658adc4f6188743bad2b43))

## [1.14.0](https://github.com/labor-digital/vuetiful/compare/v1.13.0...v1.14.0) (2020-08-19)


### Features

* add open prop to control from outside with index of the arrays ([391c776](https://github.com/labor-digital/vuetiful/commit/391c7767aadb63331540c18503be9d95afaf06f7))

## [1.13.0](https://github.com/labor-digital/vuetiful/compare/v1.12.0...v1.13.0) (2020-08-12)


### Features

* Add calculation to decide which direction the menu opens -> Error when calculating opening direction ([6db2936](https://github.com/labor-digital/vuetiful/commit/6db29369574ea6d7e26f75accc77d1db9ec9a2b5))
* Tabs/Accordion can now be controlled with hash in url - Add public open/close API ([88fe0ff](https://github.com/labor-digital/vuetiful/commit/88fe0ff607b7d86f117ecdf0cabc0c8d12b4f93b))


### Bug Fixes

* add max-height to display a scrollbar if outside of viewport ([15ddf3c](https://github.com/labor-digital/vuetiful/commit/15ddf3c3d8a4275e31cf852df22ee3803b03d508))
* Date Field: Broken placeholder rendering ([869e900](https://github.com/labor-digital/vuetiful/commit/869e900df7d0c45e632bbc916088701979b8bbf6))

## [1.12.0](https://github.com/labor-digital/vuetiful/compare/v1.11.1...v1.12.0) (2020-07-23)


### Features

* recreate checkbox and radio as BaseCheckbox and BaseRadio ([fc36f1d](https://github.com/labor-digital/vuetiful/commit/fc36f1d7a280940a3faf1bcc3005e4c852eaa8a0))
* set old components to deprecated ([1283dbb](https://github.com/labor-digital/vuetiful/commit/1283dbbf1993cc1e6e6c80b443c6c95497571ce1))

### [1.11.1](https://github.com/labor-digital/vuetiful/compare/v1.11.0...v1.11.1) (2020-07-22)

## [1.11.0](https://github.com/labor-digital/vuetiful/compare/v1.10.6...v1.11.0) (2020-07-21)


### Features

* add slot for checkbox label ([3abc7c0](https://github.com/labor-digital/vuetiful/commit/3abc7c0e55b951174db1c3d3f5e1397935a1452e))

### [1.10.6](https://github.com/labor-digital/vuetiful/compare/v1.10.5...v1.10.6) (2020-07-21)


### Bug Fixes

* textarea computed classes on main container ([5b78c42](https://github.com/labor-digital/vuetiful/commit/5b78c423e04d33a6ee45110269facf7702e64170))

### [1.10.5](https://github.com/labor-digital/vuetiful/compare/v1.10.4...v1.10.5) (2020-07-21)


### Bug Fixes

* classes names ([0650abb](https://github.com/labor-digital/vuetiful/commit/0650abbfc149292dd79d56b43a723f81fa3175f9))

### [1.10.4](https://github.com/labor-digital/vuetiful/compare/v1.10.3...v1.10.4) (2020-07-21)


### Bug Fixes

* prepare items for radio ([481a712](https://github.com/labor-digital/vuetiful/commit/481a7120a9b6835faa2b24fa456fcb20d7e0d2b1))
* use v-model ([f661133](https://github.com/labor-digital/vuetiful/commit/f661133253e528baca36eda5caf762dabb4c0e7c))

### [1.10.3](https://github.com/labor-digital/vuetiful/compare/v1.10.2...v1.10.3) (2020-07-20)


### Bug Fixes

* add number input type, adjust doc header ([0a6ce66](https://github.com/labor-digital/vuetiful/commit/0a6ce6690739dc247ed2ded6726a79a1f37a09ec))

### [1.10.2](https://github.com/labor-digital/vuetiful/compare/v1.10.1...v1.10.2) (2020-07-17)


### Bug Fixes

* add error slot ([4ad8098](https://github.com/labor-digital/vuetiful/commit/4ad809811043976374643016504f081a20cad946))

### [1.10.1](https://github.com/labor-digital/vuetiful/compare/v1.10.0...v1.10.1) (2020-07-16)


### Bug Fixes

* add error slot ([ef69a31](https://github.com/labor-digital/vuetiful/commit/ef69a3142b97b473553472fc7606f675aa96eb1d))
* add placeholder for date ([f57c358](https://github.com/labor-digital/vuetiful/commit/f57c358e088a9f1c9fce3f8bd21535ba0bbed84c))
* better transitions ([ba035fe](https://github.com/labor-digital/vuetiful/commit/ba035feb09c661c98e409f07d72b36d97f63b632))

## [1.10.0](https://github.com/labor-digital/vuetiful/compare/v1.9.3...v1.10.0) (2020-07-06)


### Features

* fix some bugs, fix transition, add itemLabel to get label from array ([908f67b](https://github.com/labor-digital/vuetiful/commit/908f67ba74c4ac5cf60b220345296a3b20b9871b))

### [1.9.3](https://github.com/labor-digital/vuetiful/compare/v1.9.2...v1.9.3) (2020-07-03)


### Bug Fixes

* missing refs on mounted ([8a9b0f4](https://github.com/labor-digital/vuetiful/commit/8a9b0f4ed6fd59f14c0d203abe3824dec43c425c))

### [1.9.2](https://github.com/labor-digital/vuetiful/compare/v1.9.1...v1.9.2) (2020-07-03)


### Bug Fixes

* transition and height ([e778764](https://github.com/labor-digital/vuetiful/commit/e778764dadebdc687781dcbdd24a7f928cb2498b))

### [1.9.1](https://github.com/labor-digital/vuetiful/compare/v1.9.0...v1.9.1) (2020-07-03)


### Bug Fixes

* active state ([6d29722](https://github.com/labor-digital/vuetiful/commit/6d2972240053ae454674aec4a4182c8fa4ed466e))

## [1.9.0](https://github.com/labor-digital/vuetiful/compare/v1.8.3...v1.9.0) (2020-07-02)


### Features

* add accordion and tab component with stories ([448b5ad](https://github.com/labor-digital/vuetiful/commit/448b5ad978e8b7b26d7a8d09575e4838e43fa68d))


### Bug Fixes

* fix modal value error ([46281c3](https://github.com/labor-digital/vuetiful/commit/46281c33d5e775b4a4ee02f43f7f3de70eef47ec))

### [1.8.3](https://github.com/labor-digital/vuetiful/compare/v1.8.2...v1.8.3) (2020-06-25)


### Bug Fixes

* **BaseSelectBox:** render multiSelectAltPlaceholder for multiSelect fields ([82bc50e](https://github.com/labor-digital/vuetiful/commit/82bc50eda677da8b11ab1525a578d114e0ac10b6))
* **Checkbox:** remove console.log spam ([91111de](https://github.com/labor-digital/vuetiful/commit/91111dee769b27a25fa1de1d8c019a4ccc338f0c))

### [1.8.2](https://github.com/labor-digital/vuetiful/compare/v1.8.1...v1.8.2) (2020-06-25)


### Bug Fixes

* **InputField:** make field more resilient to external updates ([d4c8a82](https://github.com/labor-digital/vuetiful/commit/d4c8a8249bb7fde9a5d057e55e0b197f834d0aec))

### [1.8.1](https://github.com/labor-digital/vuetiful/compare/v1.8.0...v1.8.1) (2020-06-25)


### Bug Fixes

* **InputField:** always use BEM flags on root ([789d399](https://github.com/labor-digital/vuetiful/commit/789d3997479edff2489d4f518a8ded9334e18a08))
* **InputField:** clear icon without "absolute" ([db4e31c](https://github.com/labor-digital/vuetiful/commit/db4e31c0a169be6367aa69abaad65c9efcd1a654))
* **InputField:** place slots in inputField__inputContainer ([a77e017](https://github.com/labor-digital/vuetiful/commit/a77e0174704e4162f9a02a4d864463404bfe2459))
* fix crash in the inputField ([cf68619](https://github.com/labor-digital/vuetiful/commit/cf686193c84601326f9ab631b2ab49e0b787f4c4))

## [1.8.0](https://github.com/labor-digital/vuetiful/compare/v1.7.0...v1.8.0) (2020-06-25)


### Features

* **BaseSelectBox:** add additional multiSelectAltPlaceholder prop ([4559b19](https://github.com/labor-digital/vuetiful/commit/4559b1930e4ad5fa66b61edb7c56ad02f578c717))

## [1.7.0](https://github.com/labor-digital/vuetiful/compare/v1.6.0...v1.7.0) (2020-06-25)


### Features

* **BaseSelectBox:** add additional slots ([8f04936](https://github.com/labor-digital/vuetiful/commit/8f04936c5fef9c05e7dd96315b76e5ac576bd371))

## [1.6.0](https://github.com/labor-digital/vuetiful/compare/v1.5.1...v1.6.0) (2020-06-24)


### Features

* **BaseSelectBox:** multiple adjustments and bugfixes ([6dfccc7](https://github.com/labor-digital/vuetiful/commit/6dfccc794ffc0f0f2285fd2c433d33ad69bd1e92))
* update dependencies ([8056496](https://github.com/labor-digital/vuetiful/commit/805649619d1400c096ef43778b8cfe8f4f286728))


### Bug Fixes

* **BaseSelectBox:** translate checkbox items before emitting 'input' event ([1ef8ba0](https://github.com/labor-digital/vuetiful/commit/1ef8ba00d9a256aafbda43e57d743429f60ced78))
* **Checkbox:** make input/value filtering more resilient ([81496f0](https://github.com/labor-digital/vuetiful/commit/81496f02ee14f82d495c85ee418c04638d314099))
* fix some story issues and ([11df843](https://github.com/labor-digital/vuetiful/commit/11df843c6708eb6fcd18823f80c51853f9703176))
* **InputField:** remove blur on enter key ([b66adbe](https://github.com/labor-digital/vuetiful/commit/b66adbe881e57fac29d36dbf650d548d0caad687))

### [1.5.1](https://github.com/labor-digital/vuetiful/compare/v1.5.0...v1.5.1) (2020-06-17)


### Bug Fixes

* **Checkbox:** fixe multiple reactivity issues ([39e13bc](https://github.com/labor-digital/vuetiful/commit/39e13bc13ebac582e4f9bd70da7215c9d919315c))

## [1.5.0](https://github.com/labor-digital/vuetiful/compare/v1.4.1...v1.5.0) (2020-05-28)


### Features

* add MultiSelect, modified checkbox and chips ([d9c86b3](https://github.com/labor-digital/vuetiful/commit/d9c86b38582cdd08b54f63b0aeec6adc3b36da78))

### [1.4.1](https://github.com/labor-digital/vuetiful/compare/v1.4.0...v1.4.1) (2020-05-11)


### Bug Fixes

* fix missing css, fixed storybook chips ([6a41963](https://github.com/labor-digital/vuetiful/commit/6a419635b976352efc2456fe455cce27df5f9572))

## [1.4.0](https://github.com/labor-digital/vuetiful/compare/v1.3.5...v1.4.0) (2020-05-11)


### Features

* add chips, fix v-model bugs, add storybook ([4e1dd1e](https://github.com/labor-digital/vuetiful/commit/4e1dd1ec4cccb8768888354a2806d5189dcd52bd))

### [1.3.5](https://github.com/labor-digital/vuetiful/compare/v1.3.4...v1.3.5) (2020-05-06)


### Bug Fixes

* uncheck old value for easier styling ([5f4ff23](https://github.com/labor-digital/vuetiful/commit/5f4ff23e9d713961515de5aaed8f46b839dbfa39))

### [1.3.4](https://github.com/labor-digital/vuetiful/compare/v1.3.3...v1.3.4) (2020-05-06)


### Bug Fixes

* removed div ([e13eb4e](https://github.com/labor-digital/vuetiful/commit/e13eb4e282866fd5f978f4c46a56523107cdf44f))

### [1.3.3](https://github.com/labor-digital/vuetiful/compare/v1.3.2...v1.3.3) (2020-05-06)


### Bug Fixes

* fix some bugs, rename radio to radio-button, add icon slot for check and radio ([5ee5fad](https://github.com/labor-digital/vuetiful/commit/5ee5fad06af68cc02a40a710a1fe084a861ac0d4))

### [1.3.2](https://github.com/labor-digital/vuetiful/compare/v1.3.1...v1.3.2) (2020-05-06)


### Bug Fixes

* undefined value, fixed clear icon if no v-model present ([758823a](https://github.com/labor-digital/vuetiful/commit/758823a5d7596ab36746bdd9e81f3ce2fbdd1432))

### [1.3.1](https://github.com/labor-digital/vuetiful/compare/v1.3.0...v1.3.1) (2020-05-06)


### Bug Fixes

* remove debug statement ([1889e45](https://github.com/labor-digital/vuetiful/commit/1889e456684f0c68e53e36a8798e93dd3b23a531))

## [1.3.0](https://github.com/labor-digital/vuetiful/compare/v1.2.4...v1.3.0) (2020-05-06)


### Features

* add clear button to input field ([f57a527](https://github.com/labor-digital/vuetiful/commit/f57a5274b5f0a7e8665d84278234a5454c4d5b8d))

### [1.2.4](https://github.com/labor-digital/vuetiful/compare/v1.2.3...v1.2.4) (2020-05-04)


### Bug Fixes

* fix error style if undefined, clean up selectbox ([fa383fe](https://github.com/labor-digital/vuetiful/commit/fa383febe63e5347b618dfd2a57e4f297d863b9c))

### [1.2.3](https://github.com/labor-digital/vuetiful/compare/v1.2.2...v1.2.3) (2020-05-04)


### Features

* add new components ([fc51d8b](https://github.com/labor-digital/vuetiful/commit/fc51d8b81d0c3c9436bd7843cceb32423f9eb0de))

### [1.2.2](https://github.com/labor-digital/vuetiful/compare/v1.2.1...v1.2.2) (2020-04-28)


### Bug Fixes

* **SelectBox:** make sure items has a default value ([93b6cd4](https://github.com/labor-digital/vuetiful/commit/93b6cd4a4687b9e11c33dced03025f41c0328077))

### [1.2.1](https://github.com/labor-digital/vuetiful/compare/v1.2.0...v1.2.1) (2020-04-28)


### Bug Fixes

* add src directory to npm otherwise we don't have much to share o.o ([bf530bb](https://github.com/labor-digital/vuetiful/commit/bf530bb8902bae32306239b3dd47ae41da4f309d))

## [1.2.0](https://github.com/labor-digital/vuetiful/compare/v1.1.1...v1.2.0) (2020-04-28)


### Features

* implement modal and select box + basic readme ([bf1bdca](https://github.com/labor-digital/vuetiful/commit/bf1bdcaeabaf2fc483385a9249c028d6a2c84890))


### Bug Fixes

* don't push storybook related stuff to npm ([0167b48](https://github.com/labor-digital/vuetiful/commit/0167b48381a15ae3ae634d88a6ccfaeaef43d7fe))

### [1.1.1](https://github.com/labor-digital/vuetiful/compare/v1.1.0...v1.1.1) (2020-04-24)

## 1.1.0 (2020-04-24)


### Features

* initial release ([fa7f12d](https://github.com/labor-digital/vuetiful/commit/fa7f12dd4e0fb4d4f099ff67bea370e960318002))

 
