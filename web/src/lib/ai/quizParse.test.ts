import { describe, expect, it } from 'vitest'
import {
  extractJson,
  parseGeneratedQuiz,
  QuizParseError,
  QUIZ_JSON_PROMPT,
} from './quizParse'

const good = {
  questions: [
    {
      question: 'What does R8 do?',
      options: ['Nothing', 'Shrinks and obfuscates', 'Signs the APK', 'Uploads symbols'],
      correctIndex: 1,
      explanation: 'R8 shrinks and obfuscates the Java/Kotlin side.',
    },
  ],
}

function correctText(q: { options: { text: string; isCorrect: boolean }[] }): string {
  return q.options.find((o) => o.isCorrect)!.text
}

describe('QUIZ_JSON_PROMPT', () => {
  it('asks for JSON only and pins the shape the parser expects', () => {
    expect(QUIZ_JSON_PROMPT).toContain('JSON only')
    expect(QUIZ_JSON_PROMPT).toContain('correctIndex')
    expect(QUIZ_JSON_PROMPT).toContain('"questions"')
  })
})

describe('extractJson', () => {
  it('parses a bare JSON reply', () => {
    expect(extractJson('{"a":1}')).toEqual({ a: 1 })
  })

  it('unwraps a ```json fenced block', () => {
    expect(extractJson('```json\n{"a":1}\n```')).toEqual({ a: 1 })
  })

  it('unwraps an unlabelled fence', () => {
    expect(extractJson('```\n{"a":1}\n```')).toEqual({ a: 1 })
  })

  it('ignores prose before and after the JSON', () => {
    const reply = 'Sure! Here are the questions:\n{"a":1}\nLet me know if you want more.'
    expect(extractJson(reply)).toEqual({ a: 1 })
  })

  it('is not fooled by braces in trailing commentary', () => {
    const reply = '{"a":1}\nNote: use {curly braces} carefully.'
    expect(extractJson(reply)).toEqual({ a: 1 })
  })

  it('does not stop at a brace inside a string value', () => {
    expect(extractJson('{"a":"} not the end","b":2}')).toEqual({ a: '} not the end', b: 2 })
  })

  it('handles an escaped quote inside a string', () => {
    expect(extractJson('prose {"a":"say \\"hi\\"","b":2} more')).toEqual({ a: 'say "hi"', b: 2 })
  })

  it('accepts a top-level array', () => {
    expect(extractJson('[{"a":1}]')).toEqual([{ a: 1 }])
  })

  it('throws on an empty reply', () => {
    expect(() => extractJson('   ')).toThrow(QuizParseError)
  })

  it('throws on prose with no JSON, keeping the raw text for display', () => {
    try {
      extractJson('I cannot create a quiz from this transcript.')
      expect.unreachable('should have thrown')
    } catch (e) {
      expect(e).toBeInstanceOf(QuizParseError)
      expect((e as QuizParseError).raw).toContain('I cannot create a quiz')
    }
  })
})

describe('parseGeneratedQuiz — shape tolerance', () => {
  it('parses the documented shape into QuestionInput', () => {
    const { questions, warnings } = parseGeneratedQuiz(JSON.stringify(good))

    expect(warnings).toEqual([])
    expect(questions).toHaveLength(1)
    expect(questions[0]).toEqual({
      questionText: 'What does R8 do?',
      points: 1,
      explanation: 'R8 shrinks and obfuscates the Java/Kotlin side.',
      options: [
        { text: 'Nothing', isCorrect: false },
        { text: 'Shrinks and obfuscates', isCorrect: true },
        { text: 'Signs the APK', isCorrect: false },
        { text: 'Uploads symbols', isCorrect: false },
      ],
    })
  })

  it('accepts a bare array of questions', () => {
    const { questions } = parseGeneratedQuiz(JSON.stringify(good.questions))
    expect(questions).toHaveLength(1)
  })

  it('accepts a single unwrapped question object', () => {
    const { questions } = parseGeneratedQuiz(JSON.stringify(good.questions[0]))
    expect(questions).toHaveLength(1)
  })

  it.each(['questionText', 'text', 'prompt', 'q'])('accepts %s as the question key', (key) => {
    const q = { [key]: 'Which one?', options: ['a', 'b'], correctIndex: 0 }
    expect(parseGeneratedQuiz(JSON.stringify([q])).questions[0].questionText).toBe('Which one?')
  })

  it.each(['options', 'choices', 'answers'])('accepts %s as the options key', (key) => {
    const q = { question: 'Which one?', [key]: ['a', 'b'], correctIndex: 1 }
    expect(correctText(parseGeneratedQuiz(JSON.stringify([q])).questions[0])).toBe('b')
  })

  it('accepts options as objects carrying isCorrect', () => {
    const q = {
      question: 'Which one?',
      options: [
        { text: 'a', isCorrect: false },
        { text: 'b', isCorrect: true },
      ],
    }
    expect(correctText(parseGeneratedQuiz(JSON.stringify([q])).questions[0])).toBe('b')
  })

  it('omits explanation entirely when the model gave none', () => {
    const q = { question: 'Which one?', options: ['a', 'b'], correctIndex: 0 }
    expect(parseGeneratedQuiz(JSON.stringify([q])).questions[0]).not.toHaveProperty('explanation')
  })

  it('keeps a positive points value and defaults anything else to 1', () => {
    const base = { question: 'Q', options: ['a', 'b'], correctIndex: 0 }
    const parse = (points: unknown) =>
      parseGeneratedQuiz(JSON.stringify([{ ...base, points }])).questions[0].points

    expect(parse(5)).toBe(5)
    expect(parse(0)).toBe(1)
    expect(parse(-2)).toBe(1)
    expect(parse('3')).toBe(1)
    expect(parse(undefined)).toBe(1)
  })

  it('parses Arabic content without mangling it', () => {
    const q = {
      question: 'ما وظيفة R8؟',
      options: ['لا شيء', 'تصغير وتشفير الكود', 'توقيع الحزمة'],
      correctIndex: 1,
      explanation: 'R8 يصغّر ويشفّر الجزء الخاص بـ Java و Kotlin.',
    }
    const { questions } = parseGeneratedQuiz(JSON.stringify([q]))
    expect(questions[0].questionText).toBe('ما وظيفة R8؟')
    expect(correctText(questions[0])).toBe('تصغير وتشفير الكود')
    expect(questions[0].explanation).toContain('يصغّر')
  })
})

