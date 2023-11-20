import Navbar from './NavBarWithoutWallet';
import Footer from './Footer';

const About = () => {
  return (
    <div>
      <Navbar />
      <div className="p-6 max-w-sm mx-auto my-5 bg-white rounded-xl shadow-md flex items-center space-x-4">
        <div>
          <div className="text-xl font-medium text-black">Support</div>
          <p className="text-gray-500">Please send an email to admin@swap.ag</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
