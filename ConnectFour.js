//=============
//COLOR PALETTE
//=============
var darkGreen = "#157145";
var lightGreen = "#57A773";
var darkBlue = "#6A8EAE";
var lightBlue = "#9BD1E5";
var whiteBlue = "#D1FAFF";
var lightGrey = "#f2f2f2";
var darkGrey = "#8c8c8c";

//========================
//ADMINISTRATIVE FUNCTIONS
//========================

	//-----------------------
	//Random Number Generator
	//-----------------------
	function getRandomInt(min, max)
	{
		return Math.floor(Math.random() * (max - min)) + min;
	}
	
	//-------------
	//Cell Function
	//-------------
	function Cell(cellID, active, control)
	{
		this.theID = cellID;
		this.theStatus = active;
		this.theControl = control;
		this.theAttackPoints = 0;
		this.theDefensePoints = 0;
	}

	//------------------------
	//Administrative Variables
	//------------------------
	var player = 0;
	var opponent = 0;
	var cells=
	[
		[
		//-----
		//Row A
		//-----
		new Cell("A1",1,null),
		new Cell("A2",1,null),
		new Cell("A3",1,null),
		new Cell("A4",1,null),
		new Cell("A5",1,null),
		new Cell("A6",1,null),
		new Cell("A7",1,null)
		],
		[
		//-----
		//Row B
		//-----
		new Cell("B1",1,null),
		new Cell("B2",1,null),
		new Cell("B3",1,null),
		new Cell("B4",1,null),
		new Cell("B5",1,null),
		new Cell("B6",1,null),
		new Cell("B7",1,null)
		],
		[
		//-----
		//Row C
		//-----
		new Cell("C1",1,null),
		new Cell("C2",1,null),
		new Cell("C3",1,null),
		new Cell("C4",1,null),
		new Cell("C5",1,null),
		new Cell("C6",1,null),
		new Cell("C7",1,null)
		],
		[
		//-----
		//Row D
		//-----
		new Cell("D1",1,null),
		new Cell("D2",1,null),
		new Cell("D3",1,null),
		new Cell("D4",1,null),
		new Cell("D5",1,null),
		new Cell("D6",1,null),
		new Cell("D7",1,null)
		],
		[
		//-----
		//Row E
		//-----
		new Cell("E1",1,null),
		new Cell("E2",1,null),
		new Cell("E3",1,null),
		new Cell("E4",1,null),
		new Cell("E5",1,null),
		new Cell("E6",1,null),
		new Cell("E7",1,null)
		],
		[
		//-----
		//Row F
		//-----
		new Cell("F1",0,null),
		new Cell("F2",0,null),
		new Cell("F3",0,null),
		new Cell("F4",0,null),
		new Cell("F5",0,null),
		new Cell("F6",0,null),
		new Cell("F7",0,null)
		]
	];

