import { Token, TokenType } from './token'
import * as Ast from './ast'
import { consStream } from './util'

export default class Parser {
    nextToken: () => Token

    constructor(nextToken: () => Token) {
        this.nextToken = nextToken
    }

    putBack(...tokens) { // put some tokens back to input stream
        this.nextToken = consStream(tokens, this.nextToken)
    }

    consume(type: TokenType) {
        const token = this.nextToken()
        if (token.type !== type) {
            this.putBack(token) // for resume
            throw new Error()
        }
    }

    consumeEqual = () => this.consume('EQUAL')

    consumeQuote = () => this.consume('QUOTE')

    consumeBracket = (() => {
        let left = true
        return () => {
            if (left) {
                this.consume('LEFT_BRACKET')
            } else {
                this.consume('RIGHT_BRACKET')
            }
            left = !left
        }
    })()

    consumeSlash = () => this.consume('SLASH')

    parseAttrs(): [string, string][] { // returns an array of (name, value) tuples
        const attrs: [string, string][] = []
        let token: Token
        while ((token = this.nextToken()).type === 'NAME') {
            const name = token.text
            this.consumeEqual()
            this.consumeQuote()
            token = this.nextToken()
            if (token.type !== 'CONTENT') {
                throw new Error()
            }
            const content = token.text
            this.consumeQuote()
            attrs.push([name, content])
        }
        this.putBack(token)
        return attrs
    }

    parseElement() {
        this.consumeBracket()
        let token = this.nextToken()
        if (token.type === 'NAME') {
            const name = token.text
            const attrs = this.parseAttrs()
            const node = new Ast.ElementNode(name, attrs)
            let isEmpty = false
            try { // could be empty element tag: />
                this.consumeSlash()
                isEmpty = true
            } catch {
                // is a normal start tag
            }
            this.consumeBracket()

            if (!isEmpty) {
                token = this.nextToken() 
                if (token.type !== 'CONTENT') {
                    throw new Error()
                }
                node.addChildren(new Ast.ContentNode(token.text))

                // match end tag
                this.consumeBracket()
                this.consumeSlash()
                token = this.nextToken() 
                if (token.type !== 'NAME' || token.text !== name) {
                    throw new Error('no matching end tag')
                }
                this.consumeBracket()
            }

            return node
        } else {
            throw new Error()
        }
    }

    parse() {
        const root = new Ast.DocumentNode()
        try {
            let token
            while ((token = this.nextToken()).type === 'LEFT_BRACKET') {
                this.putBack(token)
                root.children.push(this.parseElement())
            }
            return root
        } catch {
            console.log('parse error!')
        }
    }
}