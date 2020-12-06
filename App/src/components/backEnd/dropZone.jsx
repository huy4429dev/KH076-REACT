import React from 'react'
import Dropzone from 'react-dropzone-uploader'
import { LogIn } from 'react-feather';
import * as ep from "./../../constants/enpoint";

const MyUploader = (props) => {
    // specify upload params and url for your files
    const pathUpload = '/storage/product/';
    const getUploadParams = ({ meta }) => {

        return { url: ep.enpoint + '/api/uploads/public/product' }

    }

    // called every time a file's `status` changes
    const handleChangeStatus = ({ meta, file, xhr }, status) => {
        //  console.log(status, meta, file) 
        console.log(file, 'UPLOAD FILE');
        console.log(meta, 'UPLOAD FILE');
        console.log(status, 'UPLOAD FILE');
        if (status === 'done'){
            let response = JSON.parse(xhr.response);
            props.onUpload(ep.enpoint + response.data.url)
        }  

    }

    // receives array of files that are done uploading when submit button is clicked
    const handleSubmit = (files, allFiles) => {
        console.log(files.map(f => f.meta));
        allFiles.forEach(f => f.remove());
    }

    return (
        <div className="dropzone d-flex justify-content-center">
            <Dropzone
                getUploadParams={getUploadParams}
                onChangeStatus={handleChangeStatus}
                onSubmit={handleSubmit}
                accept="image/*,audio/*,video/*"
            />
        </div>

    )
}

export default MyUploader