//=========
//AI Player
//=========

	//---------
	//Variables
	//---------
	var openCells=[];
	
	//---------
	//Functions
	//---------
	
		//-------
		//AI Turn
		//-------
		function AITurn()
		{
			checkAvailableCells();
			setTimeout(selectAvailableCell,1000);
		}

		//-------------------------
		//AI Checks Available Cells
		//-------------------------
		var theOtherCounter = 0;
	
		function checkAvailableCells()
			{
				for(var i=0; i<cells.length; i++)
				{
					for(var j=0; j<cells[i].length; j++)
					{
						if(cells[i][j].theStatus===0)
						{
							var openCell = cells[i][j];
							openCells.push(openCell);
							measureValue(openCell.theID);
						}
					}
				}
			};
		//--------------------------------------
		//AI Clears Cells' Attack/Defense Values
		//--------------------------------------
		function clearAvailableCells()
		{
			for(i=0; i<cells.length; i++)
			{
				for(j=0; j<cells[i].length; j++)
				{
					if(cells[i][j].theStatus==0)
					{
						cells[i][j].theAttackPoints = 0;
						cells[i][j].theDefensePoints = 0;
					}
				};
			};
		};
		//------------------------
		//AI Measures Cell's Value
		//------------------------
		function measureValue(cell)
		{
		var column = cell[0].charCodeAt(0) - 65;
		var row = parseInt(parseInt(cell[cell.length-1])-1);
		var loopCounter = 0;
		cells[column][row].theAttackPoints = 0;
		cells[column][row].theDefensePoints = 0;
		//--------------------------------
		//Diagonal Measurement - Northwest
		//--------------------------------
		for(var i=1; i<4; i++)
		{
			if((column-i)>=0 && (column-i)<=5 && (row-i)>=0 && (row-i)<=6)
			{
				if(cells[column-i][row-i].theStatus==2 && cells[column-i][row-i].theControl==player)
				{
					cells[column][row].theAttackPoints++;
				}
				else if(cells[column-i][row-i].theStatus==2 && cells[column-i][row-i].theControl==opponent)
				{
					cells[column][row].theDefensePoints++;
				}
			}
		};
			
		//--------------------------
		//Diagonal Check - Southeast
		//--------------------------
		for(var i=1; i<4; i++)
		{
			if((column+i)>=0 && (column+i)<=5 && (row+i)>=0 && (row+i)<=6)
			{
				if(cells[column+i][row+i].theStatus==2 && cells[column+i][row+i].theControl==player)
				{
					cells[column][row].theAttackPoints++;
				}
				else if(cells[column+i][row+i].theStatus==2 && cells[column+i][row+i].theControl==opponent)
				{
					cells[column][row].theDefensePoints++;
				};
			}
		};
		/*

		//--------------------------
		//Diagonal Check - NE and SW
		//--------------------------
		total = 0;
		connections=[];
		//--------------------------
		//Diagonal Check - Northeast
		//--------------------------
		for(i=1; i<4; i++)
		{
			if((column-i)>=0 && (column-i)<=5 && (row+i)>=0 && (row+i)<=6)
			{
				if(cells[column-i][row+i].theStatus==2 && cells[column-i][row+i].theControl==player)
				{
					total++;
					connections.push(cells[column-i][row+i].theID);
					checkForConnectFour(total);
				}
				else
				{
				break;
				}
			};
		};
			
		//--------------------------
		//Diagonal Check - Southwest
		//--------------------------
		for(i=1; i<4; i++)
		{
			if((column+i)>=0 && (column+i)<=5 && (row-i)>=0 && (row-i)<=6)
			{
			if((cells[column+i][row-i].theStatus==2) && (cells[column+i][row-i].theControl==player))
				{
					total++;
					connections.push(cells[column+i][row-i].theID);
					checkForConnectFour(total);
				}
			else
				{
				break;
				}
			};
		};

		//----------------------
		//Vertical Check - South
		//----------------------
		total = 0;
		connections=[];
		for(i=1; i<4; i++)
		{
			if((column+i)>=0 && (column+i)<=5)
			{
				{
					if((cells[column+i][row].theStatus==2) && (cells[column+i][row].theControl==player))
					{
						total++;
						connections.push(cells[column+i][row].theID);
						checkForConnectFour(total);
					}
					else
					{
					break;
					}
				};
			};
		};
		
		//----------------------
		//Vertical Check - North
		//----------------------
		for(i=1; i<4; i++)
		{
			if((column-i)>=0 && (column-i)<=5)
			{
				if((cells[column-i][row].theStatus==2) && (cells[column-i][row].theControl==player))
				{
					total++;
					connections.push(cells[column-i][row].theID);
					checkForConnectFour(total);
				}
				else
				{
				break;
				}
			};
		};
		
		//-----------------------
		//Horizontal Check - West
		//-----------------------
		total = 0;
		connections=[];
		for(i=1; i<4; i++)
		{
			if((row-i)>=0 && (row-i)<=6)
			{
				if((cells[column][row-i].theStatus==2) && (cells[column][row-i].theControl==player))
				{
					total++;
					connections.push(cells[column][row-i].theID);
					checkForConnectFour(total);
				}
				else
				{
				break;
				}
			};
		};

		//-----------------------
		//Horizontal Check - East
		//-----------------------
		for(i=1; i<4; i++)
		{
			if((row+i)>=0 && (row+i)<=6)
			{
				if((cells[column][row+i].theStatus==2) && (cells[column][row+i].theControl==player))
				{
					total++;
					connections.push(cells[column][row+i].theID);
					checkForConnectFour(total);
				}
				else
				{
				break;
				}
			};
		};	
		*/
		for(var i=0; i<openCells.length; i++)
		{
			if(openCells[i].theAttackPoints>0 || openCells[i].theDefensePoints>0)
			{
			console.log("Attack Points " + openCells[i].theID + " " + openCells[i].theAttackPoints);
			console.log("Defense Points " + openCells[i].theID + " " + openCells[i].theDefensePoints);
			}
		}
		};
		
		function rankCells()
		{
			var highestAttackValue = -Infinity;
			var highestDefenseValue = -Infinity;
			var highestAttackCell = null;
			var highestDefenseCell = null;
			
			for(var i = 0; i < openCells.length; i++)
			{
				console.log("Ranking for Cell " + i);
				var attackEntry = openCells[i];
				var defenseEntry = openCells[i];
				
				if(attackEntry.theAttackPoints > highestAttackValue)
				{
					highestAttackValue = attackEntry.theAttackPoints;
					console.log("The highestAttackValue is " + highestAttackValue + ". That is: " + attackEntry.theID + ", which contains the highest attack value: " + attackEntry.theAttackPoints);
					highestAttackCell = attackEntry.theID;
					
				}
				if(defenseEntry.theDefensePoints > highestDefenseValue)
				{
					highestDefenseValue = defenseEntry.theDefensePoints;
					console.log(defenseEntry + " contains the highest defense value: " + defenseEntry.theDefensePoints);
					highestDefenseCell = defenseEntry.theID;
				}
			}
			
				if(highestDefenseValue > highestAttackValue)
				{
					console.log("Returning " + highestDefenseCell + " because " + highestDefenseValue + " is greater than " + highestAttackValue);
					return highestDefenseCell;
				}
				else
				{
					console.log("Returning " + highestAttackCell + " because " + highestAttackValue + " is greater than " + highestDefenseValue);
					return highestAttackCell;
				}
		}
		//--------------------------------
		//AI Selects Among Available Cells
		//--------------------------------
		function selectAvailableCell()
		{
			var AISelection = rankCells();
			selectCell(AISelection);
			//var AISelection = getRandomInt(0,openCells.length);
			//selectCell(openCells[AISelection].theID);
			openCells=[];	
		}

