// Simple localStorage-based offline storage
const STORE_KEY = 'offline-actions';

export async function saveOfflineAction(action) {
    try {
        const actions = getOfflineActionsSync();
        actions.push(action);
        localStorage.setItem(STORE_KEY, JSON.stringify(actions));
    } catch (error) {
        console.error('Error saving offline action:', error);
    }
}

export async function getOfflineActions() {
    return getOfflineActionsSync();
}

function getOfflineActionsSync() {
    try {
        const actions = localStorage.getItem(STORE_KEY);
        return actions ? JSON.parse(actions) : [];
    } catch (error) {
        console.error('Error getting offline actions:', error);
        return [];
    }
}

export async function clearOfflineActions() {
    try {
        localStorage.removeItem(STORE_KEY);
    } catch (error) {
        console.error('Error clearing offline actions:', error);
    }
}