/*
 * Upon submission, this file should contain the SQL script to initialize your database.
 * It should contain all DROP TABLE and CREATE TABLE statments, and any INSERT statements
 * required.
 */

drop table if exists comments;
drop table if exists likes;
drop table if exists articles;
drop table if exists users;
drop table if exists avatars;

create table avatars (
	image_path varchar(100) NOT NULL PRIMARY KEY
);

insert into avatars (image_path) VALUES 
	('./images/Arbok.png'),
	('./images/Blastoise.png'),
	('./images/Charizard.png'),
	('./images/Clefable.png'),
	('./images/Dragonite.png'),
	('./images/Jigglypuff.png'),
	('./images/Lapras.png'),
	('./images/Mewtwo.png'),
	('./images/Pikachu.png'),
	('./images/Snorlax.png'),
	('./images/Venusaur.png');

create table users (
	user_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(20) NOT NULL,
    first_name VARCHAR(100),
	last_name VARCHAR(100) NOT NULL,
	dob date,
	email VARCHAR(100),
	"password" VARCHAR(100), 
	description VARCHAR(200),
	avatar_path varchar(100), 
	is_admin CHAR(1),
	authToken varchar(100),
	FOREIGN KEY(avatar_path) REFERENCES avatars(image_path)
);


insert into users (username, first_name, last_name, dob, email, "password", description,  is_admin, avatar_path) VALUES
	('testUser99', 'Peter','Waititi','1986/06/02', 'adminuser@test.com', 'Password1!', 'blog administrator', 'Y', './images/Blastoise.png'),
	('Yogi-bear', 'Taika','Jackson','1975/05/07', 'yogi-bear@yosimite.com', 'Password2!', 'I love animals', NULL, './images/Jigglypuff.png'),
	('Pikachu', 'Miley','Castle-Hughes','2002/09/26', 'pikachu@pokemon4life.co.nz', 'Password3!', 'Furry friends make the best of friends',  NULL, './images/Pikachu.png'),
	('MistyMoo101', 'Keisha','Cyrus', '1990/04/01', 'testuser101@test.com.au', 'Password4!', 'All animals are awesome and I have 315 pets at home.  Can''t get enough of them, but they do take a lot of looking after.', NULL, './images/Venusaur.png'),
	('champ99', 'Angel', 'Black', '1970/01/01', 'angelwings@darknet.net', 'Password5!', 'We have a small hobby farm and also re', NULL, './images/Dragonite.png');

create table articles (
    article_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(100),
	date_published DATE DEFAULT CURRENT_DATE,
	content VARCHAR(500),
	image_id VARCHAR(100),
	likes_count INT,
	view_count INT, 
	comment_count INT,
	author_id INT NOT NULL,
	FOREIGN KEY (author_id) REFERENCES users(user_id) 	ON DELETE CASCADE
);

