import React, { useMemo } from 'react';
import useDexRates from '../../hooks/useDexRates';
import BestRateDisplay from './BestRateDisplay';
import ExchangeRateTable from './ExchangeRateTable';
import pairs from '../../data/pairs';
import { setBestRate, resetBestRate } from '../../store/reducers/bestRateSlice';

import { useDispatch } from 'react-redux';

// Utility to compute best rate
const getBestRate = (exchangeRates, singlePair, dispatch) => {
  let bestRate = 0;
  let bestExchange;
  let bestPair;

  Object.entries(singlePair).forEach(([pair, exchanges]) =>
    Object.entries(exchanges).forEach(([exchange]) => {
      const currentRate = exchangeRates[pair + '-' + exchange];
      if (currentRate && currentRate > bestRate) {
        bestRate = currentRate;
        bestExchange = exchange;
        bestPair = pair;
      }
    })
  );

  dispatch(setBestRate({ bestRate, bestExchange, bestPair }));
  return { bestRate, bestExchange, bestPair };
};

const DexListener = (props) => {
  const dispatch = useDispatch();

  const desiredPairKey = props.pairKey;
  // Check if the desiredPairKey exists in pairs before proceeding.
  if (desiredPairKey === '/' || /^.+\/$/.test(desiredPairKey)) {
    return null;
  } else if (!pairs[desiredPairKey]) {
    dispatch(resetBestRate());
    return <p className="text-red-500 text-xs">This pair is not supported.</p>;
  }

  const singlePair = useMemo(() => {
    return { [desiredPairKey]: pairs[desiredPairKey] };
  }, [desiredPairKey]);

  const exchangeRates = useDexRates(singlePair);

  const { bestRate, bestExchange, bestPair } = useMemo(
    () => getBestRate(exchangeRates, singlePair, dispatch),
    [exchangeRates, singlePair]
  );

  return (
    <div>
      <BestRateDisplay
        bestRate={bestRate}
        bestExchange={bestExchange}
        bestPair={bestPair}
      />
      <ExchangeRateTable pairs={singlePair} exchangeRates={exchangeRates} />
    </div>
  );
};

export default React.memo(DexListener);
