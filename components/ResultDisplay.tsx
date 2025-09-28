
import React from 'react';

interface ResultDisplayProps {
    outputImage: string | null;
    isLoading: boolean;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ outputImage, isLoading }) => {

    const handleDownload = () => {
        if (!outputImage) return;
        const link = document.createElement('a');
        link.href = outputImage;
        link.download = 'digitized-embroidery.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="bg-base-200 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center h-full min-h-[400px]">
            {isLoading && (
                <div className="text-center">
                    <svg className="animate-spin mx-auto h-12 w-12 text-brand-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="mt-4 text-lg font-medium">AI is working its magic...</p>
                    <p className="text-sm text-gray-400">This may take a moment.</p>
                </div>
            )}
            {!isLoading && !outputImage && (
                <div className="text-center text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="mt-4 text-lg">Your digitized blueprint will appear here.</p>
                </div>
            )}
            {!isLoading && outputImage && (
                <div className="w-full h-full flex flex-col">
                    <div className="flex-grow flex items-center justify-center mb-4">
                         <img src={outputImage} alt="Digitized Embroidery" className="max-w-full max-h-full object-contain rounded-md shadow-md" />
                    </div>
                    <button
                        onClick={handleDownload}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-base-100 focus:ring-green-500 transition-colors"
                    >
                        Download Blueprint
                    </button>
                </div>
            )}
        </div>
    );
};

export default ResultDisplay;
