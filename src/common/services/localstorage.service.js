const localStore = {
	/**
	 * Will set the data into Local storage
	 * @storageKey: The key against which the data is to store
	 * @datal: The data to store
	 */
	set: function (storageKey, data) {
		if (typeof Storage !== 'undefined') {
			localStorage[storageKey] = data;
		} else {
			alert('Sorry, your browser does not support web storage...');
		}
	},

	/**
	 * Will get the data from Local storage
	 * @storageKey: The key against which the data is stored
	 */
	get: function (storageKey) {
		return localStorage[storageKey];
	},

	/**
	 * Will remove the data from Local storage
	 * @storageKey: The key against which the data is stored
	 */
	remove: function (storageKey) {
		delete localStorage[storageKey];
	},
};
export default localStore;
