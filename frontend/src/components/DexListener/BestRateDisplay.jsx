const BestRateDisplay = ({ bestRate, bestExchange, bestPair }) => (
  <div className="mt-6">
    <div className="flex mt-2">
      <p>
        Best Rate For: {bestPair} is on {bestExchange}: {bestRate.toFixed(10)}
      </p>
    </div>
  </div>
);

export default BestRateDisplay;
