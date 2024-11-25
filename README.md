# envise

`envise` — это лёгкая и удобная библиотека для работы с переменными окружения из `.env` файлов в проектах Node.js. Она позволяет загружать переменные окружения с помощью минимального количества кода, с возможностью использования нескольких `.env` файлов для конфигурации.

## Установка
```bash
npm install envise
```

## Использование

### Быстрый старт
После установки `envise` автоматически загрузит переменные из файла `.env`, если он находится в текущей рабочей директории:

**Пример `.env` файла:**
```env
TOKEN=your-token-here
DEBUG=true
```

**Код:**
```javascript
const env = require('envise');

console.log(env.get.TOKEN);      // your-token-here
console.log(env.get.DEBUG);      // true
console.log(env.get('TOKEN'));   // your-token-here
console.log(env.get('DEBUG'));   // true
```

### Загрузка кастомного `.env` файла
Если вы хотите использовать другой файл `.env`, просто укажите его путь через `config`:

**Пример файла `custom.env`:**
```env
TOKEN=custom-token
API_KEY=12345
```

**Код:**
```javascript
const env = require('envise').config({ path: './custom.env' });

console.log(env.get.TOKEN);      // custom-token
console.log(env.get.API_KEY);    // 12345
console.log(env.get('TOKEN'));   // custom-token
console.log(env.get('API_KEY')); // 12345
```

### Проверка существования переменной
С помощью объекта `exists` или метода `exists()` вы можете проверить, существует ли переменная окружения:

```javascript
console.log(env.exists.TOKEN);     // true (если TOKEN существует)
console.log(env.exists.FOO);       // false (если FOO не существует)

console.log(env.exists('TOKEN'));  // true
console.log(env.exists('FOO'));    // false
```

## API

### `env.get`
Объект и метод для получения значений переменных окружения:

- Возвращает значение переменной, если она существует.
- Возвращает `undefined`, если переменная не найдена.

**Примеры:**
```javascript
console.log(env.get.TOKEN);    // значение переменной TOKEN или undefined
console.log(env.get('TOKEN')); // значение переменной TOKEN или undefined
```

### `env.exists`
Объект и метод для проверки существования переменной:

- Возвращает `true`, если переменная существует.
- Возвращает `false`, если переменная не найдена.

**Примеры:**
```javascript
console.log(env.exists.DEBUG);    // true или false
console.log(env.exists('DEBUG')); // true или false
```

### `config(options)`
Позволяет загрузить другой `.env` файл. Загруженные переменные будут добавлены или заменят уже существующие.

**Аргументы:**
- `options` — объект с опциями:
  - `path` — путь к файлу `.env`.

**Пример:**
```javascript
require('envise').config({ path: './custom.env' });
```

## Лицензия
Лицензия MIT. Подробности в файле `LICENSE`.
