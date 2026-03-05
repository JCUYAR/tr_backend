function generateUsername(firstName: string, lastName: string): string {

    const firstLetter = firstName.trim().charAt(0).toUpperCase();

    const lastNamePart = lastName
        .trim()
        .split(" ")[0]        // primer apellido
        .substring(0, 4)     // 4 primeras letras
        .toUpperCase();

    return `${firstLetter}${lastNamePart}`;
}

export {
    generateUsername,
}