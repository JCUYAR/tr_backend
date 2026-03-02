export function generateNextCode(prefix: string, lastCode?: string | null): string {

    if (!lastCode) {
        return `${prefix}-00001`;
    }

    const lastNumber = parseInt(lastCode.split('-')[1]);
    const next = (lastNumber + 1).toString().padStart(5, '0');

    return `${prefix}-${next}`;
}