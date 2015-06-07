//JavaScript Document

// Alt+2 to collapse
// Alt+Shift+2 to uncollapse

var Computer={
	displayResult: function(){ // Computer.displayResult();
		// sort
		c_Result.length=0;
		c_diceRoll.sort(function(a,b){return a-b});
		for(var s1=1; s1<6; s1++){
			for(var s2=1; s2<7; s2++){
				if(c_diceRoll[s1-1]==s2){
					document.getElementById('dieImage_c'+s1).src=diceImageSet[s2-1].src;
				} // end of if
			} // end of for-loop s2
		} // end of for-loop s1
		// tally
		for(var t1=0; t1<5; t1++){
			for(var t2=1; t2<7; t2++){
				if(c_diceRoll[t1]==t2){
					window[c_dieFace[t2-1]].push(t2);
				} // end of if
			} // end of for-loop t2
		} // end of for-loop t1
		for(var i=0; i<6; i++){
			c_Result.push(window[c_dieFace[i]].length);
		} // end of for-loop i
		// display rank
		var c_ones=0;
		for(var h=1; h<7; h++){ // h for computer's hand first-search
			// five of a kind
			if(c_Result[h-1]==5){
				computerHand.innerHTML=('Five of a Kind! Five '+h+'s.');
				computerScore=500+h;
			} // end of if - 5k
			// four of a kind
			if(c_Result[h-1]==4){
				computerHand.innerHTML=('Four of a Kind! Four '+h+'s.');
				computerScore=400+h;
				ctb4k=c_Result.indexOf(1);
			} // end of if - 4k
			// three of a kind & full house
			if(c_Result[h-1]==3){
				var cfH=c_Result.indexOf(2); // computer's full house search
				if(cfH==-1){
					computerHand.innerHTML=('Three of a Kind! Three '+h+'s.');
					computerScore=100+h;
					ctb3kh=c_Result.lastIndexOf(1);
					ctb3kl=c_Result.indexOf(1);
				}else{
					computerHand.innerHTML=('Full House! '+h+' over '+(cfH+1)+'.');
					computerScore=300+h;
					ctbfh=cfH+1;
				}
			} // end of if - 3k & fh
			// pair
			if(c_Result[h-1]==2){
				c_pairTieBreaker.length=0;
				var cbigPair=c_Result.lastIndexOf(2);
				var csmallPair=c_Result.indexOf(2);
				if(cbigPair==csmallPair){
					if(c_Result.indexOf(3)==-1){
						computerHand.innerHTML=('One Pair! Two '+h+'s.');
						computerScore=h;
						for(var p=6; p>0; p--){
							if(window[c_dieFace[p-1]].length==1){
								c_pairTieBreaker.push(p);
							}
						}
						c_pairTieBreaker.sort(function(a,b){return a-b});
						c1ph=c_pairTieBreaker[2];
						c1pm=c_pairTieBreaker[1];
						c1pl=c_pairTieBreaker[0];
					} 
				} // end of one pair search
				if(cbigPair!==csmallPair){
					computerHand.innerHTML=('Two Pairs! '+(cbigPair+1)+' over '+(csmallPair+1)+'.');
					computerScore=parseFloat(String(cbigPair+1)+String(csmallPair+1));
					ctb2p=c_Result.indexOf(1);
					break;
				} // end of two pair search
			} // end of if - pair
			// nothing & straight
			if(c_Result[h-1]==1){
				if(c_ones<5){
					c_ones++;
				}
				if(c_ones==5){
					if(c_Result[5]==0){
						computerHand.innerHTML=('Five High Straight! 1, 2, 3, 4, and 5.');
						computerScore=215;
						break;
					} // end of five high straight search
					if(c_Result[0]==0){
						computerHand.innerHTML=('Six High Straight! 2, 3, 4, 5, and 6.');
						computerScore=226;
					} // end of six high straight search
					else{ 
						computerHand.innerHTML=('NOTHING!');
						if(c_Result.indexOf(0)==1){
							computerScore=-1;
						}
						if(c_Result.indexOf(0)==2){
							computerScore=-2;
						}
						if(c_Result.indexOf(0)==3){
							computerScore=-3;
						}
						if(c_Result.indexOf(0)==4){
							computerScore=-4;
						}
					} // end of NOTHING search
				}
			} // end of if - nothing & straight
		} // end of for-loop h
	}, // sorts, tallies, and displays computer's initial dice roll
	roll: function(){ // Computer.roll();
		for(var r=1; r<6; r++){
			var computerDieRoll=Math.floor(Math.random()*6)+1;
			c_diceRoll.push(computerDieRoll);
			document.getElementById('dieImage_c'+r).src='images/rolling.gif';
		} // end of for-loop r
	}, // computer's initial dice roll
	showInitialRoll: function(){ // Computer.showInitialRolls();
		for(var r=1; r<7; r++){
			(function(r){
				setTimeout(function(){
					for(var d=1; d<7; d++){
						if(c_diceRoll[r-1]==d){
							document.getElementById('dieImage_c'+r).src=diceImageSet[(d-1)].src;
						}
					} // end of for-loop d
				},200*r);
			}(r));
		} // end of for-loop r
	}, // shows correct dieface image to corresponding number
	reroll: function(){ // Computer.reroll();
		if(computerScore<0){
			document.getElementById('dieImage_c1').src='images/rolling.gif';
		} // end of if - computer has nothing and goes for 6 high straight
		if(computerScore>0 && computerScore<7){
			for(var i=0; i<3; i++){
				for(var n=0; n<5; n++){
					if(c_pairTieBreaker[i]==c_diceRoll[n]){
						document.getElementById('dieImage_c'+(n+1)).src='images/rolling.gif';
					} // end of if - computer finds correct 3 non-pair related dice
				} // end of for-loop n
			} // end of for-loop i
		} // end of if - computer has one pair and finds the other 3 non-pair related dice
		if(computerScore>11 && computerScore<66){
			for(var i=0; i<5; i++){
				if(c_diceRoll[i]==(c_Result.indexOf(1)+1)){
					document.getElementById('dieImage_c'+(i+1)).src='images/rolling.gif';
				} // end of if - computer finds correct leftover die
			} // end of for-loop i
		} // end of if - computer has two pairs and finds the leftover die
		if(computerScore>100 && computerScore<107){
			for(var i=0; i<5; i++){
				if(c_diceRoll[i]==(c_Result.indexOf(1)+1)){
					document.getElementById('dieImage_c'+(i+1)).src='images/rolling.gif';
				} // end of if - computer finds correct 2 leftover dice
				if(c_diceRoll[i]==(c_Result.lastIndexOf(1)+1)){
					document.getElementById('dieImage_c'+(i+1)).src='images/rolling.gif';
				} // end of if - computer finds correct 2 leftover dice
			} // end of for-loop i
		} // end of if - computer has three of a kind and finds the 2 leftover dice
		if(computerScore==215 || computerScore==226){
			centerNotice.innerHTML=('Computer is Happy with his/her Roll!');
		} // end of if - computer has 5/6 high straights and keeps
		if(computerScore>300 && computerScore<307){
			centerNotice.innerHTML=('Computer is Happy with his/her Roll!');
		} // end of if - computer has full house and keeps
		if(computerScore>400 && computerScore<407){
			centerNotice.innerHTML=('Computer is Happy with his/her Roll!');
		} // end of if - computer has four of a kind and keeps
		if(computerScore>500 && computerScore<507){
			centerNotice.innerHTML=('Computer is Happy with his/her Roll!');
		} // end of if - computer has five of a kind and keeps
	}, 
	showReroll: function(){ // Computer.showReroll();
		if(computerScore<0){
			computerReroll=Math.floor(Math.random()*6)+1;
			c_diceRoll.splice(0,1,computerReroll);
			document.getElementById('dieImage_c1').src=diceImageSet[computerReroll-1].src;
		} // end of if - computer always rerolls 1 if he has nothing
		if(computerScore>0 && computerScore<7){
			for(var i=0; i<3; i++){
				(function(i){
					setTimeout(function(){
						computerReroll=Math.floor(Math.random()*6)+1;
						for(var n=0; n<5; n++){
							if(c_pairTieBreaker[i]==c_diceRoll[n]){
								c_diceRoll.splice(n,1,computerReroll);
								document.getElementById('dieImage_c'+(n+1)).src=diceImageSet[computerReroll-1].src;
							} // end of if - computer rolls correct 3 non-pair related dice
						} // end of for-loop n
					},200*(i+1));
				}(i));
			} // end of for-loop i
		} // end of if - computer has one pair and finds the other 3 non-pair related dice
		if(computerScore>11 && computerScore<66){
			computerReroll=Math.floor(Math.random()*6)+1;
			for(var i=0; i<5; i++){
				if(c_diceRoll[i]==(c_Result.indexOf(1)+1)){
					c_diceRoll.splice(i,1,computerReroll);
					document.getElementById('dieImage_c'+(i+1)).src=diceImageSet[computerReroll-1].src;
				} // end of if - computer finds correct leftover die
			} // end of for-loop i
		} // end of if - computer has two pairs and find the leftover die
		if(computerScore>100 && computerScore<107){
			setTimeout(function(){
				for(var i=0; i<5; i++){
					if(c_diceRoll[i]==(c_Result.indexOf(1)+1)){
						computerReroll=Math.floor(Math.random()*6)+1;
						c_diceRoll.splice(i,1,computerReroll);
						document.getElementById('dieImage_c'+(i+1)).src=diceImageSet[computerReroll-1].src;
					} // end of if - computer finds correct 2 leftover dice
				} // end of for-loop 
			},200); // end of setTimeout 100
			setTimeout(function(){
				for(var i=0; i<5; i++){
					if(c_diceRoll[i]==(c_Result.lastIndexOf(1)+1)){
						computerReroll=Math.floor(Math.random()*6)+1;
						c_diceRoll.splice(i,1,computerReroll);
						document.getElementById('dieImage_c'+(i+1)).src=diceImageSet[computerReroll-1].src;
					} // end of if - computer finds correct 2 leftover dice
				} // end of for-loop
			},200); // end of setTimeout 200
		} // end of if - computer has three of a kind and finds the 2 leftover dice
		if(computerScore==215 || computerScore==226){
			centerNotice.innerHTML=('Computer Keeps!');
		} // end of if - computer has 5/6 high straights and keeps
		if(computerScore>300 && computerScore<307){
			centerNotice.innerHTML=('Computer Keeps!');
		} // end of if - computer has full house and keeps
		if(computerScore>400 && computerScore<407){
			centerNotice.innerHTML=('Computer Keeps!');
		} // end of if - computer has four of a kind and keeps
		if(computerScore>500 && computerScore<507){
			centerNotice.innerHTML=('Computer Keeps!');
		} // end of if - computer has five of a kind and keeps
	},
	bet10: function(){ // Computer.bet10();
		computerBet=10;
		centerNotice.innerHTML=('Computer bets $10!');
		currentPot.innerHTML=(totalPot+10);
		totalPot=totalPot+10;
		computerMoney.innerHTML=(computerAmount-10);
		computerAmount=computerAmount-10;
	},
	bet20: function(){ // Computer.bet20();
		computerBet=20;
		centerNotice.innerHTML=('Computer bets $20!');
		currentPot.innerHTML=(totalPot+20);
		totalPot=totalPot+20;
		computerMoney.innerHTML=(computerAmount-20);
		computerAmount=computerAmount-20;
	},
	bet30: function(){ // Computer.bet30();
		computerBet=30;
		centerNotice.innerHTML=('Computer bets $30!');
		currentPot.innerHTML=(totalPot+30);
		totalPot=totalPot+30;
		computerMoney.innerHTML=(computerAmount-30);
		computerAmount=computerAmount-30;
	},
	bet40: function(){ // Computer.bet40();
		computerBet=40;
		centerNotice.innerHTML=('Computer bets $40!');
		currentPot.innerHTML=(totalPot+40);
		totalPot=totalPot+40;
		computerMoney.innerHTML=(computerAmount-40);
		computerAmount=computerAmount-40;
	},
	bet60: function(){ // Computer.bet60();
		computerBet=60;
		centerNotice.innerHTML=('Computer bets $60!');
		currentPot.innerHTML=(totalPot+60);
		totalPot=totalPot+60;
		computerMoney.innerHTML=(computerAmount-60);
		computerAmount=computerAmount-60;
	},
	killPlayer: function(){ // Computer.killPlayer();
		computerBet=playerAmount;
		centerNotice.innerHTML=('Computer bets $'+playerAmount+'!');
		currentPot.innerHTML=(totalPot+playerAmount);
		totalPot=totalPot+playerAmount;
		computerMoney.innerHTML=(computerAmount-playerAmount);
		computerAmount=computerAmount-playerAmount;
	}
};


