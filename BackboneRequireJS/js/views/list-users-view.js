define(['backbone', 'underscore', 'text!templates/list-users-template.html', 'collections/users', 'jquery'], function (Backbone, _, ListUsersTemplate, Users, $) {

    var ListUserView = Backbone.View.extend({
        el: '.page',
        initialize: function () {
            console.log("ListUsersView Initialized");

            this.users = new Users();
            this.users.fetch();
        },
        template: _.template(ListUsersTemplate),
        render: function () {
            console.log("ListUsersView Rendered");
            this.users.fetch();

            var template = this.template({users: this.users.models});
            this.$el.html(template);

            $('.search-input').keyup(function () {
                var searchString = this.value.trim();
                console.log(searchString);

                var rows = $(".table").find("tr");

                rows.each(function () {
                    $("td", this).each(function (index2, cell) {
                        if (cell.innerHTML.indexOf('<a') == -1) {
                            cell.innerHTML = highlightText(searchString, cell.innerText);
                        }
                    });
                })
            });
        },
        getModel: function (id) {
            return this.find(function (model) {
                return model.get('id') == id;
            });
        }
    });

    var highlightText = function (searchString, text) {

        var index = text.toLowerCase().indexOf(searchString.toLowerCase());
        if (index != -1) {

            var start = text.substr(0, index);
            var middle = text.substr(index, searchString.length);
            var end = text.substr(index + searchString.length, text.length);

            if (end.length < text.length) {
                text = start + "<font class='hilight'>" + middle + "</font>" + end;
            }
        }
        return text;
    };

    return ListUserView;
});