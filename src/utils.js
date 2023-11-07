export const numberToRole = (num) => {
    switch (num) {
        case 1:
            return "User";
        case 2:
            return "Moderator";
        case 3:
            return "Admin";
        default:
            return "Unknown";
    }
};
