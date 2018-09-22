export interface service {
    conection():void
    sendMessage(msg: JSON|string): void
    getMessage(): void 
    disconection():void
}