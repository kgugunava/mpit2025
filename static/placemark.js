ymaps.ready(init);

function addMark() {
    myGeoObject = new ymaps.GeoObject({
        geometry: {
            type: "Point",
            coordinates: [56.3269, 44.0059]
        },
        properties: {
        }
    }, {
        // Опции.
        // Иконка метки будет растягиваться под размер ее содержимого.
        preset: 'islands#blackStretchyIcon',
        // Метку можно перемещать.
        draggable: true
    })

    myMap.geoObjects
    .add(myGeoObject)
}

function pinMark() {
    return ;
}

function init() {
    globalThis.myMap = new ymaps.Map("map", {
        center: [56.3269, 44.0059],
        zoom: 10,
        controls: [],
    }, {
        suppressMapOpenBlock: true
    })
}