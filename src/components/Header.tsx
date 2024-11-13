/**
 * This is for the header component, it displays the logo (Posty), the name and has a bars menu (material UI) for smaller screens. The logo and title are grouped, and when clicked will lead to the front page.
 *
 * @param {HeaderProps} props - is the props for the header component
 * @param {string} props.title - the title of the page/type, in our case "Taskmanager"
 * @param {string} props.logoUrl - the url for our logo "Posty"
 *
 * @returns {JSX.ELEMENT} - for a Header component, with a logo, title and material UI icon
 *
 * What to add in the file?
 * <Header title="Taskmanager" logoUrl="/posty_1.svg" />
 */

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { FC } from "react";

//interface sets the conditions that must be fulfilled, kinda like a set of rules that must be followed. type can also be used, that will look like type HeaderProps ={}
interface HeaderProps {
  title: string;
  logoUrl: string;
}
//FC = functionalComponent - takes the connected type (headerprops), and takes the props from the component.
const Header: FC<HeaderProps> = ({ title, logoUrl }) => {
  return (
    <header className="header">
      <div className="header-content">
        <img src={logoUrl} alt="Logo" className="header-logo" />
        <h1>{title}</h1>
      </div>
      <MenuRoundedIcon className="menu-icon" />
    </header>
  );
};

export default Header;
