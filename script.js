//Подгрузка из Cookie
function get_result_from_cookie() {
    let cookies = document.cookie.split('; ');
    console.log(cookies)
    for(let i = 0; i <cookies.length; i+=1) {
        let cookie = cookies[i].split('=');
        console.log(cookie)
        if(cookie[0] == 'pixel-result') {//возвращаем его значение
            return cookie[1];
        }
    }

return '0' * 450//еслт cookie не найден, возваращем строку из 450 нулей
}

///глобальные переменные для хранения состояния
let IS_CLICKED = false //нажата ли кнопка мыши
// Текущий цвет кисти из CSS-переменной
let CURRENT_COLOR = getComputedStyle(document.documentElement).getPropertyValue('--color');
let CURRENT_COLORCODE = "1" //кОД текущего цвета
// Цвет по умолчанию
let DEFAULT_COLOR = getComputedStyle(document.documentElement).getPropertyValue('--default-color');
let FILL_MODE = false; //активен ли режим заливки
let COLORS = ["red", "orange", "yellow", "green", "blue", "purple", "black", "white"] //массив цветов

// Обработка событий мыши для изменения флага IS_CLICKED
document.addEventListener('mousedown', () => IS_CLICKED = true);//Устанавливаем тру при нажатии кнопки мыши
document.addEventListener('mouseup', () => IS_CLICKED = false);//Устанавливаем фолс при отпускании кнопки мыши
//Создаем игровое поле
let field = document.querySelector  ('.field');//получаем элемент поля из DOM
let temp_result = get_result_from_cookie();//получаем сохранненое состояние из cookie
console.log('temp-result', temp_result)//Логируем состояние для проверки

//если в cookie есть данные восстанавливаем их
if (temp_result != '0') {
    for (let i = 0; i < 450; i += 1) {
        let cell = document.createElement('div')//создаем новый элемент div для клетки
        cell.classList.add('cell')//добавляем класс cell
        cell.setAttribute('id', `${i}`)//устанавливаем уникальный айди для клетки
        cell.dataset.color = temp_result[i]//сохраняем код цвета клетки в data-атрибут
        cell.style.backgroundColor = COLORS[parseInt(temp_result[i])]//устанавливаем цвет клетки из массива COLORS
        field.appendChild(cell) //Добавляем клетку в поле
    }
}

else {
    //если данных нет, создаем клетку с цветом по умолчанию
    for (let i = 0; i < 450; i += 1) {
        let cell = document.createElement('div')//создаем новый элемент div для клетки
        cell.classList.add('cell')//добавляем класс cell
        cell.setAttribute('id', `${i}`)//устанавливаем уникальный айди для клетки
        cell.dataset.color = "0"
        cell.style.backgroundColor = COLORS[parseInt(temp_result[i])]//устанавливаем цвет клетки из массива COLORS
        field.appendChild(cell) //Добавляем клетку в поле
    }
}

