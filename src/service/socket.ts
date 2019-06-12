 interface SocketWorkerTest {
    connection(): void
    getMessage(): Promise<string>
    disconnection(): void
}

 interface SocketClientTest {
    connection(): void
    sendMessage(msg: string): void
    disconnection(): void
}
