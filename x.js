const person = [
    {
        name: "Vize Tommy",
        position: "Senior",
        phone: "123456789",
        weekdays: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
    }
]

person[0].weekdays.forEach((item, index)=>{
    console.log(item)
})

const aaa = person[0].weekdays.map((item, index)=>{
    return {
        name: item,
        id: index
    }
})

// filter()

console.log(aaa)
