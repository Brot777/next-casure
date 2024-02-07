import { useState } from "react";

const useModal = (initialState = false) => {
  const [isVisible, setIsVisible] = useState(initialState);

  /* FUCTIONS */
  const showModal = () => setIsVisible(true);
  const closeModal = () => setIsVisible(false);

  return [isVisible, showModal, closeModal];
};

export default useModal;
