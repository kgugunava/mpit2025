const { Client } = require('pg');

// Создание клиента PostgreSQL
const client = new Client({
    user: 'postgres', // ваше имя пользователя
    host: 'localhost', // адрес сервера
    database: 'mpit', // имя базы данных
    password: 'postgres', // ваш пароль
    port: 5432, // порт по умолчанию
});

// Функция для получения координат
async function getCoordinates() {
    try {
        // Подключение к базе данных
        await client.connect();

        // Выполнение SQL-запроса
        const res = await client.query('SELECT coordinates FROM towers');

        // Обработка результатов
        res.rows.forEach(row => {
            console.log(row.coordinates); // вывод координат в консоль
        });
    } catch (err) {
        console.error('Ошибка выполнения запроса', err);
    } finally {
        // Закрытие подключения
        await client.end();
    }
}

// Вызов функции
getCoordinates();