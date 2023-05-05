import React from "react";
import BreadCrumbs from "../breadcrumbs";
import { useTranslation } from "react-i18next";
import locale from "../../internationalization/locales/en.json";
import { PropTypes } from "../../interface";

const Dashboard = (props: PropTypes) => {
  const { t } = useTranslation();

  const renderKeys = () => {
    const keys: Array<string> = Object.keys(locale.dashboard);
    return keys.map((key: string) => {
      const tag: string = key.split(".").pop() || "";
      const value = t(`dashboard.${key}`);

      return React.createElement(tag, {
        key,
        dangerouslySetInnerHTML: { __html: value }
      });
    });
  };
  return (
    <div>
      <BreadCrumbs level={props.level} />
      {renderKeys()}
    </div>
  );
};
export default Dashboard;
