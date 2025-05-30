import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="w-full bg-[#ebe0d4] text-center py-4">
      <div className = "container mx-auto text-brown-800">
        <p>
          &copy; {new Date().getFullYear()} SpinningSpinning Dolimpan. All rights reserved.
        </p>
        <div className= {"flex justify-center space-x-4 mt-4"}>
          <Link to = {"#"}>Privacy Policy</Link>
          <Link to = {"#"}>Terms of Service</Link>
          <Link to = {"#"}>Contact Us</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
