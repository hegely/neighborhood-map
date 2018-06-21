let cacheName = 'mws-restaurant-stage-1';
let cacheScope = [
    '/index.html',
    '/restaurant.html',
    '/css/',
    '/js/',
    '/data/',
    '/img/',
	];

// cache install
self.addEventListener('install', function(e) {
	e.waitUntil(
		caches.open(cacheName).then( function(cache) {
			//console.log('cache installed');
			return cache.addAll(cacheScope);
		}).catch(err => console.log('Cache Failed: ', err))		
	)
});


// cache activate
self.addEventListener('activate', function(e){
	e.waitUntil(
		caches.keys(function(cacheNames) {
			return Promise.all(
				cacheNames.map(function(cacheNameDel) {
                	if (cacheNameDel !== cacheName) {
						//console.log("deleting cache from", cacheNameDel);
                    	return caches.delete(cacheNameDel);
					}
				})
			)
		})
	);
});

// cache fetch
self.addEventListener('fetch', function(e){
	//console.log('fetching', e.request.url);
	e.respondWith(
		caches.open(cacheName).then(cache => {
			return cache.match(e.request).then(response => {
                return ( response || fetch(e.request).then(response => {
					cache.put(e.request, response.clone());
						return response;
                    }).catch(err => console.log(err, e.request))
                );
            });
        })
    );
})