const SHA256 = require('crypto-js/sha256');

class Node {
    constructor(parent, leftChild, rightChild) {
        this.parent = parent;
        this.rightChild = rightChild;
        this.leftChild = leftChild;
        this.hash = rightChild && leftChild ? this.getHash(leftChild, rightChild) : null;
    }

    setHash(x) {
        this.hash = x;
    }

    getParent() {
        return this.parent;
    }

    getHash(leftChild, rightChild) {
        return SHA256(leftChild.hash + rightChild.hash).toString();
    }

    toString() {
        return {
            parent: this.parent ? this.parent.hash : null,
            hash: this.hash
        }
    }
}


class Tree {
    constructor() {
        this.nodes = [];
        this.rootNode = null;
    }

    appendNode(node) {
        this.nodes.push(node);
    }

    printNodes() {
        this.nodes.map((node) => {
            console.log(node.toString());
        });
    }

    getNodes() {
        let nodesArray = [];
        this.nodes.map((node) => {
            nodesArray.push({
                hash: node.hash ? node.hash : '-',
                parent: node.parent.hash ? node.parent.hash : '-'
            })
        });
        return nodesArray;
    }

    buildTree(nodes) {
        let parents = [];
        // this.printNodes();
        console.log("Building tree!");
        if (nodes.length > 1) {  // exit condition for recursive function
            for (let i = 0; i < nodes.length; i += 2) {
                let leftChild = nodes[i];
                let rightChild = nodes[i + 1] ? nodes[i + 1] : null;
                let parent = new Node(null, leftChild, rightChild);
                parents.push(parent);
                leftChild.parent = parent;
                if (rightChild) {
                    rightChild.parent = parent;
                }
            }
            this.nodes.push(parents);
        }
        if (nodes.length === 1) {
            this.rootNode = nodes[0];
            return;
        }

        this.buildTree(parents);
    }
}

module.exports = {
    Tree,
    Node
};