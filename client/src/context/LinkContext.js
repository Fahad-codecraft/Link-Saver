import React, { createContext, useState } from "react";

export const LinkContext = createContext()
export const LinkProvider = ( { children}) => {
    const [refresh, setRefresh] = useState(false);

  const toggleRefresh = () => {
    setRefresh((prevState) => !prevState);
  };

  return (
    <LinkContext.Provider value={{ refresh, toggleRefresh }}>
      {children}
    </LinkContext.Provider>
  );
};
