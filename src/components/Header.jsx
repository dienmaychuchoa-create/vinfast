export default function Header() {
  return (
    <div className="-mt-4 -mx-4 rounded-t-2xl border-t-[10px] border-[#00529b] p-4 pb-4 sm:-mt-8 sm:-mx-8 sm:border-t-[12px] sm:p-8 sm:pb-6">
      <div className="text-center">
        <h1 className="text-xl font-bold tracking-tight text-[#00529b] sm:text-2xl">
          VINFAST CARON GIA LÂM - HÀ NỘI
        </h1>
      </div>
      <p className="mt-3 flex flex-col items-center gap-1 text-sm text-slate-700 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-2 sm:gap-y-1">
        <span>
          <span className="font-semibold text-slate-900">Tư vấn viên:</span> NGUYỄN VĂN
          PHÚC
        </span>
        <span className="hidden text-slate-400 sm:inline">|</span>
        <span>
          <span className="font-semibold text-slate-900">SĐT:</span> 09.838.07.838
        </span>
      </p>
    </div>
  );
}
