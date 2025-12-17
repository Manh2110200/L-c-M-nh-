
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateChristmasWish = async (recipientName: string): Promise<{ message: string }> => {
  const prompt = `Viết một lời chúc Giáng sinh đặc biệt, ấm áp và ý nghĩa dành cho một người tên là "${recipientName}". Lời chúc nên mang không khí lễ hội, chân thành và có thể thêm một chút thơ mộng hoặc biểu tượng cảm xúc Noel. Ngôn ngữ: Tiếng Việt.`;

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
            description: "Lời chúc Giáng sinh cá nhân hóa.",
          }
        },
        required: ["message"]
      }
    }
  });

  try {
    const text = response.text;
    return JSON.parse(text || `{"message": "Chúc ${recipientName} một Giáng sinh an lành và ấm áp!"}`);
  } catch (e) {
    return { message: `Chúc ${recipientName} một mùa Giáng sinh tuyệt vời, ngập tràn niềm vui và hạnh phúc bên những người thân yêu!` };
  }
};
