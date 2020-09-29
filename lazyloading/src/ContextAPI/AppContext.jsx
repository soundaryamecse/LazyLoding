import React from 'react'
import axios from  ''

export const AppContext=React.createContext()


class AppContextProvider extends React.Component{
    constructor(props)
    {
        super(props)

    }
    render()
    {
        return(
            <AppContext.Provider>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}