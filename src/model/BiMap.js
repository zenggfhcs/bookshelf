//#region Bi Map
/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */

/* === === === === === === === === === === === === ===  === === === === === === === === === === === === === */
//#endregion

import DefaultMap from "@/model/DefaultMap.js";

class BiMap {
	#keyMap;
	#valueMap;

	constructor() {
		this.#keyMap = new DefaultMap();
		this.#valueMap = new DefaultMap();
	}

	set(k, v) {
		if (this.#keyMap.has(k) || this.#keyMap.has(v)
			|| this.#valueMap.has(k) || this.#valueMap.has(v)) {
			throw new Error(`${k} or ${v} is exist`);
		}
		this.#keyMap.set(k, v);
		this.#valueMap.set(v, k);
	}

	remove(v) {
		this.#keyMap.remove(v);
		this.#valueMap.remove(v);
	}

	getByValue(v, defaultValue = undefined) {
		return this.#valueMap.getOrDefault(v, defaultValue);
	}

	getByKey(k, defaultValue = undefined) {
		return this.#keyMap.getOrDefault(k, defaultValue);
	}
}

export default BiMap;
