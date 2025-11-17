import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import classes from "./FileUpload.module.css";

function FileUpload({ onFileUpload, message="Click To Upload PNG / Text / PDF / Word Document"}) {
    const [isDragging, setIsDragging] = useState(false);

    const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onFileUpload(acceptedFiles[0]); 
      setIsDragging(false)
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, open} = useDropzone({
    onDrop,
    onDragEnter: ()=> console.log("entered"),
    onDragLeave: ()=> console.log("left"),
    noClick: false,
    noKeyboard: true,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc", ".docx"],
      "text/plain": [".txt"],
      "image/png": [".png"],
    },
    multiple: false,
  });

  return (
     <div className={classes.uploadWrapper}>
   {isDragging && <div className={classes.globalDimOverlay}></div>}
      <div {...getRootProps()} className={classes.dropzone}>
        <input {...getInputProps()} />
        <p>{message}</p>
      </div>
   </div>
  );
}

export default FileUpload;