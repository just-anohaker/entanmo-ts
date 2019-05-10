class Clz1 {
    constructor(private readonly name: string) { }

    eat() {
        console.log(`${this.name} eatting...`);
    }
}

class Clz2 {
    private model: string = "default-mode";

    constructor(private readonly name: string, model?: string) {
        if (model) {
            this.model = model;
        }
    }

    drive(person: string) {
        console.log(`${person} drive ${this.name}(${this.model})`);
    }
}

type ClzType = "animal" | "car";

function factoryInstance(clzType: "animal"): Clz1;
function factoryInstance(clzType: "car"): Clz2;
function factoryInstance(clzType: number): number;
function factoryInstance(clzType: ClzType | number): any {
    if (clzType === "animal") {
        return new Clz1("Tom");
    }
    if (clzType === "car") {
        return new Clz2("BMW", "huacheng");
    }

    if (typeof clzType === "number") {
        return 1;
    }
}

function main() {
    factoryInstance("animal").eat();
    factoryInstance("car").drive("Jim");

    const atype = "animal";
    factoryInstance(atype).eat();

    const ctype = "car";
    factoryInstance(ctype).drive("Jone");

    // const notype = "hello";
    // factoryInstance(notype).drive("a");

    // let aatype = "animal";
    // factoryInstance(aatype)

    factoryInstance(1);

}