import { formatMoneyVND } from "../utils/format";

export default function LoanSection({
  isVisible,
  loanAmount,
  onRoad,
  loanMonths,
  interestRate,
  prepayPercent,
  rows,
}) {
  if (!isVisible) return null;
  const prepayAmount = Math.max(0, onRoad - loanAmount);

  return (
    <section>
      <h2 className="text-lg font-semibold text-[#00529b]">DỰ TOÁN TRẢ GÓP CHI TIẾT</h2>
      <p className="mt-2 text-sm text-slate-700">
        Số tiền vay: <b>{formatMoneyVND(loanAmount)} đ</b> | Thời gian: <b>{loanMonths} tháng</b>{" "}
        | Lãi suất: <b>{interestRate}%/năm</b> | Vay: <b>{100 - prepayPercent}%</b> | Số tiền trả
        trước: <b>{formatMoneyVND(prepayAmount)} đ</b>
      </p>

      <div className="mt-4 rounded-xl border border-slate-200 bg-white">
        <div className="min-w-[720px]">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-slate-50">
              <tr className="text-slate-700">
                <th className="border-b border-slate-200 px-3 py-2 text-center font-semibold">
                  Tháng
                </th>
                <th className="border-b border-slate-200 px-3 py-2 text-right font-semibold">
                  Dư nợ gốc
                </th>
                <th className="border-b border-slate-200 px-3 py-2 text-right font-semibold">
                  Tiền Gốc
                </th>
                <th className="border-b border-slate-200 px-3 py-2 text-right font-semibold">
                  Tiền Lãi
                </th>
                <th className="border-b border-slate-200 px-3 py-2 text-right font-semibold">
                  Tổng Trả
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {rows.map((r) => (
                <tr key={r.month}>
                  <td className="px-3 py-2 text-center">{r.month}</td>
                  <td className="px-3 py-2 text-right">{formatMoneyVND(r.remaining)}</td>
                  <td className="px-3 py-2 text-right">{formatMoneyVND(r.principal)}</td>
                  <td className="px-3 py-2 text-right">{formatMoneyVND(r.interest)}</td>
                  <td className="px-3 py-2 text-right font-semibold">{formatMoneyVND(r.total)} đ</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
