/**
 * Home Component
 * 
 * This component represents the landing page of the application. It includes multiple sections with content and images, smooth scrolling navigation, and animations for enhancing user experience.
 * each section includes a title, content, and an image. The first section includes a "Get Started" button that navigates to the RAMAK Questionnaire page.
 * The second section includes a "Get Started" button that navigates to the RAMAK Questionnaire page and a link to the "ProfessionsInfo" page.
 * The last section includes information about the community manager and a link to the Facebook group.
 * Assets:
 * - Images for section backgrounds and content
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';
import { Link, Element } from 'react-scroll';
import { FaChevronDown, FaChevronUp, FaArrowDown, FaArrowUp } from 'react-icons/fa';
import linkImage from '../assets/link.png';
import section1Image from '../assets/job.jpg';
import section2Image from '../assets/QuestionMark.png';
import section3Image from '../assets/job.jpg';
import section4Image from '../assets/facebook.png';
import managerImage from '../assets/manager.jpg';


export default function Home() {
    // Navigation hook
    const navigate = useNavigate();

    // State to manage navigation menu visibility
    const [isNavOpen, setIsNavOpen] = useState(false);

    /**
     * Handles the click event for the "Get Started" button.
     * Navigates to the RAMAK Questionnaire page.
     */
    const handleGetStartedClick = () => {
        navigate('/RamakQuestionnaire');
    };

    /**
     * Returns animation settings for sections based on the delay parameter.
     * @param {number} delay - The delay before the animation starts.
     * @returns {object} - Animation styles for section entrance.
     */
    const sectionAnimation = (delay: number) => useSpring({
        from: { opacity: 0, transform: 'translateY(-50px)' },
        to: { opacity: 1, transform: 'translateY(0px)' },
        delay,
        config: { duration: 1000 },
    });

    // Bounce animation for navigation arrows
    const bounce = useSpring({
        loop: { reverse: true },
        from: { transform: 'translateY(0px)' },
        to: { transform: 'translateY(10px)' },
        config: { tension: 300, friction: 10 },
    });

    /**
     * Sections configuration for rendering content on the home page.
     * @type {Array<object>}
     */
    const sections = [
        {
            id: 'section1',
            title: '',
            content: (
                <div className="text-center mx-auto max-w-2xl py-12 sm:py-32 lg:py-38">
                    <h1 className="text-6xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        ברוך הבא לאתר של
                        <br />קבוצת הפייסבוק מתחבטי מקצוע
                    </h1>
                    <h2 className='text-xl sm:text-2xl font-bold mt-6 text-gray-600'>
                        מזמינים אותך למצוא את העבודה שמתאימה לך
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        כל מה שנדרש ממך הוא לענות על שאלון קצר
                        <br />בסופו תימצא ההתאמה הטובה ביותר עבורך
                    </p>
                    <p className="mt-6 text-2xl leading-8 text-gray-600">
                        <strong>בהצלחה!</strong>
                    </p>
                </div>
            ),
            image: section1Image
        },
        { 
            id: 'section2', 
            title: 'שאלון RAMAK ', 
            content: 'שאלון RAMAK נועד לסייע לכם למצוא את העבודה שהכי מתאימה לאופי שלכם.', 
            image: section2Image, 
            button: true 
        },
        { 
            id: 'section3', 
            title: 'מידע כללי על מקצועות', 
            content: 'למידע נוסף על מקצועות שונים, ניתן להסתכל על מאגר המידע שלנו .', 
            image: section3Image, 
            link: '/ProfessionsInfo' 
        },
        {
            id: 'section4',
            title: 'מנהלת קהילת מתחבטי מקצוע',
            content: (
                <div className="flex flex-col items-center text-center">
                    <img src={managerImage} alt="Irit Homsi" className="w-32 h-32 rounded-full mb-4" />
                    <p className="text-lg leading-8 text-gray-600">
                        אירית חומסי היא מנהלת הקהילה . 
                        <br /> כיום הקבוצה מונה כ 40 אלף חברים.
                        <br />למידע נוסף  ניתן לצפות בקבוצה בלינק הבא:
                    </p>
                    <a href="https://www.facebook.com/share/4B2P6eeAsYWs5nDz/" className="text-blue-600 hover:underline mt-4">
                        <img src={linkImage} className="mx-auto h-10 w-10 " />
                    </a>
                </div>
            ),
            image: section4Image
        },
    ];

    /**
     * Rotation animation for the navigation button.
     * @type {object}
     */
    const rotateAnimation = useSpring({
        transform: isNavOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        config: { duration: 300 }
    });

    return (
        <div className="bg-gray-250 py-4 px-6" style={{ backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <div className="relative isolate">
                {/* Render sections with animations */}
                {sections.map((section, index) => (
                    <Element name={section.id} key={section.id} className='my-6'>
                        <animated.div 
                            style={{ 
                                ...sectionAnimation(index * 500), 
                                position: 'relative', 
                                backgroundImage: `url(${section.image})`, 
                                backgroundSize: 'cover', 
                                backgroundPosition: 'center', 
                                backgroundRepeat: 'no-repeat', 
                                padding: '20px', 
                                direction: 'rtl' 
                            }} 
                            className="min-h-screen flex flex-col items-center justify-center text-center rounded-md"
                        >
                            {/* Overlay for sections with buttons */}
                            <div style={{ 
                                position: 'absolute', 
                                top: 0, 
                                left: 0, 
                                width: '100%', 
                                height: '100%', 
                                backgroundColor: index === 1 ? 'rgba(255, 255, 255, 0.55)' : 'transparent', 
                                zIndex: 0 
                            }}></div>
                            {section.title && <h2 className="text-3xl font-bold text-gray-900" style={{ position: 'relative', zIndex: 1 }}>{section.title}</h2>}
                            <div className="mt-6 text-lg leading-8 text-gray-600" style={{ position: 'relative', zIndex: 1 }}>{section.content}</div>
                            {section.button && (
                                <div className="mt-10 flex items-center justify-center gap-x-6" style={{ position: 'relative', zIndex: 1 }}>
                                    <button
                                        onClick={handleGetStartedClick}
                                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        מילוי השאלון
                                    </button>
                                    <a href="/Jobs" className="text-sm font-semibold leading-6 text-gray-900">
                                        מאגר המקצועות התואם לשאלון ← <span aria-hidden="true"></span>
                                    </a>
                                </div>
                            )}
                            {section.link && (
                                <div className="mt-10 flex items-center justify-center gap-x-6" style={{ position: 'relative', zIndex: 1 }}>
                                    <a href={section.link} className="text-sm font-semibold leading-6 text-gray-900">
                                        מידע כללי על מקצועות ← <span aria-hidden="true"></span>
                                    </a>
                                </div>
                            )}
                            {index < sections.length - 1 && (
                                <Link
                                    to={sections[index + 1].id}
                                    smooth={true}
                                    duration={500}
                                    className="absolute bottom-4 text-gray-900 hover:text-gray-600 cursor-pointer"
                                    style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}
                                >
                                    <animated.div style={bounce}>
                                        <FaArrowDown size={30} />
                                    </animated.div>
                                </Link>
                            )}
                            {index === sections.length - 1 && (
                                <Link
                                    to={sections[0].id}
                                    smooth={true}
                                    duration={500}
                                    className="absolute bottom-4 text-gray-900 hover:text-gray-600 cursor-pointer"
                                    style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}
                                >
                                    <animated.div style={bounce}>
                                        <FaArrowUp size={30} />
                                    </animated.div>
                                </Link>
                            )}
                        </animated.div>
                    </Element>
                ))}
                {/* Floating navigation button */}
                <div className="fixed bottom-10 right-10 flex flex-col space-y-2 bg-white p-1 rounded shadow-lg" dir="rtl">
                    <button
                        onClick={() => setIsNavOpen(!isNavOpen)}
                        className="flex items-center justify-between rounded-md bg-indigo-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        <span>ניווט</span>
                        <animated.div style={rotateAnimation} className="mr-2">
                            {isNavOpen ? <FaChevronUp /> : <FaChevronDown />}
                        </animated.div>
                    </button>
                    {isNavOpen && (
                        <div className="mt-1 flex flex-col space-y-2">
                            {sections.map((section) => (
                                <Link key={section.id} to={section.id} smooth={true} duration={500} className="cursor-pointer text-gray-900 hover:text-gray-600 text-right">
                                     {section.title || 'מידע כללי'}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