//========================
//Administrative Functions
//========================
function hoverColor(cell)
{
	//This 'target' variable equates to the ID assigned to the cell, ("A2", E4", etc.)
	target = document.getElementById(cell);
	
	//See Notes #1
	var column = cell[0].charCodeAt(0) - 65;
	
	var row = parseInt(parseInt(cell[cell.length-1])-1);
	if(cells[column][row].theStatus==0)
	{
		target.style.backgroundColor=whiteBlue;
	}
	else if(cells[column][row].theStatus==1)
	{
		target.style.backgroundColor=darkGrey;
	}
}

function mouseOutColor(cell)
{
	var target = document.getElementById(cell);
	var column = cell[0].charCodeAt(0) - 65;
	var row = parseInt(parseInt(cell[cell.length-1])-1);
	target = document.getElementById(cell);
	if(cells[column][row].theStatus==1)
	{
	target.style.backgroundColor=darkGrey;
	}
	else if(cells[column][row].theStatus==0)
	{
	target.style.backgroundColor=lightGrey;
	}
	else
	{
	}
	
}
var connections = [];
function selectCell(cell)
{
	console.log("Cell equals " + cell);
	clearAvailableCells();
	var target = document.getElementById(cell);
	var column = cell[0].charCodeAt(0) - 65;
	var row = parseInt(parseInt(cell[cell.length-1])-1);
	if(cells[column][row].theStatus==0)
	{
		if(player==0)
		{
			target.style.backgroundColor=darkBlue
			target.classList.add('color-transition');
			player=1;
			opponent=0;
			setTimeout(AITurn,1000);
		}
		else if(player==1)
		{
			target.style.backgroundColor=lightGreen
			target.classList.add('color-transition');
			player=0;
			opponent=1;
		}
		cells[column][row].theStatus=2;
		cells[column][row].theControl=player;
		countConnections(cell);
		if(column!=0)
		{
			cells[column-1][row].theStatus=0;
			var above = document.getElementById(cells[column-1][row].theID);
			above.style.backgroundColor=lightGrey;
		};
		
//======================
//Check For Connect Four
//======================
function countConnections(entry)
{	
cell = entry;
var target = document.getElementById(cell);
var column = cell[0].charCodeAt(0) - 65;
var row = parseInt(parseInt(cell[cell.length-1])-1);

//--------------------------
//Diagonal Check - NW and SE
//--------------------------
	var total = 0;
	connections = [];
	//--------------------------
	//Diagonal Check - Northwest
	//--------------------------
	for(i=1; i<4; i++)
	{
		if((column-i)>=0 && (column-i)<=5 && (row-i)>=0 && (row-i)<=6)
		{
		if((cells[column-i][row-i].theStatus==2) && (cells[column-i][row-i].theControl==player))
		{
			total++;
			connections.push(cells[column-i][row-i].theID);
			checkForConnectFour(total);
		}
		}
		else
		{
		}
	};
		
	//--------------------------
	//Diagonal Check - Southeast
	//--------------------------
	for(i=1; i<4; i++)
	{
		if((column+i)>=0 && (column+i)<=5 && (row+i)>=0 && (row+i)<=6)
		{
		if((cells[column+i][row+i].theStatus==2) && (cells[column+i][row+i].theControl==player))
			{
				total++;
				connections.push(cells[column+i][row+i].theID);
				checkForConnectFour(total);
			};
		}
	};

//--------------------------
//Diagonal Check - NE and SW
//--------------------------
	total = 0;
	connections=[];
	//--------------------------
	//Diagonal Check - Northeast
	//--------------------------
	for(i=1; i<4; i++)
	{
		if((column-i)>=0 && (column-i)<=5 && (row+i)>=0 && (row+i)<=6)
		{
			if(cells[column-i][row+i].theStatus==2 && cells[column-i][row+i].theControl==player)
			{
				total++;
				connections.push(cells[column-i][row+i].theID);
				checkForConnectFour(total);
			}
			else
			{
			break;
			}
		};
	};
		
	//--------------------------
	//Diagonal Check - Southwest
	//--------------------------
	for(i=1; i<4; i++)
	{
		if((column+i)>=0 && (column+i)<=5 && (row-i)>=0 && (row-i)<=6)
		{
		if((cells[column+i][row-i].theStatus==2) && (cells[column+i][row-i].theControl==player))
			{
				total++;
				connections.push(cells[column+i][row-i].theID);
				checkForConnectFour(total);
			}
		else
			{
			break;
			}
		};
	};

//----------------------
//Vertical Check - South
//----------------------
	total = 0;
	connections=[];
	for(i=1; i<4; i++)
	{
		if((column+i)>=0 && (column+i)<=5)
		{
			{
				if((cells[column+i][row].theStatus==2) && (cells[column+i][row].theControl==player))
				{
					total++;
					connections.push(cells[column+i][row].theID);
					checkForConnectFour(total);
				}
				else
				{
				break;
				}
			};
		};
	};
	
//----------------------
//Vertical Check - North
//----------------------
	for(i=1; i<4; i++)
	{
		if((column-i)>=0 && (column-i)<=5)
		{
			if((cells[column-i][row].theStatus==2) && (cells[column-i][row].theControl==player))
			{
				total++;
				connections.push(cells[column-i][row].theID);
				checkForConnectFour(total);
			}
			else
			{
			break;
			}
		};
	};
	
//-----------------------
//Horizontal Check - West
//-----------------------
	total = 0;
	connections=[];
	for(i=1; i<4; i++)
	{
		if((row-i)>=0 && (row-i)<=6)
		{
			if((cells[column][row-i].theStatus==2) && (cells[column][row-i].theControl==player))
			{
				total++;
				connections.push(cells[column][row-i].theID);
				checkForConnectFour(total);
			}
			else
			{
			break;
			}
		};
	};

//-----------------------
//Horizontal Check - East
//-----------------------
	for(i=1; i<4; i++)
	{
		if((row+i)>=0 && (row+i)<=6)
		{
			if((cells[column][row+i].theStatus==2) && (cells[column][row+i].theControl==player))
			{
				total++;
				connections.push(cells[column][row+i].theID);
				checkForConnectFour(total);
			}
			else
			{
			break;
			}
		};
	};	
}
	
}
else
{
	alert("You cannot select this cell");
}
			
};

function checkForConnectFour(cellEntry)
{
	var theTotal = cellEntry;
	if(theTotal > 2)
	{
		alert("Connect Four");
		console.log("Connect Four " + connections);
	}
};




/*
NOTES
#1 - To convert the cell's letter to its corresponding number, we utilize the ASCII values. In ASCII, each character is assigned a unique numerical value. The uppercase letters from A to Z have values from 65-90. To convert the letter to a number, we need only to subtract 65 from the ASCII value of the letter. 
*/