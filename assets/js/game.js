// game states

// "WIN" - player robot has defeated all enemy-robots

// *fight all enemy-robots

// *defeat each enemy-robot

// "LOSE" - player robot's health is zero or less

var fightOrSkip = function() {

    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

    if (promptFight === "" || promptFight === null) {

        window.alert("You need to provide a valid answer! Please try again.");

        return fightOrSkip();
        
    }

    promptFight=promptFight.toLowerCase();

    if (promptFight === "skip"){

        var confirmSkip = window.confirm("Are you sure you'd like to skip?");

        if (confirmSkip) {

            window.alert(playerInfo.Name + "has decided to skip this fight. Goodbye!");

            playerInfo.Money =Math.max(0, playerInfo.Money -10);

            return true

            shop()
        }
    }
}

var fight = function(enemy) {

    while(enemy.Health > 0 && playerInfo.Health > 0) {

        if(fightOrSkip()) {

            break;

        }

        var damage = randomNumber(playerInfo.Attack - 3, playerInfo.Attack);

        enemy.Health = Math.max(0, enemy.Health - damage);

        console.log(

            playerInfo.Name + " attacked " + enemy.Name + ". " + enemy.Name + " now has " + enemy.Health + " health remaining."

        );

        if (enemy.Health <= 0) {

            window.alert(enemy.Name + " has died!");

            break;

        }else {

            window.alert (enemy.Name + " still has " + enemy.Health + " health left.");

        }

        var damage = randomNumber(enemy.Attack - 3, enemy.Attack)

        playerInfo.Health = Math.max(0, playerInfo.Health - enemy.Attack);

        console.log(

            enemy.Name + " attacked " + playerInfo.Name + ". " + playerInfo.Name + " now has " + playerInfo.Health + " health remaining."

        );

        if (playerInfo.Health <= 0) {

            window.alert(playerInfo.Name + " has died!");

            break;

        }else {

            window.alert(playerInfo.Name + " still has " + playerInfo.Health + " health left.");
        }
    }
};

var startGame = function() {

    playerInfo.reset();

    for(var i = 0; i < enemyInfo.length; i++) {

        if (playerInfo.Health > 0) {

            window.alert("Welcome to Robot Gladiators! Round " + (i+1) );

            var pickedEnemyObj = enemyInfo[i];

            pickedEnemyObj.Health= randomNumber(40,60);

            fight(pickedEnemyObj);

            if (playerInfo.Health > 0 && i < enemyInfo.length - 1) {

                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                if(storeConfirm) {

                    shop();

                }

            }

        } else {

            window.alert("You have lost your robot in battle! Game Over!");

            break;
        }
    }

    endGame();

};

var  endGame = function() {

    if (playerInfo.Health > 0) {

        window.alert("Great job! You've survived the game! You now have a score of " + playerInfo.Money + ".");

    } else {

        window.alert("You've lost your robot in battle.");

    }

    var playAgainConfirm= window.confirm("Would you like to play again?");

    if (playAgainConfirm) {

        startGame()

    } else {

        window.alert("Thank you for playing Robot Gladiators! come back soon!");

    }

};

var shop = function() {

    var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice.");

    switch (shopOptionPrompt) {

        case "REFILL":
        case "refill":

            playerInfo.refilHealth()

            break;

        case "UPGRADE":
        case "upgrade":

            playerInfo.upgradeAttack();

            break;

        case "LEAVE":
        case "leave":
            window.alert("Leaving the store.");

            break;

        default:
            window.alert("You did not pick a valid option. Try again.");

            shop();

            break;
    }

};

var randomNumber = function(min, max) {

    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
}

var playerInfo = {

    Name : window.prompt("what is your robot's name?"),

    Health : 100,

    Attack : 10,

    Money : 10,

    reset: function() {

        this.health = 100;

        this.money = 10;
        
        this.attack = 10;
    },

    refilHealth: function() {

        if (this.Money >=7) {

            window.alert("Refilling player's health by 20 for 7 dollars.");

            this.Health += 20;

            this.Money -= 7;

        }else {
            
            window.alert("You don't have enough money!");

        }
    },

    upgradeAttack: function() {

        if(this.money >= 7) {

            window.alert("Upgrading player's attack by 6 for 7 dollars.");

            this.Attack+= 6;

            this.Money -= 7;

        }else{

            window.alert("You don't have enough money!");

        }

    }

};

var enemyInfo = [

    {
        Name: "Roborto",

        Attack: randomNumber(10,14)
    },
    {
        Name: "Amy Android",

        Attack: randomNumber(10,14)
    },
    {
        Name: "Robo Trumble",

        Attack: randomNumber(10,14)
    }
];

startGame()