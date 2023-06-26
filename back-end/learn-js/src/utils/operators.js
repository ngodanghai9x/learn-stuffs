// Nullish coalescing
var a = "" ?? "hai" // ""
var b = "" || "hai" // "hai"

var a = 0 ?? "hai" // 0
var b = 0 || "hai" // "hai"

var a = null ?? "hai" // "hai"
var b = null || "hai" // "hai"

var a = undefined ?? "hai" // "hai"
var b = undefined || "hai" // "hai"