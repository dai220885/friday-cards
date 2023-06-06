export type CardType = {
  _id: string
  cardsPack_id: string
  user_id: string
  answer: string
  question: string
  grade: number
  shots: number
  comments: string
  type: string
  rating: number
  more_id: string
  created: string
  updated: string
  __v: number
}

export type GetCardsParamsType = {
  cardAnswer?: string
  cardQuestion?: string
  cardsPack_id?: string
  min?: number
  max?: number
  sortCards?: number
  page?: number
  pageCount?: number
}

export type GetParamsType = Omit<GetCardsParamsType, 'cardsPack_id'>

export type FetchCardsResponseType = {
  cards: CardType[]
  packUserId: string
  packName: string
  packPrivate: boolean
  packCreated: string
  packUpdated: string
  page: number
  pageCount: number
  cardsTotalCount: number
  minGrade: number
  maxGrade: number
  token: string
  tokenDeathTime: number
  isOwner: boolean
}

type CardGradeType = 0 | 1 | 2 | 3 | 4 | 5

export type ArgCreateCardType = {
  cardsPack_id: string
  question?: string
  answer?: string
  grade?: CardGradeType
  shots?: number
  answerImg?: string
  questionImg?: string
  questionVideo?: string
  answerVideo?: string
}

export type ArgGetCardsType = {
  cardsPack_id?: string
  page?: number
  pageCount?: number
  packUserId: string
}

export type GetCardsResponseType = {
  cards: CardType[]
  cardsPack_id: string
  packName: string
  page?: number
  pageCount?: number
  packUserId: string
}

// export type GetCardsResponseType = {
//   cards: CardType[]
//   cardsTotalCount: number
//   maxGrade: number
//   minGrade: number
//   page: number
//   packUpdated: string
//   packCreated: string
//   packDeckCover: string | null
//   packPrivate: boolean
//   pageCount: number
//   packUserId: string
// }

export type DeleteCardResponseType = {
  deletedCard: CardType
  token: string
  tokenDeathTime: number
}