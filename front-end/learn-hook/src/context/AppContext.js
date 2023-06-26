import React, { useState } from "react";


const AppContext = React.createContext();
const DEFAULT_THEME = 'dark';

export const AppProvider = (props) => {
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const { children } = props;

  const changeTheme = (value) => {
    if (!value) return setTheme(DEFAULT_THEME);
    setTheme(value);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        changeTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;