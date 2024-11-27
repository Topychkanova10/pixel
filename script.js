//Подгрузка из Cookie
function get_result_from_cookie() {
    let cookies = document.cookie.split('; ');
    console.log(cookies)
    for(let i = 0; i <cookies.length; i+=1) {
        let cookie = cookies[i].split('=');
        console.log(cookie)
        if(cookie[0] == 'pixel-result') {
            return cookie[1];
        }
    }

return '0' * 450
}

let field = document.querySelector  ('.field');
let temp_result = get_result_from_cookie();
console.log('temp-result', temp_result)