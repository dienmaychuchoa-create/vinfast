export function calcLoanSchedule({ principal, months, annualRate }) {
  const schedule = [];
  let remaining = principal;
  let principalMonthly = Math.floor(principal / months);
  const rateMonthly = annualRate / 1200;

  for (let i = 1; i <= months; i += 1) {
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
