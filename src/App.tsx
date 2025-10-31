import { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import About from './pages/About';
import RFQListings from './pages/RFQListings';
import RFQDetails from './pages/RFQDetails';
import RFQDetailsSeller from './pages/RFQDetailsSeller';
import Login from './pages/Login';
import BuyerDashboard from './pages/BuyerDashboard';
import SellerDashboard from './pages/SellerDashboard';
import SellerBids from './pages/SellerBids';
import SellerRFQs from './pages/SellerRFQs';
import SellerNotifications from './pages/SellerNotifications';
import SellerMessages from './pages/SellerMessages';
import PanelManagement from './pages/PanelManagement';
import BuyerProfile from './pages/BuyerProfile';
import SellerProfile from './pages/SellerProfile';
import Notifications from './pages/Notifications';
import BuyerBids from './pages/BuyerBids';
import Signup from './pages/Signup';
import CreateRFQ from './pages/CreateRFQ';
import SellerReports from './pages/SellerReports';
import BuyerReports from './pages/BuyerReports';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');

      if (link && link.href.startsWith(window.location.origin)) {
        e.preventDefault();
        const path = link.pathname;
        window.history.pushState({}, '', path);
        setCurrentPath(path);
        window.scrollTo(0, 0);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const renderPage = () => {
    if (currentPath.startsWith('/rfq-details-seller/')) {
      return <RFQDetailsSeller />;
    }

    if (currentPath.startsWith('/rfq/') || currentPath.startsWith('/rfq-details/')) {
      return <RFQDetails />;
    }

    switch (currentPath) {
      case '/about':
        return <About />;
      case '/rfqs':
        return <RFQListings />;
      case '/login':
        return <Login />;
      case '/signup':
      case '/signup-buyer':
      case '/signup-seller':
        return <Signup />;
      case '/dashboard':
      case '/buyer-dashboard':
        return <BuyerDashboard />;
      case '/my-rfq':
        return <BuyerDashboard />;
      case '/create-rfq':
        return <CreateRFQ />;
      case '/panel-management':
        return <PanelManagement />;
      case '/buyer-bids':
        return <BuyerBids />;
      case '/notifications':
        return <Notifications userType="buyer" />;
      case '/buyer-profile':
        return <BuyerProfile />;
      case '/buyer-reports':
        return <BuyerReports />;
      case '/seller-dashboard':
        return <SellerDashboard />;
      case '/seller-bids':
        return <SellerBids />;
      case '/seller-rfqs':
      case '/rfq-listings':
        return <SellerRFQs />;
      case '/seller-notifications':
        return <SellerNotifications />;
      case '/seller-messages':
        return <SellerMessages />;
      case '/seller-profile':
        return <SellerProfile />;
      case '/seller-reports':
        return <SellerReports />;
      case '/index':
        return <LandingPage />;
      default:
        return <LandingPage />;
    }
  };

  return renderPage();
}

export default App;
