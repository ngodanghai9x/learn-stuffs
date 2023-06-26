function list_to_tree(list) {
  var map = {}, node, roots = [], i;
  
  for (i = 0; i < list.length; i += 1) {
    map[list[i].id] = i; // initialize the map
    list[i].children = []; // initialize the children
  }
  
  for (i = 0; i < list.length; i += 1) {
    node = list[i];
    if (node.parentId !== "0") {
      // if you have dangling branches check that map[node.parentId] exists
      list[map[node.parentId]].children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}

var entries = [{
    "id": "12",
    "parentId": "0",
    "text": "Man",
    "level": "1",
    "children": null
  },
  {
    "id": "6",
    "parentId": "7",
    "text": "Boy",
    "level": "3",
    "children": null
  },
  {
    "id": "7",
    "parentId": "12",
    "text": "Other",
    "level": "2",
    "children": null
  },
  {
    "id": "9",
    "parentId": "0",
    "text": "Woman",
    "level": "1",
    "children": null
  },
  {
    "id": "11",
    "parentId": "9",
    "text": "Girl",
    "level": "2",
    "children": null
  }
];

console.log(list_to_tree(entries));
VM246:58 (2) [{…}, {…}]0: children: Array(1)0: children: Array(1)0: {id: "6", parentId: "7", text: "Boy", level: "3", children: Array(0)}length: 1__proto__: Array(0)id: "7"level: "2"parentId: "12"text: "Other"__proto__: Objectlength: 1__proto__: Array(0)id: "12"level: "1"parentId: "0"text: "Man"__proto__: Object1: {id: "9", parentId: "0", text: "Woman", level: "1", children: Array(1)}length: 2__proto__: Array(0)
undefined