export const formatCurrency = (amount: number, decimals = 2): string => {
    return amount.toLocaleString('sv-SE', {
        minimumFractionDigits: 0,
        maximumFractionDigits: decimals,
    });
};