//Добавляем обработчика событий для клеток
let cells = document.querySelectorAll('.cell')//получаем все клетки из DOM
cells.forEach(cell => {
    cell.addEventListener('mouseover', () => {
        // Если кнопка мыши нажата,закрашиваем клетку
        if (IS_CLICKED) {
            anime({ //Анимация закрашивания
                targets: cell, //целевая клетка
                background: CURRENT_COLOR, //устанавливаем цвет из current_color
                easing: 'easeInOutQuad', //плавное ускорение
                duration: 500, //длительность анимации
                delay: anime.stagger(50, {grid: [30, 15], from: cell_id}), //задержка анимации
            })
            cells.forEach(c => c.dataset.color = CURRENT_COLORCODE)//ОБНОВЛЯЕМ КОД ЦВЕТА ДЛЯ ВСЕХ КЛЕТОК    
        } else{
            //Если режим заливки не активен, закрашиваемтолько текущую клетку
            anime({
                targets: '.cell', //все клетки
                background: CURRENT_COLOR, //устанавливаем цвет из current_color
                easing: 'easeInOutQuad', //плавное ускорение
                duration: 500, //длительность анимации
            })
            cell.dataset.color = CURRENT_COLORCODE //оБНОВЛЯЕМ КОД ЦВЕТА КЛЕТКИ
        }
    })
    // При нажатии на кнопку мыши
    cell.addEventListener('mousedown', () => {
        if (FILL_MODE) {
            //Если активен режим заливки
            let cell_id = parseInt(cell.getAttribute('id'))//получаем ID клетки
            FILL_MODE = !FILL_MODE//Деактивируем режим заливки
            anime({//Анимация заливки
                targets: '.cell', //все клетки
                background: CURRENT_COLOR, //устанавливаем цвет из current_color
                duration: 200, //длительность анимации
                easing: 'linear' //линейное ускорение
            })
        }
    })
})
// ОБРАБОТЧИК ВЫБОРА ЦВЕТА
let color_cells = document.querySelectorAll('.color-cell') //получаем элементы цветовой палитры
color_cells.forEach(color_cell  => {
    color_cell.addEventListener('click', () => {
        FILL_MODE = false //деактивируем режим заливки
        CURRENT_COLOR = getComputedStyle(color_cell).backgroundColor //Устанавливеам цвет из выбранной ячейки
        CURRENT_COLORCODE = color_cell.dataset.colorcode //Коц цвета из data-фтрибута
        document.documentElement.style.cssText = `--current-color: ${CURRENT_COLOR}`//оБНОВЛЯЕМ CSS ПЕРЕМЕННУЮ
        document.querySelector('.selected').classList.remove('selected')//Убираем выделение с предыдущей ячейки
        color_cell.classList.add('selected')//Добавляем выделение на текущую ячейку

    })
})

//Обработчик для ластика
document.querySelector('.eraser').addEventListener('click', () => {
    CURRENT_COLOR = DEFAULT_COLOR //Устанавливеам цвет ПО УМОЛЧаНИЮ
    CURRENT_COLORCODE = "0" //Код цвета для ластика
    document.documentElement.style.cssText = `--current-color: ${CURRENT_COLOR}`//оБНОВЛЯЕМ CSS ПЕРЕМЕННУЮ
    document.querySelector('.selected').classList.remove('selected')//Убираем выделение с предыдущей ячейки
    color_cell.classList.add('selected')//Добавляем выделение на текущую ячейку
    this.classList.add('selected') //Выделяем инструмент ластика
})

// Обработчик для инструмента заливки
document.querySelector('.fill-tool').addEventListener('click', () => {
    FILL_BODE = !FILL_MODE //пЕРЕКЛЮЧАЕМ  режим заливки
    document.qerySelector('.selected').classList.remove('selected') //Убираем выделение с других инструментов
    this.classList.add('selected') //Выделяем инструмент заливки
})
//Сохраняем состояния поля в cookie каждую минуту
setInterval(() => {
    let result = ''//Строка для хранения результата
    let temp_cells = document.querySelectorAll('.cell') //Получаем все клетки
    temp_cells.forEach(cell => result += `${sell.dataset.color}`)//дОБАВЛЯЕМ КОД ЦВЕТА КАЖДОЙ ЯЧЕЙКИ
    document.cookie = `pixel-result=${result};max-age=100000`//Сохраняем в cookie
    console.log(document.cookie) //Логиурем для проверки
}, 60000)

// Обработчик для сохранения поля в изображение
document.querySelector('.save-tool').addEventListener('click', () => {
    domtoimage.toJpeg(field, {quality: 2}) // Генерируем изображение поля
    .then((dataUrl) => {
        let link = document.createElement('a') // Создаём ссылку для скачивания
        link.download = 'pixel.jpg' // Имя файла
        link.href = dataUrl // Устанавливаем URL изображения
        link.click() // Инициируем скачивание
    }).catch((error) => console.error('oops, something went wrong!', error)) // Обрабатываем ошибку
})




