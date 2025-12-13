import { useEffect, useRef } from "react";
import gsap from "gsap";

interface AnimatedTitleProps {
    text: string;
    className?: string;
}

// Función interna para dividir texto en spans
const splitTextIntoSpans = (element: HTMLElement | null): HTMLSpanElement[] => {
    if (!element) return [];

    const text = element.textContent || "";
    element.textContent = "";

    const spans: HTMLSpanElement[] = [];

    text.split("").forEach((letter) => {
        const span = document.createElement("span");
        span.textContent = letter === " " ? "\u00A0" : letter;
        element.appendChild(span);
        spans.push(span);
    });

    return spans;
};

const Title_2 = ({ text, className = "" }: AnimatedTitleProps) => {
    const titleRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const spans = splitTextIntoSpans(titleRef.current);

        gsap.fromTo(
            spans,
            { opacity: 0, y: 20, scale: 0.8 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                stagger: 0.05,
                duration: 0.5,
                ease: "back.out(1.7)",
            }
        );
    }, []);

    return (
        <h1 ref={titleRef} className={className}>
            {text}
        </h1>
    );
};

export default Title_2;
