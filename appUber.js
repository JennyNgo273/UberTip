// Khai bao cacmang gia va gia cho cho cac loai xe
const ARRAY_PRICE_X = [8000, 12000, 10000];
const WAITTING_UBER_X = 2000; 

const ARRAY_PRICE_SUV = [9000, 14000, 12000];
const WAITTING_SUV = 3000; 

const ARRAY_PRICE_BLACK = [10000, 16000, 14000];
const WAITTING_BLACK = 4000; 

function checkType(){
    var uberX = document.getElementById("uberX");
    var uberSUV = document.getElementById("uberSUV");
    var uberBlack = document.getElementById("uberBlack");

    if(uberX.checked){
        return "uberX";
    }else if(uberSUV.checked){
        return "uberSUV";
    }else if(uberBlack.checked){
        return "uberBlack";
    }
}
//tinh tien cho
function calculateWaittingPrice(waittingTime, waittingPrice){
    var priceWait = 0;
    if(waittingTime >= 3){
        priceWait = Math.round(waittingTime/3.0) * waittingPrice;
    }
    return priceWait
}
//tinh tien di duoc
function calculatePrice(km, waittingTime, arrayPrice, waittingPrice){
    var priceWait = calculateWaittingPrice(waittingTime, waittingPrice);
    if(km <= 1){
        return arrayPrice[0] + priceWait;     
    }else if(km > 1 && km <= 20){
        return arrayPrice[0] + (km-1) * arrayPrice[1] + priceWait;     
    }else if(km > 20){
        return arrayPrice[0] + 19 * arrayPrice[1] + (km-20) * arrayPrice[2] + priceWait;     
    }
}
//tinh tong tien
function calculateTotal(){
    var km = document.getElementById("soKM").value;
    var waittingTime = document.getElementById("thoiGianCho").value;

    km = parseFloat(km);
    waittingTime = parseFloat(waittingTime);

    var price = 0;
    var type = checkType();
    switch(type){
        case "uberX": 
            price = calculatePrice(km,waittingTime, ARRAY_PRICE_X, WAITTING_UBER_X);
        break;
        case "uberSUV": 
        price = calculatePrice(km,waittingTime, ARRAY_PRICE_SUV, WAITTING_SUV);
        break;
        case "uberBlack": 
        price = calculatePrice(km,waittingTime, ARRAY_PRICE_BLACK, WAITTING_BLACK);
        break;
        default:
            alert("Vui long chon loaixe");
    }
    return price;
}
document.getElementById("btnTinhTien").onclick = function(){
    var price = calculateTotal();
    document.getElementById("divThanhTien").style.display = "block";
    document.getElementById("xuatTien").innerHTML = price;
}

//print reciept
function renderRowChiTietKm(type, arrayKm, arrayPrice, tblBody){
    for (var i = 0; i<arrayKm.length; i++){
        var tr = document.createElement("tr");

        var tdType = document.createElement("td");
        var tdUsed = document.createElement("td");
        var tdDonGia = document.createElement("td");
        var tdPrice = document.createElement("td");

        tdType.innerHTML = type;
        tdUsed.innerHTML = arrayKm[i] + "km";
        tdDonGia.innerHTML = arrayPrice[i];
        tdPrice.innerHTML = arrayKm[i] * arrayPrice[i];

        tr.appendChild(tdType);
        tr.appendChild(tdUsed);
        tr.appendChild(tdDonGia);
        tr.appendChild(tdPrice);

        tblBody.appendChild(tr);
    }
}

function renderRowThoiGianCho(waittingTime, waittingPrice, tblBody){
    var priceWait = calculateWaittingPrice(waittingTime, waittingPrice);
    var trThoiGianCho = document.createElement("tr");

    var tdPhutTitle = document.createElement("td");
    var tdPhut = document.createElement("td");
    var tdPhutDonGia = document.createElement("td");
    var tdPhutThanhTien = document.createElement("td");

    tdPhutTitle.innerHTML = "Thoi Gian Cho";
    tdPhut.innerHTML = waittingTime + "phut";
    tdPhutDonGia.innerHTML = waittingPrice;
    tdPhutThanhTien.innerHTML = priceWait;

    trThoiGianCho.appendChild(tdPhutTitle);
    trThoiGianCho.appendChild(tdPhut);
    trThoiGianCho.appendChild(tdPhutDonGia);
    trThoiGianCho.appendChild(tdPhutThanhTien);

    tblBody.appendChild(trThoiGianCho);
}

function renderRowTotal(price, tblBody){
    var trTotal = document.createElement("tr");
    trTotal.className = "alert alert-success";

    var tdTotalTitle = document.createElement("td");
    tdTotalTitle.setAttribute("colspan", 3);//can thiep element

    var tdTotal = document.createElement("td");

    tdTotalTitle.innerHTML = "Tong tien phai tra";
    tdTotal.innerHTML = price;

    trTotal.appendChild(tdTotalTitle);
    trTotal.appendChild(tdTotal);

    tblBody.appendChild(trTotal);

}

function inHoaDon(type, km, waittingTime, waittingPrice, arrayPrice, price){

    var tblBody = document.getElementById("tblBody");
    tblBody.innerHTML = "";//reset lai tbody

    if(km <=1){
        renderRowChiTietKm(type, [1], arrayPrice, tblBody);
    }
    else if (km > 1 && km <= 20){
        renderRowChiTietKm(type, [1, km - 1], arrayPrice, tblBody);
    }
    else if (km > 20){
        renderRowChiTietKm(type, [1, 19, km - 20], arrayPrice, tblBody);
    }
    /**
     * Thoi Gian Cho
     */
    if(waittingTime > 2){
        renderRowThoiGianCho(waittingTime, waittingPrice, tblBody);
    }
    /**
     * Tong tien
     */
    renderRowTotal(price, tblBody);

}

document.getElementById("btnInHD").onclick = function(){
    // var km = doc.getElementById("soKM").value;
    // var waittingTime = document.getElementById("thoiGianCho").value;

    var kq = getData();
    var price = calculateTotal();
    var type = checkType();
    switch(type){
        case "uberX": 
            inHoaDon(type, kq[0], kq[1], WAITTING_UBER_X, ARRAY_PRICE_X, price);
        break;
        case "uberSUV": 
        inHoaDon(type, kq[0], kq[1], WAITTING_SUV, ARRAY_PRICE_SUV, price);
        break;
        case "uberBlack": 
        inHoaDon(type, kq[0], kq[1], WAITTING_BLACK, ARRAY_PRICE_BLACK, price);
        default:
            alert("Vui long chon loai xe");
    }
    return price;

}

function getData(){
    var kq = [];
    var km = document.getElementById("soKM").value;
    km = parseFloat(km);
    kq.push(km);

    var waittingTime = document.getElementById("thoiGianCho").value;
    waittingTime = parseFloat(waittingTime);
    kq.push(waittingTime);
    
    return kq;
}