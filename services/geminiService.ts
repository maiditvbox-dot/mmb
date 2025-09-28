
import { GoogleGenAI, Modality } from "@google/genai";
import { ClothingPart } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const fileToGenerativePart = (base64Data: string, mimeType: string) => {
  return {
    inlineData: {
      data: base64Data,
      mimeType,
    },
  };
};

export const digitizeEmbroidery = async (
    base64Image: string,
    mimeType: string,
    backgroundColor: string,
    clothingPart: ClothingPart
): Promise<string> => {
    
    const imagePart = fileToGenerativePart(base64Image, mimeType);

    const prompt = `
You are an expert AI embroidery digitizer. Your task is to convert the user-provided photograph of fabric embroidery into a high-resolution digital embroidery blueprint suitable for machine embroidery mockups.

Follow these instructions precisely:

1.  **Isolate the Pattern:** Identify and perfectly segment the main embroidery pattern from the original fabric background. Remove all traces of the original fabric texture, shadows, and background.

2.  **Symmetrize:** Analyze the embroidery pattern and make it perfectly symmetrical along its central vertical axis. Correct any asymmetries or distortions present in the original photo due to camera angle or hand-stitching imperfections.

3.  **Color Preservation & Enhancement:**
    *   Accurately identify all distinct colors in the original embroidery.
    *   Preserve these exact colors in the final output.
    *   Make the colors sharp, vibrant, and high-contrast, as if they were digital vector colors.

4.  **Vectorize & Clean Lines:**
    *   Convert all stitch lines into clean, smooth, and sharp digital lines. Remove any fuzziness, loose threads, or irregularities. The final output should look like a clean vector graphic, not a photo.

5.  **Stitch Texture Simulation:**
    *   For each colored region of the design, apply a realistic digital stitch texture.
    *   Use a dense satin stitch texture for outlines and thinner lines.
    *   Use a fill stitch texture for larger colored areas.
    *   The texture should follow the contours of the design.

6.  **Background & Grid:**
    *   Place the final, cleaned, and symmetrized design onto a solid, uniform background color of: ${backgroundColor}.
    *   Overlay a subtle, light-colored grid on top of the background to give it a blueprint/CAD-like appearance. The grid lines should be visible but not distracting from the main design.

7.  **Layout Adjustment:**
    *   The user has specified this is for a '${clothingPart}'. Adapt the final composition to be suitable for this type of clothing part. For a 'Neckline', create a U-shaped design. For a 'Cuff', create a rectangular band. For a 'Border', create a long, repeating horizontal pattern. For a 'Standalone Motif', center the single design element.

8.  **Final Output:**
    *   The final image should be a high-resolution digital rendering. It must not look like a photograph. It should be a professional-grade digital embroidery blueprint. Return ONLY the image.
    `;

    const textPart = { text: prompt };

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image-preview',
            contents: {
                parts: [imagePart, textPart],
            },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });
        
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                return part.inlineData.data;
            }
        }
        throw new Error("API did not return an image.");

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to digitize embroidery. Please check the console for details.");
    }
};
