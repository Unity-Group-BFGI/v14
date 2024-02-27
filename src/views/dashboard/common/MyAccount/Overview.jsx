import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { update_menu } from "../../../../includes/redux/slices/menu.slice";

const DashboardMyAccountOverview = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(update_menu({
            CURRENT_PRIMARY_MENU: 'MY-ACCOUNT',
            CURRENT_SECONDARY_MENU_ACTIVE_ITEM: 'MY-ACCOUNT-OVERVIEW',
            CURRENT_DYNAMIC_MENU: null,
            IS_DYNAMIC_MENU_ACTIVE: false,
            PRIMARY_MENU_LOADING: false,
            SECONDARY_MENU_LOADING: false,
            DYNAMIC_MENU_LOADING: false,
            PAGE_HEADING: 'My Account Overview',
            BREADCRUM_ONE: 'Dashboard',
            BREADCRUM_TWO: 'Account',
            BREADCRUM_THREE: 'Overview',
            TAB_TITLE: 'Overview | My Account | Dashboard',
            DYNAMIC_HEADER: 'MY-ACCOUNT-OVERVIEW'
        }));
    },[]);
    
    return (<>
        My Account Overview
    </>);
};

export default DashboardMyAccountOverview;