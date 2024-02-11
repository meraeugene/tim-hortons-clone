const products = [
  {
    name: "Latte",
    image: "/images/latte.webp",
    description:
      "A latte is an espresso-based coffee characterized by its smooth and creamy blend of espresso and steamed milk, often topped with a frothy layer. This popular beverage offers a balanced and comforting flavor, making it a favorite choice among coffee enthusiasts.",
    category: "Hot Coffee",
    price: 70,
    countInStock: 30,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: "Handcrafted Milk Chocolate",
    image: "/images/handcraft.webp",
    description:
      "Handcrafted milk chocolate is a premium treat, carefully made with quality cocoa and rich milk for a velvety smooth texture and distinct flavor. Crafted by skilled chocolatiers, it offers a deliciously indulgent experience for chocolate enthusiasts.",
    category: "Hot Coffee",
    price: 80,
    countInStock: 350,
    rating: 5,
    numReviews: 15,
  },
  {
    name: "Cafe Mocha",
    image: "/images/mocha.webp",
    description:
      "Espresso, steamed milk, and chocolate blend for a rich, indulgent flavor—topped with whipped cream for a satisfying treat.",
    category: "Hot Coffee",
    price: 60,
    countInStock: 120,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: "Classic Roast",
    image: "/images/classicroast.webp",
    description:
      "Classic roast refers to a standard and well-balanced coffee blend, typically medium-roasted, offering a familiar and timeless coffee flavor. This traditional brew is enjoyed for its straightforward profile, making it a popular choice for those who appreciate a simple and comforting cup of coffee.",
    price: 78,
    category: "Hot Coffee",
    countInStock: 180,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: "Capuccino",
    image: "/images/capuccino.webp",
    description:
      " A coffee beverage consisting of equal parts espresso, steamed milk, and frothed milk, delivering a creamy and satisfying flavor.",
    category: "Hot Coffee",
    price: 79,
    countInStock: 170,
    rating: 4,
    numReviews: 12,
  },
  {
    name: "Double Double",
    image: "/images/double.webp",
    description:
      "Double double typically refers to a coffee order with two creams and two sugars, commonly used in Canadian coffee shop jargon. It results in a rich and sweetened brew, offering a quick and convenient way to customize your coffee.      ",
    category: "Hot Coffee",
    price: 80,
    countInStock: 140,
    rating: 3.5,
    numReviews: 12,
  },
  {
    name: "Dark Roast",
    image: "/images/darkroast.webp",
    description:
      "A robust and bold coffee variety, achieved through a longer roasting process, resulting in a stronger flavor and often characterized by a rich, smoky profile.      ",
    category: "Hot Coffee",
    price: 90,
    countInStock: 40,
    rating: 3,
    numReviews: 12,
  },
  {
    name: "Cafe Americano",
    image: "/images/americano.webp",
    description:
      "A diluted espresso drink made by adding hot water to a shot of espresso, creating a coffee with a strength closer to traditional American drip coffee.      ",
    category: "Hot Coffee",
    price: 60,
    countInStock: 50,
    rating: 4,
    numReviews: 12,
  },
  {
    name: "French Vanilla",
    image: "/images/vanila.webp",
    description:
      "A sweet and creamy flavor, often used to describe a variety of food and beverage products, including coffee, ice cream, and desserts, that is infused with the rich and smooth essence reminiscent of vanilla with a touch of sweetness.",
    category: "Hot Coffee",
    price: 100,
    countInStock: 60,
    rating: 5,
    numReviews: 12,
  },
  {
    name: "Macchiato",
    image: "/images/machiato.webp",
    description:
      "A flavored coffee often featuring a combination of vanilla extract and sweetened condensed milk, imparting a creamy and aromatic twist to the traditional brew.      ",
    category: "Hot Coffee",
    price: 86,
    countInStock: 90,
    rating: 5,
    numReviews: 12,
  },
  {
    name: "Iced Capp",
    image: "/images/icecapp.webp",
    description:
      "A chilled beverage typically made with espresso, milk, and ice, creating a refreshing and frothy iced cappuccino.      ",
    category: "Ice Coffee",
    price: 95,
    countInStock: 80,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: "Freshly Brewed Iced Tea",
    image: "/images/brewed.webp",
    description:
      " A cooling and revitalizing beverage made by steeping tea leaves in hot water, then chilling and serving over ice for a crisp and refreshing taste.      ",
    category: "Ice Coffee",
    price: 78,
    countInStock: 80,
    rating: 4,
    numReviews: 12,
  },
  {
    name: "Frozen Hot Chocolate",
    image: "/images/frozenhot.webp",
    description:
      "A delightful frozen beverage featuring blended hot chocolate, ice, and milk, creating a chilled and indulgent treat with the familiar taste of hot chocolate in a refreshing form.    ",
    category: "Ice Coffee",
    price: 82,
    countInStock: 100,
    rating: 3.5,
    numReviews: 12,
  },
  {
    name: "Triple Coffee Jelly",
    image: "/images/triplecoffee.webp",
    description:
      " A beverage or dessert featuring coffee-flavored gelatin cubes suspended in a combination of three coffee elements, offering a unique and layered coffee experience.      ",
    category: "Ice Coffee",
    price: 83,
    countInStock: 120,
    rating: 3.5,
    numReviews: 12,
  },
  {
    name: "Iced Capp Supreme",
    image: "/images/supreme.webp",
    description:
      "A premium and indulgent iced beverage, typically made with espresso, rich milk, and ice, resulting in a luxurious and satisfying variation of the classic iced cappuccino.      ",
    category: "Ice Coffee",
    price: 64,
    countInStock: 122,
    rating: 4,
    numReviews: 12,
  },
  {
    name: "Iced Coffee",
    image: "/images/coffeeiced.webp",
    description:
      "Chilled coffee served over ice, offering a cool and refreshing alternative to hot coffee.   ",
    category: "Ice Coffee",
    price: 68,
    countInStock: 135,
    rating: 5,
    numReviews: 12,
  },
  {
    name: "Iced French Vanilla",
    image: "/images/frenchvanilla.webp",
    description:
      "A refreshing iced beverage that combines the smoothness of French Vanilla flavor with chilled coffee, creating a sweet and creamy iced treat.      ",
    category: "Ice Coffee",
    price: 69,
    countInStock: 165,
    rating: 5,
    numReviews: 12,
  },
  {
    name: "French Vanilla Cold Brew",
    image: "/images/coldbrew.webp",
    description:
      "A delightful iced coffee variant infused with the luscious flavor of French Vanilla, delivering a smooth and sweetened cold brew experience.      ",
    category: "Ice Coffee",
    price: 135,
    countInStock: 108,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: "Spanish Latte",
    image: "/images/spanishlatte.webp",
    description:
      "A velvety coffee drink that combines espresso with condensed milk, creating a sweet and creamy flavor profile with a distinctively rich taste.      ",
    category: "Ice Coffee",
    price: 78,
    countInStock: 180,
    rating: 3.5,
    numReviews: 12,
  },
  {
    name: "Iced Citrus Black Tea",
    image: "/images/citrus.webp",
    description:
      "A refreshing iced tea made by combining black tea with citrus flavors, resulting in a cool and zesty beverage perfect for a revitalizing experience.      ",
    category: "Ice Coffee",
    price: 87,
    countInStock: 170,
    rating: 5,
    numReviews: 12,
  },
  {
    name: "Sausage Egg & Cheese Biscuit",
    image: "/images/sausage.webp",
    description:
      "A savory breakfast sandwich featuring a combination of sausage, a fried or scrambled egg, and melted cheese sandwiched between a biscuit, offering a delicious and satisfying morning meal.      ",
    category: "Breakfast",
    price: 98,
    countInStock: 140,
    rating: 5,
    numReviews: 12,
  },
  {
    name: "Bacon Egg & Cheese (Biscuit/Muffin)",
    image: "/images/bacon.webp",
    description:
      "A classic breakfast sandwich consisting of crispy bacon, a fried or scrambled egg, and melted cheese, served between either a biscuit or a muffin for a hearty and flavorful morning meal.",
    category: "Breakfast",
    price: 89,
    countInStock: 150,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: "Sausage  & Cheese (Biscuit/Muffin)",
    image: "/images/sausagecheese.webp",
    description:
      "A breakfast sandwich featuring savory sausage and melted cheese nestled between a biscuit or a muffin, creating a satisfying and flavorful morning treat.",
    category: "Breakfast",
    price: 69,
    countInStock: 160,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: "Bacon  & Cheese (Biscuit/Muffin)",
    image: "/images/baconcheese.webp",
    description:
      "A delicious breakfast sandwich composed of crispy bacon strips and melted cheese, served on either a biscuit or a muffin for a tasty and satisfying morning option.",
    category: "Breakfast",
    price: 96,
    countInStock: 120,
    rating: 5,
    numReviews: 12,
  },
  {
    name: "Hashbrown",
    image: "/images/hashbrown.webp",
    description:
      "A popular breakfast side dish made from grated or finely chopped potatoes, typically seasoned and fried until crispy and golden brown. Hashbrowns are enjoyed for their crunchy exterior and soft interior, making them a classic and satisfying addition to breakfast menus.",
    category: "Breakfast",
    price: 56,
    countInStock: 110,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: "Bagel B.E.L.T",
    image: "/images/bagel.webp",
    description:
      "A flavorful breakfast sandwich featuring a bagel filled with bacon, a fried or scrambled egg, lettuce, and tomato, creating a tasty combination of savory and fresh ingredients.",
    category: "Breakfast",
    price: 65,
    countInStock: 111,
    rating: 5,
    numReviews: 12,
  },
  {
    name: "Farmers Breakfast Wrap",
    image: "/images/farmers.webp",
    description:
      "A hearty breakfast option typically wrapped in a tortilla, featuring a combination of ingredients like scrambled eggs, diced potatoes, sausage or bacon, and cheese, providing a portable and delicious morning meal.",
    category: "Breakfast",
    price: 64,
    countInStock: 160,
    rating: 3.5,
    numReviews: 12,
  },
  {
    name: "Ham and Cheese Croissant",
    image: "/images/hamcheese.webp",
    description:
      "A delectable pastry sandwich consisting of flaky croissant layers filled with slices of ham and melted cheese, offering a delightful combination of savory and buttery flavors.",
    category: "Breakfast",
    price: 86,
    countInStock: 166,
    rating: 5,
    numReviews: 12,
  },
  {
    name: "Chicken Bacon Ranch Wrap (Grilled or Crispy)",
    image: "/images/chickenbacon.webp",
    description:
      "A flavorful wrap that includes grilled or crispy chicken, bacon, and a creamy ranch dressing, providing a delicious blend of savory and tangy tastes in a convenient handheld form.",
    category: "Lunch and Sandwiches",
    price: 87,
    countInStock: 155,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: "Italiano Grilled Bagel",
    image: "/images/italiano.webp",
    description:
      "A savory bagel creation that involves grilling the bagel and filling it with Italian-inspired ingredients, such as cured meats, cheeses, and possibly vegetables or spreads, resulting in a delicious and flavorful sandwich.",
    category: "Lunch and Sandwiches",
    price: 88,
    countInStock: 144,
    rating: 5,
    numReviews: 12,
  },
  {
    name: "Chipotle Chicken Wrap",
    image: "/images/chipotle.webp",
    description:
      "A tasty wrap featuring seasoned and grilled chicken, typically accompanied by chipotle-flavored ingredients, such as a spicy sauce or peppers, wrapped in a tortilla for a flavorful and satisfying handheld meal.",
    category: "Lunch and Sandwiches",
    price: 77,
    countInStock: 143,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: "Steak and Cheese Panini",
    image: "/images/steak.webp",
    description:
      "A delicious sandwich made with thinly sliced steak, melted cheese, and sometimes additional toppings like onions or peppers, pressed between two slices of bread and grilled to perfection in a panini press, creating a warm and flavorful meal.",
    category: "Lunch and Sandwiches",
    price: 66,
    countInStock: 144,
    rating: 5,
    numReviews: 12,
  },
  {
    name: "Tuna Melt",
    image: "/images/tuna.webp",
    description:
      "A classic sandwich featuring tuna salad, often mixed with mayonnaise and other seasonings, topped with melted cheese and typically served on toasted bread or a roll for a warm and savory flavor combination.",
    category: "Lunch and Sandwiches",
    price: 55,
    countInStock: 135,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: "Artisan Grilled Cheese",
    image: "/images/artisan.webp",
    description:
      "A gourmet take on the classic grilled cheese sandwich, crafted with high-quality cheeses, often complemented by additional ingredients like specialty bread, herbs, or spreads, resulting in a sophisticated and flavorful twist on the beloved comfort food.",
    category: "Lunch and Sandwiches",
    price: 44,
    countInStock: 133,
    rating: 5,
    numReviews: 12,
  },
  {
    name: "Potato Wedges",
    image: "/images/potato.webp",
    description:
      "Thick slices of potatoes, seasoned and typically baked or fried until crispy on the outside and tender on the inside. These wedge-shaped potatoes make for a popular and satisfying side dish, often served with various dipping sauces.",
    category: "Wedges and Dips",
    price: 74,
    countInStock: 136,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: "Maple Dip",
    image: "/images/maple.webp",
    description:
      "A sweet and flavorful dip made with maple syrup as a primary ingredient. It can be used as a topping for desserts, a dip for fruits, or a spread for baked goods, adding a rich and distinctive maple flavor to the dish.",
    category: "Donuts and Timbits",
    price: 71,
    countInStock: 138,
    rating: 5,
    numReviews: 12,
  },
  {
    name: "Chocolate Dip",
    image: "/images/chocodip.webp",
    description:
      "A smooth and luscious dip made with melted chocolate, often used for coating or dipping various treats such as fruits, cookies, or pastries. It adds a delicious chocolatey layer to enhance the flavor of the dipped items.",
    category: "Donuts and Timbits",
    price: 72,
    countInStock: 131,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: "Old-Fashion Glazed",
    image: "/images/oldfashionglaze.webp",
    description:
      " A classic term often associated with donuts, pastries, or desserts, referring to a sweet and shiny glaze made from ingredients like powdered sugar, milk, and sometimes vanilla. This type of glaze provides a simple yet delicious coating that enhances the flavor and appearance of the baked goods.",
    category: "Donuts and Timbits",
    price: 73,
    countInStock: 130,
    rating: 5,
    numReviews: 12,
  },
  {
    name: "Chocolate Glazed",
    image: "/images/chocoglazed.webp",
    description:
      "A delectable coating made from melted chocolate, typically applied to donuts, pastries, or desserts. This glossy chocolate layer adds a rich and indulgent flavor, enhancing the sweetness of the treat it covers.",
    category: "Donuts and Timbits",
    price: 77,
    countInStock: 120,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: "Double Chocolate Fudge",
    image: "/images/doublechocofudge.webp",
    description:
      "A rich and decadent dessert or treat characterized by an abundance of chocolate flavor. It often includes both cocoa powder and melted chocolate in the recipe, resulting in a dense and fudgy texture. This indulgent creation is perfect for chocolate enthusiasts seeking an extra dose of cocoa goodness.",
    category: "Donuts and Timbits",
    price: 81,
    countInStock: 122,
    rating: 3.5,
    numReviews: 12,
  },
  {
    name: "Boston Cream",
    image: "/images/boston.webp",
    description:
      "A classic dessert or pastry typically consisting of a round sponge cake or pastry filled with a creamy vanilla or custard filling and topped with a smooth layer of chocolate ganache. The combination of the soft cake, luscious cream, and chocolate glaze creates a delightful and iconic treat.",
    category: "Donuts and Timbits",
    price: 82,
    countInStock: 132,
    rating: 5,
    numReviews: 12,
  },
  {
    name: "Chocolate and Eclair",
    image: "/images/chocoflair.webp",
    description:
      "A delightful pastry consisting of a light and airy choux pastry filled with creamy custard or whipped cream and topped with a glossy chocolate glaze. The combination of the crisp pastry, smooth filling, and rich chocolate coating makes for a delicious and iconic dessert.",
    category: "Donuts and Timbits",
    price: 83,
    countInStock: 123,
    rating: 3.5,
    numReviews: 12,
  },
  {
    name: "Honey Cruller",
    image: "/images/honey.webp",
    description:
      " A classic donut variety known for its twisted or ring-shaped design, made from a yeast-based dough that is fried to a golden perfection. What sets the honey cruller apart is its light and airy texture, often enhanced with a sweet honey glaze, resulting in a delectable and slightly chewy treat.",
    category: "Donuts and Timbits",
    price: 88,
    countInStock: 124,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: "Apple Fritter",
    image: "/images/apple.webp",
    description:
      "A sweet and flavorful pastry made by frying dough that is typically infused with diced apples, cinnamon, and sugar. The resulting fritter has a crispy exterior, a tender interior, and is often glazed or coated with powdered sugar, providing a delicious combination of fruity and spiced flavors.",
    category: "Donuts and Timbits",
    price: 83,
    countInStock: 128,
    rating: 5,
    numReviews: 12,
  },
  {
    name: "Chocolate Glazed Timbit",
    image: "/images/timbit.webp",
    description:
      "A bite-sized donut hole from Tim Hortons, coated with a smooth and glossy layer of chocolate glaze. Timbits are popular Canadian snacks and the chocolate-glazed variety offers a delectable combination of a soft, doughy center and a sweet chocolate coating.",
    category: "Donuts and Timbits",
    price: 86,
    countInStock: 129,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: "Strawberry Filled Timbit",
    image: "/images/strawberry.webp",
    description:
      "A small, bite-sized donut hole from Tim Hortons filled with strawberry-flavored filling. These Timbits are known for their delightful combination of a soft and fluffy exterior with a sweet and fruity strawberry center, making them a popular and tasty treat.",
    category: "Donuts and Timbits",
    price: 89,
    countInStock: 130,
    rating: 5,
    numReviews: 12,
  },
  {
    name: "Bday Cake Timbit",
    image: "/images/bday.webp",
    description:
      " A festive and sweet donut hole from Tim Hortons, typically featuring a cake-like interior, vibrant sprinkles, and a sweet glaze reminiscent of birthday cake frosting. These Timbits are a celebratory and enjoyable treat for special occasions.",
    category: "Donuts and Timbits",
    price: 86,
    countInStock: 133,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: "Old Fashioned Glazed Timbit",
    image: "/images/oldtimbit.webp",
    description:
      "A classic and timeless donut hole from Tim Hortons, characterized by a simple yet delicious glazed coating. These Timbits maintain the traditional charm of an old-fashioned donut, with a sweet and glossy glaze that adds to their irresistible appeal.",
    category: "Donuts and Timbits",
    price: 85,
    countInStock: 137,
    rating: 5,
    numReviews: 12,
  },
  {
    name: "Chocolate Filled Timbit",
    image: "/images/chokotimbit.webp",
    description:
      "A bite-sized donut hole from Tim Hortons filled with a rich and velvety chocolate filling. These Timbits offer a delightful combination of a soft and fluffy exterior with a sweet and indulgent chocolate center, making them a favorite for chocolate lovers.",
    category: "Donuts and Timbits",
    price: 84,
    countInStock: 138,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: "Croissant",
    image: "/images/croissant.webp",
    description:
      " A flaky and buttery French pastry known for its crescent shape. Made from layered dough and butter, croissants have a light, airy interior and a golden, crispy exterior. They are a versatile bakery item enjoyed plain or filled with various ingredients like chocolate, almond paste, or ham and cheese.",
    category: "Baked Goods",
    price: 82,
    countInStock: 138,
    rating: 5,
    numReviews: 12,
  },
  {
    name: "Signature 4 Cheese Bagel",
    image: "/images/signature.webp",
    description:
      "A flavorful bagel variety featuring a blend of four cheeses, which could include options like cheddar, mozzarella, parmesan, and cream cheese. This bagel provides a savory and indulgent experience, perfect for those who enjoy the rich and gooey goodness of melted cheeses.      ",
    category: "Baked Goods",
    price: 82,
    countInStock: 144,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: "Classic Plain Bagel",
    image: "/images/classicplainbagel.webp",
    description:
      "A simple and versatile bagel characterized by its plain and unadorned exterior. This bagel serves as a blank canvas for various toppings such as cream cheese, butter, jam, or as the base for a sandwich. Its dense and chewy texture makes it a popular choice for a wide range of flavor combinations.",
    category: "Baked Goods",
    price: 81,
    countInStock: 10,
    rating: 5,
    numReviews: 12,
  },
  {
    name: "Chocolate Chip Muffin",
    image: "/images/chocochipmuffin.webp",
    description:
      "A delightful baked treat featuring a soft and moist muffin base studded with chocolate chips. This popular muffin variation combines the rich and indulgent flavor of chocolate with the light and fluffy texture of the muffin, creating a deliciously sweet snack or breakfast option.",
    category: "Baked Goods",
    price: 80,
    countInStock: 145,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: "Fruit Explossion Muffin",
    image: "/images/fruitexplossion.webp",
    description:
      "A flavorful muffin bursting with a variety of fruits, such as berries, apples, or tropical fruits, creating a delicious and vibrant explosion of flavors. This muffin offers a delightful combination of sweet and tart notes, making it a tasty and fruity baked treat.",
    category: "Baked Goods",
    price: 90,
    countInStock: 142,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: "Tim Hortons Original Blend Coffee",
    image: "/images/timhortonsoriginal.webp",
    description:
      "A signature coffee blend from Tim Hortons, a Canadian coffee and fast-food chain. Known for its medium roast and well-balanced flavor, Tim Hortons Original Blend Coffee is a popular choice among coffee enthusiasts, offering a smooth and satisfying cup with a hint of richness.",
    category: "Retail Packs",
    price: 99,
    countInStock: 155,
    rating: 5,
    numReviews: 12,
  },
  {
    name: "Tim Hortons Decaf",
    image: "/images/decaf.webp",
    description:
      "A decaffeinated coffee option from Tim Hortons, known for its commitment to providing a caffeine-free alternative with a taste similar to their regular coffee. This decaf option allows individuals to enjoy the distinctive Tim Hortons coffee flavor without the stimulant effects of caffeine.",
    category: "Retail Packs",
    price: 97,
    countInStock: 158,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: "French Vanilla",
    image: "/images/frenchvanillarepack.webp",
    description:
      " A sweet and creamy flavor often associated with vanilla-based products, such as coffee, ice cream, and desserts. In the context of beverages like coffee, French Vanilla typically involves the addition of vanilla flavoring and a sweetener, creating a smooth and indulgent taste profile.",
    category: "Retail Packs",
    price: 98,
    countInStock: 198,
    rating: 5,
    numReviews: 12,
  },
  {
    name: "Hot Chocolate",
    image: "/images/hotchocolate.webp",
    description:
      "A comforting and popular beverage made by combining cocoa powder or chocolate with hot milk or water and sweetened to taste. It is often served with whipped cream or marshmallows on top for added richness and sweetness, providing a warm and satisfying treat, especially during colder seasons.",
    category: "Retail Packs",
    price: 91,
    countInStock: 157,
    rating: 4.5,
    numReviews: 12,
  },
];

export default products;