describe('parseGeneratedQuiz — answer-key resolution', () => {
  const base = { question: 'Capital of France?', options: ['Berlin', 'Paris', 'Rome'] }

  it.each([
    ['correctIndex', 1],
    ['correct_index', 1],
    ['answerIndex', 1],
    ['answer_index', 1],
  ])('resolves %s', (key, value) => {
    const parsed = parseGeneratedQuiz(JSON.stringify([{ ...base, [key]: value }]))
    expect(correctText(parsed.questions[0])).toBe('Paris')
  })

  it('accepts a numeric string index', () => {
    const parsed = parseGeneratedQuiz(JSON.stringify([{ ...base, correctIndex: '1' }]))
    expect(correctText(parsed.questions[0])).toBe('Paris')
  })

  it.each(['B', 'b', '(B)', 'B)', 'B.'])('resolves the letter form %s', (answer) => {
    const parsed = parseGeneratedQuiz(JSON.stringify([{ ...base, answer }]))
    expect(correctText(parsed.questions[0])).toBe('Paris')
  })

  it('resolves an answer given as the option text, case-insensitively', () => {
    const parsed = parseGeneratedQuiz(JSON.stringify([{ ...base, correctAnswer: 'paris' }]))
    expect(correctText(parsed.questions[0])).toBe('Paris')
  })

  it('prefers a matching option text over a letter reading', () => {
    // "B" is a real option here, so it must win over "index 1".
    const q = { question: 'Which letter?', options: ['A', 'B', 'C'], answer: 'C' }
    expect(correctText(parseGeneratedQuiz(JSON.stringify([q])).questions[0])).toBe('C')
  })

  it('drops a question rather than guessing when no answer is given', () => {
    expect(() => parseGeneratedQuiz(JSON.stringify([base]))).toThrow(/could not tell which option/i)
  })

  it('drops a question when two options are flagged correct', () => {
    const q = {
      question: 'Which?',
      options: [
        { text: 'a', isCorrect: true },
        { text: 'b', isCorrect: true },
      ],
    }
    expect(() => parseGeneratedQuiz(JSON.stringify([q]))).toThrow(/could not tell which option/i)
  })

  it('drops a question whose index is out of range', () => {
    const q = { ...base, correctIndex: 7 }
    expect(() => parseGeneratedQuiz(JSON.stringify([q]))).toThrow(/could not tell which option/i)
  })

  it('rejects a negative index instead of counting from the end', () => {
    const q = { ...base, correctIndex: -1 }
    expect(() => parseGeneratedQuiz(JSON.stringify([q]))).toThrow(/could not tell which option/i)
  })
})

