import * as Token from '../src/token'
import Parser from '../src/parser'
import { consStream, nilStream } from '../src/util'

const tokens = [
    new Token.LeftBracketToken(),
    new Token.NameToken('div'),
    new Token.NameToken('class'),
    new Token.EqualToken(),
    new Token.QuoteToken(),
    new Token.ContentToken('wrap'),
    new Token.QuoteToken(),
    new Token.SlashToken(),
    new Token.RightBracketToken(),

    new Token.LeftBracketToken(),
    new Token.NameToken('div'),
    new Token.NameToken('class'),
    new Token.EqualToken(),
    new Token.QuoteToken(),
    new Token.ContentToken('wrap'),
    new Token.QuoteToken(),
    new Token.RightBracketToken(),
    new Token.ContentToken('text'),
    new Token.LeftBracketToken(),
    new Token.SlashToken(),
    new Token.NameToken('div'),
    new Token.RightBracketToken(),
]

const nextToken = consStream(tokens, nilStream)

const parser = new Parser(nextToken)
const root = parser.parse()
root.print()
