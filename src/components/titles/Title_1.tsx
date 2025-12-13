import { useEffect, useRef } from "react";
import { gsap } from "gsap";

function Title1({ title }: { title: string }) {
    const titleAni = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            titleAni.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, ease: "power2.in" }

        );
    }, []);

    return (
        <div ref={titleAni} className="flex flex-col items-center">
            <h1 className="text-gray-300 font-bold text-4xl">
                {title}
            </h1>
        </div>
    );
}

export default Title1;
