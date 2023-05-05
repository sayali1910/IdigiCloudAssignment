import React from "react";
import BreadCrumbs from "../../breadcrumbs";
import { useTranslation } from "react-i18next";
import locale from "../../../internationalization/locales/en.json";
import { useNavigate } from "react-router-dom";
import { PropTypes, ButtonType } from "../../../interface";
const ProjectList = (props: PropTypes) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const renderKeys = () => {
    const keys: Array<string> = Object.keys(locale.projectList);
    return keys.map((key: string) => {
      const tag: string = key.split(".").pop() || "";
      if (tag === "button") {
        const value: string | ButtonType =
          locale.projectList[key as keyof typeof locale.projectList];
        return (
          typeof value !== "string" && (
            <button
              key={key}
              onClick={() => {
                eval(value.onClick);
              }}
              dangerouslySetInnerHTML={{ __html: value.title }}
            />
          )
        );
      } else {
        const value = t(`projectList.${key}`);
        return React.createElement(tag, {
          key,
          dangerouslySetInnerHTML: { __html: value }
        });
      }
    });
  };
  return (
    <div>
      <BreadCrumbs level={props.level} />
      {renderKeys()}
    </div>
  );
};
export default ProjectList;
