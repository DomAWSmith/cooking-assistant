interface Props {
    className: string
}

export default function ChefFace({ className }: Props) {
    return (
        <div className={`${className} relative`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 311.35 475.91" height="10em" width="10em" className="chef -ml-4.5 relative z-10 text-center">
                <circle cx="178.35" cy="342.91" r="127" className="fill-white stroke-black stroke-[8px]" strokeLinecap="round" strokeLinejoin="round" />
                <path className="moustache animate-wiggle origin-[55%_65%] stroke-black fill-black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" d="M250.78 388.78s-21.08 21.13-72.45 21.13-73.42-21.13-73.42-21.13c13.65-23.95 37.42-39.37 72.94-39.37s59.28 15.42 72.93 39.37z" />
                <path d="M153.65 335.91a30.59 30.59 0 0 0-7.3 19.83c0 17.21 14.32 31.17 32 31.17s32-14 32-31.17a30.54 30.54 0 0 0-7-19.49" className="fill-white stroke-black stroke-[8px]" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="216.35" cy="315.91" r="13" className="fill-white stroke-black stroke-[8px]" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="138.35" cy="315.91" r="13" className="fill-white stroke-black stroke-[8px]" strokeLinecap="round" strokeLinejoin="round" />
                <path className="fill-black" d="M119.72 286.84c.2-3.62 2.37-7.14 5.88-9.85 6.8-5.26 17.44-5.52 24.6-.72 4 2.65 6.5 6.26 6.82 11a5.5 5.5 0 0 1-1.69 4.22c-.94.7-3.12.58-4.3 0-5.11-2.64-10.41-4.17-16.09-3a43.48 43.48 0 0 0-9.1 3.17c-3.53 1.54-6.26-.04-6.12-4.82zM197.72 286.84c.2-3.62 2.37-7.14 5.88-9.85 6.8-5.26 17.44-5.52 24.6-.72 4 2.65 6.5 6.26 6.82 11a5.5 5.5 0 0 1-1.69 4.22c-.94.7-3.12.58-4.3 0-5.11-2.64-10.41-4.17-16.09-3a43.48 43.48 0 0 0-9.1 3.17c-3.53 1.54-6.26-.04-6.12-4.82z" />
                <path d="M211.69 191.51L190.53 79a43 43 0 0 0-49.32-62.16 43.44 43.44 0 0 0-10.34 4.44 48 48 0 0 0-84.4 23.8 43 43 0 0 0-20.7 80.38l41 107.75a16.42 16.42 0 0 0-1.71 12.9 16.5 16.5 0 0 0 20.36 11.4l124.16-35A16.5 16.5 0 0 0 221 202.17a16.5 16.5 0 0 0-9.31-10.66z" className="fill-white stroke-black stroke-[8px]" strokeLinecap="round" strokeLinejoin="round" />
                <rect width="162" height="33" x="62.04" y="207.66" className="fill-white stroke-black stroke-[8px]" strokeLinecap="round" strokeLinejoin="round" rx="16.5" ry="16.5" transform="rotate(-15.75 143.032 224.138)" />
                <path d="M131.43 184.83l-23.07-81.81M168.14 175l-17.02-82.48M94.99 195.63l-29.53-78.95" className="fill-none stroke-black stroke-[8px]" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    )
}
