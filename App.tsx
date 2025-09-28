
import React, { useState, useCallback } from 'react';
import ControlPanel from './components/ControlPanel';
import ResultDisplay from './components/ResultDisplay';
import { ClothingPart } from './types';
import { DEFAULT_BACKGROUND_COLOR } from './constants';
import { digitizeEmbroidery } from './services/geminiService';

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            // remove "data:*/*;base64," prefix
            resolve(result.split(',')[1]);
        };
        reader.onerror = error => reject(error);
    });
};


function App() {
    const [inputFile, setInputFile] = useState<File | null>(null);
    const [inputImagePreview, setInputImagePreview] = useState<string | null>(null);
    const [outputImage, setOutputImage] = useState<string | null>(null);
    const [backgroundColor, setBackgroundColor] = useState<string>(DEFAULT_BACKGROUND_COLOR);
    const [clothingPart, setClothingPart] = useState<ClothingPart>(ClothingPart.Neckline);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setInputFile(file);
            setOutputImage(null);
            setError(null);
            const reader = new FileReader();
            reader.onloadend = () => {
                setInputImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDigitize = useCallback(async () => {
        if (!inputFile) {
            setError("Please upload an image first.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setOutputImage(null);

        try {
            const base64Image = await fileToBase64(inputFile);
            const resultBase64 = await digitizeEmbroidery(base64Image, inputFile.type, backgroundColor, clothingPart);
            setOutputImage(`data:image/png;base64,${resultBase64}`);
        } catch (err: any) {
            setError(err.message || "An unknown error occurred.");
        } finally {
            setIsLoading(false);
        }
    }, [inputFile, backgroundColor, clothingPart]);

    return (
        <div className="min-h-screen bg-base-100 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600 sm:text-5xl lg:text-6xl">
                        Embroidery Digitizer AI
                    </h1>
                    <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
                        Transform your embroidery photos into production-ready digital blueprints with the power of AI.
                    </p>
                </header>

                {error && (
                    <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg relative mb-6" role="alert">
                        <strong className="font-bold">Error: </strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}
                
                <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-8">
                        <ControlPanel
                            onFileChange={handleFileChange}
                            backgroundColor={backgroundColor}
                            onBackgroundColorChange={setBackgroundColor}
                            clothingPart={clothingPart}
                            onClothingPartChange={setClothingPart}
                            onDigitize={handleDigitize}
                            isLoading={isLoading}
                            fileName={inputFile?.name || null}
                        />
                         {inputImagePreview && (
                            <div className="bg-base-200 p-6 rounded-lg shadow-lg">
                                <h3 className="text-lg font-medium text-gray-200 mb-4">Input Preview</h3>
                                <div className="flex justify-center items-center">
                                    <img src={inputImagePreview} alt="Input Preview" className="max-h-80 rounded-md shadow-md"/>
                                </div>
                            </div>
                        )}
                    </div>

                    <div>
                        <ResultDisplay outputImage={outputImage} isLoading={isLoading} />
                    </div>
                </main>

                 <footer className="text-center mt-12 text-gray-500 text-sm">
                    <p>Powered by Google Gemini. Designed for high-fidelity embroidery pattern conversion.</p>
                </footer>
            </div>
        </div>
    );
}

export default App;
