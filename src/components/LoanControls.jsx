export default function LoanControls({
  loanEnabled,
  onLoanEnabledChange,
  loanMonths,
  onLoanMonthsChange,
  prepayPercent,
  onPrepayPercentChange,
  interestRate,
  onInterestRateChange,
  onRefresh,
  status,
}) {
  return (
    <>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={loanEnabled}
            onChange={(e) => onLoanEnabledChange(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-[#00529b] focus:ring-[#00529b]/20"
          />
          <span className="text-sm font-medium text-slate-700">Tính trả góp</span>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Số tháng vay</span>
          <input
            type="number"
            min="1"
            step="1"
            value={loanMonths}
            onChange={(e) => onLoanMonthsChange(Number(e.target.value || 1))}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-[#00529b] focus:outline-none focus:ring-2 focus:ring-[#00529b]/20"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">% Trả trước</span>
          <input
            type="number"
            min="0"
            max="100"
            step="1"
            value={prepayPercent}
            onChange={(e) => onPrepayPercentChange(Number(e.target.value || 0))}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-[#00529b] focus:outline-none focus:ring-2 focus:ring-[#00529b]/20"
          />
        </label>

        <label className="block md:col-span-1">
          <span className="text-sm font-medium text-slate-700">Lãi suất (%/năm)</span>
          <input
            type="number"
            min="0"
            step="0.1"
            value={interestRate}
            onChange={(e) => onInterestRateChange(Number(e.target.value || 0))}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-[#00529b] focus:outline-none focus:ring-2 focus:ring-[#00529b]/20"
          />
        </label>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        

        <div className="flex items-end gap-3 md:col-span-2">
          <button
            type="button"
            onClick={onRefresh}
            className="inline-flex items-center justify-center rounded-lg bg-[#00529b] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#00457f] focus:outline-none focus:ring-2 focus:ring-[#00529b]/30"
          >
            Tính / Cập nhật
          </button>
          <p className="text-sm text-slate-600">{status}</p>
        </div>
      </div>
    </>
  );
}
