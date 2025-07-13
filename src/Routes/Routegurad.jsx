import { useEffect, useState } from 'react';

const Routeguard = (pageName, requiredPermission) => {
    const [hasPermission, setHasPermission] = useState(false);

    useEffect(() => {
        const AccessItems = JSON.parse(localStorage.getItem("AccessItems"));
        const page = AccessItems?.find((item) => item.PageName === pageName);

        if (page && page[requiredPermission] === 1) {
            setHasPermission(true);
        } else {
            setHasPermission(false);
        }
    }, [pageName, requiredPermission]);

    return hasPermission;
};

export default Routeguard;
