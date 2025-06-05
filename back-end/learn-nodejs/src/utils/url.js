const isGGDriveLink = (link) => {
    try {
        const url = new URL(link);

        return url.hostname === 'drive.google.com';
    } catch (error) {
        return false;
    }
};
