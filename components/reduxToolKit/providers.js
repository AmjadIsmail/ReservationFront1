const {Provider}= require("react-redux");

export function Providers({children}){
    return <Provider>
        {children}
    </Provider>
}