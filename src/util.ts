import { EndOfFileToken, Token } from "./token"

export function nilStream() {
    return new EndOfFileToken()
}

export function consStream(tokens: Token[], stream: () => Token) {
    let i = 0
    return (): Token => {
        if (i < tokens.length) {
            return tokens[i++]
        } else {
            return stream()
        }
    }
}
