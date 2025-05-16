import { useRef, useState } from 'react';

const ImageUploadButton = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  return <div>ImageUploadButton</div>;
};

export default ImageUploadButton;
