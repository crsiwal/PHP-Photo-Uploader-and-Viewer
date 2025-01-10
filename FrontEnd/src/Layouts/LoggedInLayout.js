import { AppBody, AppHeader, AppSidebar, AppContent, AppFooter } from "../components";

const LoggedInLayout = () => {
  return (
    <AppBody>
      <AppHeader />
      <div className="container-fluid page-body-wrapper">
        <AppSidebar />
        <div className="main-panel">
          <AppContent />
          <AppFooter />
        </div>
      </div>
    </AppBody>
  );
};

export default LoggedInLayout;
