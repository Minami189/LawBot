// useFileUpload.js
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export function useFileUpload(onFileUpload) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onFileUpload(acceptedFiles[0]);
      }
    },
    [onFileUpload]
  );

  const dropzone = useDropzone({
    onDrop,
    noKeyboard: true,
    multiple: false,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc", ".docx"],
      "text/plain": [".txt"],
      "image/png": [".png"],
    },
  });

  return dropzone;
}
