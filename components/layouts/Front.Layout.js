import FrontFooter from "@/components/footers/Front.Footer";
import FrontNavbar from "@/components/navbars/Front.Navbar";

const FrontLayout = (props) => {
  return (
    <>      
      <FrontNavbar className={`navbar-${props.navTheme}`} {...props} />   
     {{...props.children}}     
      <FrontFooter />    
    </>
  );
};

export default FrontLayout;
