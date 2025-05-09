export const useFetchWithTimeout = async () => {
  const abortController = new AbortController();
  let timer = setTimeout(() => {
    abortController.abort();
  }, 1000);

  try {
    const request = new Request(
      "https://dummyjson.com/products?limit=10&skip=0",

      {
        signal: abortController.signal,
      }
    );
    const response = await fetch(request);
    clearTimeout(timer);
    return await response.json();
  } catch (e) {
    if (error.name === "AbortError") {
      console.error("Fetch aborted due to timeout");
    } else {
      console.error("Fetch failed:", error);
    }
    throw error;
  }
};
