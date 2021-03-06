import ErrorHttpException from "../../Application/Shared/ErrorHttpException";
import StatusCode from "../Shared/StatusCode";

class NotFoundHttpException extends ErrorHttpException
{
    constructor()
    {
        super(StatusCode.HTTP_BAD_REQUEST, 'message', []);
    }
}

export default NotFoundHttpException;
