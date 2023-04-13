export interface ContentModerator {
  OriginalText: string
  NormalizedText?: string
  AutoCorrectedText?: string
  Misrepresentation?: any
  Language: string
  Terms: Term[]
  Status: Status
  TrackingId: string
}

export interface Term {
  Index: number
  OriginalIndex: number
  ListId: number
  Term: string
}

export interface Status {
  Code: number
  Description: string
  Exception: any
}
