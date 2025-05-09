// Create a custom hook “useFetch” that fetches data from an API endpoint and handles the loading, error, and success states.

import { useEffect, useState } from "react";

const useFetch = ({ endpoint }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(undefined);

  const getData = async () => {
    const response = await fetch(endpoint);

    setLoading(false);
    const json = await response.json();
    setData(json);

    // console.log(json);

    if (!response.ok) {
      setError("Could not load");
      console.log("Loading Failed");
    }
  };

  useEffect(() => {
    setLoading(true);
    getData();
  }, []);

  return { error, loading, data };
};

export default useFetch;

// import { useEffect, useState, useRef, useCallback } from "react";

// const useFetch = (
//   endpoint,
//   { retry = 0, pollInterval = null } = {} // retry: number of retries, pollInterval: ms
// ) => {
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState(undefined);

//   const controllerRef = useRef(null);
//   const retryCount = useRef(0);
//   const intervalRef = useRef(null);

//   const fetchData = useCallback(async () => {
//     if (controllerRef.current) controllerRef.current.abort();
//     controllerRef.current = new AbortController();

//     setLoading(true);
//     setError("");

//     try {
//       const response = await fetch(endpoint, {
//         signal: controllerRef.current.signal,
//       });

//       if (!response.ok) {
//         throw new Error("Could not fetch data");
//       }

//       const json = await response.json();
//       setData(json);
//       retryCount.current = 0; // reset on success
//     } catch (err) {
//       if (err.name !== "AbortError") {
//         if (retryCount.current < retry) {
//           retryCount.current++;
//           fetchData(); // retry again
//         } else {
//           setError(err.message || "Unknown error");
//         }
//       }
//     } finally {
//       setLoading(false);
//     }
//   }, [endpoint, retry]);

//   // Initial fetch + polling
//   useEffect(() => {
//     fetchData();

//     if (pollInterval) {
//       intervalRef.current = setInterval(fetchData, pollInterval);
//     }

//     return () => {
//       if (controllerRef.current) controllerRef.current.abort();
//       if (intervalRef.current) clearInterval(intervalRef.current);
//     };
//   }, [endpoint, fetchData, pollInterval]);

//   return { error, loading, data, refetch: fetchData };
// };

// export default useFetch;
