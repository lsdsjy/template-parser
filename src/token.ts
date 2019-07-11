export type TokenType = 'LEFT_BRACKET' | 'RIGHT_BRACKET' | 'NAME' | 'EQUAL' | 'QUOTE' | 'SLASH' | 'CONTENT' | 'EOF'
abstract class TokenBase {
    type: TokenType
    text: string

    constructor(text) {
        this.text = text
    }
}

export class LeftBracketToken extends TokenBase {
    type = 'LEFT_BRACKET' as const
    constructor() {
        super('<')
    }
}

export class RightBracketToken extends TokenBase {
    type = 'RIGHT_BRACKET' as const
    constructor() {
        super('>')
    }
}

export class NameToken extends TokenBase { // Names consists of alphas and hyphen only for simplicity
    type = 'NAME' as const
}

export class EqualToken extends TokenBase {
    type = 'EQUAL' as const
    constructor() {
        super('=')
    }
}

export class QuoteToken extends TokenBase {
    type = 'QUOTE' as const
    constructor() {
        super('"')
    }
}

export class SlashToken extends TokenBase {
    type = 'SLASH' as const
    constructor() {
        super('/')
    }
}

export class ContentToken extends TokenBase {
    type = 'CONTENT' as const
}

export class EndOfFileToken extends TokenBase {
    type = 'EOF' as const
    constructor() {
        super('')
    }
}

export type Token = LeftBracketToken | RightBracketToken | NameToken | EqualToken
    | QuoteToken | SlashToken | ContentToken | EndOfFileToken
