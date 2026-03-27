import { useEffect, useMemo, useRef, useState } from "react";
import html2canvas from "html2canvas";
import Header from "./components/Header";
import LoanControls from "./components/LoanControls";
import LoanSection from "./components/LoanSection";
import QuoteConfig from "./components/QuoteConfig";
import QuoteSummary from "./components/QuoteSummary";
import { cars } from "./data/cars";
import { calcLoanSchedule } from "./utils/loan";

const DISCOUNT_OPTIONS = [3, 5, 6, 10];
const LOCATION_FEE_OPTIONS = [20_000_000, 7_000_000];

function buildGroups(items) {
  const groups = new Map();
  items.forEach((c, i) => {
    if (!groups.has(c.model)) groups.set(c.model, []);
    groups.get(c.model).push({ c, i });
  });
  return groups;
}

function readInitialQueryState(carsLength) {
  const defaults = {
    carIndex: 0,
    colorName: "",
    colorPriceMillion: 0,
    discountPercents: [],
    discountMillion: 0,
    loanEnabled: false,
    loanMonths: 24,
    prepayPercent: 20,
    interestRate: 8,
    locationFee: null,
  };

  if (typeof window === "undefined") return defaults;

  const params = new URLSearchParams(window.location.search);

  const carParam = Number(params.get("car"));
  const carIndex = Number.isFinite(carParam)
    ? Math.max(0, Math.min(carsLength - 1, Math.floor(carParam)))
    : defaults.carIndex;

  const colorName = params.get("colorName") || defaults.colorName;
  const colorPriceParam = Number(params.get("colorPrice"));
  const colorPriceMillion = Number.isFinite(colorPriceParam)
    ? Math.max(0, colorPriceParam)
    : defaults.colorPriceMillion;

  const discountPercents = (params.get("dp") || "")
    .split(",")
    .map((v) => Number(v))
    .filter((v) => DISCOUNT_OPTIONS.includes(v));

  const discountMillionParam = Number(params.get("dm"));
  const discountMillion = Number.isFinite(discountMillionParam)
    ? Math.max(0, discountMillionParam)
    : defaults.discountMillion;

  const loanEnabled = params.get("loan") === "1";

  const loanMonthsParam = Number(params.get("months"));
  const loanMonths = Number.isFinite(loanMonthsParam)
    ? Math.max(1, Math.floor(loanMonthsParam))
    : defaults.loanMonths;

  const prepayPercentParam = Number(params.get("prepay"));
  const prepayPercent = Number.isFinite(prepayPercentParam)
    ? Math.max(0, Math.min(100, Math.floor(prepayPercentParam)))
    : defaults.prepayPercent;

  const interestRateParam = Number(params.get("rate"));
  const interestRate = Number.isFinite(interestRateParam)
    ? Math.max(0, interestRateParam)
    : defaults.interestRate;

  const locationFeeParam = Number(params.get("loc"));
  const locationFee = LOCATION_FEE_OPTIONS.includes(locationFeeParam)
    ? locationFeeParam
    : defaults.locationFee;

  return {
    carIndex,
    colorName,
    colorPriceMillion,
    discountPercents,
    discountMillion,
    loanEnabled,
    loanMonths,
    prepayPercent,
    interestRate,
    locationFee,
  };
}

