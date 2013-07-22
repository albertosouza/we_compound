exports.routes = function (map) {
    map.resources('boards');

    map.resources('lists');

    map.resources('tasks');

    // Generic routes. Add all your routes below this line
    map.root('dashboard#welcome');
	
    // feel free to remove generic routes
    map.all(':controller/:action');
    map.all(':controller/:action/:id');
};