

export class Person {
    public name: string;
    public firstName: string;
    public lastName: string;
    private address: string;

    constructor(
        firstName: string,
        lastName: string,
        address: string = 'No Address'
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.name = `${ firstName } ${ lastName }`;
    }

    public getAddress(): string {
        return this.address;
    }

}

// export class Hero extends Person {

//     constructor(
//         public alterEgo: string,
//         public age: number, 
//         public realName: string,
//     ) {
//         super( realName, 'New York' );
//     }

// }
export class Hero {

    public alterEgo: string;
    public age: number;
    public realName: string;
    public person: Person;

    constructor(
        alterEgo: string,
        age: number,
        realName: string,
        person: Person,
    ) {
        this.alterEgo = alterEgo;
        this.age = age;
        this.realName = realName;
        this.person = person;
    }

}

const tony = new Person('Tony','Stark','New York');

const ironman = new Hero('Ironman',45,'Tony',tony);


console.log(ironman);
console.log(tony.getAddress());

