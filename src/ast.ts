type NodeType = 'ELEMENT' | 'CONTENT' | 'DOCUMENT'

class NodeBase {
    type: NodeType
    children: Node[] = []

    addChildren(...children) {
        this.children = this.children.concat(children)
    }

    print(indent = 0) {
        console.log(new Array(indent).fill(' ').join('') + this.type)
        this.children.forEach(node => {
            node.print(indent + 1)
        })
    }
}

export class ElementNode extends NodeBase {
    type = 'ELEMENT' as const
    name: string
    attrs: Map<string, string>

    constructor(name: string, attrs: [string, string][]) {
        super()

        this.name = name
        this.attrs = new Map<string, string>()
        for (const [name, value] of attrs) {
            this.attrs.set(name, value)
        }
    }
}

export class ContentNode extends NodeBase {
    type = 'CONTENT' as const
    content: string

    constructor(content: string) {
        super()

        this.content = content
    }
}

export class DocumentNode extends NodeBase {
    type = 'DOCUMENT' as const
}

type Node = DocumentNode | ElementNode | ContentNode
