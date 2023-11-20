import { useState } from 'react';

const Modal = ({ onClose }) => {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div
            className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 overflow-y-auto"
            style={{ maxHeight: '70vh' }}
          >
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Welcome to swap.ag!
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Dear Visitor, </p>
                  <p className="text-xs text-red-400 py-1">
                    (must accept terms before continuing)
                  </p>
                  <p className="text-sm text-gray-500">
                    The information provided on this website, including any
                    data, tools, products, services and other content, is for
                    informational purposes only and does not constitute
                    investment advice, financial advice, trading advice, or any
                    other sort of advice. Swap.ag does not recommend that any
                    cryptocurrency should be bought, sold, or held by you, and
                    nothing on swap.ag should be taken as an offer to buy, sell
                    or hold a cryptocurrency.
                  </p>
                  <br />
                  <p className="text-sm text-gray-500">
                    Decentralized finance (DeFi) and the use of decentralized
                    exchanges (DEXs) involve a high level of risk, including but
                    not limited to smart contract risks, price volatility,
                    illiquidity, and regulatory uncertainty. You should conduct
                    your own due diligence and consult your financial advisor
                    before making any investment decisions. By using this
                    website, you acknowledge and agree that you are making all
                    of your own decisions in connection with purchases, sales,
                    or transactions in cryptocurrencies and that swap.ag and its
                    proprietors will not be responsible for any losses that may
                    occur.
                  </p>
                  <br />
                  <p className="text-sm text-gray-500">
                    The views, thoughts, and opinions expressed on swap.ag
                    belong solely to the individual authors and contributors and
                    do not reflect the official policy or position of any other
                    agency, organization, employer, or company. Swap.ag and its
                    content providers are not acting in any fiduciary capacity.
                    You should use swap.ag at your own risk.
                  </p>
                  <br />
                  <p className="text-sm text-gray-500">
                    Swap.ag and its proprietors will not be liable for any
                    direct, indirect, incidental, consequential, or punitive
                    damages arising from your access to, use of, or inability to
                    use swap.ag, or any losses or damages of any kind incurred
                    as a result of the use of or reliance on any content or
                    services provided by swap.ag.
                  </p>
                  <br />
                  <p className="text-sm text-gray-500">
                    The information on swap.ag is provided "as is" and without
                    warranties of any kind, either express or implied. We make
                    no representations or warranties that swap.ag will be
                    uninterrupted, error-free, that defects will be corrected,
                    or that swap.ag or the server that makes it available are
                    free of viruses or other harmful components.
                  </p>
                  <br />
                  <p className="text-sm text-gray-500">
                    This disclaimer is intended to be as broad and inclusive as
                    permissible under applicable law, and if any portion thereof
                    is held invalid or unenforceable, you agree that the
                    remaining portions will remain in full force and effect.
                  </p>
                  <br />
                  <p className="text-sm text-gray-500">
                    By using swap.ag, you agree to the terms of this disclaimer.
                    If you do not agree with these terms, please do not use the
                    site.
                  </p>
                  <br />
                  <p className="text-sm text-gray-500">
                    Warm regards,
                    <br />
                    The swap.ag Team
                  </p>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#6ecef0] text-base font-medium font-montserrat text-white hover:bg-[#9F9FD8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                      onClick={onClose}
                    >
                      Agree and Continue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FirstTimeVisitModal = () => {
  const [modalVisible, setModalVisible] = useState(true);

  const handleClose = () => {
    setModalVisible(false);
  };

  return <>{modalVisible && <Modal onClose={handleClose} />}</>;
};

export default FirstTimeVisitModal;
