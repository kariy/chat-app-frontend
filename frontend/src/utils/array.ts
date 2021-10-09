function pushWithEffect(
    arr: any[],
    item: any,
    callback: (itemPushed: any) => void
): boolean {
    if (arr.includes(item)) return false;

    arr.push(item);
    callback(item);
    return true;
}

function deleteWithEffect(
    arr: any[],
    item: any,
    callback: (itemDeleted: any) => void
): boolean {
    if (!arr.includes(item)) return false;

    arr.splice(arr.indexOf(item), 1);
    callback(item);
    return true;
}

export function addToArrayWithEffect(
    arr: any[],
    item: any | any[],
    callback: (itemPushed: any) => void
): any[] {
    const newArr = [...arr];

    if (isArray(item)) {
        item.forEach((i: any) => {
            pushWithEffect(newArr, i, callback);
        });
    } else {
        pushWithEffect(newArr, item, callback);
    }

    return newArr;
}

export function deleteInArrayWithEffect(
    arr: any[],
    item: any | any[],
    callback: (itemDeleted: any) => void
): any[] {
    const newArr = [...arr];

    if (isArray(item)) {
        item.forEach((i: any) => {
            deleteWithEffect(newArr, i, callback);
        });
    } else {
        deleteWithEffect(newArr, item, callback);
    }

    return newArr;
}

export function isArray(arr: any | any[]): boolean {
    return arr.constructor === Array;
}
