function doinsult()
{
var insultmaster=["If brains were dynamite, you wouldn't have enough to blow your nose","If stupidity was painful, you'd be in agony","I refuse to have a battle of wits with an unarmed person.","If I throw a stuck, will you go away?","I'd expalin it to you, but I don't have any crayons with me.","If you had one more brain cell, it would be lonely.","I get so emotional when ou're not around. That emotion is happiness","Calling you an idiot would be an insult to stupid people"];

if( typeof doinsult.starter == 'undefined' ) {
doinsult.starter=["Don't be a ","Stop It! You ","Really? You're such a ","Come On, you ","You","You're a ","You"];
    }

else
 {
 if (doinsult.starter.length == 0) doinsult.starter=["Don't be a ","Stop It! You ","Really? You're such a ","Come On, you ","You","You're nothing but a ","You"];
 else
 {
 doinsult.starter = shuffle(doinsult.starter);
 }
 }


var starter2=["GOD","For Pete's Sake ","@#$&^$@~","FRACK!","",""];
var adjective1=["hairy","creepy","disgusting","stupid","foolish","crazy","ugly"];
var adjective2=["","lazy","fat","horrid","scary","sick","","","",""];
var joiner=["","piece of","slab of","pile of"];
var nouns1=["horse","bull","cow","chicken","klingon","baboon","warthog"];
var nouns2=["meat","poo","farts","droppings","feces"];
var verbs=["lover","hater","farter","eater","feces"];

var usemaster=Math.floor(Math.random() * 100);

var usedonce=1;
if( typeof doinsult.counter == 'undefined' ) {
	usedonce=0;
    }
if (usemaster > 88 && usedonce == 0)
 {
  doinsult.counter = 0;
  usedonce=1;

var whichmaster=Math.floor(Math.random() * insultmaster.length);
var p1=insultmaster[whichmaster];
var st2=Math.floor(Math.random() * starter2.length);
var start=starter2[st2];
var sent=start + " " + p1;
return sent.trim();
}


var p1=doinsult.starter.pop();
rnd=Math.floor(Math.random() * adjective1.length);
var p2=adjective1[rnd];

rnd=Math.floor(Math.random() * adjective2.length);
var adj=adjective2[rnd];


var flipit=Math.floor(Math.random() * 100);

if (flipit > 65 && adj != "")
 {
 var n=adj;
 var adj=p2;
 var p2=n;
 }


if (adj != "") p2 = p2 + " " + adj;

rnd=Math.floor(Math.random() * joiner.length);
var joinit=joiner[rnd];

rnd=Math.floor(Math.random() * nouns1.length);
var noun1=nouns1[rnd];

rnd=Math.floor(Math.random() * nouns2.length);
var noun2=nouns2[rnd];

rnd=Math.floor(Math.random() * verbs.length);
var verb=verbs[rnd];

var sentence = p1 + " " + p2;
if (joinit == "")
{
sentence = sentence + " " + noun1 + " " + noun2 + " " + verb;
}
else
{
sentence = sentence + " " + joinit + " " + noun1 + " " + noun2;
}
return sentence;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

