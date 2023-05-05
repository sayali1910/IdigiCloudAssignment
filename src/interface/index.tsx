export interface JsonDataType {
  id: number;
  level: string;
  name: string;
  locale?: string;
  path: string;
  url: string;
  component?: string;
  icon?: string;
  hideInMenu?: boolean;
  dropdownOpen?: boolean;
  isDropdownNeeded?: boolean;
  exact?: boolean;
  routes?: Array<JsonDataType>;
  redirect?: string;
  accessTO?: Array<string>;
  key?: string;
  parentKey?: string;
  defaultComponent: boolean;
}
export interface componentDataType {
  renderComponent: React.LazyExoticComponent<React.ComponentType<any>>;
  path: string;
  id: number;
  level: string;
  redirect?: string;
  defaultComponent: boolean;
}
export interface PropTypes {
  children?: React.ReactNode;
  index: number;
  level: string;
}
export interface ButtonType {
  title: string;
  onClick: string;
}
