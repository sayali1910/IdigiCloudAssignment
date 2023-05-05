import React, { useContext, useEffect, useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { AppContext } from "../../App";
import IconComponent from "../../components/icon";
import { JsonDataType } from "../../interface";

const BreadCrumbs = ({ level }: { level: string }) => {
  const data = useContext(AppContext);
  const [levelList, setLevelList] = useState<Array<JsonDataType>>([]);
  useEffect(() => {
    let tempLevelList = level.split(".");
    let tempUniqueList: Array<string> = tempLevelList.map(
      (char: string, index: number) =>
        tempLevelList.slice(0, index + 1).join(".")
    );
    let componentList: Array<JsonDataType> = data.filter(
      ({ level }) => level === tempLevelList[0]
    );
    let firstComponent: JsonDataType | undefined = data.find(
      ({ level }) => level === tempUniqueList[0]
    );
    for (let i = 1; i < tempUniqueList.length; i++) {
      if (firstComponent?.routes) {
        let cmp = firstComponent?.routes.find(
          ({ level: string }) => level === tempUniqueList[i]
        );
        if (cmp) {
          componentList.push(cmp);
        }
        firstComponent = cmp;
      }
    }
    setLevelList(componentList);
  }, []);
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {levelList.map((comp, index) => {
        return index === levelList.length - 1 ? (
          <Typography key={index}>
            <IconComponent icon={comp.icon || ""} />
            {comp.name}
          </Typography>
        ) : (
          <Link to={comp?.url} key={index}>
            <IconComponent icon={comp.icon || ""} />
            {comp.name}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};
export default BreadCrumbs;