var Disable={
	bet: function(){ // Disable.bet();
		document.getElementById('betYourMoney').disabled=true;
	},
	reroll: function(){ // Disable.reroll();
		for(var i=1; i<6; i++){ 
			document.getElementById('reroll'+i).disabled=true;
		}
	},
	keep: function(){ // Disable.keep();
		document.getElementById('pressKeep').disabled=true;
	},
	roll: function(){ // Disable.roll();
		document.getElementById('pressRoll').disabled=true;
	}
}; // disables buttons


var Enable={
	bet: function(){ // Enable.bet();
		document.getElementById('betYourMoney').disabled=false;
	},
	reroll: function(){ // Enable.reroll();
		for(var i=1; i<6; i++){
			document.getElementById('reroll'+i).disabled=false;
		}
	},
	keep: function(){ // Enable.keep();
		document.getElementById('pressKeep').disabled=false;
	},
	roll: function(){ // Enable.roll();
		document.getElementById('pressRoll').disabled=false;
	}
}; // enables buttons


var Hide={
	replay: function(){ // Hide.replay();
		document.getElementById('replayYes').style.visibility="hidden";
		document.getElementById('replayNo').style.visibility="hidden";
		document.getElementById('replayYes').disabled=true;
		document.getElementById('replayNo').disabled=true;
	} 
}; // hides replay message


