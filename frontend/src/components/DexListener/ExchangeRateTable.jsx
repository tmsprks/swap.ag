import { useState } from 'react';

const ExchangeRateTable = ({ pairs, exchangeRates }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsVisible(!isVisible)}
        className=" text-gray-400 px-4 py-2 rounded focus:outline-none mb-4"
      >
        {isVisible ? 'Hide Exchange Rates' : 'Show Exchange Rates'}
      </button>

      {isVisible && (
        <div className="min-w-full overflow-hidden overflow-x-auto rounded-[20px] shadow-3xl">
          <table className="min-w-full leading-normal ">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Pair
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Exchange
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Exchange Rate
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(pairs).map(([pair, exchanges]) =>
                Object.entries(exchanges).map(([exchange, address]) => (
                  <tr key={address} className="hover:bg-gray-100">
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {pair}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {exchange}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {exchangeRates[pair + '-' + exchange]
                        ? exchangeRates[pair + '-' + exchange].toFixed(10)
                        : 'Loading...'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ExchangeRateTable;
