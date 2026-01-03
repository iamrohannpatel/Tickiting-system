import React from "react";

interface FilePreviewProps {
    src?: string;       // URL string (for existing evidence)
    file?: File | null; // File object (for upload preview)
    alt?: string;
    onRemove?: () => void;
    label?: string;
    className?: string;
}

const FilePreview: React.FC<FilePreviewProps> = ({ src, file, alt = "Preview", onRemove, label = "Attached Evidence", className = "" }) => {

    // Determine the source to display
    const displaySrc = file ? URL.createObjectURL(file) : src;

    return (
        <div className={`pt-6 mt-6 border-t border-gray-100 dark:border-gray-700 ${className}`}>
            <h3 className="mb-3 text-lg font-semibold text-gray-800 dark:text-white/90">{label}</h3>

            <div className="flex items-center justify-center p-8 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl dark:bg-gray-900/50 dark:border-gray-800">
                {displaySrc ? (
                    <div className="relative inline-block">
                        <img src={displaySrc} alt={alt} className="max-h-64 rounded-lg object-contain" />
                        {onRemove && (
                            <button
                                onClick={onRemove}
                                className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70 transition-colors"
                                title="Remove file"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col items-center text-gray-400">
                        <svg className="w-10 h-10 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        <span>No image/video attached</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FilePreview;
