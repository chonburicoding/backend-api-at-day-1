const a = 10
const b = 10.5
const c = "abc"
const d = true // false
const e = []
const f = {}
// var let

const g = [10, 20, 30]
// index, position =  0, 1, 2
// value = 10, 20, 30
// member, length = 3
const h = [10, 'A', [], {}]
// index, position = 0, 1, 2, 3
// value = 10, 'A', [], {}
// member, length = 4
// h[index]
h[0] = 10
h[1] = 'A'
h[2] = []
h[3] = {}

//objet = {}
const i = {
    id: 100,
    name: 'somchai',
    foods: [],
    points: [100, 500],
    sum: function(){
        return 1+1
    }
}
// object ไม่มี index
//key: value
//console.log(i.points[1])
//const xx = i.sum()
//console.log(xx)

//const id = i.id
//const name = i.name
//const foods = i.foods
const {id, name, foods} = i // Destructuring
//console.log(id, name)

function j(){
    const aa = 10
    const bb = 20
    console.log(aa+bb)
    return aa + bb
}

const cc = j();
console.log(cc)

const k = ()=>{
    const aa = 10
    const bb = 20
    console.log(aa+bb)
    return aa + bb
}

const dd = k();
console.log(dd)

