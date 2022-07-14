import { sounds } from 'mocks/sounds';
import { useEffect, useState } from 'react';

export default function SoundBoard() {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audio) {
      audio.play();
    }
  }, [audio]);

  const handleOpenSound = (sound: string) => () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setAudio(new Audio(sound));
  };
  return (
    <div className="h-screen bg-[#A164DF] flex justify-center items-center">
      <div className="flex flex-wrap justify-center">
        {sounds.map((s) => (
          <button
            onClick={handleOpenSound(s.sound)}
            key={s.id}
            className="rounded-lg m-4 px-12 py-6 text-base cursor-pointer bg-purple-800 border-none text-white font-semibold hover:color-white hover:bg-purple-700"
          >
            <span>{s.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
