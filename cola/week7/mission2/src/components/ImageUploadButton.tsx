import { useRef } from 'react';

interface ImageUploadButtonProps {
  onChange: (file: File, previewUrl: string) => void;
  preview?: string | null;
  fallback?: string | React.ReactNode;
}

const ImageUploadButton = ({
  onChange,
  preview,
  fallback,
}: ImageUploadButtonProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(file, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderFallback = () => {
    if (typeof fallback === 'string') {
      return (
        <img
          src={fallback}
          alt="기본 이미지"
          className="rounded-md object-cover"
        />
      );
    }
    return fallback; // JSX 요소 (예: <FiUser />)
  };

  return (
    <div onClick={handleButtonClick} className="w-full h-full cursor-pointer">
      {preview ? (
        <img
          src={preview}
          alt="업로드 이미지"
          className="w-full h-full object-cover rounded-md"
        />
      ) : (
        renderFallback()
      )}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ImageUploadButton;
