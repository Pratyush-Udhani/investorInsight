import React, { useContext } from 'react'
import {  HiDownload } from "react-icons/hi";
import {  MdCallToAction } from "react-icons/md";
import { AppContext } from '~/pages/context/context';

type Props = {
    className: string
}

const Tooltip: React.FC<Props> = ({ className }) => {
    const { state, dispatch } = useContext(AppContext)
    const app = state.interactionData?.app
    return(
        <>
            {app ? 
            <>
                <div className={`duration-300 flex flex-col border-text_gray justify-evenly border rounded-md p-5 ${className}`}>
                    <div className="flex flex-col w-full basis-3/6"> 
                        <p className="text-primary text-3xl line-clamp-2 mb-3">{app.name}</p>
                        <p className="text-text_white text-xl line-clamp-1 mb-1">{app.version} ({app.last_updated})</p>
                        <p className="text-text_white text-xl line-clamp-1 mb-1">{app.android_ver}</p>
                        <p className="text-text_white text-xl line-clamp-1 mb-1">{+app.price.replaceAll('$','') === 0? "free": `${app.price}`}</p>
                    </div>
                    <div className="basis-3/6 w-full justify-between flex flex-row">
                        <div className="h-full basis-3/6 flex flex-col justify-around">
                            <div className="flex flex-col justify-center items-center">
                                <p className="text-text_white text-xl w-fit">{app.rating} &#11088;</p>
                                <p className="text-text_gray text-l w-fit">{app.reviews_number} reviews</p>
                            </div>         
                            <div className="flex flex-col justify-center items-center">
                                <div className="text-text_white text-3xl w-fit"><MdCallToAction/></div>
                                <p className="text-text_gray text-l w-fit">rated for {app.content_rating.toLowerCase()}</p>
                            </div>         
                        </div>
                        <div className="h-1/4 self-center bg-text_gray w-[1px]"/>
                        <div className="h-full basis-3/6 flex flex-col justify-around">
                            <div className="flex flex-col justify-center items-center">
                                <div className="text-text_white text-3xl w-fit"><HiDownload/></div>
                                <p className="text-text_gray text-l w-fit">{app.size}</p>
                            </div>         
                            <div className="flex flex-col justify-center items-center">
                                <p className="text-text_white text-xl w-fit">{app.installs}+</p>
                                <p className="text-text_gray text-l w-fit">downlaods</p>
                            </div>         
                        </div>
                    </div>
                </div>

            </> : 
            <>
                <div className={`flex flex-col ${className}`}>
                <div className="text-text_white self-center inset-0">Hover over an app to view details</div>
                <div className={`blur-sm flex flex-col border-text_gray justify-evenly border rounded-md p-5 `}>
                    <div className="flex flex-col w-full basis-3/6"> 
                        <p className="text-primary text-3xl line-clamp-2 mb-3">Tiny Scanner Pro: PDF Doc Scan</p>
                        <p className="text-text_white text-xl line-clamp-1 mb-1">ver 3.5.1 (March 25, 2018)</p>
                        <p className="text-text_white text-xl line-clamp-1 mb-1">4.1 and up</p>
                        <p className="text-text_white text-xl line-clamp-1 mb-1">free</p>
                    </div>
                    <div className="basis-3/6 w-full justify-between flex flex-row">
                        <div className="h-full basis-3/6 flex flex-col justify-around">
                            <div className="flex flex-col justify-center items-center">
                                <p className="text-text_white text-xl w-fit">4.4 &#11088;</p>
                                <p className="text-text_gray text-l w-fit">10000 reviews</p>
                            </div>         
                            <div className="flex flex-col justify-center items-center">
                                <div className="text-text_white text-3xl w-fit"><MdCallToAction/></div>
                                <p className="text-text_gray text-l w-fit">rated for everyone</p>
                            </div>         
                        </div>
                        <div className="h-1/4 self-center bg-text_gray w-[1px]"/>
                        <div className="h-full basis-3/6 flex flex-col justify-around">
                            <div className="flex flex-col justify-center items-center">
                                <div className="text-text_white text-3xl w-fit"><HiDownload/></div>
                                <p className="text-text_gray text-l w-fit">100M</p>
                            </div>         
                            <div className="flex flex-col justify-center items-center">
                                <p className="text-text_white text-xl w-fit">12893</p>
                                <p className="text-text_gray text-l w-fit">downlaods</p>
                            </div>         
                        </div>
                    </div>
                </div>
                </div>
            </>}
        </>
    )
}

export default Tooltip
