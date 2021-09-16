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
 * Last modified: 2020.12.03 at 00:10
 */

/**
 * To format the slider output, noUiSlider offers a format option.
 *
 * Specify to and from functions to encode and decode the values.
 *
 * By default, noUiSlider will format output with 2 decimals
 */
export interface IRangeSliderFormatter
{
    /**
     * 'to' the formatted value. Receives a number.
     * @param value
     */
    to(value: number): string;

    /**
     * 'from' the formatted value.
     * Receives a string, should return a number.
     * @param value
     */
    from(value: string): number;
}

type TWrappedSubRange = [number] | [number, number];

type TSubRange = number | TWrappedSubRange;

/**
 * Defines the range of slider values
 * @see https://refreshless.com/nouislider/slider-values/#section-range
 */
export interface IRangeSliderRangeDefinition
{
    min: TSubRange;
    max: TSubRange;

    [key: string]: TSubRange;
}
