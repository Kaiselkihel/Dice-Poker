//JavaScript Document

var rollButton=document.getElementById('pressRoll');
var keepButton=document.getElementById('pressKeep');
var betButton=document.getElementById('betYourMoney');
var playerStatButton=document.getElementById('stat');
var replayYesButton=document.getElementById('replayYes');
var replayNoButton=document.getElementById('replayNo');
var rerollButton1=document.getElementById('reroll1');
var rerollButton2=document.getElementById('reroll2');
var rerollButton3=document.getElementById('reroll3');
var rerollButton4=document.getElementById('reroll4');
var rerollButton5=document.getElementById('reroll5');

var playerHand=document.getElementById('playerHand');
var computerHand=document.getElementById('computerHand');
var centerNotice=document.getElementById('centerNotice');
var bettingForm=document.getElementById('bettingMoney');

var playerMoney=document.getElementById('p_currentAmount');
var playerAmount=200;

var computerMoney=document.getElementById('c_currentAmount');
var computerAmount=200;

var currentPot=document.getElementById('currentPot');
var totalPot=0;

var diceImageSet=[];
for(var i=1; i<7; i++){
	var dieImg=new Image();
	dieImg.src='images/dieface'+i+'.gif';
	diceImageSet.push(dieImg);
}

var c_diceRoll=[];var p_diceRoll=[];
var p_tempArray=[];

var c_dieFace=['c_dieFace1','c_dieFace2','c_dieFace3','c_dieFace4','c_dieFace5','c_dieFace6'];
for(var c=0; c<6; c++){
	window[c_dieFace[c]]=[];
}
var p_dieFace=['p_dieFace1','p_dieFace2','p_dieFace3','p_dieFace4','p_dieFace5','p_dieFace6'];
for(var p=0; p<6; p++){
	window[p_dieFace[p]]=[];
}

var c_Result=[];var p_Result=[];
var p_zeroLocation=[];
var c_pairTieBreaker=[];var p_pairTieBreaker=[];

var rollCounter=0;var playCounter=0;

var playerWin=0;var computerWin=0;var draw=0;

Hide.replay();Disable.roll();Disable.keep();Disable.reroll();Enable.bet();Reset.rerollButtons();
centerNotice.innerHTML=('Place the Bet to Start!');



// when bet button is clicked, betting event happens then roll button becomes enabled
betButton.addEventListener('click',bettingStarts,true);
function bettingStarts(evt){
	if(playCounter%2==0){
		var betAmount=$('#betSlider').slider('value');
		if(betAmount==0){
			centerNotice.innerHTML=('Need More than $0!');
			evt.preventDefault();
		}else{
			currentPot.innerHTML=(totalPot+betAmount);
			totalPot=totalPot+betAmount;
			centerNotice.innerHTML=('You bet $'+betAmount+'!');
			playerMoney.innerHTML=(playerAmount-betAmount);
			playerAmount=playerAmount-betAmount;
			Disable.bet();bettingForm.reset();
			$('#betSlider').slider('value',0);$('#betSlider').slider('disable');
			setTimeout(function(){
				centerNotice.innerHTML=('Computer Calls your Bet!');
			},1000);
			setTimeout(function(){
				currentPot.innerHTML=(totalPot+betAmount);
				totalPot=totalPot+betAmount;
				computerMoney.innerHTML=(computerAmount-betAmount);
				computerAmount=computerAmount-betAmount;
				
				centerNotice.innerHTML=('Press Roll!');
				Enable.roll();
			},2500);
			evt.preventDefault();
		} // end of else
	} // end of if - when player bets first
	if(playCounter%2==1){
		var betAmount=$('#betSlider').slider('value');
		if(computerBet!==betAmount){
			centerNotice.innerHTML=('Please Match Computer\'s Bet!');
			evt.preventDefault();
		}
		if(computerBet==betAmount){
			currentPot.innerHTML=(totalPot+betAmount);
			centerNotice.innerHTML=('You bet $'+betAmount+'!');
			totalPot=totalPot+betAmount;
			playerMoney.innerHTML=(playerAmount-betAmount);
			playerAmount=playerAmount-betAmount;
			evt.preventDefault();
			Disable.bet();bettingForm.reset();
			$('#betSlider').slider('value',0);$('#betSlider').slider('disable');
			Disable.roll();Disable.keep();Disable.reroll();
			setTimeout(function(){
				centerNotice.innerHTML=('Computer\'s Rolling......');
			},1500);
			setTimeout(Computer.roll,1500);
			setTimeout(Computer.showInitialRoll,3000);
			setTimeout(Computer.displayResult,4500);
			setTimeout(function(){
				centerNotice.innerHTML=('You\'re Rolling......');
			},4500);
			setTimeout(Player.roll,4500);
			setTimeout(Player.showInitialRoll,6000);
			setTimeout(Player.displayResult,7500);
			function evenRoundsFirstReroll(){
				for(var i=0; i<5; i++){
					p_tempArray.push(p_diceRoll[i]);
				}
				centerNotice.innerHTML=('First Rerolling Phase!');
				Enable.roll();Enable.keep();Enable.reroll();Reset.rerollButtons();
				rerollButton1.addEventListener('click',Reroll.die1,true);
				rerollButton2.addEventListener('click',Reroll.die2,true);
				rerollButton3.addEventListener('click',Reroll.die3,true);
				rerollButton4.addEventListener('click',Reroll.die4,true);
				rerollButton5.addEventListener('click',Reroll.die5,true);
			} // end of evenRoundsDiceRolls function - when player goes second
			setTimeout(evenRoundsFirstReroll,7500);
		}
	} // end of if - computer bets first
} // end of bettingStarts function


