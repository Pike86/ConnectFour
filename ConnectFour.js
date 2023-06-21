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
	//Console Log With Indent
	//-----------------------
	function logWithIndentation(message, indentLevel) {
	  const indent = ' '.repeat(indentLevel * 2); // Adjust the number of spaces per indent level as needed
	  console.log(`${indent}${message}`);
	}

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
		this.theCurrentAttackPoints = 0;
		this.theDefensePoints = 0;
		this.theCurrentDefensePoints = 0;
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
	var direction=
	[
		//-----------
		//North-South
		//-----------
			//N
			[-1,0,"N"],
			//S
			[1,0,"S"],
		//-------------------
		//Northeast-Southwest
		//-------------------
			//NE
			[-1,1,"NE"],
			//SW
			[1,-1,"SW"],
		//---------
		//East-West
		//---------
			//E
			[0,1,"E"],
			//W
			[0,-1,"W"],
		//-------------------
		//Southeast-Northwest
		//-------------------
			//SE
			[1,1,"SE"],
			//NW
			[-1,-1,"NW"]
	];
	
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
		//General Points
		cells[column][row].theAttackPoints = 0;
		cells[column][row].theDefensePoints = 0;
		//Current Points
		cells[column][row].theCurrentAttackPoints = 0;
		cells[column][row].theCurrentDefensePoints = 0;

		console.log("=========================");
		console.log("MEASURE VALUE FIRES FOR " + cells[column][row].theID);
		console.log("=========================");
		for(var a=0; a<direction.length; a++)
		{
			var i = 0;
			console.log(" ");
			logWithIndentation("~~~~~~~~~~~~~", 1);
			logWithIndentation(cells[column][row].theID + " measure " + direction[a][2], 1);
			logWithIndentation("~~~~~~~~~~~~~", 1);
			console.log(" ");
			for(var i=1; i<4; i++)
			{
			var columnCheck = column+(direction[a][0]*i);
			var rowCheck = row+(direction[a][1]*i);
				if
				(
					(columnCheck>=0) 
					&& 
					(columnCheck<=5)
					&&
					(rowCheck>=0) 
					&& 
					(rowCheck<=6)
				)
				{
					var currentCell = cells[column][row];
					var checkedCell = cells[columnCheck][rowCheck];
					console.log(columnCheck + " is >= 0 and <= 5");
					console.log(rowCheck + " is >= 0 and <= 6");
					if
					(
						checkedCell.theStatus==2
						&&
						checkedCell.theControl==player
					)
					{
						currentCell.theAttackPoints+=i;
						logWithIndentation(currentCell.theID + " " + direction[a][2]*i + ": " + checkedCell.theID + " " + checkedCell.theStatus,1);
						console.log(currentCell.theID + " Attack Value: " + currentCell.theAttackPoints);
					}
					else if
					(
						checkedCell.theStatus==2
						&&
						checkedCell.theControl==opponent
					)
					{
						cells[column][row].theDefensePoints+=i;
						logWithIndentation(currentCell.theID + " " + direction[a][2] + ": " + checkedCell.theStatus,1);
						console.log(currentCell.theID + " Defense Value: " + currentCell.theDefensePoints);
					}
					else
					{
						console.log("BREAK");
						break;
					}
				}
				else
				{
					logWithIndentation("Column Check: columnCheck*i = " + columnCheck);
					logWithIndentation("Column Check > " + (columnCheck > 0))
					logWithIndentation("Row Check: " + rowCheck);
					logWithIndentation("Out of Range",1);
				}
			}
		};
		
		};
		function rankCells()
		{
			var highestAttackValue = -Infinity;
			var highestDefenseValue = -Infinity;
			var highestAttackCell = null;
			var highestDefenseCell = null;
			
			for(var i = 0; i < openCells.length; i++)
			{
				var attackEntry = openCells[i];
				var defenseEntry = openCells[i];
				
				if(attackEntry.theAttackPoints > highestAttackValue)
				{
					highestAttackValue = attackEntry.theAttackPoints;
					highestAttackCell = attackEntry;
				}
				if(defenseEntry.theDefensePoints > highestDefenseValue)
				{
					highestDefenseValue = defenseEntry.theDefensePoints;
					highestDefenseCell = defenseEntry;
				}
			}
			
				if(highestDefenseValue > highestAttackValue)
				{
					console.log("Using Defense Cell " + highestDefenseCell.theID + "(" + highestDefenseCell.theDefensePoints + ") because it outweighs the highest attack cell, " + highestAttackCell.theID + "(" + highestAttackCell.theAttackPoints + ")");
					return highestDefenseCell.theID;
				}
				else
				{
					console.log("Using Attack Cell " + highestAttackCell.theID + "(" + highestAttackCell.theAttackPoints + ")");
					return highestAttackCell.theID;
				}
		}
		//--------------------------------
		//AI Selects Among Available Cells
		//--------------------------------
		function selectAvailableCell()
		{
			var AISelection = rankCells();
			selectCell(AISelection);
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
		
//=================================
//Prepare to Check For Connect Four
//=================================
function countConnections(entry)
{	
cell = entry;
var target = document.getElementById(cell);
var column = cell[0].charCodeAt(0) - 65;
var row = parseInt(parseInt(cell[cell.length-1])-1);

	var total = 0;
	connections = [];
	for(var a=0; a<direction.length; a++)
		{
			//Check if a is even. If so, set the 'total' variable to 0 and the 'connections' array to blank, then proceed.
			//For context, the "direction" array is organized to check 'N', then its opposite 'S', and so on in clockwise order, until all compass directions are accounted for. So you check 3 cells "up", then 3 cells "down", and determine if the total exceeds "4", indicating a connect four. Then start over so as to not overcount. 
			if(a % 2 === 0)
			{
				total=0;
				connections = [];
			}
			for(var i=1; i<4; i++)
			{
				var columnCheck = column + (direction[a][0]*i);
				var rowCheck = row + (direction[a][1]*i);
				//First Check if var i is in Range
				if
				(
					(columnCheck>=0)
					&&
					(columnCheck<=5)
					&&
					(rowCheck>=0)
					&&
					(rowCheck<=6)
				)
				{
					var currentCell = cells[column][row];
					var checkedCell = cells[columnCheck][rowCheck];
					if
					(
						checkedCell.theStatus==2
						&&
						checkedCell.theControl==player
					)
					{
						total++;
						connections.push(checkedCell.theID);
						checkForConnectFour(total,column,row);
					}
					else
					{
					}
				}
					
			}
		}
}
	
}
else
{
	alert("You cannot select this cell");
}
			
};

//======================
//Check for Connect Four
//======================
function checkForConnectFour(cellEntry,col,ro)
{
	var theColumn = col;
	var theRow = ro;
	var theTotal = cellEntry;
	if(theTotal > 2)
	{
		alert("Connect Four");
		connections.push(cells[theColumn][theRow].theID)
		console.log("Connect Four " + connections);
		for(z=0; z<connections.length; z++)
		{
			if(player==0)
			{
			document.getElementById(connections[z]).style.backgroundColor="#00cc00";
			}
			else
			{
			document.getElementById(connections[z]).style.backgroundColor="#0000ff";
			}
		}
	}
};




/*
NOTES
#1 - To convert the cell's letter to its corresponding number, we utilize the ASCII values. In ASCII, each character is assigned a unique numerical value. The uppercase letters from A to Z have values from 65-90. To convert the letter to a number, we need only to subtract 65 from the ASCII value of the letter. 
*/