
import React from 'react';
import { ClothingPart } from '../types';
import { CLOTHING_PART_OPTIONS } from '../constants';

interface ControlPanelProps {
    onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    backgroundColor: string;
    onBackgroundColorChange: (color: string) => void;
    clothingPart: ClothingPart;
    onClothingPartChange: (part: ClothingPart) => void;
    onDigitize: () => void;
    isLoading: boolean;
    fileName: string | null;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
    onFileChange,
    backgroundColor,
    onBackgroundColorChange,
    clothingPart,
    onClothingPartChange,
    onDigitize,
    isLoading,
    fileName
}) => {
    return (
        <div className="bg-base-200 p-6 rounded-lg shadow-lg space-y-6">
            <div>
                <label htmlFor="file-upload" className="block text-sm font-medium text-gray-300 mb-2">
                    1. Upload Embroidery Photo
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-500 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="flex text-sm text-gray-400">
                            <label htmlFor="file-upload" className="relative cursor-pointer bg-base-100 rounded-md font-medium text-brand-primary hover:text-brand-secondary focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-base-200 focus-within:ring-brand-primary p-1">
                                <span>Upload a file</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={onFileChange} accept="image/jpeg, image/png" />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                    </div>
                </div>
                 {fileName && <p className="text-sm text-gray-400 mt-2 text-center">Selected: <span className="font-medium">{fileName}</span></p>}
            </div>

            <div>
                <label htmlFor="bg-color" className="block text-sm font-medium text-gray-300 mb-2">
                    2. Choose Background Color
                </label>
                <div className="relative">
                    <input
                        id="bg-color"
                        type="color"
                        value={backgroundColor}
                        onChange={(e) => onBackgroundColorChange(e.target.value)}
                        className="p-1 h-10 w-full block bg-base-300 border-gray-600 rounded-md cursor-pointer"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="clothing-part" className="block text-sm font-medium text-gray-300 mb-2">
                    3. Select Clothing Part
                </label>
                <select
                    id="clothing-part"
                    value={clothingPart}
                    onChange={(e) => onClothingPartChange(e.target.value as ClothingPart)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-base-300 border-gray-600 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm rounded-md"
                >
                    {CLOTHING_PART_OPTIONS.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>

            <button
                onClick={onDigitize}
                disabled={isLoading || !fileName}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-primary hover:bg-brand-secondary disabled:bg-base-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-base-100 focus:ring-brand-primary transition-colors"
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Digitizing...
                    </>
                ) : 'Digitize Embroidery'}
            </button>
        </div>
    );
};

export default ControlPanel;
