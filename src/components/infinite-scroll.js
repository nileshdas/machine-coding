import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";

// import React, { useEffect, useState, useRef, useCallback } from "react";
// import axios from "axios";

// const InfiniteScrollApp = () => {
//   const [products, setProducts] = useState([]);
//   const [skip, setSkip] = useState(0);
//   const [hasMore, setHasMore] = useState(true);
//   const [loading, setLoading] = useState(false);

//   const observer = useRef();

//   const lastProductRef = useCallback(
//     node => {
//       if (loading) return;
//       if (observer.current) observer.current.disconnect();
//       observer.current = new IntersectionObserver(entries => {
//         if (entries[0].isIntersecting && hasMore) {
//           setSkip(prevSkip => prevSkip + 10);
//         }
//       });
//       if (node) observer.current.observe(node);
//     },
//     [loading, hasMore]
//   );

//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`https://dummyjson.com/products?limit=10&skip=${skip}`);
//       setProducts(prevProducts => [...prevProducts, ...res.data.products]);
//       setHasMore(res.data.products.length > 0);
//     } catch (error) {
//       console.error("Failed to fetch products:", error);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [skip]);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Infinite Scroll Products</h1>
//       {products.map((product, index) => {
//         if (index === products.length - 1) {
//           return (
//             <div
//               key={product.id}
//               ref={lastProductRef}
//               style={{ padding: "20px", border: "1px solid #ccc", marginBottom: "10px" }}
//             >
//               <strong>{product.title}</strong><br />
//               {product.description}
//             </div>
//           );
//         } else {
//           return (
//             <div
//               key={product.id}
//               style={{ padding: "20px", border: "1px solid #ccc", marginBottom: "10px" }}
//             >
//               <strong>{product.title}</strong><br />
//               {product.description}
//             </div>
//           );
//         }
//       })}
//       {loading && <p>Loading more products...</p>}
//       {!hasMore && <p>No more products!</p>}
//     </div>
//   );
// };

// export default InfiniteScrollApp;

const InfiniteScrolling = () => {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  //   const lastProductRef = useCallback(
  //     node => {
  //       if (loading) return;
  //       if (observer.current) observer.current.disconnect();
  //       observer.current = new IntersectionObserver(entries => {
  //         if (entries[0].isIntersecting && hasMore) {
  //           setSkip(prevSkip => prevSkip + 10);
  //         }
  //       });
  //       if (node) observer.current.observe(node);
  //     },
  //     [loading, hasMore]
  //   );

  const lastProductRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setSkip((prev) => prev + 10);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://dummyjson.com/products?limit=10&skip=${skip}&select=title,price,thumbnail`
      );
      setProducts((prev) => [...prev, ...response.data.products]);
    } catch (e) {
      console.log("Error", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, [skip]);

  console.log(products);

  return (
    <>
      <h1>Infinite Scrolling</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {products.map((product, index) => {
          const { title = "", price = "", thumbnail = "" } = product || {};

          if (index === products.length - 1) {
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                  border: "1px solid black",
                }}
                ref={lastProductRef}
              >
                <img src={thumbnail} />
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexDirection: "column",
                    padding: "20px",
                  }}
                >
                  <h3>{title}</h3>
                  <h3>{price}</h3>
                </div>
              </div>
            );
          }

          return (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                border: "1px solid black",
              }}
            >
              <img src={thumbnail} />
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexDirection: "column",
                  padding: "20px",
                }}
              >
                <h3>{title}</h3>
                <h3>{price}</h3>
              </div>
            </div>
          );
        })}
        {loading && <p>Loading more product...</p>}
        {!hasMore && <p>No more products</p>}
      </div>
    </>
  );
};

export default InfiniteScrolling;
