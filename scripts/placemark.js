ymaps.ready(init);

let myMap;
let isAddingMark = false;
let isDelete = false;

function addMark() {
    isAddingMark = true;
    isDelete = false;
}

function deleteMark() {
    isAddingMark = false;
    isDelete = true;
}

function init() {
    myMap = new ymaps.Map("map", {
        center: [56.3269, 44.0059],
        zoom: 10,
        controls: [],
    }, {
        suppressMapOpenBlock: true
    });

    // Добавляем обработчик клика на карту
    myMap.events.add('click', function (e) {
        if (isAddingMark) {
            const coords = e.get('coords');
            addGeoObject(coords);
            isAddingMark = false;
        }
    });
}

function addGeoObject(coords) {
    const myGeoObject = new ymaps.GeoObject({
        geometry: {
            type: "Point",
            coordinates: coords
        },
        properties: {
            balloonContent: "Координаты: " + coords.join(", ")
        }
    }, {
        preset: 'islands#blackStretchyIcon',
        draggable: true
    });

    myMap.geoObjects.add(myGeoObject);

    myGeoObject.events.add('click', function () {
        if (isDelete) {
            myMap.geoObjects.remove(myGeoObject);
        }
    });
}