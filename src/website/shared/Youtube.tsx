// "use client";
// import { BlurImage } from "@/components/ui/blurImage";
// import { Button } from "@/components/ui/button";
// import { Pause, Play } from "lucide-react";
// import React, { useEffect, useRef, useState } from "react";

// type IProps = {
//   thumbnail?: string;
//   btnColor?: string;
//   videoSrc: string;
// };
// export default function YoutubeView({
//   btnColor,
//   videoSrc,
//   thumbnail = "/assets/video_preview.jpg",
// }: IProps) {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [video, setVideo] = useState<string>();
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [showThumbnail, setShowThumbnail] = useState(true);

//   useEffect(() => {
//     setVideo(videoSrc);
//   }, [videoSrc]);

//   const togglePlayPause = () => {
//     if (videoRef.current) {
//       if (isPlaying) {
//         videoRef.current.pause();
//       } else {
//         videoRef.current.play();
//         setShowThumbnail(false);
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };
//   const handleVideoEnd = () => {
//     setIsPlaying(false);
//     setShowThumbnail(true);
//   };
//   return (
//     <div className="  bg-green-800/20 h-full flex items-center justify-center relative">
//       {showThumbnail && (
//         <div className="absolute overflow-hidden top-0 w-full h-full">
//           <BlurImage
//             alt=""
//             src={thumbnail}
//             fill
//             className=" object-cover aspect-auto"
//           />
//         </div>
//       )}

//       <Button
//         onClick={() => togglePlayPause()}
//         className="absolute cursor-pointer z-10 h-[3rem] w-[3rem] bg-black lg:w-[5rem] lg:h-[5rem] rounded-full"
//       >
//         {isPlaying ? <Pause size={32} /> : <Play size={32} />}
//       </Button>

//       <video ref={videoRef} onEnded={handleVideoEnd} className="h-full w-full">
//         <source src={video} type="video/webm" />
//         <source src={video} type="video/mp4" />
//         Download the
//         <a href="/assets/video1.mp4">WEBM</a>
//         or
//         <a href="/assets/video1.mp4">MP4</a>
//         video.
//       </video>
//     </div>
//   );
// }

"use client";
import { BlurImage } from "@/components/ui/blurImage";
import { Button } from "@/components/ui/button";
import { Pause, Play } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

type IProps = {
  thumbnail?: string;
  btnColor?: string;
  videoSrc: string;
};

export default function YoutubeView({
  btnColor,
  videoSrc,
  thumbnail = "/assets/video_preview.jpg",
}: IProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showThumbnail, setShowThumbnail] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = videoSrc;
    }
  }, [videoSrc]);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch((error) => {
          console.error("Error playing video:", error);
          // Handle autoplay restrictions or other errors
        });
        setShowThumbnail(false);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setShowThumbnail(true);
  };

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  return (
    <div className="bg-green-800/20 h-full flex items-center justify-center relative">
      {showThumbnail && (
        <div className="absolute overflow-hidden top-0 w-full h-full">
          <BlurImage
            alt=""
            src={thumbnail}
            fill
            className="object-cover aspect-auto"
          />
        </div>
      )}

      <Button
        onClick={togglePlayPause}
        className={`absolute cursor-pointer z-10 h-[3rem] w-[3rem] lg:w-[5rem] lg:h-[5rem] rounded-full ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isLoading}
        style={{ backgroundColor: btnColor || "black" }}
      >
        {isPlaying ? <Pause size={32} /> : <Play size={32} />}
      </Button>

      <video
        ref={videoRef}
        onEnded={handleVideoEnd}
        onCanPlay={handleCanPlay}
        className="h-full w-full"
        preload="metadata"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
