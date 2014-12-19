define(['backbone', 'underscore', 'text!templates/edit-user-template.html', 'collections/users', 'models/user', 'jquery'], function (Backbone, _, EditUserTemplate, Users, User, $) {

    return Backbone.View.extend({
        el: '.page',
        template: _.template(EditUserTemplate),
        initialize: function (options) {
            console.log("EditUserView Initialized");
            this.router = options.router;
            this.users = new Users();
            this.users.fetch();
        },
        render: function (options) {
            console.log("EditUserView Rendered");

            var user = this.users.getModel(options.id);

            var template = this.template({user: user, nextId: this.users.nextId()});
            this.$el.html(template);
        },
        events: {
            'click .submit': 'saveUser',
            'click .cancel': 'cancelEdit',
            'click .delete': 'deleteUser'
        },
        saveUser: function (event) {
            console.log("Saving...");
            event.preventDefault();

            var userForm = $(".edit-user-form");
            var id = parseInt(userForm.find($("input.user-id")).val());
            var firstName = userForm.find($("input.user-firstname")).val();
            var lastName = userForm.find($("input.user-lastname")).val();
            var age = userForm.find($("input.user-age")).val();

            var user = this.users.getModel(id);
            if (user) {
                user.destroy();
            }

            user = new User({
                id: id,
                firstName: firstName,
                lastName: lastName,
                age: age
            });

            console.log(user.id);
            this.users.add(user);
            user.save();
            this.router.navigate('', {trigger: true});
        },
        cancelEdit: function (event) {
            console.log("Canceling...");
            event.preventDefault();
            this.router.navigate('', {trigger: true});
        },
        deleteUser: function (event) {
            console.log("Deleting...");
            event.preventDefault();

            var userForm = $(".edit-user-form");
            var id = userForm.find($("input.user-id")).attr('value');
            var user = this.users.getModel(id);
            user.destroy();
            this.router.navigate('', {trigger: true});
        }
    });
});