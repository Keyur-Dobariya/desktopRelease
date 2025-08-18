// Simple localStorage wrapper for data persistence
export const getLocalData = (key) => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error getting local data:', error);
        return null;
    }
};

export const setLocalData = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error('Error setting local data:', error);
        return false;
    }
};

export const removeLocalData = (key) => {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error('Error removing local data:', error);
        return false;
    }
};

export const clearAllLocalData = () => {
    try {
        localStorage.clear();
        return true;
    } catch (error) {
        console.error('Error clearing local data:', error);
        return false;
    }
};
