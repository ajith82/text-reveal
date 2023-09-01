import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const TextReveal = () => {
  const [lettersRef, setLettersRef] = useArrayRef();
  const triggerRef = useRef(null);

  function useArrayRef() {
    const lettersRef = useRef([]);
    lettersRef.current = [];
    return [lettersRef, (ref) => ref && lettersRef.current.push(ref)];
  }


  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const reveal = gsap.to(lettersRef.current, {
      scrollTrigger: {
        trigger: triggerRef.current,
        scrub: true,
        start: "top center",
        end: "bottom 80%",
      },
      color: "#2A2A2A",
      duration: 5,
      stagger: 1,
    });
    return () => {
      reveal.kill();
    };
  }, []);

  const text =
    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut.";
  return (
    <>
      <div className="spacing-small"></div>
      <div className="reveal">
        <div ref={triggerRef}>
          {text.split("").map((letter, index) => (
            <span className="reveal-text" ref={setLettersRef} key={index}>
              {letter}
            </span>
          ))}
        </div>
      </div>
      <div className="spacing"></div>
    </>
  );
};

export default TextReveal;
