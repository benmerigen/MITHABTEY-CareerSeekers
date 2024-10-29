/**
 * Footer component
 * This component is used to display the footer of the website.
 * It includes links to contact information and the company logo.
 * The footer is displayed at the bottom of the page.
 */
import logo from '../assets/mithabteyLogo.png';

export default function Footer() {
    return (
        <footer className="w-full p-8 bg-gray-250 rtl" dir='rtl'>
            <hr className="border-t border-blue-gray-50" />
            <div className="flex  flex-wrap items-center justify-center text-center bg-gray-250 gap-y-6 gap-x-12 md:justify-between">
                <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
                    <li>
                        <a href="/Contact"
                            className="block font-sans text-base antialiased font-normal leading-relaxed transition-colors text-blue-gray-900 hover:text-blue-500 focus:text-blue-500">
                            צור קשר
                        </a>
                    </li>
                  
                    <img src={logo} alt="logo-ct" className="w-10 items-center my-2" />
                </ul>
            </div>
            <span className="block my-6" />
            <p className="block font-sans text-base antialiased font-normal leading-relaxed text-center text-blue-gray-900">
                © 2024 כל הזכויות שמורות.
            </p>
        </footer>
    )
}