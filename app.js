<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Báo giá VinFast</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 p-4">
  <div class="max-w-5xl mx-auto bg-white rounded-2xl shadow p-6 space-y-6">

    <!-- HEADER -->
    <div class="text-center">
      <h1 class="text-2xl font-bold text-red-600">BÁO GIÁ VINFAST</h1>
      <p class="text-sm text-gray-500">VINFAST CARON GIA LÂM - HÀ NỘI</p>
      <p class="text-sm">NVKD: NGUYỄN VĂN PHÚC - 09.838.07.838</p>
    </div>

    <!-- INPUT -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <select id="carSelect" class="border p-2 rounded"></select>

      <input id="discountMillion" type="number" placeholder="Giảm tiền (triệu)" class="border p-2 rounded" />

      <div class="flex gap-2">
        <label><input type="checkbox" name="discountPercents" value="1" />1%</label>
        <label><input type="checkbox" name="discountPercents" value="2" />2%</label>
        <label><input type="checkbox" name="discountPercents" value="3" />3%</label>
      </div>

      <input id="feePercent" type="number" placeholder="Phí %" class="border p-2 rounded" />
    </div>

    <!-- QUOTE -->
    <div class="bg-gray-50 p-4 rounded-xl space-y-2">
      <h2 class="font-bold text-lg">THÔNG TIN BÁO GIÁ</h2>
      <p>Xe: <b id="qModel"></b></p>
      <p>Giá niêm yết: <b id="qListPrice"></b></p>
      <p>Giảm giá: <b id="qDiscount"></b></p>
      <p>Giá sau giảm: <b id="qFinalPrice"></b></p>
      <p>Phí: <b id="qFee"></b></p>
      <p class="text-red-600 text-lg">Giá lăn bánh: <b id="qOnRoad"></b></p>
      <div id="qGift" class="text-sm"></div>
    </div>

    <!-- LOAN (ĐÃ CHUYỂN XUỐNG DƯỚI) -->
    <div class="bg-white border rounded-xl p-4 space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="font-bold text-lg">TÍNH TRẢ GÓP</h2>
        <label class="flex items-center gap-2">
          <input type="checkbox" id="loanEnabled" /> Bật
        </label>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <input id="loanMonths" type="number" placeholder="Số tháng" class="border p-2 rounded" />
        <input id="prepayPercent" type="number" placeholder="Trả trước %" class="border p-2 rounded" />
        <input id="interestRate" type="number" placeholder="Lãi suất %" class="border p-2 rounded" />
      </div>

      <div id="loanSummary" class="text-sm text-gray-600"></div>

      <div class="overflow-auto max-h-80">
        <table class="w-full text-sm border">
          <thead class="bg-gray-200">
            <tr>
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
    </div>

  </div>

<script>
// ===== DATA (GIỮ NGUYÊN) =====
const cars = [
  { model: "VF 3", version: "Eco", price: 302000000, accessories: "Gói 5tr" },
  { model: "VF 5", version: "Plus", price: 529000000, accessories: "Gói 8tr" }
];

function formatMoneyVND(x) {
  return Math.round(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function el(id) { return document.getElementById(id); }

function getInputs() {
  return {
    discountMillion: Number(el("discountMillion").value || 0),
    discountPercents: Array.from(document.querySelectorAll('input[name="discountPercents"]:checked')).map(n=>Number(n.value)),
    loanEnabled: el("loanEnabled").checked,
    loanMonths: Number(el("loanMonths").value || 12),
    prepayPercent: Number(el("prepayPercent").value || 30),
    interestRate: Number(el("interestRate").value || 10),
    feePercent: Number(el("feePercent").value || 10),
  };
}

function calcLoan(principal, months, rate) {
  let remain = principal;
  const r = rate/1200;
  const goc = principal/months;
  const rows = [];
  for(let i=1;i<=months;i++){
    const lai = remain*r;
    rows.push({i, remain, goc, lai, total:goc+lai});
    remain -= goc;
  }
  return rows;
}

function render(){
  const car = cars[el("carSelect").value||0];
  const input = getInputs();

  const percent = input.discountPercents.reduce((a,b)=>a+b,0);
  const discount = car.price*percent/100 + input.discountMillion*1e6;
  const final = car.price - discount;
  const fee = final*input.feePercent/100;
  const onroad = final + fee;

  el("qModel").textContent = car.model + " " + car.version;
  el("qListPrice").textContent = formatMoneyVND(car.price);
  el("qDiscount").textContent = formatMoneyVND(discount);
  el("qFinalPrice").textContent = formatMoneyVND(final);
  el("qFee").textContent = formatMoneyVND(fee);
  el("qOnRoad").textContent = formatMoneyVND(onroad);
  el("qGift").textContent = car.accessories;

  if(!input.loanEnabled) return;

  const vay = final*(1-input.prepayPercent/100);
  const rows = calcLoan(vay, input.loanMonths, input.interestRate);

  el("loanSummary").textContent = "Vay: "+formatMoneyVND(vay);

  const tbody = el("loanTableBody");
  tbody.innerHTML = "";

  rows.forEach(r=>{
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${r.i}</td><td>${formatMoneyVND(r.remain)}</td><td>${formatMoneyVND(r.goc)}</td><td>${formatMoneyVND(r.lai)}</td><td>${formatMoneyVND(r.total)}</td>`;
    tbody.appendChild(tr);
  });
}

function init(){
  const select = el("carSelect");
  cars.forEach((c,i)=>{
    const o=document.createElement("option");
    o.value=i;
    o.textContent=c.model+" - "+c.version;
    select.appendChild(o);
  });

  document.querySelectorAll("input,select").forEach(e=>e.addEventListener("input",render));
  render();
}

document.addEventListener("DOMContentLoaded",init);
</script>
</body>
</html>
