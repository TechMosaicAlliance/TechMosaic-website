"use client";
import { BlurImage } from "@/components/ui/blurImage";
import { Button } from "@/components/ui/button";
import { Pause, Play } from "lucide-react";
import React, { useRef, useState } from "react";

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showThumbnail, setShowThumbnail] = useState(true);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
        setShowThumbnail(false);
      }
      setIsPlaying(!isPlaying);
    }
  };
  const handleVideoEnd = () => {
    setIsPlaying(false);
    setShowThumbnail(true);
  };
  return (
    <div className="  bg-green-800/20 h-full flex items-center justify-center relative">
      {showThumbnail && (
        <div className="absolute overflow-hidden top-0 w-full h-full">
          <BlurImage
            alt=""
            src={thumbnail}
            fill
            className=" object-cover aspect-auto"
          />
        </div>
      )}

      <Button
        onClick={() => togglePlayPause()}
        className="absolute cursor-pointer z-10 h-[3rem] w-[3rem] bg-black lg:w-[5rem] lg:h-[5rem] rounded-full"
      >
        {isPlaying ? <Pause size={32} /> : <Play size={32} />}
      </Button>

      <video ref={videoRef} onEnded={handleVideoEnd} className="h-full w-full">
        <source src={videoSrc} type="video/webm" />
        <source src={videoSrc} type="video/mp4" />
        Download the
        <a href="/assets/video1.mp4">WEBM</a>
        or
        <a href="/assets/video1.mp4">MP4</a>
        video.
      </video>
    </div>
  );
}
