import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className = "bg-gray-100 dark:bg-gray-900 p-6 mt-12">
        <div className = "container mx-auto text-center text-center text-gray-500 dark:text-gray-300">
            <p>
                &copy; {new Date().getFullYear()} 돌려돌려돌림판 All rights reserved.
            </p>
            <div className={"flex justify-center space-x-8 mt-"}>
                <Link to={"#"}>
                    Privacy Policy
                </Link>
                <Link to={"#"}>
                    Terms of Service
                </Link>
                <Link to={"#"}>
                    Contact
                </Link>
            </div>
        </div>
    </footer>
  )
}

export default Footer