var Player={
	displayResult: function(){ // Player.displayResult();
		// sort
		p_Result.length=0;
		p_diceRoll.sort(function(a,b){return a-b});
		for(var s1=1; s1<6; s1++){
			for(var s2=1; s2<7; s2++){
				if(p_diceRoll[s1-1]===s2){
					document.getElementById('dieImage_p'+s1).src=diceImageSet[s2-1].src;
				} // end of if
			} // end of for-loop s2
		} // end of for-loop s1
		// tally
		for(var t1=0; t1<5; t1++){
			for(var t2=1; t2<7; t2++){
				if(p_diceRoll[t1]==t2){
					window[p_dieFace[t2-1]].push(t2);
				} // end of if
			} // end of for-loop t2
		} // end of for-loop t1
		for(var i=0; i<6; i++){
			p_Result.push(window[p_dieFace[i]].length);
		}
		// display rank
		var p_ones=0; // resets ones for nothing & straight hand
		for(var h=1; h<7; h++){
			// five of a kind
			if(p_Result[h-1]==5){
				playerHand.innerHTML=('Five of a Kind! Five '+h+'s.');
				playerScore=500+h;
			} // end of if - 5k
			// four of a kind
			if(p_Result[h-1]==4){
				playerHand.innerHTML=('Four of a Kind! Four '+h+'s.');
				playerScore=400+h;
				ptb4k=p_Result.indexOf(1);
			} // end of if - 4k
			// three of a kind & full house
			if(p_Result[h-1]==3){
				var fH=p_Result.indexOf(2);
				if(fH==-1){
					playerHand.innerHTML=('Three of a Kind! Three '+h+'s.');
					playerScore=100+h;
					ptb3kh=p_Result.lastIndexOf(1);
					ptb3kl=p_Result.indexOf(1);
				}else{
					playerHand.innerHTML=('Full House! '+h+' over '+(fH+1)+'.');
					playerScore=300+h;
					ptbfh=fH+1;
				}
			} // end of if - 3k & fh
			// pair
			if(p_Result[h-1]==2){
				p_pairTieBreaker.length=0;
				var bigPair=p_Result.lastIndexOf(2);
				var smallPair=p_Result.indexOf(2);
				if(bigPair==smallPair){
					if(p_Result.indexOf(3)==-1){
						playerHand.innerHTML=('One Pair! Two '+h+'s.');
						playerScore=h;
						for(var t=6; t>0; t--){
							if(window[p_dieFace[t-1]].length==1){
								p_pairTieBreaker.push(t);
							}
						}
						p_pairTieBreaker.sort(function(a,b){return a-b});
						p1ph=p_pairTieBreaker[2];
						p1pm=p_pairTieBreaker[1];
						p1pl=p_pairTieBreaker[0];
						} 
				} // end of one pair search
				if(bigPair!==smallPair){
					playerHand.innerHTML=('Two Pairs! '+(bigPair+1)+' over '+(smallPair+1)+'.');
					playerScore=parseFloat(String(bigPair+1)+String(smallPair+1));
					ptb2p=p_Result.indexOf(1);
					break;
				} // end of two pair search
			} // end of if - pair
			// nothing & straight
			if(p_Result[h-1]==1){
				if(p_ones<5){
					p_ones++;
				} // end of if - p_ones<5
				if(p_ones==5){
					if(p_Result[5]==0){
						playerHand.innerHTML=('Five High Straight! 1, 2, 3, 4, and 5.');
						playerScore=215;
						break;
					} // end of five straight search
					if(p_Result[0]==0){
						playerHand.innerHTML=('Six High Straight! 2, 3, 4, 5, and 6.');
						playerScore=226;
						break;
					} // end of six high straight search
					else{ 
						playerHand.innerHTML=('NOTHING!');
						if(p_Result.indexOf(0)==1){
							playerScore=-1;
						}
						if(p_Result.indexOf(0)==2){
							playerScore=-2;
						}
						if(p_Result.indexOf(0)==3){
							playerScore=-3;
						}
						if(p_Result.indexOf(0)==4){
							playerScore=-4;
						}
					} // end of NOTHING search
				} // end of if - p_ones===5
			} // end of if - nothing & straight
		} // end of for-loop h
	}, // sorts, tallies and displays player's initial dice roll
	roll: function(){ // Player.roll();
		for(var r=1; r<6; r++){
			var dieRoll=Math.floor(Math.random()*6)+1;
			p_diceRoll.push(dieRoll);
			document.getElementById('dieImage_p'+r).src='images/rolling.gif';
		} // end of for-loop r
	}, // player's initial dice roll
	showInitialRoll: function(){ // Player.showInitialRolls();
		for(var r=1; r<7; r++){
			(function(r){
				setTimeout(function(){
					for(var d=1; d<7; d++){
						if(p_diceRoll[r-1]==d){
							document.getElementById('dieImage_p'+r).src=diceImageSet[(d-1)].src;
						}
					} // end of for-loop d
				},200*r);
			}(r));
		} // end of for-loop r
	}, // shows correct dieface image to corresponding number
	reroll: function(){ // Player.roll2();
		for(var i=1; i<6; i++){
			if(p_diceRoll[i-1]==0){
				document.getElementById('dieImage_p'+i).src='images/rolling.gif';
			}
		} // end of for-loop i
	}, // player's first reroll
	showReroll: function(){ // Player.showFirstRerolls();
		for(var r=0; r<5; r++){
			if(p_diceRoll[r]==0){
				p_zeroLocation.push(r);
			}
		} // end of for-loop - counts all the zeros and determine the number of rerolls
		if(p_zeroLocation.length==1){
			turn2PlayerRoll=Math.floor(Math.random()*6)+1;
			p_diceRoll.splice(p_zeroLocation[0],1,turn2PlayerRoll);
			document.getElementById('dieImage_p'+(p_zeroLocation[0]+1)).src=diceImageSet[turn2PlayerRoll-1].src;
		} // end of if - 1 rerolls
		if(p_zeroLocation.length==2){
			for(var l=1; l<3; l++){
				(function(l){
					setTimeout(function(){
						turn2PlayerRoll=Math.floor(Math.random()*6)+1;
						p_diceRoll.splice(p_zeroLocation[l-1],1,turn2PlayerRoll);
						document.getElementById('dieImage_p'+(p_zeroLocation[l-1]+1)).src=diceImageSet[turn2PlayerRoll-1].src;
					},200*l);
				}(l));
			}
		} // end of if - 2 rerolls
		if(p_zeroLocation.length==3){
			for(var l=1; l<4; l++){
				(function(l){
					setTimeout(function(){
						turn2PlayerRoll=Math.floor(Math.random()*6)+1;
						p_diceRoll.splice(p_zeroLocation[l-1],1,turn2PlayerRoll);
						document.getElementById('dieImage_p'+(p_zeroLocation[l-1]+1)).src=diceImageSet[turn2PlayerRoll-1].src;
					},200*l);
				}(l));
			}
		} // end of if - 3 rerolls
		if(p_zeroLocation.length==4){
			for(var l=1; l<5; l++){
				(function(l){
					setTimeout(function(){
						turn2PlayerRoll=Math.floor(Math.random()*6)+1;
						p_diceRoll.splice(p_zeroLocation[l-1],1,turn2PlayerRoll);
						document.getElementById('dieImage_p'+(p_zeroLocation[l-1]+1)).src=diceImageSet[turn2PlayerRoll-1].src;
					},200*l);
				}(l));
			}
		} // end of if - 4 rerolls
		if(p_zeroLocation.length==5){
			for(var l=1; l<6; l++){
				(function(l){
					setTimeout(function(){
						turn2PlayerRoll=Math.floor(Math.random()*6)+1;
						p_diceRoll.splice(p_zeroLocation[l-1],1,turn2PlayerRoll);
						document.getElementById('dieImage_p'+(p_zeroLocation[l-1]+1)).src=diceImageSet[turn2PlayerRoll-1].src;
					},200*l);
				}(l));
			}
		} // end of if - 5 rerolls
	} // this is to determine which die needs to be rerolled and correctly display die images
};


