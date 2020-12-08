import * as EP from './../../constants/endpoint';

class MyUploadAdapter {
    constructor(loader) {
        // The file loader instance to use during the upload.
        this.loader = loader;
    }

    // Starts the upload process.
    upload() {
        return this.loader.file
            .then(file => new Promise((resolve, reject) => {
                // const toBase64 = file => new Promise((resolve, reject) => {
                //     const reader = new FileReader();
                //     reader.readAsDataURL(file);
                //     reader.onload = () => resolve(reader.result);
                //     reader.onerror = error => reject(error);
                // });
                const formData = new FormData();
                formData.append(
                    "file",
                    file,
                );
                // return toBase64(file).then(cFile => {
                return fetch(`${EP.endpoint}/api/uploads/public/blog`, {
                    method: 'POST',
                    body: formData
                }).then(
                    response => response.json()
                ).then(data => {
                    this.loader.uploaded = true;
                    resolve({
                        default: `${EP.endpoint}${data.data.url}`
                    });
                }).catch(
                    error => console.log(error)
                );
            })
                // })
            );
    }


}

export default function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        // Configure the URL to the upload script in your back-end here!
        return new MyUploadAdapter(loader);
    };
}