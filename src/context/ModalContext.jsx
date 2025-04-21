import React, { createContext, useState, useContext } from 'react';

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);

  const openCallbackModal = () => setIsCallbackModalOpen(true);
  const closeCallbackModal = () => setIsCallbackModalOpen(false);

  return (
    <ModalContext.Provider
      value={{
        isCallbackModalOpen,
        openCallbackModal,
        closeCallbackModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
