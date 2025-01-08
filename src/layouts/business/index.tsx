
import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import Footer from "@/components/footer/Footer";
import businessRoutes from "@/routes/businessroutes";
import BusinessSidebar from "@/components/sidebar/BusinessSidebar";

export default function BusinessLayout(props: { [x: string]: any }) {
  const { ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState("Dashboard");

  React.useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);
  React.useEffect(() => {
    getActiveRoute(businessRoutes);
  }, [location.pathname]);

  const getActiveRoute = (routes: RoutesType[]): string | boolean => {
    let activeRoute = "Dashboard";
    for (let i = 0; i < businessRoutes.length; i++) {
      if (
        window.location.href.indexOf(
          businessRoutes[i].layout + "/" + businessRoutes[i].path
        ) !== -1
      ) {
        setCurrentRoute(businessRoutes[i].name);
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = (routes: RoutesType[]): string | boolean => {
    let activeNavbar = false;
    for (let i = 0; i < businessRoutes.length; i++) {
      if (
        window.location.href.indexOf(businessRoutes[i].layout + businessRoutes[i].path) !== -1
      ) {
        return businessRoutes[i].secondary;
      }
    }
    return activeNavbar;
  };
  const getRoutes = (routes: RoutesType[]): any => {
    return routes.map((prop, key) => {
      if (prop.layout === "/" || prop.layout === "/employer") {
        return (
          <Route path={`/${prop.path}`} element={prop.component}  key={key} />
        );
      } else {
        return null;
      }
    });
  };

  document.documentElement.dir = "ltr";
  return (
    <div className="flex h-full w-full">
      <BusinessSidebar open={open} onClose={() => setOpen(false)} />
      {/* Navbar & Main Content */}
      <div className="h-full overflow-hidden w-full bg-lightPrimary dark:!bg-navy-900">
        {/* Main Content */}
        <main
          className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[260px]`}
        >
          {/* Routes */}
          <div className="h-[100vh] overflow-auto">
            <Navbar
              onOpenSidenav={() => setOpen(true)}
              brandText={currentRoute}
              secondary={getActiveNavbar(businessRoutes)}
              {...rest}
            />
            <div className="pt-5s mx-auto  h-full min-h-[84vh] p-2 md:pr-2">
              <Routes>
                {getRoutes(businessRoutes)}

                <Route
                  path="/"
                  element={<Navigate to="/login" replace />}
                />
              </Routes>
            </div>
        
          </div>
        </main>
      </div>
    </div>
  );
}
