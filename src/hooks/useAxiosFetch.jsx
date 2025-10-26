import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useAxiosFetch = (dataUrl) => {
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [reloadFlag, setReloadFlag] = useState(0);

  const refetch = useCallback(() => {
    setReloadFlag((prev) => prev + 1);
  }, []);

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();

    const fetchData = async (url) => {
      setIsLoading(true);
      try {
        const response = await axios.get(url, { cancelToken: source.token });
        if (isMounted) {
          setData(response.data);
          setFetchError(null);
        }
      } catch (err) {
        if (isMounted) {
          if (axios.isCancel(err)) {
            setFetchError("Request canceled by the user");
          } else if (err.response) {
            setFetchError(
              `Server error (${err.response.status}): ${err.response.statusText}`
            );
          } else if (err.request) {
            setFetchError(
              "No response from server. Please check your network."
            );
          } else {
            setFetchError(`Error: ${err.message}`);
          }
          setData([]);
        }
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    fetchData(dataUrl);

    const cleanUp = () => {
      isMounted = false;
      source.cancel("Request canceled due to component unmount");
    };

    return cleanUp;
  }, [dataUrl, reloadFlag]);

  return { data, fetchError, isLoading, refetch };
};

export default useAxiosFetch;
