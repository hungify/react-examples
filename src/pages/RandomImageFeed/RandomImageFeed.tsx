import { useIntersectionObserver } from '~/hooks';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface LazyLoadImageProps {
  src: string;
  alt: string;
}
function LazyLoadImage({ src, alt }: LazyLoadImageProps) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const entry = useIntersectionObserver(imgRef, {});
  const isVisible = !!entry?.isIntersecting;

  useEffect(() => {
    if (entry?.intersectionRatio === 1) {
      imgRef.current?.classList.remove('bg-gray-200');
    } else {
      imgRef.current?.classList.add('bg-gray-200');
    }

    if (isVisible) {
      imgRef?.current?.setAttribute('src', src);
    }
  }, [entry?.intersectionRatio, isVisible, src]);

  return (
    <div className='border-2 w-[300px] '>
      <img
        ref={imgRef}
        alt={alt || 'random'}
        className='h-[300px] w-[300px] object-cover'
      />
    </div>
  );
}

export default function RandomImageFeed() {
  const location = useLocation();
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const size = () => {
    return Math.floor(Math.random() * 10) + 300;
  };

  return (
    <div className='flex flex-col items-center h-screen'>
      <h1>Random Image Feed</h1>

      <div className='flex items-center justify-center flex-wrap max-w-[1000px] gap-5'>
        {Array(100)
          .fill(0)
          .map((_, i) => (
            <LazyLoadImage
              key={i}
              alt='random'
              src={`https://source.unsplash.com/random/${size() + i}x${
                size() + i
              }`}
            />
          ))}
      </div>
    </div>
  );
}
