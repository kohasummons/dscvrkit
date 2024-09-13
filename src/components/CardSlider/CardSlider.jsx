import { useState, useRef } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, GameIcon, LightIcon } from '../../assets/icons/icons';
import CardImg1 from '../../assets/images/discv.png';
import CardImg2 from '../../assets/images/discv1.png';
import CardImg3 from '../../assets/images/discv2.png';
import Link from 'next/link';

// Define the card items
export const CARD_ITEMS = [
    {
        name: "DSCVRboy+",
        icon: LightIcon,
        img: CardImg1,
        url: '/dscvrboy'
    },
    {
        name: "Metavax+",
        icon: GameIcon,
        img: CardImg2,
        url: '/metavax'
    },
    {
        name: "Await Update",
        icon: LightIcon,
        img: CardImg3,
        url: '/'
    },
    {
        name: "Await update",
        icon: GameIcon,
        img: CardImg2,
        url: '/dscvrboy'
    },
    {
        name: "Await update",
        icon: LightIcon,
        img: CardImg3,
        url: '/dscvrboy'
    }
];

const CardSlider = ({ cards = CARD_ITEMS }) => {
    const [currentCard, setCurrentCard] = useState(0);  
    const sliderRef = useRef(null); 

    // Previous
    const handlePrevClick = () => {
        setCurrentCard((prevCard) => (prevCard === 0 ? cards.length - 1 : prevCard - 1));
        sliderRef.current.scrollBy({
            left: -250, 
            behavior: 'smooth',
        });
    };

    // Next
    const handleNextClick = () => {
        setCurrentCard((prevCard) => (prevCard === cards.length - 1 ? 0 : prevCard + 1));
        sliderRef.current.scrollBy({
            left: 250, 
            behavior: 'smooth',
        });
    };

    return (

        <div className='flex flex-col w-full gap-4'>
            <div ref={sliderRef} className='flex flex-col justify-start items-start pl-4 md:pl-8 overflow-x-scroll no-scrollbar'>
                <div className='flex flex-row gap-4 md:gap-8'>
                    {cards.map((item, index) => (
                        <Link href={item.url} key={index}>
                        <div
                            className='relative items-center justify-center flex flex-col border border-[#343434] w-[180px] h-[250px] md:w-[250px] md:h-[317px] flex-shrink-0'
                        >
                            <div className='absolute top-0 left-0 p-2 md:p-4'>
                                <item.icon />
                            </div>
                            <div className='flex flex-col justify-center items-center gap-4'>
                                <Image src={item.img} alt={item.name} />
                                <span className='text-[#B7B7B7] text-[14px] md:text-[16px] font-bold'>
                                    {item.name}
                                </span>
                            </div>
                        </div>
                    </Link>
                    ))}
                </div>
            </div>

            <div className='flex flex-row justify-center md:justify-end items-end gap-2 md:gap-4'>
                <span 
                    className='p-3 md:p-4 bg-[#131313] border border-[#1F1F1F] cursor-pointer'
                    onClick={handlePrevClick}
                >
                    <ArrowLeft />
                </span>
                <span 
                    className='p-3 md:p-4 bg-[#131313] border border-[#1F1F1F] cursor-pointer'
                    onClick={handleNextClick}
                >
                    <ArrowRight />
                </span>
            </div>
        </div>
    );
};

export default CardSlider;
