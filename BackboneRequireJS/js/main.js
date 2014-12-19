require.config({
    paths: {
        jquery: 'libs/jquery/jquery-1.11.1.min',
        underscore: 'libs/underscore/underscore-min',
        backbone: 'libs/backbone/backbone-min',
        backbonelocalstorage: 'libs/backbone/backbone.localStorage',
        text: 'libs/require/text'
    }
});

require(['backbone', 'views/list-users-view', 'views/edit-user-view', 'routes/router'], function (Backbone, ListUsersView, EditUserView, Router) {

    var router = new Router();

    var listUsersView = new ListUsersView();
    var editUserView = new EditUserView({router: router});

    router.on('route:home', function () {
        listUsersView.render();
    });

    router.on('route:edit', function (id) {
        editUserView.render({id: id});
    });

    Backbone.history.start();
});