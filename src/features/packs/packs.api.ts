import {
  ArgCreatePackType, CreatePackResponseType, FetchPacksResponseType, GetPacksParamsType,
  PackType, RemovePackResponseType, UpdatePackResponseType,
} from "./packs.types"
import {CardsInstance} from 'features/cards/cards.instance';


export const packsApi = {
  getPacks: (params?: GetPacksParamsType) => {
    return CardsInstance.get<FetchPacksResponseType>("pack", {params});
  },
  createPack: (cardsPack: ArgCreatePackType) => {
    return CardsInstance.post<CreatePackResponseType>("pack", {cardsPack});
  },
  removePack: (id: string) => {
    return CardsInstance.delete<RemovePackResponseType>(`pack?id=${id}`);
  },
  updatePack: (cardsPack: PackType) => {
    return CardsInstance.put<UpdatePackResponseType>("pack", {cardsPack});
  },
};

