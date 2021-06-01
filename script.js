var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        createAllTable()
    }
};
xhttp.open("GET", "doc.xml", true);
xhttp.send();

function createAllTable(){
    var countries = xhttp.responseXML.getElementsByTagName("country");
    for(var i = 0; i < countries.length; i++){
        createTable(countries[i])
    }
}

function createTable(country) {
    console.log(country)
    var name = document.createElement('h2');
    name.innerHTML = country.getElementsByTagName("name")[0].textContent;
    document.body.appendChild(name);
    var table = document.createElement('table');
    table.setAttribute('border', '1');
    table.setAttribute('cellpadding', '4');

    var thead = document.createElement("thead")
    var tr = thead.insertRow();
    tr.setAttribute("bgcolor", "#483D8B");
    tr.setAttribute("align", "center");    
    tr.setAttribute("style", "font-weight: bold;");
    tr.setAttribute("style", "color: #FFFFFF;");
    addCell(tr, "Тип тура");
    addCell(tr, "Горящий тур");
    addCell(tr, "Описание");
    addCell(tr, "Цена");
    addCell(tr, "Кол-во мест");
    thead.appendChild(tr);
    table.appendChild(thead);
    var tbdy = document.createElement('tbody');
    var tours = country.getElementsByTagName("tour");
    for(var i = 0; i < tours.length; i++) {
        var tour = tours[i]
        tr = tbdy.insertRow();
        tr.setAttribute("align", "center"); 
        var name = tour.getElementsByTagName("type")[0].textContent;
        var burned = ""
        if(tour.getElementsByTagName("burn")[0] != null) burned+="+"
        var descr = tour.getElementsByTagName("description")[0].textContent;
        var price = tour.getElementsByTagName("price")[0].textContent;
        var quantity = tour.getElementsByTagName("quantity")[0].textContent;
        addCell(tr, name);
        addCell(tr, burned);
        addCell(tr, descr);
        addCell(tr, price);
        addCell(tr, quantity);
        tbdy.appendChild(tr);
    }
    table.appendChild(tbdy);
    document.body.appendChild(table);
}

function addCell(tr, value) {
    if (!isNaN(+value)) {
        value = numberToWord(value);
    }
    var td = tr.insertCell();
    td.setAttribute('value', value)
    td.textContent = value;
}

function numberToWord(number) {
    var res = "";
    var units = ["ноль", "один", "два", "три", "четыре", "пять", "шесть", "семь", "восемь", "девять"];
    if(number.length == 1) {
        return units[+number];
    }
    var special = ["десять", "одиннадцать", "двенадцать", "тринадцать", "четырнадцать", "пятнадцать", "шестнадцать", "семнадцать", "восемнадцать", "девятнадцать"];
    var dozens = ["двадцать", "тридцать", "сорок", "пятьдесят", "шестьдесят", "семьдесят", "восемьдесят", "девяносто"];
    if(number.length == 2) {
        if(number == '00') {
            return "";
        }
        if(number[0] == '1') {
            return special[+number[1]];
        }
        var dozen = number[0] - 2;
        res = dozens[dozen];
        number = number.substring(1);
        if(number == "0") return res;
        return res + " " + numberToWord(number);
    }
    var hundreds = ["сто", "двести", "триста", "четыреста", "пятьсот", "шестьсот", "семьсот", "восемьсот", "девятьсот"];
    if(number.length == 3) {
        if(number == '000') {
            return "";
        }
        var hundred = number[0] - 1;
        res = hundreds[hundred];
        number = number.substring(1);
        return res + " " + numberToWord(number);
    }
    var thousands = ["одна тысяча", "две тысячи", "три тысячи", "четыре тысячи", "пять тысяч", "шесть тысяч", "семь тысяч", "восемь тысяч", "девять тысяч"];
    if(number.length == 4) {
        if(number == '0000') {
            return "";
        }
        var thousand = number[0] - 1;
        res = thousands[thousand];
        number = number.substring(1);
        return res + " " + numberToWord(number);
    }

    return number;
}
