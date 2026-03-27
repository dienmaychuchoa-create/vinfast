import { formatMoneyVND } from "../utils/format";

const DISCOUNT_OPTIONS = [3, 5, 6, 10];

export default function QuoteConfig({
  groups,
  carIndex,
  onCarIndexChange,
  colorName,
  onColorNameChange,
  colorExtraPriceMillion,
  onColorExtraPriceMillionChange,
  discountPercents,
  onToggleDiscountPercent,
  discountMillion,
  onDiscountMillionChange,
}) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-[#00529b]">Cấu hình báo giá</h2>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Chọn mẫu xe</span>
          <select
            value={carIndex}
            onChange={(e) => onCarIndexChange(Number(e.target.value || 0))}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-[#00529b] focus:outline-none focus:ring-2 focus:ring-[#00529b]/20"
          >
            {Array.from(groups.entries()).map(([model, items]) => (
              <optgroup key={model} label={model}>
                {items.map(({ c, i }) => (
                  <option key={i} value={i}>
                    {c.version} ({formatMoneyVND(c.price)} đ)
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Phụ thu màu (triệu đồng)</span>
          <input
            type="number"
            min="0"
            step="1"
            value={colorExtraPriceMillion}
            onChange={(e) => onColorExtraPriceMillionChange(Number(e.target.value || 0))}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-[#00529b] focus:outline-none focus:ring-2 focus:ring-[#00529b]/20"
          />
        </label>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        

        <fieldset className="block">
          <legend className="text-sm font-medium text-slate-700">Chương trình ưu đãi</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {DISCOUNT_OPTIONS.map((percent) => (
              <label
                key={percent}
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-800 shadow-sm"
              >
                <input
                  type="checkbox"
                  checked={discountPercents.includes(percent)}
                  onChange={() => onToggleDiscountPercent(percent)}
                  className="h-4 w-4 rounded border-slate-300 text-[#00529b] focus:ring-[#00529b]/20"
                />
                {percent}%
              </label>
            ))}
          </div>
        </fieldset>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Giảm giá (triệu đồng)</span>
          <input
            type="number"
            min="0"
            step="1"
            value={discountMillion}
            onChange={(e) => onDiscountMillionChange(Number(e.target.value || 0))}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-[#00529b] focus:outline-none focus:ring-2 focus:ring-[#00529b]/20"
          />
        </label>
      </div>
    </section>
  );
}
