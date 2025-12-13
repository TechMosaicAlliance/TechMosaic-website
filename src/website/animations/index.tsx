import gsap, { Power4, Power2 } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import {
  useRef,
  useLayoutEffect,
  forwardRef,
  useEffect,
  ReactNode,
} from "react";

interface FadeInProps {
  children: ReactNode;
  stagger?: number;
  x?: number;
}
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const FadeIn = forwardRef<gsap.core.Timeline | null, FadeInProps>(
  (props, ref) => {
    const el = useRef<HTMLSpanElement>(null);
    const animation = useRef<gsap.core.Timeline | null>(null);

    useIsomorphicLayoutEffect(() => {
      animation.current = gsap.timeline({
        paused: true,
        reversed: true,
        defaults: { duration: 0.2 },
      });
      const ctx = gsap.context(() => {
        // @ts-ignore
        animation.current.to(
          // @ts-ignore
          el.current?.children,
          {
            autoAlpha: 1,
          }
        );
      });
      return () => ctx.revert();
    }, []);

    useEffect(() => {
      // forward the animation instance
      if (typeof ref === "function") {
        ref(animation.current);
      } else if (ref) {
        ref.current = animation.current;
      }
    }, [ref]);

    return <>{<span ref={el}>{props.children}</span>}</>;
  }
);

FadeIn.displayName = "FadeIn";

export const SlideIn = forwardRef<gsap.core.Timeline | null, FadeInProps>(
  (props, ref) => {
    const el = useRef<HTMLSpanElement>(null);
    const animation = useRef<gsap.core.Timeline | null>(null);

    useIsomorphicLayoutEffect(() => {
      animation.current = gsap.timeline({
        paused: true,
        reversed: true,

        defaults: {
          delay: 0,
        },
      });
      const ctx = gsap.context(() => {
        // @ts-ignore
        animation.current?.fromTo(
          // @ts-ignore
          el.current?.children,
          {
            // @ts-ignore
            x: -props.x,
            autoAlpha: 0,
          },
          {
            x: 0,
            autoAlpha: 1,
          }
        );
      });
      return () => ctx.revert();
    }, []);

    useEffect(() => {
      // forward the animation instance
      if (typeof ref === "function") {
        ref(animation.current);
      } else if (ref) {
        ref.current = animation.current;
      }
    }, [ref]);

    return <>{<span ref={el}>{props.children}</span>}</>;
  }
);

SlideIn.displayName = "SlideIn";

// export const useHeroAnimation = () => {
//   //First animation on the hero section runs only once
//   useEffect(() => {
//     const timeline = gsap.timeline();

//     // Animation for elements with data-animation="fade-in-y"
//     timeline.fromTo(
//       '[data-animation="fade-in-y"]',
//       { yPercent: 70, opacity: 0 }, // Slower initial reveal
//       {
//         yPercent: 0,
//         opacity: 1,
//         ease: Power2.easeOut, // Smoother easing
//         stagger: {
//           amount: 1.2, // Increase stagger amount for slower sequence
//         },
//       },
//       0.3 // Small delay before the animation starts
//     );

//     // Animation for elements with data-animation="fade-in"
//     timeline.to('[data-animation="fade-in"]', {
//       opacity: 1,
//       duration: 2.5, // Slower fade-in animation
//       ease: Power2.easeInOut, // Smoother transition
//     });
//   }, []);
//   // useEffect(() => {
//   //   const timeline = gsap.timeline();
//   //   timeline.fromTo(
//   //     '[data-animation="fade-in-y"]',
//   //     { yPercent: 70, opacity: 0, duration: 3 },
//   //     {
//   //       yPercent: 0,
//   //       opacity: 1,
//   //       ease: Power2.easeOut,
//   //       stagger: {
//   //         amount: 0.6,
//   //       },
//   //     },
//   //     0.3
//   //   );
//   //   timeline.to(
//   //     '[data-animation="fade-in"]',
//   //     {
//   //       opacity: 1,
//   //       ease: Power2.easeIn,
//   //     }
//   //     // "-=0.9"
//   //   );
//   // }, []);

//   useEffect(() => {
//     gsap.defaults({ ease: "power3" });
//     gsap.set('[data-animation="trigger-fade-in-y"]', { y: 50 });
//     ScrollTrigger.batch('[data-animation="trigger-fade-in-y"]', {
//       onEnter: (batch) =>
//         gsap.to(batch, {
//           opacity: 1,
//           y: 0,
//           stagger: { each: 0.15, grid: [1, 3] },
//           overwrite: true,
//         }),
//       onLeave: (batch) =>
//         gsap.set(batch, { opacity: 0, y: -100, overwrite: true }),
//       onEnterBack: (batch) =>
//         gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, overwrite: true }),
//       onLeaveBack: (batch) =>
//         gsap.set(batch, { opacity: 0, y: 50, overwrite: true }),
//       // you can also define things like start, end, etc.
//     });
//     ScrollTrigger.batch('[data-animation="scroll-fade-in-y"]', {
//       onEnter: (batch) =>
//         gsap.fromTo(
//           batch,
//           { yPercent: 120, opacity: 1, duration: 1 },
//           {
//             yPercent: 0,
//             opacity: 1,
//             ease: Power2.easeOut,
//             stagger: {
//               amount: 0.2,
//             },
//           }
//         ),
//     });
//   }, []);
// };

type Iprops = {
  dataLoaded?: boolean;
};
export const useHeroAnimation = (props?: Iprops) => {
  const timelineRef = useRef<any>(null);

  useEffect(() => {
    if (props?.dataLoaded !== undefined && props?.dataLoaded === false) return;

    // Initial animations
    const timeline = gsap.timeline();
    timelineRef.current = timeline;

    timeline.fromTo(
      '[data-animation="fade-in-y"]',
      { yPercent: 70, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        ease: "power2.out",
        stagger: {
          amount: 1.2,
        },
      },
      0.3
    );

    timeline.to('[data-animation="fade-in"]', {
      opacity: 1,
      duration: 2.5,
      ease: "power2.inOut",
    });

    // ScrollTrigger animations
    gsap.defaults({ ease: "power3" });
    gsap.set('[data-animation="trigger-fade-in-y"]', { y: 50, opacity: 0 });

    ScrollTrigger.batch('[data-animation="trigger-fade-in-y"]', {
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          stagger: { each: 0.15, grid: [1, 3] },
          overwrite: true,
        }),
      onEnterBack: (batch) =>
        gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, overwrite: true }),
    });

    ScrollTrigger.batch('[data-animation="scroll-fade-in-y"]', {
      onEnter: (batch) =>
        gsap.fromTo(
          batch,
          { yPercent: 120, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            stagger: {
              amount: 0.2,
            },
          }
        ),
    });

    // Cleanup function
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [props?.dataLoaded]); // Re-run effect when dataLoaded changes
};