describe('parseGeneratedQuiz — option label stripping', () => {
  it('strips A) B) labels when every option has one', () => {
    const q = {
      question: 'Capital?',
      options: ['A) Berlin', 'B) Paris', 'C) Rome'],
      correctIndex: 1,
    }
    const { questions } = parseGeneratedQuiz(JSON.stringify([q]))
    expect(questions[0].options.map((o) => o.text)).toEqual(['Berlin', 'Paris', 'Rome'])
  })

  it.each([
    ['dot', ['A. Berlin', 'B. Paris']],
    ['parenthesised', ['(A) Berlin', '(B) Paris']],
    ['dash', ['A - Berlin', 'B - Paris']],
    ['numeric', ['1. Berlin', '2. Paris']],
    ['numeric parenthesised', ['1) Berlin', '2) Paris']],
    ['colon', ['A: Berlin', 'B: Paris']],
  ])('strips the %s label style', (_name, options) => {
    const q = { question: 'Capital?', options, correctIndex: 1 }
    const { questions } = parseGeneratedQuiz(JSON.stringify([q]))

    expect(questions[0].options.map((o) => o.text)).toEqual(['Berlin', 'Paris'])
    // The answer key must still point at the same option after stripping.
    expect(correctText(questions[0])).toBe('Paris')
  })

  it('leaves labels alone when only some options have them', () => {
    const q = {
      question: 'Capital?',
      options: ['A) Berlin', 'Paris', 'Rome'],
      correctIndex: 1,
    }
    const { questions } = parseGeneratedQuiz(JSON.stringify([q]))
    expect(questions[0].options[0].text).toBe('A) Berlin')
  })

  it('does not strip when the label IS the whole option', () => {
    // Answer-letter options like "A" / "B" must survive intact.
    const q = { question: 'Which letter?', options: ['A', 'B'], correctIndex: 0 }
    const { questions } = parseGeneratedQuiz(JSON.stringify([q]))
    expect(questions[0].options.map((o) => o.text)).toEqual(['A', 'B'])
  })

  it('resolves the answer against the stripped text', () => {
    const q = {
      question: 'Capital?',
      options: ['A) Berlin', 'B) Paris'],
      correctAnswer: 'Paris',
    }
    expect(correctText(parseGeneratedQuiz(JSON.stringify([q])).questions[0])).toBe('Paris')
  })
})

describe('parseGeneratedQuiz — validation', () => {
  it('drops a question with fewer than two options', () => {
    const q = { question: 'Q', options: ['only one'], correctIndex: 0 }
    expect(() => parseGeneratedQuiz(JSON.stringify([q]))).toThrow(/at least 2 options/i)
  })

  it('drops a question with more options than allowed', () => {
    const options = Array.from({ length: 9 }, (_, i) => `opt ${i}`)
    const q = { question: 'Q', options, correctIndex: 0 }
    expect(() => parseGeneratedQuiz(JSON.stringify([q]))).toThrow(/more than 8 options/i)
  })

  it('drops a question with an empty option', () => {
    const q = { question: 'Q', options: ['a', '   '], correctIndex: 0 }
    expect(() => parseGeneratedQuiz(JSON.stringify([q]))).toThrow(/option was empty/i)
  })

  it('drops a question with duplicate options', () => {
    const q = { question: 'Q', options: ['Paris', 'paris'], correctIndex: 0 }
    expect(() => parseGeneratedQuiz(JSON.stringify([q]))).toThrow(/duplicate options/i)
  })

  it('drops a question with no text', () => {
    const q = { question: '  ', options: ['a', 'b'], correctIndex: 0 }
    expect(() => parseGeneratedQuiz(JSON.stringify([q]))).toThrow(/no question text/i)
  })

  it('keeps the valid questions and warns about the dropped ones', () => {
    const payload = {
      questions: [
        good.questions[0],
        { question: 'No answer key', options: ['a', 'b'] },
        { question: 'Too few', options: ['a'], correctIndex: 0 },
      ],
    }
    const { questions, warnings } = parseGeneratedQuiz(JSON.stringify(payload))

    // One bad question must not cost the good ones.
    expect(questions).toHaveLength(1)
    expect(questions[0].questionText).toBe('What does R8 do?')
    expect(warnings).toHaveLength(2)
    expect(warnings[0]).toMatch(/Question 2/)
    expect(warnings[1]).toMatch(/Question 3/)
  })

  it('throws when the JSON parses but holds no questions', () => {
    expect(() => parseGeneratedQuiz('{"questions":[]}')).toThrow(/no questions/i)
  })

  it('reports why everything was dropped instead of failing silently', () => {
    const payload = { questions: [{ question: 'No key', options: ['a', 'b'] }] }
    expect(() => parseGeneratedQuiz(JSON.stringify(payload))).toThrow(/No usable questions/i)
  })

  it('skips a non-object entry in the list', () => {
    const payload = { questions: ['just a string', good.questions[0]] }
    const { questions, warnings } = parseGeneratedQuiz(JSON.stringify(payload))
    expect(questions).toHaveLength(1)
    expect(warnings[0]).toMatch(/not an object/i)
  })

  it('marks exactly one option correct in every returned question', () => {
    const payload = { questions: [good.questions[0], { ...good.questions[0], correctIndex: 3 }] }
    const { questions } = parseGeneratedQuiz(JSON.stringify(payload))
    expect(questions).toHaveLength(2)
    for (const q of questions) {
      expect(q.options.filter((o) => o.isCorrect)).toHaveLength(1)
    }
  })
})
