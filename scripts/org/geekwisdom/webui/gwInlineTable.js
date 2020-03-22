/********************************************************************************
Script Name: gwInlineTable
@(#) Purpose: This class allows you to turn any HTML table into an 'inline'
@(#) Table for editing. To use it your must first add an extra row to the END, 
@(#) of the table that contains the editing details. Rows that are not 'editable'
@(#) must be filled with an &nbsp;
**********************************************************************************
Written By: Brad Detchevery
Created: March 20, 2020
********************************************************************************/
function gwInLineTable(tblname,colheaders,beforeupdate,afterupdate)
{

this.currentpos=0;

this.tbl = document.getElementById(tblname);
if (typeof colheaders != "undefined" && colheaders !="")

this.ColHeaders = colheaders;
else
this.ColHeaders = null;

if (typeof beforeupdate == "function")
{
this.onBeforeUpdate = beforeupdate;
}
else
this.onBeforeUpdate = function (rowIndex ) { return true; }
if (typeof afterupdate == "function")
{
this.onAfterUpdate = afterupdate;
}
else
this.onAfterUpdate = function(rowIndex) { return true; }


this.Init();
}

gwInLineTable.prototype.Init = function()
{
var self=this;
var cellclicked = function (evt,obj,tbl)
{
var cellIndex = evt.cellIndex;
var rowIndex = evt.parentElement.rowIndex;
if (!(obj.onBeforeUpdate(obj.currentpos))) return;
 var oldRow=obj.currentpos;
 obj.MoveInputRow(rowIndex,cellIndex);
 obj.onAfterUpdate(oldRow,obj.currentpos);
}

var addclicklistener = function(tbl,objt,func)
{
//don't add a listener to last row
        if (tbl != null) 
         {
            for (var i = 0; i < tbl.rows.length-1; i++) 
		   {
                    for (var j = 0; j < tbl.rows[i].cells.length; j++)
		     {                    
		       var cell =tbl.rows[i].cells[j];
	               cell.addEventListener("click",function (evt,obj,tbl) {  func(this,objt,tbl);});
		      }
                    }
        }
}




addclicklistener(this.tbl,this,cellclicked);

}

gwInLineTable.prototype.MoveInputRow = function (newposition,cellfocus)
{
var currentpos = this.currentpos;
if (newposition == currentpos) return;


//TODO: Move the last row (the inputs NOT the &nbsp;) to the clicked row for editing
//'Save' the data in the table whereever the 'current' row being edited is at !
var lastpos=this.tbl.rows.length-1;
if (newposition == lastpos)return;
var focusinput="";
if (currentpos == 0) currentpos=this.tbl.rows.length-1;
//alert (currentpos);
var newrow=this.tbl.rows[newposition];
var lastrow=this.tbl.rows[lastpos];
var currentrow = this.tbl.rows[currentpos];
for (var cols=0;cols < currentrow.cells.length;cols++)
	{
	var v=lastrow.cells[cols].innerHTML;
	if (v.trim() != "&nbsp;")
		{
	var presentValue = newrow.cells[cols].textContent;
	 
	var colname = 'col' + (cols+1);
	
	if (typeof this.ColHeaders == "object") colname=this.ColHeaders[cols];
	var vinput = document.getElementById(colname);
	var oldValue = vinput.value;
	if (cols == cellfocus) { focusinput = colname;}
	//newrow.cells[cols].innerHTML = currentrow.cells[cols].innerHTML;
        newrow.cells[cols].innerHTML="";
        newrow.cells[cols].appendChild(vinput);
	vinput = document.getElementById(colname);
	vinput.value=presentValue;
	currentrow.cells[cols].textContent = oldValue;

		}
	}

//document.getElementById(focusinput).value="21";
document.getElementById(focusinput).focus();


this.currentpos=newposition;

}
