const doubleArray = (x) => {
    arr = []
    for(var i = 0; i < x.length; i++){
        arr.push(x[i] * 2)
    }
    return arr
}

const isAdult = (x) => {
    for(var i = 0; i < x.length; i++){
        if (x[i].age < 18) return false
    }
    return true
}

class User {
    constructor(name, age){
        this.name = name
        this.age = age
    }
}

user1 = new User('a', 18)
user2 = new User('b', 15)
user3 = new User('c', 22)

user4 = {...user1}

user4.age = user4.age + 1 

//console.log(user4.age, user1.age)

const combineArrays = (x, y) =>{
    z = [...x,...y]
    return z 
}

//console.log(combineArrays([1,2,3],[1,2,3]))




const letters = ['a', 'b', 'c'];

const nums = [1,2,3].map(x => `Number is ${x}`)

//console.log(nums)

class blogPosts{
    constructor(id, title){
        this.id = id
        this.title = title
    }
}

const post1 = new blogPosts(1, '1st post')
const post2 = new blogPosts(2, '2nd post')

getTitle = post => {return post.title}

const onlyTitles = [post1, post2].map(getTitle)

const isEven = (x) => {
    if (x % 2 === 0) return true
    else{
        false
    }
}

//console.log([1,2,3].filter(isEven))

class Task{

    constructor(title, isCompleted){
        this.title = title
        this.isCompleted = isCompleted
    }

}

const task1 = new Task('task1', true)

const task2 = new Task('task2', true)

const inclusion = task => {return task.isCompleted === true
    
}

//console.log([task1, task2].filter(inclusion))


class Price {

    constructor(price){
        this.price = price
    }
}

price1 = new Price(10)
price2 = new Price(20)




cost = (price, nextprice) => {return price +  nextprice.price}

const total = [price1, price2].reduce(cost, 0)

//console.log(total)

var isLoggedin = false;

//isLoggedin ? console.log("welcome back") : console.log("leave back")


function Society(city){
    console.log(city.name)
}

//These are object

function city() {
    const cityStats = {
        population: 100,
        name: "charlotte"
    }
    return cityStats
}

Society(City)