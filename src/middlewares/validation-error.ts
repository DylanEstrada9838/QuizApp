import { Request,Response,NextFunction } from "express";
export const validationError =  (err:any, request:Request, response:Response, next:NextFunction)=> {
	// Si sucede la siguiente condición, entonces el error
	// fue provocado por express-joi-validation

	// Si resulta que la condición no se cumple, entonces el error
	// es otra cosa.
	if (err && err.error && err.error.isJoi) {
		console.error(err);
		response.status(400).json({
			message: "Entry values are invalid",
			messagedev: "El middleware de validación arrojó el siguiente error",
			code: "ERR_VALIDATION",
			details: err.error.details,
		});
	} else {
		// Si no es un error de validación, aviento el error
		// al siguiente middleware.
		next(err);
	}
};