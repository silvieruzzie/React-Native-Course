import { useEffect, useState } from "react";
import { Alert } from "react-native"; // Make sure you import Alert properly if you're using it

const useAppwrite = (fn) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Define fetchData in the main scope so it can be reused by refetch and useEffect
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fn(); // Call the passed function
      setData(response);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Automatically fetch data when the component mounts
    fetchData();
  }, []); // Empty dependency array ensures it runs only once after mount

  // Refetch function to manually trigger a reload
  const refetch = () => fetchData();

  return { data, isLoading, refetch };
};

export default useAppwrite;