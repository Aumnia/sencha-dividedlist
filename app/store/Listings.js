Ext.define('App.store.Listings', {
	extend: 'Ext.data.Store',

	requires: [
		'App.model.Listing'
	],

	config: {
		model: 'App.model.Listing',
		storeId: 'ListingsStore',
		autoLoad: false,
		infinite: false,
		variableHeights: true,
		remoteSort: true,
		remoteFilter: true,
		remoteGroup: false,
		pageSize: 15,
        	clearOnPageLoad: false,
        
		grouper: {
			groupFn: function (record) {
				var store = record.stores[0],
                		pageSize = store.getPageSize(),
                		cachedCount = store.getAllCount(),
				totalCount = store.getTotalCount(),
                		index = store.indexOf(record) + 1,
                		totalPages = Math.ceil(cachedCount / pageSize),
                		pageIndex = 0,
                		lower, upper;

				for (pageIndex = 0; pageIndex <= totalPages; pageIndex++) {
					lower = (pageIndex * pageSize) + 1;
					upper = (pageIndex * pageSize) + pageSize;
					if (upper > cachedCount) {
						upper = cachedCount;
					}
					if (index >= lower && index <= upper) {
						return "Properties " + lower + " - " + upper + " of " + totalCount;
					}
				}
			}

		}

	},

	masked: {
		xtype: 'loadmask',
		message: 'Loading Listings...'
	}

});
