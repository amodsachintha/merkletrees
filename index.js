'use strict';
const {Tree, Node} = require('./tree');
const express = require('express');

let app = express();



const hashes = [
    '2df44271fb4e3dff8d32905bb983c',
    '16ce5ebfde3c5a2d6219e6b83b499',
    'b3339c04844d8432993eded54ad6c',
    'b86bda39da8c071f3a0fa616a432e',
    'b781d8fae0c68cad1e51819944796',
    // '6e5b1afca149f6d1512d98a47b'
];

const mTree = new Tree();

hashes.map(x => {
    let n = new Node(null,null,null,null);
    n.setHash(x);
   mTree.appendNode(n);
});

mTree.buildTree(mTree.nodes);
// mTree.printNodes();
console.log(mTree.rootNode.hash);


app.get('/', (req, res)=>{
    res.json(mTree.getNodes());
});

app.listen(3000, ()=>{
   console.log('app listening on 3000');
});
