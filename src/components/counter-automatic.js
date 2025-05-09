import React, { useEffect, useState } from "react";

const AutomaticCounter = () => {
  const [currentSec, setCurrentSec] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSec((prev) => {
        if (prev >= 10) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div>{currentSec}</div>;
};

export default AutomaticCounter;

// import React, { useEffect, useState } from "react";

// const AutomaticCounter = () => {
//   const [currentSec, setCurrentSec] = useState(1);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSec((prev) => {
//         if (prev >= 10) {
//           clearInterval(interval);
//           return prev;
//         }
//         return prev + 1;
//       });
//     }, 1000);

//     return () => clearInterval(interval); // Cleanup on unmount
//   }, []);

//   return <div>{currentSec <= 10 ? currentSec : "Done!"}</div>;
// };

// export default AutomaticCounter;
