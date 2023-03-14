async function toBase64(photo: File) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(photo);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export { toBase64 }