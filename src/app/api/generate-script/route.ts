import { GoogleGenAI } from '@google/genai'
import { NextRequest, NextResponse } from 'next/server'

const MODEL_NAME = 'gemini-2.5-flash'

async function run(prompt: string) {
  const ai = new GoogleGenAI({})

  const parts = [{ text: prompt }]
  const systemPrompt = `
      You are a scriptwriter for a tech presentation.
      Your task is to generate a script for a presentation slide.
      The script should be simple and direct.
      Based on the data provided, state the name of the project and its leaders.
      Do not add any extra words, introduction or conclusion.
      For example, if the data is about a project named "OWASP Top 10" with leaders "John Doe" and "Jane Doe", the script should be something like: "OWASP Top 10, led by John Doe and Jane Doe."
      Start the presentation with the text: "Here are some of the new projects from our community."
  `

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

    if (!slide.data) {
      return NextResponse.json({ error: 'Missing slide data' }, { status: 400 })
    }

    const prompt = `
      Slide Type: ${slide.type}
      Slide Title: ${slide.title}
      Slide Data: ${JSON.stringify(slide.data, null, 2)}
    `

    const response = await run(prompt)

    return NextResponse.json({ script: response })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to generate script' }, { status: 500 })
  }
}
