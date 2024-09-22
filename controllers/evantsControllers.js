import * as eventsService from "../services/eventsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllEvents = async (req, res, next) => {
  try {
    console.log(req.query);
    const { page = 1, limit = 9, } = req.query;
    const skip = (page - 1) * limit;
    const result = await eventsService.listEvent(
      {},
      { skip, limit }
    );
    const total = await eventsService.countEvent();
    res.json(
      
      { result, total });
  } catch (error) {
    next(error);
  }
};

// export const getOneEvent = async (req, res, next) => {
//   try {
//     const { _id: owner } = req.user;
//     const id = req.params.id;
//     const result = await eventsService.getEventById({ owner, _id: id });
//     if (!result) {
//       throw HttpError(404);
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// };

// export const deleteEvent = async (req, res, next) => {
//   try {
//     const { _id: owner } = req.user;
//     const id = req.params.id;
//     const result = await eventsService.removeEvent({ owner, _id: id });
//     if (!result) {
//       throw HttpError(404);
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// };

export const createEvent = async (req, res, next) => {
  try {
   

    const result = await eventsService.addEvent({
      ...req.body
    });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

// export const updateEvent = async (req, res, next) => {
//   try {
//     const { _id: owner } = req.user;
//     const id = req.params.id;
//     if (Object.keys(req.body).length === 0) {
//       throw HttpError(400, "Body must have at least one field");
//     }
//     const result = await eventsService.updateEventByid(
//       { owner, _id: id },
//       req.body
//     );
//     if (!result) {
//       throw HttpError(404);
//     }

//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getOneFavoriteEvent = async (req, res, next) => {
//   try {
//     const { _id: owner } = req.user;
//     const id = req.params.id;
//     const result = await eventsService.updateFavoriteByid(
//       { owner, _id: id },
//       req.body
//     );
//     if (!result) {
//       throw HttpError(404);
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// };
