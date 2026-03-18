<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <title>Báo giá VinFast</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="bg-gray-100 p-4">
  <div class="max-w-3xl mx-auto bg-white p-4 rounded-2xl shadow">

    <h1 class="text-xl font-bold mb-3">BÁO GIÁ XE VINFAST</h1>

    <!-- CHỌN XE -->
    <select id="carSelect" class="w-full border p-2 rounded mb-3"></select>

    <!-- INPUT -->
    <div class="grid grid-cols-2 gap-2 mb-3">
      <input id="discountMillion" type="number" placeholder="Giảm tiền (triệu)" class="border p-2 rounded" />
      <input id="feePercent" type="number" placeholder="% phí lăn bánh" class="border p-2 rounded" value="10"/>
    </div>

    <label class="block mb-2">
      <input type="checkbox" id="loanEnabled" /> Tính trả góp
    </label>

    <div class="grid grid-cols-3 gap-2 mb-3">
      <input id="loanMonths" type="number" placeholder="Tháng" class="border p-2 rounded" value="60"/>
      <input id="prepayPercent" type="number" placeholder="% trả trước" class="border p-2 rounded" value="30"/>
      <input id="interestRate" type="number" placeholder="Lãi suất %" class="border p-2 rounded" value="10"/>
    </div>

    <button id="calcBtn" class="bg-blue-600 text-white px-4 py-2 rounded w-full mb-4">
      TÍNH TOÁN
    </button>

    <!-- KẾT QUẢ -->
    <div class="bg-gray-50 p-3 rounded mb-3">
      <p id="qModel"></p>
      <p>Giá niêm yết: <b id="qListPrice"></b></p>
      <p>Giảm giá: <b id="qDiscount"></b></p>
      <p>Giá sau giảm: <b id="qFinalPrice"></b></p>
      <p>Phí: <b id="qFee"></b></p>
      <p class="text-red-600 font-bold">Lăn bánh: <span id="qOnRoad"></span></p>
      <div id="qGift" class="mt-2 text-sm"></div>
    </div>

    <!-- TRẢ GÓP -->
    <div id="loanSection" class="hidden bg-gray-50 p-3 rounded mb-3">
      <div id="loanSummary" class="mb-2 text-sm"></div>
      <table class="w-full text-sm border">
        <thead>
          <tr class="bg-gray-200">
            <th>Tháng</th>
            <th>Dư nợ</th>
            <th>Gốc</th>
            <th>Lãi</th>
            <th>Tổng</th>
          </tr>
        </thead>
        <tbody id="loanTableBody"></tbody>
      </table>
    </div>

    <!-- NÚT ZALO -->
    <button id="zaloBtn" class="bg-green-600 text-white px-4 py-2 rounded w-full">
      GỬI ZALO
    </button>

  </div>

<script>
const SALES_NAME = "NGUYỄN VĂN PHÚC";
const SALES_PHONE = "0983807838";

// ===== DATA XE =====
const cars = [
  { model: "VF 3", version: "Eco", price: 302000000, accessories: "Tặng gói 5tr" },
  { model: "VF 5", version: "Plus", price: 529000000, accessories: "Tặng gói 8tr" },
  { model: "VF 6", version: "Eco", price: 689000000, accessories: "Tặng gói 8tr" },
  { model: "VF 7", version: "Eco", price: 799000000, accessories: "Tặng gói 8tr" },
  { model: "VF 8", version: "Eco", price: 1019000000, accessories: "Tặng gói 8tr" },
];

// ===== FORMAT =====
function money(x){
  return Math.round(x).toLocaleString("vi-VN") + " đ";
}

// ===== TRẢ GÓP =====
function calcLoan(principal, months, rate){
  let arr=[], remain=principal;
  let goc=Math.floor(principal/months);
  let r=rate/1200;

  for(let i=1;i<=months;i++){
    let lai=Math.floor(remain*r);
    if(i===months) goc=remain;
    arr.push({i,remain,goc,lai,total:goc+lai});
    remain-=goc;
  }
  return arr;
}

let currentData={};

function render(){
  let car=cars[carSelect.value];
  let discount=discountMillion.value*1000000;
  let final=car.price-discount;
  let fee=final*(feePercent.value/100);
  let onRoad=final+fee;

  qModel.innerText=car.model+" "+car.version;
  qListPrice.innerText=money(car.price);
  qDiscount.innerText=money(discount);
  qFinalPrice.innerText=money(final);
  qFee.innerText=money(fee);
  qOnRoad.innerText=money(onRoad);
  qGift.innerText=car.accessories;

  currentData={car,final,fee,onRoad};

  if(!loanEnabled.checked){
    loanSection.classList.add("hidden");
    return;
  }

  let loan=onRoad*(1-prepayPercent.value/100);
  let rows=calcLoan(loan,loanMonths.value,interestRate.value);

  loanSummary.innerHTML=`
  Vay: <b>${money(loan)}</b> | ${loanMonths.value} tháng | ${interestRate.value}%`;

  loanTableBody.innerHTML="";
  rows.forEach(r=>{
    loanTableBody.innerHTML+=`
    <tr>
      <td>${r.i}</td>
      <td>${money(r.remain)}</td>
      <td>${money(r.goc)}</td>
      <td>${money(r.lai)}</td>
      <td><b>${money(r.total)}</b></td>
    </tr>`;
  });

  loanSection.classList.remove("hidden");
}

// ===== ZALO =====
zaloBtn.onclick=()=>{
  let c=currentData;
  let msg=`
BÁO GIÁ XE VINFAST

Xe: ${c.car.model} ${c.car.version}
Giá: ${money(c.car.price)}
Sau giảm: ${money(c.final)}
Lăn bánh: ${money(c.onRoad)}

Liên hệ: ${SALES_NAME}
${SALES_PHONE}
`;

  let url="https://zalo.me/"+SALES_PHONE+"?text="+encodeURIComponent(msg);
  window.open(url);
}

// ===== INIT =====
cars.forEach((c,i)=>{
  carSelect.innerHTML+=`<option value="${i}">${c.model} - ${money(c.price)}</option>`;
});

calcBtn.onclick=render;
render();
</script>

</body>
</html>
