import { Request,Response,NextFunction } from "express";
export const unknownError = (err:any, request:Request, response:Response, next:NextFunction) =>{
	response.status(500).json({
		message: "Unexpected Error",
		code: "ERR_UNKNOWN",
		details: err,
	});
	
};