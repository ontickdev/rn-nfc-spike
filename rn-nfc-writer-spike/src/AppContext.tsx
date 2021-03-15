import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
} from 'react';

interface IAppContextProps {
  showNfcPrompt: boolean;
  setShowNfcPrompt: Dispatch<SetStateAction<boolean>>;
}

interface IActions {
  setShowNfcPrompt?: (value: boolean) => void;
}

const Actions: IActions = {};

const AppContext = createContext<IAppContextProps>({
  showNfcPrompt: false,
  setShowNfcPrompt: () => console.warn('no setShowNfcPrompt provider.'),
});

interface IAppContextProviderProps extends IAppContextProps {
  children: ReactNode;
}

const AppContextProvider: React.FC<IAppContextProviderProps> = ({
  showNfcPrompt,
  setShowNfcPrompt,
  children,
}) => {
  const value = {
    showNfcPrompt,
    setShowNfcPrompt,
  };

  Actions.setShowNfcPrompt = (val: boolean) => {
    setShowNfcPrompt(val);
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useAppContext = () => useContext(AppContext);

export { useAppContext, AppContext, Actions };
export default AppContextProvider;
