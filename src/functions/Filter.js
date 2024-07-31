export const filter = (arr, value, selectBox) => {
    const lowerValue = value.toLowerCase();

    const startsWith = (itemValue) => itemValue.startsWith(lowerValue);
    const includes = (itemValue) => itemValue.includes(lowerValue);

    const sortFunction = (a, b) => {
        const aValue = (selectBox === "waterType" ? a.waterType : selectBox === "area" ? a.area : a.name).toLowerCase();
        const bValue = (selectBox === "waterType" ? b.waterType : selectBox === "area" ? b.area : b.name).toLowerCase();

        if (startsWith(aValue) && !startsWith(bValue)) return -1;
        if (!startsWith(aValue) && startsWith(bValue)) return 1;
        return 0;
    };

    return arr.filter((item) => {
        switch (selectBox) {
            case "waterType": return includes(item.waterType.toLowerCase());
            case "area": return includes(item.area.toLowerCase());
            case "name": return includes(item.name.toLowerCase());
            default: return includes(item.name.toLowerCase());
        }
    }).sort(sortFunction);
};
