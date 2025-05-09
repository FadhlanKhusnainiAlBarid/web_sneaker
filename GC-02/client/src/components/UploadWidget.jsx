import { useEffect, useRef } from "react";
import { Button } from "flowbite-react";
import Tooltip from "@mui/material/Tooltip";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const UploadWidget = ({ ky, index, handleAddImage }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUDNAME,
        uploadPreset: "sneakers-store",
      },
      function (error, result) {
        // console.log(result);
        if (!error && result && result.event === "success") {
          handleAddImage(ky, index, result.info.secure_url);
        }
        // Handle the result or error here
      }
    );
  }, []);

  return (
    <Tooltip title={`Upload image ${index + 1}`}>
      <Button
        onClick={() => widgetRef.current.open()}
        className="cursor-pointer px-2"
        color="alternative"
      >
        <FileUploadIcon className="text-white" />
      </Button>
    </Tooltip>
  );
};

export default UploadWidget;
