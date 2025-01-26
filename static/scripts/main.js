// import postgres from 'postgres'
// import sql from './db.js'

// const { Client } = require('pg');

// Создание клиента PostgreSQL
// const client = new Client({
//     user: 'postgres', // ваше имя пользователя
//     host: 'localhost', // адрес сервера
//     database: 'mpit', // имя базы данных
//     password: 'postgres', // ваш пароль
//     port: 5432, // порт по умолчанию
// });




ymaps.ready(init);

// const sql = postgres('postgres://username:password@host:port/database', {
//     host                 : '',            // Postgres ip address[s] or domain name[s]
//     port                 : 5432,          // Postgres server port[s]
//     database             : 'mpit',            // Name of database to connect to
//     username             : 'postgres',            // Username of database user
//     password             : 'postgres',            // Password of database user
//   })
// export default sql

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

// async function getCoordinates() {
//     try {
//         // Подключение к базе данных
//         await client.connect();

//         // Выполнение SQL-запроса
//         const res = await client.query('SELECT coordinates FROM towers');

//         // Обработка результатов
//         res.rows.forEach(row => {
//             console.log(row.coordinates); // вывод координат в консоль
//         });
//     } catch (err) {
//         console.error('Ошибка выполнения запроса', err);
//     } finally {
//         // Закрытие подключения
//         await client.end();
//     }
// }

// function addGeoObjectFromDataBase(coords) { // метки с координатами из БД, занесенные администрацией
//     const myGeoObject = new ymaps.GeoObject({
//         geometry: {
//             type: "Point",
//             coordinates: coords
//         },
//         properties: {
//             balloonContent: "Координаты: " + coords.join(", ")
//         }
//     }, {
//         preset: 'islands#blackStretchyIcon',
//         draggable: false
//     });

//     myMap.geoObjects.add(myGeoObject);
// }


// function connectToDataBase() {
//     const coords = sql`
//         select
//           coordinates
//         from towers
//         `

// }

function init() {
    myMap = new ymaps.Map("map", {
        center: [56.3269, 44.0059],
        zoom: 10,
        
        controls: [],
    }, {
        searchControlProvider: 'yandex#search',
        suppressMapOpenBlock: true
    });

    // addGeoObjectFromDataBase(getCoordinates());
    // const coordinates = sql`
    //     select
    //       coordinates
    //     from towers
    // `
    // console.log(coordinates[0]);
    // addGeoObjectFromDataBase(coordinates[0])

    // ниже то что закоменчено - другой цвет при наводке
    // myPlacemark = new ymaps.Placemark(myMap.getCenter());
    // myMap.geoObjects.add(myPlacemark);
    // myPlacemark.events
    //     .add('mouseenter', function (e) {
    //         e.get('target').options.set('preset', 'islands#greenIcon');
    //     })
    //     .add('mouseleave', function (e) {
    //         e.get('target').options.unset('preset');
    //     });

    myMap.events.add('click', function (e) {
        if (isAddingMark) {
            const coords = e.get('coords');
            addGeoObject(coords);
            isAddingMark = false;
        }
    });
}

function addCircle(coords, myGeoObject) {
    var myCircle = new ymaps.Circle([
        coords,
        1000 // радиус в метрах, 1000 потому, что пока не передаем радиус
    ], {
        // balloonContent: "Радиус области - 10 км",
        hintContent: "Область покрытия"
    }, {
        draggable: false,
        fillColor: "#DB709377", // можно по идее больше цветов
        strokeColor: "#990066",
        strokeOpacity: 0.8,
        strokeWidth: 5
    });

    myMap.geoObjects.add(myCircle);
    
    myGeoObject.events.add('click', function () {
        if (isDelete && !myMap.geoObjects.GeoObject) {
            myMap.geoObjects.remove(myCircle);
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
            balloonContent: // здесь выгружать данные из бд, только некоторые (улица, количество оставшихся мест для операторов мб, ...)
             ` 
                <div style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">
                    <strong style="font-size: 16px; color: #007BFF;">Координаты:</strong><br>
                    <span>${coords.join(", ")}</span><br><br>
                    <a href="https://example.com" target="_blank" style="color: #007BFF; text-decoration: none;">Подробная информация</a>
                </div>
            `
        }
    }, {
        preset: 'islands#blackStretchyIcon',
        draggable: true
    });
    // тут бы еще считывать радиус из бд и передавать в функцию
    addCircle(coords, myGeoObject);
    myMap.geoObjects.add(myGeoObject);

    myGeoObject.events.add('click', function () {
        if (isDelete) {
            myMap.geoObjects.remove(myGeoObject);
            isDelete = false
        }
    });
}