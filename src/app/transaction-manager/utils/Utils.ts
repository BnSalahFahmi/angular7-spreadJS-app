export function getValueByType(value: any) {
    if (!value) return null;
    if (Number(value)) {
        return Number(value);
    } else {
        return value;
    }
}