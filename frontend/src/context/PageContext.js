import { useContext, createContext, useState } from "react";

export const PageContext = createContext();

export const usePageContext = () => {
  return useContext(PageContext);
};

export const PageContextProvider = ({ children }) => {
  const [category, setCategory] = useState(null);

  return (
    <PageContext.Provider value={{ category, setCategory }}>
      {children}
    </PageContext.Provider>
  );
};
