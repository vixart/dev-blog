import { Exception } from "../utility/error-handler"

export default class CustomException extends Error implements Exception {
    message: string = 'Custom exception'
    code: number = 403
}