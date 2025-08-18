import imagePaths from "./imagesPath";

export const getDataById = (dataList, dataId) => {
    return dataList.find((data) => data._id === dataId);
};

export function capitalizeLastPathSegment(input) {
    if (!input) return '';

    try {
        let path;
        try {
            const parsedUrl = new URL(input);
            path = parsedUrl.pathname;
        } catch {
            path = input;
        }

        const pathSegments = path.split('/').filter(Boolean);

        if (pathSegments.length === 0) return '';

        const lastSegment = pathSegments.pop();

        return lastSegment
            .replace(/[-_]/g, ' ')
            .toLowerCase()
            .replace(/\b\w/g, char => char.toUpperCase());
    } catch (error) {
        return '';
    }
}

export const convertCamelCase = (text) => {
    if (!text) return '';
    return text
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase());
};

export function getFirstName(fullName) {
    if (!fullName) return '';
    return fullName.trim().split(' ')[0];
}

export const getTwoCharacterFromName = (str) => {
    if (str) {
        const words = str.trim().split(" ");
        const firstInitial = words[0].charAt(0).toUpperCase();
        const secondInitial =
            words.length > 1 ? words[1].charAt(0).toUpperCase() : "";
        return firstInitial + secondInitial;
    }
    return "N/A";
};

export const profilePhotoManager = ({ url, gender = 'male' }) => {
    if (url) {
        return url;
    } else {
        if (gender === 'female') {
            return imagePaths.female_profile;
        } else {
            return imagePaths.male_profile;
        }
    }
}

export const getTwoCharacter = (str) => {
    if (str) {
        const words = str.trim().split(" ");
        const firstInitial = words[0].charAt(0).toUpperCase();
        const secondInitial =
            words.length > 1 ? words[1].charAt(0).toUpperCase() : "";
        return firstInitial + secondInitial;
    }
    return "N/A";
};

export function formatMilliseconds(ms) {
    if (ms <= 0 || isNaN(ms)) return "00:00:00";
    let totalSeconds = Math.floor(ms / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}