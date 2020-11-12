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
 * Last modified: 2020.11.11 at 19:06
 */
import {cloneList} from '@labor-digital/helferlein/lib/Lists/cloneList';
import {forEach} from '@labor-digital/helferlein/lib/Lists/forEach';
import Vue from 'vue';

/**
 * A super simple set implementation that can be watched by vue's reactivity
 */
export class ReactiveSet<T> implements Iterable<T>
{
    protected state: { data: Array<any> };

    constructor()
    {
        this.state = Vue.observable({data: []});
    }

    get size(): number
    {
        return this.state.data.length;
    }

    public has(value: T): boolean
    {
        return this.state.data.indexOf(value) !== -1;
    }

    public add(value: T): void
    {
        if (!this.has(value)) {
            this.state.data.push(value);
        }
    }

    public delete(value: T): void
    {
        if (this.has(value)) {
            this.state.data.splice(this.state.data.indexOf(value), 1);
        }
    }

    public clear(): void
    {
        this.state.data = [];
    }

    public forEach(callback: ForEachCallback): void
    {
        // Clone the list before looping it -> So we keep all children while we iterate and delete them
        forEach(cloneList(this.state.data), callback);
    }

    public getFirst(): T | null
    {
        return this.state.data[0] ?? null;
    }

    public [Symbol.iterator](): Iterator<T>
    {
        const that = this;
        return new class implements Iterator<T>
        {
            protected _i = 0;

            public next(...args: [] | [undefined]): IteratorResult<T, any>
            {
                if (this._i < that.state.data.length) {
                    return {value: that.state.data[this._i++], done: false};
                } else {
                    return {value: undefined, done: true};
                }
            }
        };
    }
}
