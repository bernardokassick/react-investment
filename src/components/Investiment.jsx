// .map(
//   ({ id, investmentId, month, year, value }) => {
//     let formatMonth = month.toString().length < 2 ? `0${month}` : `${month}`;
//     return {
//       id: id,
//       typeInvestment: investmentId,
//       month: month,
//       year: year,
//       value: value,
//       fullDate: `${year}-${formatMonth}`,
//     };
//   }
// );

export default function Investiment({ children: tipoInvestimento = [] }) {
  const { id, value, fullDate, percent } = tipoInvestimento;

  const totalRentBgColor =
    percent > 0 ? 'text-green-500' : percent < 0 ? 'text-red-500' : '';

  return (
    <div
      key={id}
      className="p-3 border-solid border-4 border-gray-400 flex flex-row"
    >
      <p className="mr-5 text-lg font-mono"> Date: {fullDate}</p>
      <p className="ml-6 text-lg font-mono">
        {' '}
        Value: {`R$ ${value.toFixed(2)}`}
      </p>
      <p className={'ml-auto text-lg font-semibold ' + totalRentBgColor}>
        Percent: {`${percent.toFixed(2)}%`}
      </p>
    </div>
  );
}
