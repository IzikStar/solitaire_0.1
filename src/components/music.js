import 'p5/lib/addons/p5.sound';

// פונקציה להפעלת סאונד
export const playSound = (soundPath, onSuccess, onError) => {
  let song;

  const sketch = (p) => {
    p.preload = () => {
      // טוען את קובץ האודיו מהתיקייה שהועברה
      song = p.loadSound(soundPath, () => {
        if (onSuccess) onSuccess(song);  // אם הטעינה הצליחה, נקרא לפעולה שהועברה כפרמטר
        song.play();
      }, (error) => {
        if (onError) onError(error);  // טיפול בשגיאות
        console.error('Error loading sound:', error);
      });
    };

    p.setup = () => {};
  };

  // יצירת instance של p5 עם הסקץ' של הסאונד
  new p5(sketch);
};
