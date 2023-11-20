import Footer from './Footer';
import Navbar from './NavBar';
import Highlights from '../sections/Highlights';
import SwapComponent from './InputComponent';
import FirstTimeVisitModal from './FirstTimeVisitModal';

function Home() {
  return (
    <div>
      <FirstTimeVisitModal />
      <Navbar />
      <SwapComponent />
      <Highlights />
      <Footer />
    </div>
  );
}

export default Home;
