import "./styles.css";
import Layout from "./components/layout";
import { createContext, useState, lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { JsonDataType, componentDataType } from "./interface";
const componentData = [
  {
    id: 0,
    level: "0",
    name: "Login",
    url: "/login",
    locale: "user.login",
    path: "/user/login",
    component: "./User/Login",
    defaultComponent: false,
    hideInMenu: true,
  },
  {
    id: 1,
    level: "1",
    path: "./components/dashboard",
    url: "/dashboard",
    locale: "dashboard",
    name: "Dashboard",
    icon: "Dashboard",
    exact: true, // This route will only work for /dashboard . For  /dashboard/analysis or other this component will not be rendered  component: 'pages/dashboard',
    isDropdownNeeded: true,
    dropdownOpen: false,
    defaultComponent: true,
    routes: [
      {
        id: 1,
        level: "1.1",
        path: "./components/dashboard/analysis",
        url: "/dashboard/analysis",
        locale: "dashboard.analysis",
        name: "Analysis",
        component: "pages/dashboard/analysis",
        icon: "Analysis",
        defaultComponent: false,
        exact: true,
        accessTO: ["admin"], // Allow only admins to view this menu  and access this page
      },
      {
        id: 2,
        level: "1.2",
        path: "./components/dashboard/monitor",
        url: "/dashboard/monitor",
        locale: "dashboard.monitor",
        component: "pages/dashboard/monitor",
        name: "Monitor",
        icon: "Monitor",
        defaultComponent: false,
        exact: true,
      },
      {
        id: 3,
        level: "1.2",
        path: "./components/dashboard/workplace",
        url: "/dashboard/workplace",
        locale: "dashboard.workplace",
        component: "pages/dashboard/workplace",
        name: "Workplace",
        defaultComponent: false,
        icon: "Workplace",
        exact: true,
      },
    ],
  },
  {
    id: 2,
    level: "2",
    path: "./components/projects",
    url: "/projects",
    locale: "projects",
    name: "Projects",
    icon: "project",
    isDropdownNeeded: false,
    dropdownOpen: false,
    redirect: "/projects/list",
    defaultComponent: false,
    routes: [
      {
        id: 1,
        level: "2.1",
        path: "./components/projects/projectList",
        url: "/projects/list",
        locale: "projects.list",
        name: "Project List",
        icon: "list",
        hideInMenu: true,
        exact: true,
        defaultComponent: false,
        routes: [
          {
            id: 1,
            level: "2.1.1",
            path: "./components/projects/projectDetails",
            url: "/projects/details",
            locale: "projects.details",
            name: "Project Details",
            hideInMenu: true,
            defaultComponent: false,
            icon: "details",
            key: "projects",
            exact: true,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    level: "3",
    name: "Error",
    path: "./components/error",
    url: "/error",
    component: "./404",
    defaultComponent: false,
    hideInMenu: true,
  },
];

export const AppContext = createContext<Array<JsonDataType>>(componentData);

export default function App() {
  const [data, setData] = useState<Array<JsonDataType>>(componentData);

  const getAllRoutes = (
    componentData: Array<JsonDataType>
  ): Array<JsonDataType> => {
    let result: Array<JsonDataType> = [];

    for (const item of componentData) {
      result.push(item);

      if (item.routes) {
        result = [...result, ...getAllRoutes(item.routes)];
      }
    }

    return result;
  };
  const components: Array<componentDataType> = [];
  getAllRoutes(componentData).map((component: JsonDataType) => {
    components.push({
      renderComponent: lazy(() => import(`${component.path}`)),
      path: component.url,
      id: component.id,
      level: component.level,
      redirect: component.redirect,
      defaultComponent: component.defaultComponent,
    });
  });
  return (
    <AppContext.Provider value={data}>
      <div className="App">
        <Routes>
          {components.map((Component: componentDataType, index: number) => {
            const path = Component.path;
            const RenderComponent = Component.renderComponent;
            const redirect = Component.redirect;
            const defaultComponent = Component.defaultComponent;

            return !redirect ? (
              defaultComponent ? (
                <>
                  <Route
                    key={index}
                    path={path}
                    element={
                      <Suspense key={index} fallback={<div>Loading...</div>}>
                        <Layout index={Component.id} level={Component.level}>
                          <RenderComponent />
                        </Layout>
                      </Suspense>
                    }
                  />
                  <Route
                    key={index}
                    path={"/"}
                    element={
                      <Suspense key={index} fallback={<div>Loading...</div>}>
                        <Layout index={Component.id} level={Component.level}>
                          <RenderComponent />
                        </Layout>
                      </Suspense>
                    }
                  />
                </>
              ) : (
                <Route
                  key={index}
                  path={path}
                  element={
                    <Suspense key={index} fallback={<div>Loading...</div>}>
                      <Layout index={Component.id} level={Component.level}>
                        <RenderComponent />
                      </Layout>
                    </Suspense>
                  }
                />
              )
            ) : (
              <Route
                key={index}
                path={path}
                element={<Navigate to={redirect} replace />}
              />
            );
          })}
        </Routes>
      </div>
    </AppContext.Provider>
  );
}
