import { AppBody, AppHeader, AppContent, AppFooter } from "../components";

const LoggedInLayout = () => {
  return (
    <AppBody>
      <AppHeader />
      <div className="container-fluid page-body-wrapper">
        <div className="w-100 main-panel">
          <AppContent />
          <AppFooter />
        </div>
      </div>
    </AppBody>
  );
};

export default LoggedInLayout;
