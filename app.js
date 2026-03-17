const SHOWROOM_NAME = "VINFAST CARON GIA LÂM - HÀ NỘI";
const SALES_NAME = "NGUYỄN VĂN PHÚC";
const SALES_PHONE = "09.838.07.838";

const cars = [/* giữ nguyên danh sách cars của bạn */];

function formatMoneyVND(x) {
  const n = Math.max(0, Math.round(Number(x) || 0));
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function el(id) {
  const node = document.getElementById(id);
  if (!node) throw new Error(`Missing element #${id}`);
  return node;
}

function getInputs() {
  const discountMillion = Number(el("discountMillion").value || 0);
  const loanEnabled = el("loanEnabled").checked;
  const loanMonths = Math.max(1, Math.floor(Number(el("loanMonths").value || 1)));
  const prepayPercentRaw = Number(el("prepayPercent").value || 0);
  const prepayPercent = Math.min(100, Math.max(0, Math.floor(prepayPercentRaw)));
  const interestRate = Math.max(0, Number(el("interestRate").value || 0));

  // ✅ NEW: lấy % phí
  const feePercent = Number(el("feePercent")?.value || 0);

  return {
    discountMillion,
    loanEnabled,
    loanMonths,
    prepayPercent,
    interestRate,
    feePercent,
  };
}

function calcLoanSchedule({ principal, months, annualRate }) {
  const schedule = [];
  let remaining = principal;
  let principalMonthly = Math.floor(principal / months);
  const rateMonthly = annualRate / 1200;

  for (let i = 1; i <= months; i++) {
    const interest = Math.floor(remaining * rateMonthly);
    if (i === months) principalMonthly = remaining;

    schedule.push({
      month: i,
      remaining,
      principal: principalMonthly,
      interest,
      total: principalMonthly + interest,
    });

    remaining -= principalMonthly;
  }

  return schedule;
}

function render() {
  const status = el("status");
  status.textContent = "";

  const carSelect = el("carSelect");
  const idx = Number(carSelect.value || 0);
  const car = cars[idx] ?? cars[0];

  if (!car) {
    status.textContent = "Chưa có dữ liệu xe.";
    return;
  }

  const {
    discountMillion,
    loanEnabled,
    loanMonths,
    prepayPercent,
    interestRate,
    feePercent,
  } = getInputs();

  const discount = Math.max(0, Math.round(discountMillion * 1_000_000));
  const finalPrice = Math.max(0, car.price - discount);

  // ✅ NEW: tính phí %
  const fee = Math.round((finalPrice * feePercent) / 100);

  // ❗ thay 5tr cố định = phí %
  const onRoad = finalPrice + fee;

  el("qModel").textContent = `${car.model} - ${car.version}`;
  el("qListPrice").textContent = `${formatMoneyVND(car.price)} đ`;
  el("qDiscount").textContent = `- ${formatMoneyVND(discount)} đ`;
  el("qFinalPrice").textContent = `${formatMoneyVND(finalPrice)} đ`;
  el("qOnRoad").textContent = `${formatMoneyVND(onRoad)} đ`;

  // ✅ nếu có dòng hiển thị phí thì update
  const feeEl = document.getElementById("qFee");
  if (feeEl) {
    feeEl.textContent = `${formatMoneyVND(fee)} đ (${feePercent}%)`;
  }

  el("qGift").innerHTML =
    `<span class="font-semibold">QUÀ TẶNG KHUYẾN MÃI:</span><br>${car.accessories}`;

  const loanSection = el("loanSection");

  if (!loanEnabled) {
    loanSection.classList.add("hidden");
    return;
  }

  const loanAmount = Math.max(
    0,
    Math.round(finalPrice * (1 - prepayPercent / 100))
  );

  el("loanSummary").innerHTML =
    `Số tiền vay: <b>${formatMoneyVND(loanAmount)} đ</b> | 
     Thời gian: <b>${loanMonths} tháng</b> | 
     Lãi suất: <b>${interestRate}%/năm</b> | 
     Vay: <b>${100 - prepayPercent}%</b>`;

  const tbody = el("loanTableBody");
  tbody.innerHTML = "";

  const rows = calcLoanSchedule({
    principal: loanAmount,
    months: loanMonths,
    annualRate: interestRate,
  });

  for (const r of rows) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="px-3 py-2 text-center">${r.month}</td>
      <td class="px-3 py-2 text-right">${formatMoneyVND(r.remaining)}</td>
      <td class="px-3 py-2 text-right">${formatMoneyVND(r.principal)}</td>
      <td class="px-3 py-2 text-right">${formatMoneyVND(r.interest)}</td>
      <td class="px-3 py-2 text-right font-semibold">
        ${formatMoneyVND(r.total)} đ
      </td>
    `;
    tbody.appendChild(tr);
  }

  loanSection.classList.remove("hidden");

  document.title = `${car.model} - Báo giá`;
}

function init() {
  const carSelect = el("carSelect");
  carSelect.innerHTML = "";

  const groups = new Map();

  cars.forEach((c, i) => {
    if (!groups.has(c.model)) groups.set(c.model, []);
    groups.get(c.model).push({ c, i });
  });

  for (const [model, items] of groups.entries()) {
    const optgroup = document.createElement("optgroup");
    optgroup.label = model;

    items.forEach(({ c, i }) => {
      const opt = document.createElement("option");
      opt.value = String(i);
      opt.textContent = `${c.version} (${formatMoneyVND(c.price)} đ)`;
      optgroup.appendChild(opt);
    });

    carSelect.appendChild(optgroup);
  }

  el("calcBtn").addEventListener("click", render);

  ["change", "input"].forEach((evt) => {
    carSelect.addEventListener(evt, render);
    el("discountMillion").addEventListener(evt, render);
    el("loanEnabled").addEventListener(evt, render);
    el("loanMonths").addEventListener(evt, render);
    el("prepayPercent").addEventListener(evt, render);
    el("interestRate").addEventListener(evt, render);

    // ✅ NEW: lắng nghe fee %
    const feeSelect = document.getElementById("feePercent");
    if (feeSelect) feeSelect.addEventListener(evt, render);
  });

  render();
}

document.addEventListener("DOMContentLoaded", init);
