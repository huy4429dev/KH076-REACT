import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import MyCustomUploadAdapterPlugin from './myCustomUploadAdapterPlugin';

class CkeditorConfig extends React.Component {
    render() {
        const FileRepository = {};
        return (
            <div className="App">
                <h5>Thêm tin tức</h5>
                <CKEditor
                    editor={ClassicEditor}
                    data={""}
                    placeholder="Question Text"
                    config={{ extraPlugins: [MyCustomUploadAdapterPlugin] }}
                />
            </div>
        );
    }
}

export default CkeditorConfig;



