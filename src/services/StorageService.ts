export const StorageService = {
    url: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_URL,

    getImage: (id: string): string => {
        return `${StorageService.url}${encodeURIComponent(id)}.jpg?alt=media`;
    },
};
