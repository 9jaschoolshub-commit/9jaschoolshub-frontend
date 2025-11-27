import { Link } from "react-router-dom";

const FooterLink = ({ heading, links }) => {
  return (
    <div
      className={`space-y-1.5 md:space-y-2.5 ${
        heading === "Information" && "md:hidden"
      }`}
    >
      <h3 className="font-medium text-lg">{heading}</h3>
      <ul className="space-y-1.5 text-gray-50 ">
        {links.map(({ url, label }) => {
          return (
            <li key={label}>
              <Link to={url}> {label}</Link>{" "}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default FooterLink;
