import events from "events";
import UserCreatedEvent from "./UserCreatedEvent";
import ForgotPasswordEvent from "./ForgotPasswordEvent";
import SendMessageEvent from "./SendMessageEvent";

class EventHandler extends events.EventEmitter
{
    private static instance: EventHandler;

    private constructor()
    {
        super();
        this.setListeners();
    }

    static getInstance(): EventHandler
    {
        if (!EventHandler.instance)
        {
          EventHandler.instance = new EventHandler();
        }

        return EventHandler.instance;
    }

    public execute(event: string | symbol, ...args: any[])
    {
        this.emit(event, ...args);
    }

    private setListeners()
    {
        this.on(UserCreatedEvent.USER_CREATED_EVENT, UserCreatedEvent.userCreatedListener);
        this.on(ForgotPasswordEvent.FORGOT_PASSWORD_EVENT, ForgotPasswordEvent.forgotPasswordListener);
        this.on(SendMessageEvent.SEND_MESSAGE_EVENT, SendMessageEvent.sendMessageListener);
    }
}

export default EventHandler;