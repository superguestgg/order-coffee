let count = 1;
let orderCounts = 1;

function addNewBeverageOrder()
{
    orderCounts++;
    const orders = document.getElementsByTagName('fieldset');
    const form = orders[orders.length - 1];
    const newForm = document.createElement('fieldset');
    newForm.innerHTML = form.innerHTML.replace(/milk(?:\d+)?/g, `milk${count}`);
    newForm.querySelector('.beverage-count').textContent = `Напиток №${++count}`;
    newForm.className = 'beverage';
    newForm.querySelector('.delete-button').addEventListener('click', (event) => deleteOrder(event));
    form.insertAdjacentElement("afterend", newForm);
}

function deleteOrder(event){
    if (orderCounts === 1)
        return;
    event.target.parentElement.remove();
    orderCounts--;
}

function getDrinkWordForm(){
    if (orderCounts > 10 && orderCounts < 14)
        return 'напитков';

    const lastDigit = orderCounts % 10;
    if (lastDigit === 1)
        return 'напиток';
    if (lastDigit >= 2 && lastDigit <= 4)
        return 'напитка';
    return 'напитков';
}


document.querySelector('.add-button').addEventListener('click', addNewBeverageOrder);
document.querySelector('.delete-button').addEventListener('click', (event) => deleteOrder(event));
document.querySelector('.submit-button').addEventListener('click', (event)  =>{
    event.preventDefault();
    document.querySelector('.overlay').style.display = 'unset';
    const element = document.createElement('h3');
    element.textContent = `Вы заказали ${orderCounts} ${getDrinkWordForm()}`;
    document.querySelector('.lightbox').appendChild(element)

    let table = document.createElement('table');
    let head = table.createTHead();
    let row = document.createElement('tr');
    let cell1 = document.createElement('td');
    let cell2 = document.createElement('td');
    let cell3 = document.createElement('td');
    cell1.textContent = 'Напиток';
    cell2.textContent = 'Молоко';
    cell3.textContent = 'Дополнительно';
    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    head.appendChild(row);
    document.querySelector('.lightbox').appendChild(table);
    let body = table.createTBody();
    let orders = document.querySelectorAll('.beverage');
    console.log(orders);
    const replacements = {
        'взбитых сливок': 'взбитые сливки',
        'зефирок': 'зефирки',
        'корицу': 'корица',
        'шоколад': 'шоколад'
    };
    orders.forEach((beverage) => {
        let selectedMilk = beverage.querySelector(`input[type="radio"]:checked`).nextElementSibling.textContent;
        const selectedMilkArr = selectedMilk.split(' ');
        selectedMilkArr[1] = 'молоко';
        selectedMilkArr[0] = selectedMilkArr[0].substring(0, selectedMilkArr[0].length-1) + 'е';
        selectedMilk = selectedMilkArr.join(" ");

        let selectedOptions = [];
        beverage.querySelectorAll(`input[type="checkbox"]:checked`)
            .forEach((option) => {
            let optionText = option.nextElementSibling.textContent;
            selectedOptions.push(replacements[optionText]);
        });
        let row = document.createElement('tr');
        let cell1 = document.createElement('td');
        let cell2 = document.createElement('td');
        let cell3 = document.createElement('td');
        cell1.textContent = beverage.querySelector('select').selectedOptions[0].text;
        cell2.textContent = selectedMilk;
        cell3.textContent = selectedOptions.join(', ');
        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        body.appendChild(row);
    });
})
document.querySelector('.overlay-close-button').addEventListener('click', (event) =>{
    event.preventDefault();
    document.querySelector('.overlay').querySelector('h3').remove();
    document.querySelector('table').remove();
    document.querySelector('.overlay').style.display = 'none';
});
