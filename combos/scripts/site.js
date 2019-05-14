var app = new Vue({
    el: '#app',
    data: {
        selectedCategoryId: 0,
    },
    methods: {
        getCategories: function () {
            return [
                { id: 0, text: 'Zöldség' },
                { id: 1, text: 'Gyümölcs' },
            ];
        },
        getItems: function (categoryId) {
            switch (categoryId) {
                case 0:
                    return [
                        { id: 0, text: 'Retek' },
                        { id: 1, text: 'Karalábé' },
                        { id: 2, text: 'Sárgarépa' },
                    ];
                case 1:
                    return [
                        { id: 0, text: 'Alma' },
                        { id: 1, text: 'Körte' },
                        { id: 2, text: 'Szőlő' },
                        { id: 3, text: 'Banán' },
                    ];
                default:
                    console.warn("Nem létező kategória: " + categoryId);
                    return [];
            }
        }
    }
})
