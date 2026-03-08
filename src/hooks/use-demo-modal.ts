import { createContext, useContext } from "react";

const DemoModalContext = createContext<() => void>(() => {});
export const useDemoModal = () => useContext(DemoModalContext);
export const DemoModalProvider = DemoModalContext.Provider;
