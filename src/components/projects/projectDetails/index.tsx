import React from "react";
import { useSearchParams } from "react-router-dom";
import BreadCrumbs from "../../breadcrumbs";
import { useTranslation } from "react-i18next";
import locale from "../../../internationalization/locales/en.json";
import { PropTypes, ButtonType } from "../../../interface";

const ProjectDetails = (props: PropTypes) => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const level = searchParams.get("level") || "";
  const { t } = useTranslation();

  const renderKeys = () => {
    const keys: Array<string> = Object.keys(locale.projectDetails);
    return keys.map((key: string) => {
      const tag: string = key.split(".").pop() || "";
      const value = t(`projectDetails.${key}`);

      return React.createElement(tag, {
        key,
        dangerouslySetInnerHTML: { __html: value },
      });
    });
  };
  return (
    <div>
      <BreadCrumbs level={level} />
      {renderKeys()}
      <p>{id}</p>
    </div>
  );
};
export default ProjectDetails;
