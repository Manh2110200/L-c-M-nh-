
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateChristmasWish = async (): Promise<{ message: string }> => {
  const prompt = `Viết một lời chúc Giáng sinh ngắn gọn, ấm áp, ý nghĩa và tràn đầy hy vọng. Lời chúc nên mang không khí lễ hội, có thể thêm một vài biểu tượng cảm xúc Noel. Ngôn ngữ: Tiếng Việt.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          message: {
            type: Type.STRING,
            description: "Lời chúc Giáng sinh chân thành.",
          }
        },
        required: ["message"]
      }
    }
  });

  try {
    const text = response.text;
    return JSON.parse(text || '{"message": "Chúc bạn một Giáng sinh an lành và ấm áp!"}');
  } catch (e) {
    return { message: "Chúc bạn một Giáng sinh an lành, hạnh phúc bên gia đình và người thân!" };
  }
};
