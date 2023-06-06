import React from 'react'
import { Button, useTheme } from "@mui/material";
import { tokens } from "../../../../theme";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import './FileUploader.scss'
import axios from 'axios'

const FileUploader = ({ files, setFiles, removeFile }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    const uploadHandler = (event) => {
        const file = event.target.files[0];
        if(!file) return;
        file.isUploading = true;
        setFiles([...files, file])

        // upload file
        const formData = new FormData();
        formData.append(
            "newFile",
            file,
            file.name
        )
        axios.post('http://localhost:8080/upload', formData)
            .then((res) => {
                file.isUploading = false;
                setFiles([...files, file])
            })
            .catch((err) => {
                // inform the user
                console.error(err)
                removeFile(file.name)
            });
    }

    return (
        <>
            <div className="file-card">
                <div className="file-inputs">
                    <input type="file" onChange={uploadHandler} />
                    <Button
                        sx={{
                            backgroundColor: colors.blueAccent[700],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                        }}
                    >
                        <i>
                            < AddCircleRoundedIcon />
                        </i>
                        Upload
                    </Button>
                </div>

                <p className="main">Supported files PNG, PDF, JPG</p>

            </div>
        </>
    )
}

export default FileUploader
