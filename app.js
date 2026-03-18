<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Báo giá VinFast</title>

<style>
body {
  font-family: -apple-system, BlinkMacSystemFont;
  background: #f5f6f8;
  margin: 0;
}

.container {
  max-width: 480px;
  margin: auto;
  padding: 12px;
}

.card {
  background: white;
  border-radius: 16px;
  padding: 14px;
  margin-bottom: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

h2 {
  text-align: center;
}

select, input {
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #ddd;
  margin-top: 6px;
}

.btn {
  display: block;
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  text-align: center;
  font-weight: bold;
  margin-top: 10px;
}

.btn-red { background:#d71920; color:white; }
.btn-blue { background:#0068ff; color:white; }
.btn-green { background:#28a745; color:white; }

.result { font-size: 18px; font-weight: bold; color:#d71920; }
</style>
</head>

<body>
<div class="container">

<h2>🚗 Báo giá VinFast</h2>

<div class="card">
<label>Chọn xe</label>
<select id="carSelect"></select>

<label>Tỉnh</label>
<select id="province">
<option>Hà Nội</option>
<option>TP.HCM</option>
<option>Đà Nẵng</option>
<option>Khác</option>
</select>

<label>Giảm thêm (triệu)</label>
<input id="discountMillion" type="number" value="0">

<label><input type="checkbox" id="loanEnabled"> Trả góp</label>

<label>Trả trước (%)</label>
<input id="prepayPercent" type="number" value="30">

<label>Số tháng</label>
<input id="loanMonths" type="number" value="60">

<label>Lãi suất (%/năm)</label>
<input id="interestRate" type="number" value="9.5">

<button class="btn btn-red" onclick="render()">TÍNH GIÁ</button>
</div>

<div class="card">
<div id="qModel"></div>
<div>Giá: <span id="qListPrice"></span></div>
<div>Giảm: <span id="qDiscount"></span></div>
<div>Giá sau giảm: <b id="qFinalPrice"></b></div>
<div>Lăn bánh: <div class="result" id="qOnRoad"></div></div>
<div id="qLoan"></div>
</div>

<a id="zaloBtn" class="btn btn-blue">📲 Gửi Zalo</a>
<a id="callBtn" class="btn btn-green">📞 Gọi ngay</a>

</div>

<script>
const SALES_NAME = "NGUYỄN VĂN PHÚC";
const SALES_PHONE = "0983807838";

const cars = [
  {model:"VF 5", version:"Plus", price:529000000},
  {model:"VF 6", version:"Eco", price:689000000},
  {model:"VF 6", version:"Plus", price:749000000},
  {model:"VF 7", version:"Eco", price:799000000},
  {model:"VF 8", version:"Eco", price:1019000000}
];

const provinceFees = {
  "Hà Nội":12,
  "TP.HCM":11,
  "Đà Nẵng":10,
  "Khác":8
};

function format(x){
  return new Intl.NumberFormat("vi-VN").format(x);
}

function calcLoan(principal, months, rate){
  const r = rate/1200;
  const A = principal * r * Math.pow(1+r, months) / (Math.pow(1+r, months)-1);
  return Math.round(A);
}

function render(){
  const car = cars[document.getElementById("carSelect").value];
  const discount = document.getElementById("discountMillion").value * 1000000;
  const finalPrice = car.price - discount;

  const province = document.getElementById("province").value;
  const feePercent = provinceFees[province];

  const onRoad = finalPrice + finalPrice*feePercent/100;

  document.getElementById("qModel").innerText = car.model + " - " + car.version;
  document.getElementById("qListPrice").innerText = format(car.price) + " đ";
  document.getElementById("qDiscount").innerText = format(discount) + " đ";
  document.getElementById("qFinalPrice").innerText = format(finalPrice) + " đ";
  document.getElementById("qOnRoad").innerText = format(onRoad) + " đ";

  let loanText = "";
  let monthly = 0;

  if(document.getElementById("loanEnabled").checked){
    const percent = document.getElementById("prepayPercent").value;
    const months = document.getElementById("loanMonths").value;
    const rate = document.getElementById("interestRate").value;

    const loan = finalPrice * (1 - percent/100);
    monthly = calcLoan(loan, months, rate);

    loanText = `💳 Góp ${months} tháng: ${format(monthly)} đ/tháng`;
  }

  document.getElementById("qLoan").innerText = loanText;

  const message = `
🚗 ${car.model} ${car.version}
💰 Giá: ${format(finalPrice)} đ
📍 Lăn bánh: ${format(onRoad)} đ
${loanText}

👨‍💼 ${SALES_NAME}
📞 ${SALES_PHONE}
`;

  document.getElementById("zaloBtn").href =
    "https://zalo.me/" + SALES_PHONE + "?text=" + encodeURIComponent(message);

  document.getElementById("callBtn").href =
    "tel:" + SALES_PHONE;
}

function init(){
  const select = document.getElementById("carSelect");
  cars.forEach((c,i)=>{
    const opt = document.createElement("option");
    opt.value = i;
    opt.text = c.model + " - " + c.version;
    select.appendChild(opt);
  });
  render();
}

init();
</script>

</body>
</html>
