import { useEffect, useState } from "react";
const useUser = () => {
  const [user, setUser] = useState(null);
  const [sesion, setSesion] = useState(false);
  useEffect(() => {
    const localStorage = window.localStorage.getItem("sesion");
    if (localStorage) {
      const user = JSON.parse(localStorage);
      setUser(user);
    }
  }, [sesion]);

  return [user, setSesion];
};

export default useUser;
