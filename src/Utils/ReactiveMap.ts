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
import {isUndefined} from '@labor-digital/helferlein/lib/Types/isUndefined';
import Vue from 'vue';

/**
 * A super simple map implementation that can be watched by vue's reactivity
 */
export class ReactiveMap<K, V> implements Iterable<{ key: K, value: V }>
{
    protected state: { data: any };
    protected _byOrder: Array<K>;

    constructor()
    {
        new Map;
        this.state = Vue.observable({data: {}});
        this._byOrder = [];
    }

    get size(): number
    {
        return this._byOrder.length;
    }

    public has(key: K): boolean
    {
        return !isUndefined(this.state.data[key]);
    }

    public set(key: K, value: V): void
    {
        if (!this.has(key)) {
            this._byOrder.push(key);
        }
        if (this.state.data[key] !== value) {
            Vue.set(this.state.data, key as any, value);
        }
    }

    public get(key: K): V | undefined
    {
        return this.state.data[key] ?? undefined;
    }

    public delete(key: K): void
    {
        if (this.has(key)) {
            Vue.delete(this.state.data, key as any);
            this.state.data[key] = undefined;
            this._byOrder.splice(this._byOrder.indexOf(key), 1);
        }
    }

    public clear(): void
    {
        this.state.data = {};
        this._byOrder = [];
    }

    /**
     * Returns the first entry of the list
     * @param returnKey If set to true the key is returned instead of the value
     */
    public getFirst(returnKey?: boolean): V | null
    {
        if (this.size === 0) {
            return null;
        }
        const key = this._byOrder[0];
        return returnKey ? key : this.state.data[key];
    }

    /**
     * Returns the value AFTER the given key
     * @param key
     * @param returnKey If set to true the key is returned instead of the value
     */
    public getAfter(key: K, returnKey?: boolean): V | K | null
    {
        let result = null;
        let getNext = false;
        forEach(this._byOrder, (k) => {
            if (getNext) {
                result = returnKey ? k : this.state.data[k];
                return false;
            }
            getNext = k === key;
        });
        return result;
    }

    /**
     * Returns the value BEFORE the given key
     * @param key
     * @param returnKey If set to true the key is returned instead of the value
     */
    public getBefore(key: K, returnKey?: boolean): V | K | null
    {
        let previousKey;
        let result = null;
        forEach(this._byOrder, (k) => {
            if (k === key) {
                result = returnKey ? previousKey : this.state.data[previousKey];
                return false;
            }
            previousKey = k;
        });
        return result;
    }

    public forEach(callback: ForEachCallback): void
    {
        // Clone the list before looping it -> So we keep all children while we iterate and delete them
        forEach(cloneList(this._byOrder), (key) => {
            callback(this.state.data[key], key);
        });
    }

    public [Symbol.iterator](): Iterator<{ key: K, value: V }>
    {
        const that = this;
        return new class implements Iterator<{ key: K, value: V }>
        {
            protected _i = 0;

            public next(...args: [] | [undefined]): IteratorResult<{ key: K, value: V }, any>
            {
                if (this._i < that._byOrder.length) {
                    return {
                        value: {
                            key: that._byOrder[this._i],
                            value: that.state.data[that._byOrder[this._i++]]
                        }, done: false
                    };
                } else {
                    return {value: undefined, done: true};
                }
            }
        };
    }
}
