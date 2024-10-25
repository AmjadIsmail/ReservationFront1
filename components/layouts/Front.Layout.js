import FrontFooter from "@/components/footers/Front.Footer";
import FrontNavbar from "@/components/navbars/Front.Navbar";
import  Providers  from "../reduxToolKil/provider";
const FrontLayout = (props) => {
  return (
    <>
      <FrontNavbar className={`navbar-${props.navTheme}`} {...props} />
     
      {props.children}
        
      <FrontFooter />
    </>
  );
};

export default FrontLayout;
