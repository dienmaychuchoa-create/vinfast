import { formatMoneyVND } from "../utils/format";

export default function QuoteSummary({
  car,
  colorName,
  listPrice,
  percentTotal,
  discountByPercent,
  discountByCash,
  finalPrice,
  onRoad,
  locationFee,
  onToggleLocationFee,
}) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-[#00529b]">THÔNG TIN BÁO GIÁ XE</h2>

      <div className="mt-4 rounded-xl border border-slate-200 bg-white">
        <div className="divide-y divide-slate-200">
          <div className="grid grid-cols-1 gap-2 px-4 py-3 sm:grid-cols-3 sm:items-center">
            <div className="text-left text-sm font-medium text-slate-700">Mẫu xe</div>
            <div className="break-words text-right text-sm font-semibold text-slate-900 sm:col-span-2 sm:text-left">
              {car.model} - {car.version}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 px-4 py-3 sm:grid-cols-3 sm:items-center">
            <div className="text-left text-sm font-medium text-slate-700">Phụ thu màu</div>
            <div className="tabular-nums text-right text-sm text-slate-900 sm:col-span-2">
              {Math.max(0, listPrice - car.price) > 0
                ? `+ ${formatMoneyVND(Math.max(0, listPrice - car.price))} đ`
                : "0 đ"}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 px-4 py-3 sm:grid-cols-3 sm:items-center">
            <div className="text-left text-sm font-medium text-slate-700">Giá niêm yết</div>
            <div className="tabular-nums text-right text-sm text-slate-900 sm:col-span-2">
              {formatMoneyVND(listPrice)} đ
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 px-4 py-3 sm:grid-cols-3 sm:items-center">
            <div className="text-left text-sm font-medium text-slate-700">Ưu đãi giảm giá(%)</div>
            <div className="tabular-nums text-right text-sm font-medium text-emerald-700 sm:col-span-2">
              {percentTotal > 0
                ? `- ${formatMoneyVND(discountByPercent)} đ (${percentTotal}%)`
                : "- 0 đ"}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 px-4 py-3 sm:grid-cols-3 sm:items-center">
            <div className="text-left text-sm font-medium text-slate-700">
              Giảm giá (triệu đồng)
            </div>
            <div className="tabular-nums text-right text-sm font-medium text-emerald-700 sm:col-span-2">
              {discountByCash > 0 ? `- ${formatMoneyVND(discountByCash)} đ` : "- 0 đ"}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 px-4 py-3 sm:grid-cols-3 sm:items-center">
            <div className="text-left text-sm font-semibold text-slate-900">GIÁ XE SAU GIẢM</div>
            <div className="tabular-nums text-right text-xl font-bold text-rose-600 sm:col-span-2 sm:text-2xl">
              {formatMoneyVND(finalPrice)} đ
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 px-4 py-3 sm:grid-cols-3 sm:items-center">
            <div className="text-left text-sm font-medium text-slate-700">Tùy chọn khu vực</div>
            <div className="flex flex-wrap justify-end gap-3 sm:col-span-2">
              <label className="inline-flex items-center gap-2 text-sm font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={locationFee === 20_000_000}
                  onChange={() => onToggleLocationFee(20_000_000)}
                  className="h-4 w-4 rounded border-slate-300 text-[#00529b] focus:ring-[#00529b]/20"
                />
                HN/HCM (+{formatMoneyVND(20_000_000)} đ)
              </label>
              <label className="inline-flex items-center gap-2 text-sm font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={locationFee === 7_000_000}
                  onChange={() => onToggleLocationFee(7_000_000)}
                  className="h-4 w-4 rounded border-slate-300 text-[#00529b] focus:ring-[#00529b]/20"
                />
                Tỉnh lẻ (+{formatMoneyVND(7_000_000)} đ)
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 px-4 py-3 sm:grid-cols-3 sm:items-center">
            <div className="text-left text-sm font-semibold text-slate-900 uppercase">Giá lăn bánh</div>
            <div className="tabular-nums text-right text-base font-bold text-[#00529b] sm:col-span-2 sm:text-lg">
              {formatMoneyVND(onRoad)} đ
            </div>
          </div>

          
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-sky-300 bg-sky-50 px-4 py-3 text-sm text-[#00529b]">
        <span className="font-semibold">QUÀ TẶNG KHUYẾN MÃI:</span>
        <br />
        {car.accessories}
      </div>
    </section>
  );
}
