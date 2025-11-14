import { GoogleGenAI } from '@google/genai'
import { NextRequest, NextResponse } from 'next/server'

const MODEL_NAME = 'gemini-2.5-flash'

async function run(systemPrompt: string, userPrompt: string) {
  const ai = new GoogleGenAI({})

  const parts = [{ text: userPrompt }]

  const result = await ai.models.generateContent({
    config: {
      systemInstruction: systemPrompt,
      maxOutputTokens: 2048,
      temperature: 0.2,
      thinkingConfig: {
        thinkingBudget: 0,
      },
    },
    contents: [{ role: 'user', parts }],
    model: MODEL_NAME,
  })

  return result.text
}

export async function POST(req: NextRequest) {
  try {
    const { slide } = await req.json()

    if (!slide.scriptGenerationPrompt) {
      return NextResponse.json({ error: 'No prompt configured for this slide' }, { status: 400 })
    }
    if (!slide.data) {
      return NextResponse.json({ error: 'Missing slide data' }, { status: 400 })
    }

    const systemPrompt = slide.scriptGenerationPrompt
    const userPrompt = JSON.stringify(slide.data, null, 2)

    const script = await run(systemPrompt, userPrompt)

    return NextResponse.json({ script })
  } catch (error) {
    console.error('Error generating script:', error)
    return NextResponse.json({ error: 'Failed to generate script' }, { status: 500 })
  }
}
