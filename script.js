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