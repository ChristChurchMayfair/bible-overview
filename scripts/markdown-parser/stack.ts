

class Stack<Element> {
    items: Element[]

    push(item: Element) {
        this.items.push(item)
    }

    pop(): Element | undefined {
        return this.items.pop()
    }

    size(): number {
        return this.items.length
    }
}