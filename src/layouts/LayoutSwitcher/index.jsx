import { useEffect, useState } from "react";
import MainLayout from "../MainLayout";
import DashboardLayout from "../DashboardLayout";
import PreviewLayout from "../PreviewLayout";



const LayoutSwitcher = ({children, type }) => {
    const [layout,setLayout] = useState(<>{children}</>);
    useEffect(() => {
        switch ( type ) {
            case "landing": setLayout(<MainLayout>{children}</MainLayout>)
                break;
            case "dashboard": setLayout(<DashboardLayout>{children}</DashboardLayout>)
                break;
            case "preview": setLayout(<PreviewLayout>{children}</PreviewLayout>)
                break;
            default: setLayout(<>{children}</>)
                break;
        }
    },[type]);
    return (<>
        {layout}
    </>)
};

export default LayoutSwitcher;