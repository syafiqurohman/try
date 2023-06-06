import React from "react";
import "./FileItem.scss";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

const FileItem = ({ file, deleteFile }) => {
  return (
    <>
      <div className="file-item">
        <li className="file-item" key={file.name}>
          <InsertDriveFileRoundedIcon />
          <p>{file.name}</p>
          <div className="actions">
            <div className="loading"></div>
            {file.isUploading && (
              <RestartAltRoundedIcon onClick={() => deleteFile(file.name)} />
            )}
            {!file.isUploading && (
              <DeleteRoundedIcon onClick={() => deleteFile(file.name)} />
            )}
          </div>
        </li>
      </div>
    </>
  );
};

export default FileItem;
