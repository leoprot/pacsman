
		// var nstiDB = {};
		// nstiDB.indexedDB = {};
		// nstiDB.indexedDB.db = null;
		// nstiDB.indexedDB.open = function() {
		  // var version = 1;
		  // var request = indexedDB.open("nsti", version);
		  
			// request.onupgradeneeded = function(e) {
			// var db = e.target.result;
			
			// if(db.objectStoreNames.contains("nsti")) {
				// db.deleteObjectStore("nsti");
			// }
			
			// var store = db.createObjectStore("nsti",
				// {keyPath: "timeStamp"});
			// };	
			
		  // request.onsuccess = function(e) {
			// nstiDB.indexedDB.db = e.target.result;
			// nstiDB.indexedDB.getAllTodoItems();
		  // };

		  // request.onerror = nstiDB.indexedDB.onerror;
		// };