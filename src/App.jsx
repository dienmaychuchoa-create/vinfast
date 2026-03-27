import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import LoanControls from "./components/LoanControls";
import LoanSection from "./components/LoanSection";
import QuoteConfig from "./components/QuoteConfig";
import QuoteSummary from "./components/QuoteSummary";
import { cars } from "./data/cars";
import { calcLoanSchedule } from "./utils/loan";

function buildGroups(items) {
  const groups = new Map();
  items.forEach((c, i) => {
    if (!groups.has(c.model)) groups.set(c.model, []);
    groups.get(c.model).push({ c, i });
  });
  return groups;
}

export default function App() {
  const [carIndex, setCarIndex] = useState(0);
  const [discountPercents, setDiscountPercents] = useState([]);
  const [discountMillion, setDiscountMillion] = useState(0);
  const [loanEnabled, setLoanEnabled] = useState(false);
  const [loanMonths, setLoanMonths] = useState(24);
  const [prepayPercent, setPrepayPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(8);
  const [status, setStatus] = useState("");

  const groups = useMemo(() => buildGroups(cars), []);
  const car = cars[carIndex] ?? cars[0];

  const safeLoanMonths = Math.max(1, Math.floor(Number(loanMonths) || 1));
  const safePrepayPercent = Math.min(100, Math.max(0, Math.floor(Number(prepayPercent) || 0)));
  const safeInterestRate = Math.max(0, Number(interestRate) || 0);

  const percentTotal = discountPercents.reduce((sum, v) => sum + (Number.isFinite(v) ? v : 0), 0);
  const discountByPercent = Math.max(0, Math.round((car.price * percentTotal) / 100));
  const discountByCash = Math.max(0, Math.round((Number(discountMillion) || 0) * 1_000_000));
  const discount = discountByPercent + discountByCash;
  const finalPrice = Math.max(0, car.price - discount);

  const feePercent = 0;
  const fee = Math.round((finalPrice * feePercent) / 100);
  const onRoad = finalPrice + fee;

  const loanAmount = Math.max(0, Math.round(finalPrice * (1 - safePrepayPercent / 100)));
  const loanRows = useMemo(
    () =>
      calcLoanSchedule({
        principal: loanAmount,
        months: safeLoanMonths,
        annualRate: safeInterestRate,
      }),
    [loanAmount, safeLoanMonths, safeInterestRate],
  );

  useEffect(() => {
    document.title = `${car.model} - Báo giá`;
  }, [car.model]);

  const toggleDiscountPercent = (percent) => {
    setDiscountPercents((prev) =>
      prev.includes(percent) ? prev.filter((p) => p !== percent) : [...prev, percent],
    );
  };

  const handleRefresh = () => {
    setStatus("Đã cập nhật.");
    setTimeout(() => setStatus(""), 1200);
  };

  return (
    <main className="mx-auto max-w-5xl bg-slate-100 p-3 text-slate-900 sm:p-6">
      <section className="rounded-2xl bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.15)] sm:p-8">
        <Header />

        <div className="space-y-8">
          <QuoteConfig
            groups={groups}
            carIndex={carIndex}
            onCarIndexChange={setCarIndex}
            discountPercents={discountPercents}
            onToggleDiscountPercent={toggleDiscountPercent}
            discountMillion={discountMillion}
            onDiscountMillionChange={setDiscountMillion}
          />

          <section>
            <QuoteSummary
              car={car}
              percentTotal={percentTotal}
              discountByPercent={discountByPercent}
              discountByCash={discountByCash}
              finalPrice={finalPrice}
              onRoad={onRoad}
            />
            <LoanControls
              loanEnabled={loanEnabled}
              onLoanEnabledChange={setLoanEnabled}
              loanMonths={safeLoanMonths}
              onLoanMonthsChange={setLoanMonths}
              prepayPercent={safePrepayPercent}
              onPrepayPercentChange={setPrepayPercent}
              interestRate={safeInterestRate}
              onInterestRateChange={setInterestRate}
              onRefresh={handleRefresh}
              status={status}
            />
          </section>

          <LoanSection
            isVisible={loanEnabled}
            loanAmount={loanAmount}
            loanMonths={safeLoanMonths}
            interestRate={safeInterestRate}
            prepayPercent={safePrepayPercent}
            rows={loanRows}
          />
        </div>
      </section>
    </main>
  );
}
