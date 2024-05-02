'use client'

import WheelGuid from "@/app/components/guids/wheel-guid"
import Loader from "@/app/components/loader"
import { Smartphone, Tv2 } from "lucide-react"
import { Fredoka } from "next/font/google"
import { useEffect, useState } from "react"

const fredoka = Fredoka({ weight: "400", subsets: ['hebrew'] })

interface project {
    title: string
    subTitle?: string
    description: string[]
    src: string
}

const projects: project[] = [
    {
        title: 'בינה עברית',
        subTitle: '(AI hebrew app)',
        description: ['AI platform for Hebrew speakers.', 'End to end application, responsive. Next.js, typescript, tailwind, PrismaDB.', 'Interact with (through API calls) Google api, Openai, Replicate, Clerk and uPay'],
        src: 'https://ai-heb-app.vercel.app/dashboard'
    },
    {
        title: 'Finerr',
        description: ['A Fiverr-like marketplace, contains the full user experience of the original app.', 'I\'ve been a part of a small team which created it within three weeks, using React, Redux, SCSS, Node.js, MongoDB and Git'],
        src: 'https://finerr.onrender.com/'
    },
    {
        title: 'Vitcoin',
        description: ['Bitcoin app, based on Vue.js.', 'The app allows user to check current value and statistics of Bitcoin. also, gives the user demo wallet to share coins with contacts (contacts list contains full CRUD actions)'],
        src: 'https://nadaveliash.github.io/vitcoin-vue/#/'
    },
]

export default function Projects() {

    const [currentView, setCurrentView] = useState(0)
    const [wideScreen, setWideScreen] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const [isReplacing, setIsReplacing] = useState(false)
    const [isWheel, setIsWheel] = useState(false)
    const [guidDisplay, setGuidDisplay] = useState<boolean>(true)

    useEffect(() => {
        setTimeout(() => {
            setGuidDisplay(false)
        }, 1000)
    }, [])

    const handleWheel = (ev: any) => {
        if (!isWheel) {
            setIsWheel(true)
            setIsReplacing(true)

            ev.deltaY < 0
                ? setCurrentView(currentView + 1 >= projects.length ? 0 : currentView + 1)
                : setCurrentView(currentView - 1 < 0 ? projects.length - 1 : currentView - 1)

            setTimeout(() => {
                setIsReplacing(false)
            }, 100)

            setTimeout(() => {
                setIsWheel(false)
            }, 800)
        }
    }

    const onLoad = () => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1000);
    }

    return (
        <div className="w-full text-white" onWheel={handleWheel}>
            {projects && projects.map((project, idx) =>
                <div className={`${idx === currentView ? 'grid' : 'hidden'} ${isReplacing ? 'scale-0' : 'scale-100'} grid-cols-8 items-center transition-all duration-1000`} key={project.title}>
                    <div className="col-span-2 pl-32 flex flex-col gap-2">
                        <h1 className={`text-6xl pl-10 my-6 ${fredoka.className}`}>{project.title}</h1>
                        {project.description.map((line, idx) => <h2 key={idx} className="text-xl">{line}</h2>)}
                    </div>
                    <div className={`col-span-6 justify-self-center relative opacity-90 shadow-xl shadow-white/30 scale-y-[0.7] scale-x-[0.8]
                                    ${wideScreen ? 'w-full max-w-5xl rounded-2xl rotate-3 -skew-x-3' : 'w-[380px] rounded-[3rem] -rotate-12 -ml-40 -skew-y-3'} 
                                    ${project.title === 'Finerr' ? 'h-[700px]' : 'h-[780px]'}`}>
                        <div className={`absolute top-3 left-3 bg-black/70 w-full h-full -z-10 ${wideScreen ? 'rounded-2xl' : 'rounded-[3rem]'}`}></div>
                        {isLoading && <div className={`absolute w-full h-full bg-black border-[20px] border-black ${wideScreen ? 'rounded-2xl' : 'rounded-[3rem]'} flex items-center justify-center overflow-hidden`}>
                            <Loader />
                        </div>}
                        <iframe src={project.src} onLoad={onLoad} className={`w-full h-full border-[20px] border-black bg-white ${wideScreen ? 'rounded-2xl' : 'rounded-[3rem]'}`}></iframe>
                    </div>
                </div>)}
            <div className="absolute left-[55vw] bottom-20 w-32 h-12 bg-white/20 rounded-full flex items-center justify-between p-3 cursor-pointer" onClick={() => setWideScreen(!wideScreen)}>
                <Smartphone className="w-6 h-6" />
                <Tv2 className="w-6 h-6" />
                <div className={`absolute ${wideScreen ? 'left-[84px]' : 'left-[1px]'} transition-all duration-200 w-10 h-10 rounded-full bg-white/20`}></div>
            </div>
            <WheelGuid guidDisplay={guidDisplay} />
        </div>
    )
}