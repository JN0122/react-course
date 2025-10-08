"use client";

import { ChangeEventHandler, useRef, useState } from "react";

import classes from "./image-picker.module.css";
import Image from "next/image";

const ImagePicker = ({ label, name }) => {
  const [pickedImage, setPickedImage] = useState<string | null>(null);
  const imageInput = useRef<HTMLInputElement | null>(null);

  const handlePick = () => {
    if (imageInput) imageInput.current.click();
  };

  const handleImageChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const fileDetails = event.currentTarget.files[0];

    if (!fileDetails) {
      setPickedImage(null);
      return;
    }

    const fr = new FileReader();
    fr.onload = () => setPickedImage(fr.result.toString());
    fr.readAsDataURL(fileDetails);
  };

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {pickedImage ? (
            <Image src={pickedImage} alt="image selected by user" fill />
          ) : (
            "Image preview"
          )}
        </div>
        <input
          className={classes.input}
          ref={imageInput}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          onChange={handleImageChange}
          required
        />
        <button className={classes.button} type="button" onClick={handlePick}>
          Pick an Image
        </button>
      </div>
    </div>
  );
};

export default ImagePicker;
