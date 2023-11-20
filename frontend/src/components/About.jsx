import Navbar from './NavBarWithoutWallet';
import Footer from './Footer';

const About = () => {
  return (
    <div>
      <Navbar />
      <div className="p-6 max-w-sm mx-auto my-6 bg-white rounded-xl shadow-md flex items-center space-x-4">
        <div>
          <div className="text-xl font-medium text-black">About Us</div>
          <p className="text-gray-500">
            swap.ag is a DEX aggregator built on the Arbitrum blockchain.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