// when roll button is clicked, generates player's and computer's roll
rollButton.addEventListener('click',generateDiceRolls,true);
function generateDiceRolls(){
	if(playCounter%2==0){
		rollCounter++;
		// player's first roll
		if(rollCounter==1){
			Disable.roll();Disable.keep();Disable.bet();Disable.reroll();
			// generate 5 dice rolls and add to p_diceRoll array
			centerNotice.innerHTML=('You\'re Rolling......');
			Player.roll();
			// displaying player's initial result
			setTimeout(Player.showInitialRoll,1500);
			// sorting and tallying, player's result then displaying player's hand
			setTimeout(Player.displayResult,3000);
			// starts computer's behaviour
			setTimeout(function(){
				centerNotice.innerHTML=('Computer\'s Rolling......');
			},4500);
			// computer rolls
			setTimeout(Computer.roll,4500);
			// shows computer's result	
			setTimeout(Computer.showInitialRoll,6000);
			// sorts and tallies computer's result then displays computer's hand
			setTimeout(Computer.displayResult,7500);
			// enables reroll buttons
			function enableFirstReroll(){
				for(var i=0; i<5; i++){
					p_tempArray.push(p_diceRoll[i]);
				}
				centerNotice.innerHTML=('First Rerolling Phase! Choose Dice You Don\'t Like to Reroll or Keep Your Hand!');
				Enable.roll();Enable.keep();Enable.reroll();Reset.rerollButtons();
				rerollButton1.addEventListener('click',Reroll.die1,true);
				rerollButton2.addEventListener('click',Reroll.die2,true);
				rerollButton3.addEventListener('click',Reroll.die3,true);
				rerollButton4.addEventListener('click',Reroll.die4,true);
				rerollButton5.addEventListener('click',Reroll.die5,true);
			} // end of enableFirstReroll function - when player goes first
			setTimeout(enableFirstReroll,7500);
		} // end of if - player's first roll
		// player's first reroll
		if(rollCounter==2){
			Reset.rerollButtons();Disable.roll();Disable.keep();Disable.bet();Disable.reroll();
			for(var c=0; c<6; c++){
				window[p_dieFace[c]].length=0;
			}
			for(var p=0; p<6; p++){
				window[c_dieFace[p]].length=0;
			}
			numReroll=0;
			for(var r=1; r<6; r++){
				if(p_diceRoll[r-1]==0){
					numReroll++;
				}
			} // end of for-loop - checks how many rerolls needed
			if(numReroll==0){
				rollCounter=1;
				centerNotice.innerHTML=('Click Reroll or Keep!');
				Enable.roll();Enable.keep();Enable.reroll();Reset.rerollButtons();
			}else{
				centerNotice.innerHTML=('Rerolling......')
				Player.reroll();
				setTimeout(Player.showReroll,1500);
				setTimeout(Player.displayResult,3000);
				setTimeout(function(){
					centerNotice.innerHTML=('Computer\'s Rerolling......');
				},4500);
				setTimeout(Computer.reroll,4500);
				setTimeout(Computer.showReroll,6000);
				setTimeout(Computer.displayResult,7500);
				function enableLastReroll(){
					p_tempArray.length=0;
					for(var i=0; i<5; i++){
						p_tempArray.push(p_diceRoll[i]);
					}
					centerNotice.innerHTML=('Last Rerolling Phase!');
					Enable.roll();Enable.keep();Enable.reroll();Reset.rerollButtons();
					rerollButton1.addEventListener('click',Reroll.die1,true);
					rerollButton2.addEventListener('click',Reroll.die2,true);
					rerollButton3.addEventListener('click',Reroll.die3,true);
					rerollButton4.addEventListener('click',Reroll.die4,true);
					rerollButton5.addEventListener('click',Reroll.die5,true);
				}
				setTimeout(enableLastReroll,7500);
			}
		} // end of if - player's first reroll
		// player's last reroll
		if(rollCounter==3){
			Reset.rerollButtons();Disable.roll();Disable.keep();Disable.bet();Disable.reroll();
			p_tempArray.length=0;p_zeroLocation.length=0;
			for(var p=0; p<6; p++){
				window[p_dieFace[p]].length=0;
			}
			for(var p=0; p<6; p++){
				window[c_dieFace[p]].length=0;
			}
			numReroll=0;
			for(var r=1; r<6; r++){
				if(p_diceRoll[r-1]==0){
					numReroll++;
				}
			}
			if(numReroll==0){
				rollCounter=2;
				centerNotice.innerHTML=('Click Reroll or Keep!');
				Enable.roll();Enable.keep();Enable.reroll();Reset.rerollButtons();
			}else{
				centerNotice.innerHTML=('Rerolling......');
				Player.reroll();
				setTimeout(Player.showReroll,1500);
				setTimeout(Player.displayResult,3000);
				setTimeout(function(){
					centerNotice.innerHTML=('Computer\'s Rerolling......');
				},4500);
				setTimeout(Computer.reroll,4500);
				setTimeout(Computer.showReroll,6000);
				setTimeout(Computer.displayResult,7500);
				setTimeout(Show.whowins,8000);
				setTimeout(Show.replay,8500);
			}
		} // end of if - player's last reroll
	} // end of odd rounds - player goes first
	//even rounds - computer goes first
	if(playCounter%2==1){
		rollCounter++
		// computer and player's first reroll - computer goes first
		if(rollCounter==1){
			Reset.rerollButtons();Disable.roll();Disable.keep();Disable.bet();Disable.reroll();
			for(var p=0; p<6; p++){
				window[c_dieFace[p]].length=0;
			}
			for(var c=0; c<6; c++){
				window[p_dieFace[c]].length=0;
			}
			numReroll=0;
			for(var r=1; r<6; r++){
				if(p_diceRoll[r-1]==0){
					numReroll++;
				}
			}
			if(numReroll==0){
				rollCounter=1;
				centerNotice.innerHTML=('Click Reroll or Keep!');
				Enable.roll();Enable.keep();Enable.reroll();Reset.rerollButtons();
			}else{
				centerNotice.innerHTML=('Computer\'s Rerolling......');
				Computer.reroll();
				setTimeout(Computer.showReroll,1500);
				setTimeout(Computer.displayResult,3000);
				setTimeout(function(){
					centerNotice.innerHTML=('You\'re Rerolling......');
				},4500);
				setTimeout(Player.reroll,4500);
				setTimeout(Player.showReroll,6000);
				setTimeout(Player.displayResult,7500);
				function evenRoundsLastRoll(){
					p_tempArray.length=0;
					for(var i=0; i<5; i++){
						p_tempArray.push(p_diceRoll[i]);
					}
					centerNotice.innerHTML=('Last Rerolling Phase!');
					Enable.roll();Enable.keep();Enable.reroll();Reset.rerollButtons();
					rerollButton1.addEventListener('click',Reroll.die1,true);
					rerollButton2.addEventListener('click',Reroll.die2,true);
					rerollButton3.addEventListener('click',Reroll.die3,true);
					rerollButton4.addEventListener('click',Reroll.die4,true);
					rerollButton5.addEventListener('click',Reroll.die5,true);
				}
				setTimeout(evenRoundsLastRoll,7500);
			}
		} // end of if - computer and player's first reroll
		// computer and player's last reroll - computer goes first
		if(rollCounter==2){
			Reset.rerollButtons();Disable.roll();Disable.keep();Disable.bet();Disable.reroll();
			p_tempArray.length=0;p_zeroLocation.length=0;
			for(var p=0; p<6; p++){
				window[c_dieFace[p]].length=0;
			}
			for(var c=0; c<6; c++){
				window[p_dieFace[c]].length=0;
			}
			numReroll=0;
			for(var r=1; r<6; r++){
				if(p_diceRoll[r-1]==0){
					numReroll++;
				}
			}
			if(numReroll==0){
				rollCounter=2;
				centerNotice.innerHTML=('Click Reroll or Keep!');
				Enable.roll();Enable.keep();Enable.reroll();Reset.rerollButtons();
			}else{
				centerNotice.innerHTML=('Computer\'s Rerolling......');
				Computer.reroll();
				setTimeout(Computer.showReroll,1500);
				setTimeout(Computer.displayResult,3000);
				setTimeout(function(){
					centerNotice.innerHTML=('You\'re Rerolling......');
				},4500);
				setTimeout(Player.reroll,4500);
				setTimeout(Player.showReroll,6000);
				setTimeout(Player.displayResult,7500);
				setTimeout(Show.whowins,8000);
				setTimeout(Show.replay,8500);
			}
		} // end of if - computer and player's last reroll
	}
} // end of generateDiceRolls function