var Reroll={
	die1: function(){ // Reroll1.die1();
		rerollClickCounter1++;
		if(rerollClickCounter1%2==0){
			document.getElementById('reroll1').innerHTML=('Reroll');
			p_diceRoll[0]=p_tempArray[0];
		}
		if(rerollClickCounter1%2==1){
			document.getElementById('reroll1').innerHTML=('Keep');
			p_diceRoll[0]=0;
		}
	},
	die2: function(){ // Reroll1.die2();
		rerollClickCounter2++;
		if(rerollClickCounter2%2==0){
			document.getElementById('reroll2').innerHTML=('Reroll');
			p_diceRoll[1]=p_tempArray[1];
		}
		if(rerollClickCounter2%2==1){
			document.getElementById('reroll2').innerHTML=('Keep');
			p_diceRoll[1]=0;
		}
	},
	die3: function(){ // Reroll1.die3();
		rerollClickCounter3++;
		if(rerollClickCounter3%2==0){
			document.getElementById('reroll3').innerHTML=('Reroll');
			p_diceRoll[2]=p_tempArray[2];
		}
		if(rerollClickCounter3%2==1){
			document.getElementById('reroll3').innerHTML=('Keep');
			p_diceRoll[2]=0;
		}
	},
	die4: function(){ // Reroll1.die4();
		rerollClickCounter4++;
		if(rerollClickCounter4%2==0){
			document.getElementById('reroll4').innerHTML=('Reroll');
			p_diceRoll[3]=p_tempArray[3];
		}
		if(rerollClickCounter4%2==1){
			document.getElementById('reroll4').innerHTML=('Keep');
			p_diceRoll[3]=0;
		}
	},
	die5: function(){ // Reroll1.die5();
		rerollClickCounter5++;
		if(rerollClickCounter5%2==0){
			document.getElementById('reroll5').innerHTML=('Reroll');
			p_diceRoll[4]=p_tempArray[4];
		}
		if(rerollClickCounter5%2==1){
			document.getElementById('reroll5').innerHTML=('Keep');
			p_diceRoll[4]=0;
		}
	}
};
var Reset={
	everyArray: function(){ // Reset.everyArray();
		c_diceRoll.length=0;
		p_diceRoll.length=0;
		p_tempArray.length=0;
		for(var c=0; c<6; c++){
			window[c_dieFace[c]].length=0;
		}
		for(var p=0; p<6; p++){
			window[p_dieFace[p]].length=0;
		}
		c_Result.length=0;
		p_Result.length=0;
		p_zeroLocation.length=0;
		c_pairTieBreaker.length=0;
		p_pairTieBreaker.length=0;
	}, // resets every array
	rerollButtons: function(){ // Reset.rerollbuttons();
		rerollClickCounter1=0;
		rerollClickCounter2=0;
		rerollClickCounter3=0;
		rerollClickCounter4=0;
		rerollClickCounter5=0;
		document.getElementById('reroll1').innerHTML=('Reroll');
		document.getElementById('reroll2').innerHTML=('Reroll');
		document.getElementById('reroll3').innerHTML=('Reroll');
		document.getElementById('reroll4').innerHTML=('Reroll');
		document.getElementById('reroll5').innerHTML=('Reroll');
	} // resets all rerollButtons
};


