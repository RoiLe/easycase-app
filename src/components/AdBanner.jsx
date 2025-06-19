import React from "react";

export default function AdBanner({
  adVideos,
  adImages,
  adIndex,
  adTexts,
  handleTouchStart,
  handleTouchEnd,
}) {
  return (
    <section
      className="relative flex flex-col-reverse md:flex-row items-center justify-center px-6 py-12 min-h-[50vh] bg-black"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        {adVideos.map((src, idx) => (
          <video
            key={idx}
            src={src}
            autoPlay
            loop
            muted
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              idx === adIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-black/20 z-20" />
      </div>

      <div className="relative z-30 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          {adTexts[adIndex]}
        </h1>
        <div className="flex gap-2 justify-center">
          {adImages.map((_, idx) => (
            <span
              key={idx}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                idx === adIndex ? "bg-white scale-125" : "bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
