import Header from './components/Header';
import Investiment from './components/Investiment';
import InvestmentsType from './components/InvestmentsType';
import Main from './components/Main';

import { allInvestments } from './data/investments';

export default function App() {
  const typeOfInvestments = allInvestments.investments.map(
    ({ description, id }) => {
      return {
        description: description,
        id: id,
      };
    }
  );

  function calcPercent(currentValue, beforeValue) {
    return ((currentValue - beforeValue) * 100) / beforeValue;
  }

  const investments = allInvestments.reports.map(
    ({ id, investmentId, month, year, value }) => {
      let formatMonth = month.toString().length < 2 ? `0${month}` : `${month}`;
      return {
        id: id,
        typeInvestment: investmentId,
        month: month,
        year: year,
        value: value,
        fullDate: `${year}-${formatMonth}`,
      };
    }
  );

  const sortedInvestments = investments.sort((a, b) => {
    return a.fullDate.localeCompare(b.fullDate);
  });

  return (
    <div className="boxboxbox">
      <Header size="large">React Investments</Header>

      <Main>
        {typeOfInvestments.map(type => {
          const newOrdenedReports = sortedInvestments.filter(investment => {
            return type.id === investment.typeInvestment;
          });
          //Calculo de porcentagem
          const filteredInvestments = newOrdenedReports.map(
            (ordReport, index) => {
              if (index === 0) return { ...ordReport, percent: 0 };
              else {
                let beforeValue = parseFloat(
                  newOrdenedReports[index - 1].value
                );
                let percent = calcPercent(
                  parseFloat(ordReport.value),
                  beforeValue
                );
                return { ...ordReport, percent: percent };
              }
            }
          );
          const firstReport = parseFloat(filteredInvestments[0].value);
          const lastReport = parseFloat(
            filteredInvestments[filteredInvestments.length - 1].value
          );
          const totalRent = (lastReport - firstReport).toFixed(2);
          const totalRentPercent = calcPercent(lastReport, firstReport).toFixed(
            2
          );
          const strTotalPercent =
            totalRentPercent > 0 ? '+' + totalRentPercent : totalRentPercent;

          const totalRentBgColor =
            totalRent > 0
              ? 'text-green-500'
              : totalRent < 0
              ? 'text-red-500'
              : '';

          return (
            <InvestmentsType key={type.id}>
              <h1 className="text-4xl font-semibold text-center">
                {type.description}
              </h1>
              <p className="text-2x1 text-center mb-5 font-semibold">
                Rendimento Total:{' '}
                <span className={totalRentBgColor}>
                  R$ {totalRent} ({strTotalPercent}%)
                </span>
              </p>

              {filteredInvestments.map(investment => {
                return (
                  <Investiment key={investment.id}>{investment}</Investiment>
                );
              })}
            </InvestmentsType>
          );
        })}
      </Main>
    </div>
  );
}
