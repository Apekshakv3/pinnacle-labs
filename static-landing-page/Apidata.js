import React, { useEffect, useState } from 'react';

const Apidata = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const url = 'https://quotes-api12.p.rapidapi.com/dev-jokes?category=all&subcategory=javascript';
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '8fd4cc5935msh55369f10316779ap1845e9jsneaa2d2f9d6f8',
          'x-rapidapi-host': 'quotes-api12.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        const json = await response.json();
        console.log(json);
        setData(json);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h2>API Data</h2>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Apidata;
