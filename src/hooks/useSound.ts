import { Howl } from 'howler';

const useSound = () => {
  const playSound = (src: string) => {
    const sound = new Howl({ src: [src] });
    sound.play();
  };

  return { playSound };
};

export default useSound;