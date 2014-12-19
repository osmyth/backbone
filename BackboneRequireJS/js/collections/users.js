define(['backbone', 'models/user', 'backbonelocalstorage'], function (Backbone, User, BackboneLocalStorage) {

    return Backbone.Collection.extend({
        model: User,
        localStorage: new BackboneLocalStorage("users"),
        nextId: function () {
            var maxId = 0;
            for (var index in this.models) {
                if (this.models[index].id > maxId) {
                    maxId = this.models[index].id;
                }
            }

            return maxId + 1;
        },
        getModel: function (id) {
            return this.find(function (model) {
                return model.get('id') == id;
            });
        }
    });
});