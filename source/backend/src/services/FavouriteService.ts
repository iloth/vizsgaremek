import { favouriteModel, IFavourite } from "../models/favouriteModel";
import { BaseApiService } from "./BaseApiService";

class FavouriteService extends BaseApiService<IFavourite> {
  constructor() {
    super(favouriteModel);
  }

  async getByUserId(id: string | null): Promise<IFavourite[]> {
    if (id) {
      return await favouriteModel.find({ userId: id});
    } else {
      return await favouriteModel.find({ userId: { $eq: null }});
    }
  }
}

export default new FavouriteService();
