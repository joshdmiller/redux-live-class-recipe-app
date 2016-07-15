export default {
  recipes: [
    {
      id: '1',
      name: 'Cochinita Pibil',
      slug: 'cochinita-pibil',
      description: 'Grill-roasted Yucatacan pork shoulder marinated in achiote and sour orange.',
    },
    {
      id: '2',
      name: 'Pickled Red Onions',
      slug: 'pickled-red-onions',
      description: 'Thin-sliced onion "pickled" in sour orange juice.',
    },
    {
      id: '3',
      name: 'Roasted Habanero Salsa',
      slug: 'roasted-habanero-salsa',
      description: 'Spicy, fruity hot sauce made from habanero chiles.',
      ingredients: [
        {
          qty: 10,
          name: 'habanero chiles',
        },
        {
          qty: 2,
          name: 'garlic cloves, unpeeled',
        },
        {
          qty: 2,
          unit: 'tablespoons',
          name: 'sour orange juice',
        },
        {
          name: 'salt',
        },
      ],
    },
    {
      id: '4',
      name: 'Chocolate Swiss-Meringue Buttercream',
      slug: 'chocolate-swiss-meringue-buttercream',
      description: 'Butter-and-egg-based frosting for cakes and cupcakes, flavoured like chocolate.',
    },
    {
      id: '5',
      name: 'Mojo de Ajo',
      slug: 'mojo-de-ajo',
      description: 'A flavourful oil with slow-roasted garlic.',
    },
  ],
};