insert into articles (title, date_published, content, image_id, likes_count, view_count, comment_count, author_id) VALUES
	('Gotta Love Dino', '2021-04-24', 'Puppy kitty ipsum dolor sit good dog foot stick canary. Teeth Mittens grooming vaccine walk swimming nest good boy furry tongue heel furry treats fish. Cage run fast kitten dinnertime ball run foot park fleas throw house train licks stick dinnertime window. Yawn litter fish yawn toy pet gate throw Buddy kitty wag tail ball groom crate ferret heel wet nose Rover toys pet supplies. Bird Food treats tongue lick teeth ferret litter box slobbery litter box crate bird small animals yawn small animals shake slobber gimme five toys polydactyl meow. Turtle cage lazy cat foot lazy cat groom canary window tooth brush bedding lazy cat pet supplies turtle water dog shake pet supplies kitty. Walk bird harness wet nose meow harness grooming water dog lol catz water bedding toys bird seed fetch lazy cat. Parakeet scratcher brush biscuit lick dog tooth walk food lazy cat biscuit. Cockatiel Snowball kitten Rover ferret puppy.', './images/Dino.jpg', 3, 106,	2, 1),
	('Merv will eat ANYTHING!',	'2021-08-02', 'Baby goats are as cute as puppies. You just want to pick them up and cuddle them. Merv even has puppy-like traits. Goats of all ages have expressive faces, even with their odd eyes and interesting facial hair. You might have seen a goat in a cartoon on comic, gnawing on a tin can and heard that goats will eat pretty much anything. That''s not true. They''re actually very picky eaters but Merv keeps our yard tidy and neat.  When he is sick of the grass, he is very resourceful and are able to find the most nutritious offerings wherever they are, including my washing and the wooden outdoor furniture. He also likes tree bark and thistles. Goats can survive on the thinnest patches of grass, but we have plenty to keep him fed and happy.  Who needs a dog, when you have Merv!', './images/Mower Merv.jpg', 1, 6, 1, 1),
	('My Trip to Kenya', '2021-03-03', 'Augers oats hen cowpies. Prairie dogs raccoons robins rats. Combine Harvester swather, baler as haybine parsley, melon in hay rake. Blue berries pigeons buzz and bean prairie dogs nails at est. Quack hammers eggplant is utters nails garden. Goat goose hen horse. Ewes mushrooms zucchini in forage Harvester at sheep with tractor. veterinarian blue berries cattle jelly canning. Berries pigeons buzz and bean prairie dogs nails at est. Lettus gobblers pens, radish on kidney beans, llamas pick up truck. Pick up truck livestock, pets and storage shed, troughs feed bale manure, is garden wheat oats at augers. Rooster celery pineapples fertilizer, a melon chirp pets in. Shovel.', './images/lion-Kenya.jpg', 1, 156, 2, 1),
	('Unicorns Forever', '2021-10-16', 'Trucks, hoot pony robins peacocks an kale. . Quack hammers eggplant is utters nails garden. In eggplant, quonset is grain bins, grain trucks quonset pole shed, with fences gates zucchini carrots scrap metal. Petting zoo at carrot. Alligators quack. Shovels at rakes plows. Mooo cat daisys, grunt in turkey coo, windmill at bull. Mallet herbs basil nest, in welding equipment pens quail. Petting zoo bulls, Ducks in cabbage on, cauliflower irrigation Seeder onion. Oranges cucumbers rhubarb gourds watermelon. John Deere bees, parsley sweet corn at, porky pig shovels. Shovels at rakes plows. Grapes at yams mushrooms organic berries gobble. Turkey daisys eggs squeal, horses moonshine apples raising Mooo tractor plow. Rooster celery pineapple.', './images/unicorn.jpg' , 1, 256, 1, 2),
	('Here Piggy Pig Pig', '2021-01-02', 'The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymphs grab quick-jived waltz. Brick quiz whangs jumpy veldt fox. Bright vixens jump; dozy fowl quack. Quick wafting zephyrs vex bold Jim. Quick zephyrs blow, vexing daft Jim. Sex-charged fop blew my junk TV quiz. How quickly daft jumping zebras vex. Two driven jocks help fax my big quiz. Quick, Baz, get my woven flax jodhpurs! Now fax quiz Jack! my brave ghost pled. Five quacking zephyrs jolt my wax bed. Flummoxed by job, kvetching W. zaps Iraq. Cozy sphinx waves quart jug of bad milk. A very bad quack might jinx zippy fowls. Few quips galvanized the mock jury box. Quick brown dogs jump over the lazy fox. The jay, pig, fox, zebra, and my wolves quack! Blowzy red vixens fight for a quick jump. Joaquin Phoenix was gazed by MTV for luck. A wizard job.', './images/Porky.jpg', 2, 56, 1, 2),
	('Mittens Loves Ned', '2020-12-12', 'Love fish dream about hunting birds and then turn in a circle curl up and sleep on the freshly laundered towels head butt cant eat out of my own dish, but destroy couch as revenge reaches under door into adjacent room. Walk on keyboard hit you unexpectedly, so hide when guests come over please let me outside pouty face yay! wait, it''s cold out please let me inside pouty face oh, thank you rub against mommy''s leg oh it looks so nice out, the neighbor cat was mean to me please let me back inside rub against owner because nose is wet ask for petting. Knock over christmas tree sit as close as possible to warm fire without sitting on cold floor, walk on keyboard need to check on human, snob you for another person spend six hours per day washing. Oooo! dangly balls! jump swat swing flies so sweetly to the floor crash move on wash belly nap spend six hours per day washing, but still have. Meow loudly just to annoy owners you call this cat food mmmmmmmmmeeeeeeeeooooooooowwwwwwww', './images/mittens and ned.jpg', 3, 186, NULL, 2),
	('Scared of the Rain', '2021-05-02', 'Manchego hard cheese fondue. Stilton dolcelatte mascarpone swiss the big cheese bocconcini gouda edam. Feta goat cheese and biscuits macaroni cheese swiss taleggio gouda bavarian bergkase. Feta babybel chalk and cheese rubber cheese cheese triangles. Croque monsieur fromage bavarian bergkase. Say cheese fromage frais monterey jack danish fontina paneer melted cheese cheddar fromage frais. Pecorino cheddar cheesy feet fromage goat pepper jack cheese triangles edam. Macaroni cheese caerphilly edam cheese and biscuits fondue. Rubber cheese st. agur blue cheese queso. Red leicester queso monterey jack chalk and cheese stinking bishop port-salut feta cheesy grin. Fondue the big cheese cheese slices st. agur blue cheese manchego roquefort gouda cheesy feet. Croque monsieur mascarpone airedale caerphilly croque monsieur hard cheese squirty cheese.', './images/Jimy loves the rain.jpg', 2, 19, 1, 3),
	('My Beautiful Beau', '2021-02-06', 'Cupcake ipsum dolor sit amet jelly gummi bears candy danish. Danish shortbread pie icing sweet roll apple pie halvah. Croissant sweet halvah I love tootsie roll bear claw cake I love. Gingerbread sweet carrot cake gummi bears toffee gummi bears tart liquorice sweet. Donut I love candy cake tiramisu caramels I love. Jelly gingerbread marshmallow fruitcake carrot cake caramels. Ice cream pie lemon drops sweet roll I love candy canes. Topping biscuit apple pie cake sesame snaps pastry wafer oat cake. Fruitcake chocolate cake fruitcake toffee chocolate topping. Chupa chups I love pie toffee chocolate topping. I love jelly beans pie jelly beans croissant sweet. Danish croissant cookie shortbread I love jelly beans. Tart cheesecake oat cake ice cream gummi bears gummi bears. Bear claw dessert fruitcake brownie pudding bonbon tart halvah cake. Topping apple pie gingerbread macaroon biscuit. Sweet powder cupcake donut tart muffin.', './images/puppy love.jpg', 3, 98, 2, 3),
	('Mythical Beauty',	'2021-04-01', 'I''m baby poke kitsch blue bottle shoreditch, tousled jean shorts pok pok seitan street art DIY coloring book PBR&B. Flexitarian 90''s brooklyn 3 wolf moon, irony meggings gluten-free. Umami activated charcoal flannel vape. Echo park schlitz squid tofu chia, ennui scenester flexitarian palo santo deep v tumblr roof party shoreditch yr. Trust fund humblebrag actually, jean shorts hella quinoa shabby chic ramps. Kale chips food truck brooklyn pork belly succulents ramps synth godard glossier tumblr microdosing keytar hammock mumblecore. Banh mi distillery next level stumptown jianbing taxidermy. Migas lomo cray gastropub banh mi flexitarian lumbersexual biodiesel raclette. Ugh cred crucifix mumblecore bespoke gentrify. Offal coloring book franzen skateboard scenester edison bulb iceland literally yr. Keffiyeh bushwick messenger bag typewriter, brunch photo booth tattooed prism etsy paleo distillery mlkshk palo santo. Letterpress drinking vinegar wayfarers selfies shoreditch freegan.', './images/Mythical beauty.jpg', 4, 106, 2, 3),
	('Too Sassy!', '2021-05-05', 'Pokem ipsum dolor sit amet Sigilyph Pidgey Sewaddle Wurmple Bill Empoleon. Misty Swadloon Liepard Harden Youngster wants to fight Treecko fishing rod. Cerulean City Metagross Elekid Machamp Mewtwo Strikes Back Meditite Bellsprout. Growl Bellsprout Zorua Chingling Gallade in a world we must defend Simipour. Pikachu Marsh Badge Giratina Sapphire Aipom Lairon we''re blasting off again. Wing Attack Mewtwo Azumarill sed do eiusmod tempor Jesse Silcoon Feraligatr. We''re blasting off again Hydreigon Tynamo Crawdaunt I wanna be the very best Pidgey Mawile. Silver Croagunk Combusken Jesse Gothita Empoleon Hoothoot. Fire Slaking Glacier Badge Pokeball ex ea commodo consequat Poison Sting Drilbur. Anim id est laborum consectetur adipisicing elit Cradily Vanillish Bellossom Cacturne Badge. Celadon City Hidden Machine Musharna Crustle Gallade Heracross Baltoy. Bug Minccino Cleffa Doduo Espeon Jirachi Feebas. Johto Earth Badge Geodude Staryu Hypno Luxray Shellos.', './images/Sassy my snake.jpg', NULL, 9, NULL, 4),
	('Carl and His Corn', '2021-09-27', 'Nay, my dear Lady, this will never do. Poor David! Smile with the simple;--What folly is that? And who would feed with the poor that can help it? No, no; let me smile with the wise, and feed with the rich.'' I repeated this sally to Garrick, and wondered to find his sensibility as a writer not a little irritated by it. To sooth him, I observed, that Johnson spared none of us; and I quoted the passage in Horace, in which he compares one who attacks his friends for the sake of a laugh, to a pushing ox, that is marked by a bunch of hay put upon his horns: ''foenum habet in cornu.'' ''Ay, (said Garrick vehemently,) he has a whole MOW of it. He would not allow much merit to Whitefield''s oratory. ''His popularity, Sir, (said be,) is chiefly owing to the peculiarity of his manner. He would be followed by crowds were he to wear a night-cap in the pulpit, or were he to preach from a tree.', './images/Carl and his corn.jpg', 1, 29, 1, 4),
	('Tigger', '2021-04-16', 'As he often remembered afterwards, and always with no small wonder, he found himself at first gazing at the portrait with a feeling of almost scientific interest. That such a change should have taken place was incredible to him. And yet it was a fact. Was there some subtle affinity between the chemical atoms that shaped themselves into form and colour on the canvas and the soul that was within him? Could it be that what that soul thought, they realized?--that what it dreamed, they made true? Or was there some other, more terrible reason? He shuddered, and felt afraid, and, going back to the couch, lay there, gazing at the picture in sickened horror. One thing, however, he felt that it had done for him. It had made him conscious how unjust, how cruel, he had been to Sibyl Vane. It was not too late to make reparation for that. She could still be his wife. His unreal and selfish love would yield to some higher influence.',  './images/Majestic tigers.jpg', 1, 659, 1, 4), 
	('Did you know Pandas do Yoga?', '2021-07-22', 'The carbon in our apple pies brain is the seed of intelligence network of wormholes a billion trillion bits of moving fluff take root and flourish. A still more glorious dawn awaits preserve and cherish that pale blue dot stirred by starlight encyclopaedia galactica venture preserve and cherish that pale blue dot? Great turbulent clouds preserve and cherish that pale blue dot vastness is bearable only through love extraordinary claims require extraordinary evidence across the centuries extraplanetary and billions upon billions upon billions upon billions upon billions upon billions upon billions.', './images/Panda yoga.jpg', NULL, NULL, NULL, 2),
	('Perfect in Pink',	'2021-01-29', 'Consciousness muse about billions upon billions quasar gathered by gravity rich in mystery. Realm of the galaxies invent the universe network of wormholes a still more glorious dawn awaits venture rings of Uranus? Laws of physics shores of the cosmic ocean from which we spring are creatures of the cosmos are creatures of the cosmos bits of moving fluff. Vastness is bearable only through love kindling the energy hidden in matter are creatures of the cosmos a very small stage in a vast cosmic arena rich in heavy atoms emerged into consciousness? Made in the interiors of collapsing stars the only home we''ve ever known Rig Veda Cambrian explosion worldlets network of wormholes. Finite but unbounded extraordinary claims require extraordinary evidence across the centuries radio telescope the carbon in our apple pies Apollonius of Perga.', './images/pinky.png', 1, 38, 2, 3)
	;



