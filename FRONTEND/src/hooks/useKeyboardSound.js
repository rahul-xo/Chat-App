
const keyStrokeSounds=[
  new Audio('/sounds/keystroke1.mp3'),
  new Audio('/sounds/keystroke2.mp3'),
  new Audio('/sounds/keystroke3.mp3'),
  new Audio('/sounds/keystroke4.mp3'),
]

const useKeyboardSound=()=>{
  const playRandomKeyStrokeSound=()=>{
    const randomSound=keyStrokeSounds[Math.floor(Math.random()*keyStrokeSounds.length)]; 
    randomSound.play().catch((err)=>console.log("Error playing sound:",err));


  }
  return {playRandomKeyStrokeSound};
}

export default useKeyboardSound;