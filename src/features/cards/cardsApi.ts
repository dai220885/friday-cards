import { CardsInstance } from "./cards.instance";
import {
  ArgCreateCardType,
  CardType,
  DeleteCardResponseType,
  FetchCardsResponseType,
  GetCardsParamsType
} from "./cards.types"


export const CardsApi = {
  getCards: (params: GetCardsParamsType) => {
    return CardsInstance.get<FetchCardsResponseType>("card", {params});
  },
  createCard: (card: ArgCreateCardType) => {
    return CardsInstance.post("card", {card});
  },
  deleteCard: (_id: string) => {
    return CardsInstance.delete<DeleteCardResponseType>(`card?id=${_id}`);
  },
  updatePack: (card: CardType) => {
    return CardsInstance.put("card", { card });
  },
};

