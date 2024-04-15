import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";


export const getAllContacts = async (req, res, next) => {
  try {
    const {_id:owner}=req.user
    console.log(req.query);
    const {page=1 , limit=10,favorite=true&false}=req.query;
     const skip=(page-1)*limit
    const result = await contactsService.listContacts({owner,favorite},{skip , limit});
    const total=await contactsService.countContacts({owner})
    res.json({result,total});
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const {_id:owner}=req.user
    const id = req.params.id;
    const result = await contactsService.getContactById({owner , _id:id});
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async(req, res,next) => {
  try{
    const {_id:owner}=req.user
    const id=req.params.id;
    const result= await contactsService.removeContact({owner , _id:id});
    if(!result){
      throw HttpError(404);
    }
    res.json(result)
  }
  catch(error){
    next(error)
  }
};

export const createContact = async (req, res, next) => {
  try {
    const {_id:owner}=req.user
    const result = await contactsService.addContact({...req.body, owner});
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try{
    const {_id:owner}=req.user
    const id=req.params.id
    if( Object.keys(req.body).length === 0) { throw HttpError(400, "Body must have at least one field");}
    const result=await contactsService.updateContactByid ({owner , _id:id} , req.body)
    if (!result){
      throw HttpError(404);
    }
    
    res.json(result)
  }
  catch (error){
    next(error)
  }
};

export const getOneFavoriteContact = async(req , res, next)=> {
    try {
      const {_id:owner}=req.user
      const id =req.params.id
      const result = await contactsService.updateFavoriteByid({owner , _id:id} , req.body)  
      if (!result){
        throw HttpError(404);
      }   
      res.json(result)
  }
  catch (error) {
    next(error)
  }
}

