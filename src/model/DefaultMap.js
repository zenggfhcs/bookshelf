class DefaultMap extends Map {
	constructor() {
		super();                          // Invoke superclass constructor
	}

	getOrDefault(key, defaultValue) {
		if (this.has(key)) {
			return super.get(key);
		}
		return defaultValue;
	}
}

export default DefaultMap;