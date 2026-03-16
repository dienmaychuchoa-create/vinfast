const SHOWROOM_NAME = "VINFAST CARON GIA LÂM - HÀ NỘI";
const SALES_NAME = "NGUYỄN VĂN PHÚC";
const SALES_PHONE = "09.838.07.838";

// Data adapted from phuc.txt (full list in the provided file).
const cars = [
  {
    model: "VF 3",
    version: "Eco",
    price: 302_000_000,
    accessories: "Gói 5tr (Phim cách nhiệt, Cam hành trình - Quy đổi 1tr).",
  },
  {
    model: "VF 3",
    version: "Eco (TC2)",
    price: 302_000_000,
    accessories: "Gói 5tr (Phim cách nhiệt, Cam hành trình - Quy đổi 1tr).",
  },
  {
    model: "VF 3",
    version: "Plus",
    price: 315_000_000,
    accessories: "Gói 5tr (Phim cách nhiệt, Cam hành trình - Quy đổi 1tr).",
  },
  {
    model: "VF 5",
    version: "Plus",
    price: 529_000_000,
    accessories: "Gói 8tr (Phim Sungard, Cam hành trình - Quy đổi 2tr).",
  },
  {
    model: "VF 6",
    version: "Eco",
    price: 689_000_000,
    accessories: "Gói 8tr (Phim Sungard, Cam hành trình - Quy đổi 2tr).",
  },
  {
    model: "VF 6",
    version: "Plus",
    price: 749_000_000,
    accessories: "Gói 8tr (Phim Sungard, Cam hành trình - Quy đổi 2tr).",
  },
  {
    model: "VF 6",
    version: "Plus Limited",
    price: 749_000_000,
    accessories: "Gói 8tr (Phim Sungard, Cam hành trình - Quy đổi 2tr).",
  },
  {
    model: "VF 7",
    version: "Eco TC1",
    price: 799_000_000,
    accessories: "Gói 8tr (Phim Sungard, Cam hành trình - Quy đổi 2tr).",
  },
  {
    model: "VF 7",
    version: "Eco TC2",
    price: 789_000_000,
    accessories: "Gói 8tr (Phim Sungard, Cam hành trình - Quy đổi 2tr).",
  },
  {
    model: "VF 7",
    version: "Plus (NC, TC1-2 cầu, CATL)",
    price: 999_000_000,
    accessories: "Gói 8tr (Phim Sungard, Cam hành trình - Quy đổi 2tr).",
  },
  {
    model: "VF 7",
    version: "Plus (TC2-2 cầu)",
    price: 939_000_000,
    accessories: "Gói 8tr (Phim Sungard, Cam hành trình - Quy đổi 2tr).",
  },
  {
    model: "VF 7",
    version: "Plus (TC1-1 cầu, pin CATL)",
    price: 949_000_000,
    accessories: "Gói 8tr (Phim Sungard, Cam hành trình - Quy đổi 2tr).",
  },
  {
    model: "VF 7",
    version: "Plus (TC2-1 cầu, pin Gotion)",
    price: 889_000_000,
    accessories: "Gói 8tr (Phim Sungard, Cam hành trình - Quy đổi 2tr).",
  },
  {
    model: "VF 8",
    version: "Eco (1 cầu)",
    price: 1_019_000_000,
    accessories: "Gói 8tr (Phim Sungard, Cam hành trình - Quy đổi 2tr).",
  },
  {
    model: "VF 8",
    version: "Eco (2 cầu)",
    price: 1_069_000_000,
    accessories: "Gói 8tr (Phim Sungard, Cam hành trình - Quy đổi 2tr).",
  },
  {
    model: "VF 8",
    version: "Plus",
    price: 1_199_000_000,
    accessories: "Gói 8tr (Phim Sungard, Cam hành trình - Quy đổi 2tr).",
  },
  {
    model: "VF 9",
    version: "Eco 7 chỗ",
    price: 1_499_000_000,
    accessories: "Gói 14tr (Phim 3M, Cam hành trình - Quy đổi 5tr).",
  },
  {
    model: "VF 9",
    version: "Plus 7 chỗ",
    price: 1_699_000_000,
    accessories: "Gói 14tr (Phim 3M, Cam hành trình - Quy đổi 5tr).",
  },
  {
    model: "VF 9",
    version: "Plus 6 chỗ",
    price: 1_731_000_000,
    accessories: "Gói 14tr (Phim 3M, Cam hành trình - Quy đổi 5tr).",
  },
  {
    model: "Lạc Hồng 900",
    version: "Limited",
    price: 5_000_000_000,
    accessories: "Tặng gói phụ kiện chính hãng VinFast cao cấp.",
  },
  {
    model: "Herio Green",
    version: "Edition",
    price: 499_000_000,
    accessories: "Gói 5tr (Cam hành trình - Quy đổi 1tr).",
  },
  {
    model: "Minio Green",
    version: "Edition",
    price: 269_000_000,
    accessories: "Gói 5tr (Cam hành trình - Quy đổi 1tr).",
  },
  {
    model: "Limo Green",
    version: "Edition",
    price: 749_000_000,
    accessories: "Gói 8tr (Phim EST, Cam hành trình - Quy đổi 4tr).",
  },
  {
    model: "VF MPV7",
    version: "Tiêu chuẩn",
    price: 819_000_000,
    accessories: "Tặng 2 năm bảo hành thân vỏ (Quy đổi 15 triệu).",
  },
  {
    model: "EC Van",
    version: "Tiêu chuẩn",
    price: 285_000_000,
    accessories: "Gói 5tr (Phim tiêu chuẩn, Cam gương - Quy đổi 2tr).",
  },
  {
    model: "EC Van",
    version: "Nâng cao",
    price: 305_000_000,
    accessories: "Gói 5tr (Phim tiêu chuẩn, Cam gương - Quy đổi 2tr).",
  },
  {
    model: "EC Van",
    version: "Nâng cao (Cửa trượt)",
    price: 325_000_000,
    accessories: "Gói 5tr (Phim tiêu chuẩn, Cam gương - Quy đổi 2tr).",
  },
];

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
  return { discountMillion, loanEnabled, loanMonths, prepayPercent, interestRate };
}

