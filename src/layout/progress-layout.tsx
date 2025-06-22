import React, {ReactNode} from "react";
import { AppProgressProvider } from "@bprogress/next";

const ProgressLayout = ({children}: { children: ReactNode }) => {
    return <>
        <AppProgressProvider
            height="4px"
            color='#1F8187'
            options={{showSpinner: false}}
            shallowRouting
        >
            {children}
        </AppProgressProvider>
    </>
};

export default ProgressLayout;