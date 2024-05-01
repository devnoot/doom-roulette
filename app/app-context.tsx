import { ReactNode, createContext, useState } from "react"

const AppContext = createContext({
    odamexPath: {
        get: '',
        set: (val: string) => {} 
    },
    gzdoomPath: {
        get: '',
        set: (val: string) => {} 
    },
    doomWadDir: {
        get: '',
        set: (val: string) => {} 
    }
})

type AppContextProviderProps = {
    children: ReactNode
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {

    const [odamexPath, setOdamexPath] = useState('')
    const [gzdoomPath, setGzdoomPath] = useState('')
    const [doomWadDir, setDoomWadDir] = useState('')

    return (
        <AppContext.Provider value={{
            odamexPath: {
                get: odamexPath,
                set: setOdamexPath
            },
            gzdoomPath: {
                get: gzdoomPath,
                set: setGzdoomPath
            },
            doomWadDir: {
                get: doomWadDir,
                set: setDoomWadDir
            }
        }}>
            {children}
        </AppContext.Provider>
    )
}
