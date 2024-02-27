const MY_DOMAIN_OVERVIEW_DYNAMIC_MENU = [
    {
        key: 0,
        action: 'MY-DOMAIN-MY-DOMAIN-OVERVIEW',
        params: {
            param1: 'MY-DOMAINS',
            param2: 'MY-DOMAIN',
            param3: 'MY-DOMAIN-OVERVIEW'
        },
        meta: {
            heading             : 'Overview',
            subHeading          : 'Domain Basic details',
            icon                : 'svg-pencil',
            iconColorClass      : "svg-icon-primary",
            iconBgColorClass    : "bg-light-primary",
            activeClass         : "bg-light-primary txt-primary border-primary",
        }
    },
    {
        key: 1,
        action: 'MY-DOMAIN-MY-DOMAIN-APIS',
        params: {
            param1: 'MY-DOMAINS',
            param2: 'MY-DOMAIN',
            param3: 'MY-DOMAIN-APIS'
        },
        meta: {
            heading             : 'Api keys',
            subHeading          : 'Domain api keys for each product',
            icon                : 'svg-api-keys',
            iconColorClass      : "svg-icon-success",
            iconBgColorClass    : "bg-light-success",
            activeClass         : "bg-light-success txt-success border-success",
        }
    },
];

export { 
    MY_DOMAIN_OVERVIEW_DYNAMIC_MENU
};