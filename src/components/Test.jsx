import React, { useRef, useEffect } from 'react';
import 'p5/lib/addons/p5.sound';

const AudioPlayer = () => {
  const p5InstanceRef = useRef(null);

  const startMusic = () => {
    if (p5InstanceRef.current) return;

    let song;

    const sketch = (p) => {
      p.preload = () => {
        // טוען את קובץ האודיו מהתיקייה public
        song = p.loadSound('/public/sounds/goBackSound2.wav', () => {
          // אם הטעינה הצליחה, ננגן את האודיו
          song.play();
        }, (error) => {
          // טיפול בטעויות
          console.error('Error loading sound:', error);
        });
      };

      p.setup = () => {
        // מבצע את הפעולה הנוספת לאחר ההגדרה
      };
    };

    p5InstanceRef.current = new p5(sketch);
  };

  return (
    <div>
      <button onClick={startMusic}>Play Music</button>
    </div>
  ) // לא מחזיר שום רכיב UI, רק מנגן אודיו
};

export default AudioPlayer;