// when player is satisfied with his/her hand
keepButton.addEventListener('click',displayRank,true);
function displayRank(){
	Reset.rerollButtons();Disable.roll();Disable.keep();Disable.bet();Disable.reroll();
	// odd rounds - when players keeps
	if(playCounter%2==0){
		if(rollCounter==1){
			for(var p=0; p<6; p++){
				window[c_dieFace[p]].length=0;
			}
			centerNotice.innerHTML=('Computer\'s Rerolling......');
			Computer.reroll();
			setTimeout(Computer.showReroll,100);
			setTimeout(Computer.displayResult,1200);
			setTimeout(function(){
				for(var p=0; p<6; p++){
					window[c_dieFace[p]].length=0;
				}
			},1300);
			setTimeout(Computer.reroll,1300);
			setTimeout(Computer.showReroll,1400);
			setTimeout(Computer.displayResult,2500);
			// displays who win the game	
			setTimeout(Show.whowins,2600);
			// displays replay message	
			setTimeout(Show.replay,2600);
		} // end of if rollCounter==1(player keeps on the first turn) then computer rerolls twice
		if(rollCounter==2){
			for(var p=0; p<6; p++){
				window[c_dieFace[p]].length=0;
			}
			centerNotice.innerHTML=('Computer\'s Rerolling......');
			Computer.reroll();
			setTimeout(Computer.showReroll,100);
			setTimeout(Computer.displayResult,1200);
			setTimeout(Show.whowins,1300);
			setTimeout(Show.replay,1300);
		} // end of if rollCounter==2 (player keeps on the second turn) then computer rerolls once
	} // end of if - odd rounds when players keeps on the first turn
	// even rounds - when players keeps
	if(playCounter%2==1){
		if(rollCounter==0){
			for(var p=0; p<6; p++){
				window[c_dieFace[p]].length=0;
			}
			centerNotice.innerHTML=('Computer\'s Rerolling......');
			Computer.reroll();
			setTimeout(Computer.showReroll,100);
			setTimeout(Computer.displayResult,1200);
			setTimeout(function(){
				for(var p=0; p<6; p++){
					window[c_dieFace[p]].length=0;
				}
			},1300);
			setTimeout(Computer.reroll,1300);
			setTimeout(Computer.showReroll,1400);
			setTimeout(Computer.displayResult,2500);
			setTimeout(Show.whowins,2600);
			setTimeout(Show.replay,2600);
		} // end of if rollCounter==0(player keeps on the first turn, even rounds) then computer rerolls twice
		if(rollCounter==1){
			for(var p=0; p<6; p++){
				window[c_dieFace[p]].length=0;
			}
			centerNotice.innerHTML=('Computer\'s Rerolling......');
			Computer.reroll();
			setTimeout(Computer.showReroll,100);
			setTimeout(Computer.displayResult,1200);
			setTimeout(Show.whowins,1300);
			setTimeout(Show.replay,1300);
		} // end of if rollCounter==1(player keeps on the second turn, even rounds) then computer rerolls twice
	} // end of if - even rounds
} // end of displayRank function