create table comments (
    comment_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	comment_date DATETIME DEFAULT CURRENT_DATE,
	content VARCHAR(200),
	author_id VARCHAR(20),
	article_id INT NOT NULL, 
	parent_comment_id INT,
	FOREIGN KEY (author_id) REFERENCES users(user_id) 	ON DELETE CASCADE,
	FOREIGN KEY (article_id) REFERENCES articles(article_id) 	ON DELETE CASCADE
);

insert into comments (comment_date, content, author_id, article_id, parent_comment_id) VALUES
	('2021-05-12', 'Pokem ipsum dolor sit amet Hitmonlee Machamp Gurdurr Sonic Boom Cryogonal Tropius. Sunt in culpa Darkrai Delcatty Wigglytuff Emboar grumpy old man who needs coffee Gothorita.', 1, 1, NULL),
	('2021-05-21', 'Pika-pi Maractus Ultra Ball Ralts Mime Jr Froslass Shieldon. Cascade Badge Breloom Oshawott Weavile Nidorina Mienfoo anim id est laborum.', 2, 12, NULL),
	('2021-06-29', 'Rising Badge Woobat Panpour Psyduck consectetur adipisicing elit Cradily Exeggcute. Volcano Badge Pokedex Ariados Rhyperior Pawniard Rotom Porygon-Z.', 3, 5 , NULL),
	('2021-02-01',  'Rising Badge Woobat Panpour Psyduck consectetur adipisicing elit Cradily Exeggcute. Volcano Badge Pokedex Ariados Rhyperior Pawniard Rotom Porygon-Z.', 4, 14, NULL),
	('2021-06-06', 'Pokem ipsum dolor sit amet Hitmonlee Machamp Gurdurr Sonic Boom Cryogonal Tropius. Sunt in culpa Darkrai Delcatty Wigglytuff Emboar grumpy old man who needs coffee Gothorita.', 2, 9 , NULL),
	('2021-08-09', 'Lorem ipsum dolor sit amet Meowth Marill Pidgey Walrein Shedinja Ekans. Gotta catch ''em all Marill Golurk Klink Servine Pidgey Meloetta. Charmander Gible Mawile Houndour Cacturne Lunatone Magikarp used Splash .', 3,  9, NULL),
	('2021-02-14', 'Pika-pi Maractus Ultra Ball Ralts Mime Jr Froslass Shieldon. Cascade Badge Breloom Oshawott Weavile Nidorina Mienfoo anim id est laborum.', 4, 3 , NULL),
	('2021-08-07', 'Charmander Cherrim Town Map Primeape Cloyster Flamethrower Technical Machine. Rage Groudon Celebi Pokemon Conkeldurr Pinsir Tangrowth.', 4, 4 , NULL),
	('2021-10-30', 'Lorem ipsum dolor sit amet Meowth Marill Pidgey Walrein Shedinja Ekans. Gotta catch ''em all Marill Golurk Klink Servine Pidgey Meloetta. Charmander Gible Mawile Houndour Cacturne Lunatone Magikarp used Splash.', 1, 7 , NULL),
	('2021-04-19', 'Charmander Cherrim Town Map Primeape Cloyster Flamethrower Technical Machine. Rage Groudon Celebi Pokemon Conkeldurr Pinsir Tangrowth.', 1, 1 , NULL),
	('2021-06-16', 'Pokem ipsum dolor sit amet Hitmonlee Machamp Gurdurr Sonic Boom Cryogonal Tropius. Sunt in culpa Darkrai Delcatty Wigglytuff Emboar grumpy old man who needs coffee Gothorita.', 2, 9 , NULL),
	('2021-07-07', 'Charmander Cherrim Town Map Primeape Cloyster Flamethrower Technical Machine. Rage Groudon Celebi Pokemon Conkeldurr Pinsir Tangrowth.', 3, 11, 5),
	('2021-10-07', 'Pokem ipsum dolor sit amet Hitmonlee Machamp Gurdurr Sonic Boom Cryogonal Tropius. Sunt in culpa Darkrai Delcatty Wigglytuff Emboar grumpy old man who needs coffee Gothorita.', 4, 14, NULL),
	('2021-05-18', 'Lorem ipsum dolor sit amet Meowth Marill Pidgey Walrein Shedinja Ekans. Gotta catch ''em all Marill Golurk Klink Servine Pidgey Meloetta. Charmander Gible Mawile Houndour Cacturne Lunatone Magikarp used Splash.', 2, 3 , NULL),
	('2021-03-23', 'Pokem ipsum dolor sit amet Hitmonlee Machamp Gurdurr Sonic Boom Cryogonal Tropius. Sunt in culpa Darkrai Delcatty Wigglytuff Emboar grumpy old man who needs coffee Gothorita.', 3, 8 , NULL),
	('2021-03-15', 'Pokem ipsum dolor sit amet Hitmonlee Machamp Gurdurr Sonic Boom Cryogonal Tropius. Sunt in culpa Darkrai Delcatty Wigglytuff Emboar grumpy old man who needs coffee Gothorita.', 4, 2 , NULL),
	('2021-09-26', 'Rising Badge Woobat Panpour Psyduck consectetur adipisicing elit Cradily Exeggcute. Volcano Badge Pokedex Ariados Rhyperior Pawniard Rotom Porygon-Z.', 4, 8 , NULL),
	('2021-10-10','Pokem ipsum dolor sit amet Hitmonlee Machamp Gurdurr Sonic Boom Cryogonal Tropius. Sunt in culpa Darkrai Delcatty Wigglytuff Emboar grumpy old man who needs coffee Gothorita.', 1, 6 , NULL),
	('2021-08-06', 'Pika-pi Maractus Ultra Ball Ralts Mime Jr Froslass Shieldon. Cascade Badge Breloom Oshawott Weavile Nidorina Mienfoo anim id est laborum.', 2, 7 , 9)
	;


create table likes (
	user_id INT NOT NULL,
	article_id INT NOT NULL, 
	PRIMARY KEY (user_id, article_id),
	FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
	FOREIGN KEY (article_id) REFERENCES articles(article_id) 	ON DELETE CASCADE
);

insert into likes (user_id, article_id) VALUES
	(1,	1),
	(1,	12),
	(1,	9),
	(1,	7),
	(1,	8),
	(1,	3),
	(1,	6),
	(2,	1),
	(2,	9),
	(2,	6),
	(2,	4),
	(2,	11),
	(2,	8),
	(2,	14),
	(3,	3),
	(3,	6),
	(3,	9),
	(3,	8),
	(3,	5),
	(3,	1),
	(4,	5),
	(4,	7),
	(4,	2)
	;
