define(['backbone', 'views/list-users-view', 'views/edit-user-view'], function (Backbone, ListUsersView, EditUserView) {

    return  Backbone.Router.extend({
        routes: {
            "": "home",
            "home": "home",
            "edit/:id": "edit",
            "new": "edit"
        }
//        ,
//        home:function () {
//            var listUsersView = new ListUsersView();
//            listUsersView.render();
//        },
//        edit:function (id) {
//            var editUserView = new EditUserView();
//            editUserView.render({id: id});
//        }
    });
});