import Header from './components/Header';
import InvestmentsType from './components/InvestmentsType';
import Main from './components/Main';

import { allInvestments } from './data/investments';

export default function App() {
  const typeOfInvestments = allInvestments.investments;
  const reports = allInvestments.reports;

  return (
    <>
      <Header>React Investments</Header>

      <Main>
        {typeOfInvestments.map(type => {
          const investmentReport = reports.filter(
            report => report.investmentId === type.id
          );

          return (
            <InvestmentsType key={type.id} descr={type.description}>
              {investmentReport}
            </InvestmentsType>
          );
        })}
      </Main>
    </>
  );
}
