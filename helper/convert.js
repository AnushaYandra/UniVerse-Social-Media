/* Image on base64*/

export default function convertToBase(file) {
   
    return new Promise((resolve, reject) => {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result)
        };
        fileReader.onerror = error => {
            reject(error)
        }
    })
}