export default function App() {
  const [initialQueryState] = useState(() => readInitialQueryState(cars.length));
  const [carIndex, setCarIndex] = useState(initialQueryState.carIndex);
  const [colorName, setColorName] = useState(initialQueryState.colorName);
  const [colorPriceMillion, setColorPriceMillion] = useState(initialQueryState.colorPriceMillion);
  const [discountPercents, setDiscountPercents] = useState(initialQueryState.discountPercents);
  const [discountMillion, setDiscountMillion] = useState(initialQueryState.discountMillion);
  const [loanEnabled, setLoanEnabled] = useState(initialQueryState.loanEnabled);
  const [loanMonths, setLoanMonths] = useState(initialQueryState.loanMonths);
  const [prepayPercent, setPrepayPercent] = useState(initialQueryState.prepayPercent);
  const [interestRate, setInterestRate] = useState(initialQueryState.interestRate);
  const [status, setStatus] = useState("");
  const [locationFee, setLocationFee] = useState(initialQueryState.locationFee);
  const [copyStatus, setCopyStatus] = useState("");
  const shareCaptureRef = useRef(null);

  const groups = useMemo(() => buildGroups(cars), []);
  const car = cars[carIndex] ?? cars[0];
  const colorExtraPrice = Math.max(0, Math.round((Number(colorPriceMillion) || 0) * 1_000_000));
  const listPrice = car.price + colorExtraPrice;

  const safeLoanMonths = Math.max(1, Math.floor(Number(loanMonths) || 1));
  const safePrepayPercent = Math.min(100, Math.max(0, Math.floor(Number(prepayPercent) || 0)));
  const safeInterestRate = Math.max(0, Number(interestRate) || 0);

  const percentTotal = discountPercents.reduce((sum, v) => sum + (Number.isFinite(v) ? v : 0), 0);
  const discountByPercent = Math.max(0, Math.round((listPrice * percentTotal) / 100));
  const discountByCash = Math.max(0, Math.round((Number(discountMillion) || 0) * 1_000_000));
  const discount = discountByPercent + discountByCash;
  const finalPrice = Math.max(0, listPrice - discount);

  const feePercent = 0;
  const fee = Math.round((finalPrice * feePercent) / 100);
  const selectedLocationFee = Number.isFinite(locationFee) ? locationFee : 0;
  const onRoad = finalPrice + fee + selectedLocationFee;

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

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams();
    const selectedPercents = [...discountPercents]
      .filter((v) => DISCOUNT_OPTIONS.includes(v))
      .sort((a, b) => a - b);

    params.set("car", String(carIndex));
    if (colorName.trim()) params.set("colorName", colorName.trim());
    params.set("colorPrice", String(Math.max(0, Number(colorPriceMillion) || 0)));
    params.set("dp", selectedPercents.join(","));
    params.set("dm", String(Math.max(0, Number(discountMillion) || 0)));
    params.set("loan", loanEnabled ? "1" : "0");
    params.set("months", String(safeLoanMonths));
    params.set("prepay", String(safePrepayPercent));
    params.set("rate", String(safeInterestRate));
    if (Number.isFinite(locationFee)) params.set("loc", String(locationFee));

    const query = params.toString();
    const nextUrl = `${window.location.pathname}${query ? `?${query}` : ""}`;
    window.history.replaceState(null, "", nextUrl);
  }, [
    carIndex,
    colorName,
    colorPriceMillion,
    discountPercents,
    discountMillion,
    loanEnabled,
    safeLoanMonths,
    safePrepayPercent,
    safeInterestRate,
    locationFee,
  ]);

  const toggleDiscountPercent = (percent) => {
    setDiscountPercents((prev) =>
      prev.includes(percent) ? prev.filter((p) => p !== percent) : [...prev, percent],
    );
  };

  const handleRefresh = () => {
    setStatus("Đã cập nhật.");
    setTimeout(() => setStatus(""), 1200);
  };

  const handleSharePageImage = async () => {
    if (typeof window === "undefined") return;

    try {
      const captureNode = shareCaptureRef.current;
      if (!captureNode) throw new Error("Missing capture node");

      const canvas = await html2canvas(captureNode, {
        useCORS: true,
        backgroundColor: "#ffffff",
        ignoreElements: (el) => el.id === "share-image-fab" || el.id === "share-image-toast",
      });

      const blob = await new Promise((resolve) => {
        canvas.toBlob(resolve, "image/png");
      });

      if (!blob) throw new Error("Cannot create image blob");

      const file = new File([blob], `vinfast-quote-${Date.now()}.png`, {
        type: "image/png",
      });

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: "VinFast Bao gia",
          files: [file],
        });
        setCopyStatus("Da mo chia se anh");
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = file.name;
        a.click();
        URL.revokeObjectURL(url);
        setCopyStatus("Da tai anh");
      }
    } catch {
      setCopyStatus("Khong the chia se anh");
    } finally {
      setTimeout(() => setCopyStatus(""), 1500);
    }
  };

  const toggleLocationFee = (feeValue) => {
    setLocationFee((prev) => (prev === feeValue ? null : feeValue));
  };

  return (
    <>
      <main className="mx-auto max-w-5xl bg-slate-100 p-3 text-slate-900 sm:p-6">
        <section className="rounded-2xl bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.15)] sm:p-8">
          <Header />

          <div className="space-y-8">
            <QuoteConfig
              groups={groups}
              carIndex={carIndex}
              onCarIndexChange={setCarIndex}
              colorName={colorName}
              onColorNameChange={setColorName}
              colorExtraPriceMillion={colorPriceMillion}
              onColorExtraPriceMillionChange={setColorPriceMillion}
              discountPercents={discountPercents}
              onToggleDiscountPercent={toggleDiscountPercent}
              discountMillion={discountMillion}
              onDiscountMillionChange={setDiscountMillion}
            />

            <section>
              <div ref={shareCaptureRef} className="space-y-8">
                <QuoteSummary
                  car={car}
                  colorName={colorName}
                  listPrice={listPrice}
                  percentTotal={percentTotal}
                  discountByPercent={discountByPercent}
                  discountByCash={discountByCash}
                  finalPrice={finalPrice}
                  onRoad={onRoad}
                  locationFee={locationFee}
                  onToggleLocationFee={toggleLocationFee}
                />
                <LoanSection
                  isVisible={loanEnabled}
                  loanAmount={loanAmount}
                  onRoad={onRoad}
                  loanMonths={safeLoanMonths}
                  interestRate={safeInterestRate}
                  prepayPercent={safePrepayPercent}
                  rows={loanRows}
                />
              </div>
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
          </div>
        </section>
      </main>

      <button
        id="share-image-fab"
        type="button"
        onClick={handleSharePageImage}
        aria-label="Chia se trang thanh anh"
        title="Chia se trang thanh anh"
        className="fixed bottom-5 right-5 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#00529b] text-white shadow-lg hover:bg-[#00457f] focus:outline-none focus:ring-2 focus:ring-[#00529b]/40"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-5 w-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 12a4 4 0 0 1 4-4h5" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 12a4 4 0 0 1-4 4H8M9 8l-2 2 2 2m6 4 2-2-2-2"
          />
        </svg>
      </button>

      {copyStatus ? (
        <div
          id="share-image-toast"
          className="fixed bottom-20 right-5 z-50 rounded-lg bg-slate-900/90 px-3 py-2 text-xs font-medium text-white shadow-lg"
        >
          {copyStatus}
        </div>
      ) : null}
    </>
  );
}