function calcLoanSchedule({ principal, months, annualRate }) {
  // Same logic as phuc.txt: equal principal each month, interest on remaining balance.
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

  const { discountMillion, loanEnabled, loanMonths, prepayPercent, interestRate } = getInputs();
  const discount = Math.max(0, Math.round(discountMillion * 1_000_000));
  const finalPrice = Math.max(0, car.price - discount);
  const onRoad = finalPrice + 5_000_000;

  el("qModel").textContent = `${car.model} - ${car.version}`;
  el("qListPrice").textContent = `${formatMoneyVND(car.price)} đ`;
  el("qDiscount").textContent = `- ${formatMoneyVND(discount)} đ`;
  el("qFinalPrice").textContent = `${formatMoneyVND(finalPrice)} đ`;
  el("qOnRoad").textContent = `${formatMoneyVND(onRoad)} đ`;
  el("qGift").innerHTML = `<span class="font-semibold">QUÀ TẶNG KHUYẾN MÃI:</span><br>${car.accessories}`;

  const loanSection = el("loanSection");
  if (!loanEnabled) {
    loanSection.classList.add("hidden");
    return;
  }

  const loanAmount = Math.max(0, Math.round(finalPrice * (1 - prepayPercent / 100)));
  el(
    "loanSummary",
  ).innerHTML = `Số tiền vay: <b>${formatMoneyVND(loanAmount)} đ</b> | Thời gian: <b>${loanMonths} tháng</b> | Lãi suất: <b>${interestRate}%/năm</b> | Vay: <b>${100 - prepayPercent}%</b>`;

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
      <td class="px-3 py-2 text-center text-slate-700">${r.month}</td>
      <td class="px-3 py-2 text-right text-slate-900">${formatMoneyVND(r.remaining)}</td>
      <td class="px-3 py-2 text-right text-slate-900">${formatMoneyVND(r.principal)}</td>
      <td class="px-3 py-2 text-right text-slate-900">${formatMoneyVND(r.interest)}</td>
      <td class="px-3 py-2 text-right font-semibold text-slate-900">${formatMoneyVND(
        r.total,
      )} đ</td>
    `;
    tbody.appendChild(tr);
  }

  loanSection.classList.remove("hidden");

  // Update header info (in case you want to change later)
  document.title = `${car.model} - Báo giá`;
  // These constants are here for future use; for now HTML uses static text.
  void SHOWROOM_NAME;
  void SALES_NAME;
  void SALES_PHONE;
}

function init() {
  const carSelect = el("carSelect");
  carSelect.innerHTML = "";

  // Category grouping by model (VF 3, VF 6, VF 7, ...)
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
  });

  render();
}

document.addEventListener("DOMContentLoaded", init);

