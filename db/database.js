const Sequelize = require('sequelize');
const {STRING, INTEGER, TEXT, UUID, UUIDV4} = Sequelize
const database = new Sequelize("postgres://localhost/dealers_choice_reactdb")

const Animal = database.define('animal', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
    },
    name: {
        type: STRING,
        allowNull: false,
    },
    lifespan: {
        type: INTEGER,
    },
    description: {
        type: TEXT,
    },
})

const initAndSeed = async () => {
    await database.sync( {force: true} )
    const [Tiger, Elephant, Bluewhale, Owl] = await Promise.all(
        [['Tiger', 9], ['Elephant', 65], ['Bluewhale', 85], ['Owl', 25]]
        .map(animal => Animal.create({name: animal[0], lifespan: animal[1]}))
    )
    Tiger.description ='Per Wikipedia, The tiger is the largest living cat species and a member of the genus Panthera. It is most recognisable for its dark vertical stripes on orange fur with a white underside. An apex predator, it primarily preys on ungulates such as deer and wild boar.'

    Elephant.description ='Per Wikipedia, Elephants are the largest existing land animals. Three living species are currently recognised: the African bush elephant, the African forest elephant, and the Asian elephant. They are an informal grouping within the proboscidean family Elephantidae. '

    Bluewhale.description =`Per Wikipedia, The blue whale is a marine mammal and a baleen whale. Reaching a maximum confirmed length of 29.9 meters and weighing up to 199 metric tons, it is the largest animal known to have ever existed. The blue whale's long and slender body can be of various shades of greyish-blue dorsally and somewhat lighter underneath.`

    Owl.description = `Per Wikipedia, Owls are birds from the order Strigiformes, which includes over 200 species of mostly solitary and nocturnal birds of prey typified by an upright stance, a large, broad head, binocular vision, binaural hearing, sharp talons, and feathers adapted for silent flight.`

    await Promise.all([Tiger, Elephant, Bluewhale, Owl].map(animal=> {
        return animal.save()
    }))
    console.log("DATABASE SEEDED");
}

module.exports = {
    Animal,
    initAndSeed,
    database
}