// when player wants to continue the game
replayYesButton.addEventListener('click',yesReplay,true)
function yesReplay(){
	playCounter++;
	for(var i=1; i<6; i++){
		document.getElementById('dieImage_p'+i).src='images/empty.gif';
	}
	for(var i=1; i<6; i++){
		document.getElementById('dieImage_c'+i).src='images/empty.gif';
	}
	rollCounter=0;Reset.everyArray();Hide.replay();
	centerNotice.innerHTML=('');playerHand.innerHTML=('');computerHand.innerHTML=('');
	// this part changes the maximum betting amount
	if(playerAmount<computerAmount){
		$('#betSlider').slider('option','max',playerAmount);
	}
	if(playerAmount>computerAmount){
		$('#betSlider').slider('option','max',computerAmount);
	}
	if(playerAmount==computerAmount){
		$('#betSlider').slider('option','max',200);
	}
	// end of maximum betting amount change
	// on odd rounds, player goes first
	if(playCounter%2==0){
		centerNotice.innerHTML=('Place the Bet!');
		$('#betSlider').slider('enable');
		Enable.bet();
		computerBet=null;
	} // end of if - from third round and onward player start message
	// on even rounds, computer starts first
	if(playCounter%2==1){
		if(playerAmount==computerAmount){
			Computer.bet30();
		} // if player and computer have same amount of money
		if(playerAmount>computerAmount){
			if(playerAmount>300){
				Computer.bet10();
			}
			if(playerAmount>200 && playerAmount<310){
				Computer.bet20();
			}
		} // if player has more money
		if(playerAmount<computerAmount){
			if(computerAmount>200 && computerAmount<280){
				Computer.bet40();
			}
			if(computerAmount>270 && computerAmount<350){
				Computer.bet60();
			}
			if(computerAmount>340){
				Computer.killPlayer();
			}
		} // if computer has more money
		$('#betSlider').slider('enable');
		Enable.bet();
	} // end of if - computer goes first
} // end of replay function



// when player wants to quit the game
replayNoButton.addEventListener('click',exitGame,true)
function exitGame(){
	Hide.replay();
	centerNotice.innerHTML=('Have a Nice Day!');
} // end of exit function



// when player checks his/her win/loss/draw stat
playerStatButton.addEventListener('click',displayStat,true);
function displayStat(){
	centerNotice.innerHTML=(playerWin+' Win(s) / '+computerWin+' Loss(es) / '+draw+' Draw(s)');
}