var Show={
	replay: function(){ // Show.replay();
		if(computerAmount==0){
			centerNotice.innerHTML=('Congratulations! You Beat the Computer!');
			Disable.roll();Disable.keep();Disable.reroll();Disable.bet();bettingForm.reset();
			$('#betSlider').slider('value',0);$('#betSlider').slider('disable');
		}
		if(playerAmount==0){
			centerNotice.innerHTML=('Computer Beat You! Better Luck Next Time!');
			Disable.roll();Disable.keep();Disable.reroll();Disable.bet();bettingForm.reset();
			$('#betSlider').slider('value',0);$('#betSlider').slider('disable');
		}
		if(playerAmount!==0 && computerAmount!==0){
			document.getElementById('replayYes').style.visibility="visible";
			document.getElementById('replayNo').style.visibility="visible";
			document.getElementById('replayYes').disabled=false;
			document.getElementById('replayNo').disabled=false;
		}
	}, // shows replay message
	whowins: function(){ // Show.whowins();
		// determines who wins the game
		if(playerScore>computerScore){
			centerNotice.innerHTML=('You Win the Round!');
			playerWin++;
			playerAmount=playerAmount+totalPot;
			playerMoney.innerHTML=(playerAmount);
			bettingMax=playerAmount;
			totalPot=0;
			currentPot.innerHTML=(0);
		} // general player winning condition
		if(playerScore<computerScore){
			centerNotice.innerHTML=('Computer Wins the Round!');
			computerWin++;
			computerAmount=computerAmount+totalPot;
			computerMoney.innerHTML=(computerAmount);
			totalPot=0;
			currentPot.innerHTML=(0);
		} // general computer winning condition
		if(playerScore==computerScore){
			if(playerScore>500 && computerScore>500){
				centerNotice.innerHTML=('It\'s a Draw!');
				draw++;
			} // if player and computer has same 5 of a kind
			if(playerScore>400 && computerScore>400 && playerScore<407 && computerScore<407){
				if(ptb4k>ctb4k){
					centerNotice.innerHTML=('You Win the Round!');
					playerWin++;
					playerAmount=playerAmount+totalPot;
					playerMoney.innerHTML=(playerAmount);
					bettingMax=playerAmount;
					totalPot=0;
					currentPot.innerHTML=(0);
				}
				if(ptb4k<ctb4k){
					centerNotice.innerHTML=('Computer Wins the Round!');
					computerWin++;
					computerAmount=computerAmount+totalPot;
					computerMoney.innerHTML=(computerAmount);
					totalPot=0;
					currentPot.innerHTML=(0);
				}
				if(ptb4k==ctb4k){
					centerNotice.innerHTML=('It\'s a Draw!');
					draw++;
				}
			} // if player and computer has same 4 of a kind
			if(playerScore>300 && computerScore>300 && playerScore<307 && computerScore<307){
				if(ptbfh>ctbfh){
					centerNotice.innerHTML=('You Win the Round!');
					playerWin++;
					playerAmount=playerAmount+totalPot;
					playerMoney.innerHTML=(playerAmount);
					bettingMax=playerAmount;
					totalPot=0;
					currentPot.innerHTML=(0);
				}
				if(ptbfh<ctbfh){
					centerNotice.innerHTML=('Computer Wins the Round!');
					computerWin++;
					computerAmount=computerAmount+totalPot;
					computerMoney.innerHTML=(computerAmount);
					totalPot=0;
					currentPot.innerHTML=(0);
				}
				if(ptbfh==ctbfh){
					centerNotice.innerHTML=('It\'s a Draw!');
					draw++;
				}
			} // if player and computer has same full house
			
			if(playerScore==226 && computerScore==226){
				centerNotice.innerHTML=('It\'s a Draw!');
				draw++;
			} // if player and computer has six high straight
			if(playerScore==215 && computerScore==215){
				centerNotice.innerHTML=('It\'s a Draw!');
				draw++;
			} // if player and computer has five high straight
			if(playerScore>100 && computerScore>100 && playerScore<107 && computerScore<107){
				if(ptb3kh>ctb3kh){
					centerNotice.innerHTML=('You Win the Round!');
					playerWin++;
					playerAmount=playerAmount+totalPot;
					playerMoney.innerHTML=(playerAmount);
					bettingMax=playerAmount;
					totalPot=0;
					currentPot.innerHTML=(0);
				}
				if(ptb3kh<ctb3kh){
					centerNotice.innerHTML=('Computer Wins the Round!');
					computerWin++;
					computerAmount=computerAmount+totalPot;
					computerMoney.innerHTML=(computerAmount);
					totalPot=0;
					currentPot.innerHTML=(0);
				}
				if(ptb3kh==ctb3kh){
					if(ptb3kl>ctb3kl){
						centerNotice.innerHTML=('You Win the Round!');
						playerWin++;
						playerAmount=playerAmount+totalPot;
						playerMoney.innerHTML=(playerAmount);
						bettingMax=playerAmount;
						totalPot=0;
						currentPot.innerHTML=(0);
					}
					if(ptb3kl<ctb3kl){
						centerNotice.innerHTML=('Computer Wins the Round!');
						computerWin++;
						computerAmount=computerAmount+totalPot;
						computerMoney.innerHTML=(computerAmount);
						totalPot=0;
						currentPot.innerHTML=(0);
					}
					if(ptb3kl==ctb3kl){
						centerNotice.innerHTML=('It\'s a Draw!');
						draw++;
					}
				}
			} // if player and computer has same 3 of a kind
			if(playerScore>11 && computerScore>11 && playerScore<66 && computerScore<66){
				if(ptb2p>ctb2p){
					centerNotice.innerHTML=('You Win the Round!');
					playerWin++;
					playerAmount=playerAmount+totalPot;
					playerMoney.innerHTML=(playerAmount);
					bettingMax=playerAmount;
					totalPot=0;
					currentPot.innerHTML=(0);
				}
				if(ptb2p<ctb2p){
					centerNotice.innerHTML=('Computer Wins the Round!');
					computerWin++;
					computerAmount=computerAmount+totalPot;
					computerMoney.innerHTML=(computerAmount);
					totalPot=0;
					currentPot.innerHTML=(0);
				}
				if(ptb2p==ctb2p){
					centerNotice.innerHTML=('It\'s a Draw!');
					draw++;
				}
			} // if player and computer has same 2 pairs
			if(playerScore>0 && computerScore>0 && playerScore<7 && computerScore<7 && p_pairTieBreaker.length==3 && c_pairTieBreaker.length==3){
				if(p1ph>c1ph){
					centerNotice.innerHTML=('You Win the Round!');
					playerWin++;
					playerAmount=playerAmount+totalPot;
					playerMoney.innerHTML=(playerAmount);
					bettingMax=playerAmount;
					totalPot=0;
					currentPot.innerHTML=(0);
				}
				if(p1ph<c1ph){
					centerNotice.innerHTML=('Computer Wins the Round!');
					computerWin++;
					computerAmount=computerAmount+totalPot;
					computerMoney.innerHTML=(computerAmount);
					totalPot=0;
					currentPot.innerHTML=(0);
				}
				if(p1ph==c1ph){
					if(p1pm>c1pm){
						centerNotice.innerHTML=('You Win the Round!');
						playerWin++;
						playerAmount=playerAmount+totalPot;
						playerMoney.innerHTML=(playerAmount);
						bettingMax=playerAmount;
						totalPot=0;
						currentPot.innerHTML=(0);
					}
					if(p1pm<c1pm){
						centerNotice.innerHTML=('Computer Wins the Round!');
						computerWin++;
						computerAmount=computerAmount+totalPot;
						computerMoney.innerHTML=(computerAmount);
						totalPot=0;
						currentPot.innerHTML=(0);
					}
					if(p1pm==c1pm){
						if(p1pl>c1pl){
							centerNotice.innerHTML=('You Win the Round!');
							playerWin++;
							playerAmount=playerAmount+totalPot;
							playerMoney.innerHTML=(playerAmount);
							bettingMax=playerAmount;
							totalPot=0;
							currentPot.innerHTML=(0);
						}
						if(p1pl<c1pl){
							centerNotice.innerHTML=('Computer Wins the Round!');
							computerWin++;
							computerAmount=computerAmount+totalPot;
							computerMoney.innerHTML=(computerAmount);
							totalPot=0;
							currentPot.innerHTML=(0);
						}
						if(p1pl==c1pl){
							centerNotice.innerHTML=('It\'s a Draw!');
							draw++;
						}
					}
				}
			} // if player and computer has same pair
		} // when player and computer has same hand
	} // show who wins the round
};
