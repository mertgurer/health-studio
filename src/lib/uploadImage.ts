export const uploadImage = async (file: File, fileName: string) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);

    const response = await fetch("/api/image", {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Image upload failed.");
    }
};
