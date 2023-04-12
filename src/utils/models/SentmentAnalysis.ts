export interface SentimentAnalysis {
  sentiment: string
  confidenceScores: ConfidenceScores
  sentences: Sentence[]
}

export interface ConfidenceScores {
  positive: number
  neutral: number
  negative: number
}

export interface Sentence {
  text: string
  sentiment: string
  confidenceScores: ConfidenceScores
  length: number
}


