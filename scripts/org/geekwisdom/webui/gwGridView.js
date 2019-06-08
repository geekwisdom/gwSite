/********************************************************************************
Script Name: gwGridView.js
@(#) Purpose: The GeekWisdom GridView is a vanilla implementatin of a table
@(#) object that can be easily filled with JSON data, it this version includes 
@(#) support for pagination and sorting. NO JQUERY REQUIRED
**********************************************************************************
Written By: Brad Detchevery
Created: May 25, 2019
********************************************************************************
MIT License [MODIFIED COPYRIGHT NOTICE]

-- BEGIN COPYRIGHT NOTICE --
Copyright (c) 2019 Brad Detchevery
This product uses GeekWisdom.org Software, and has been provided FREE OF CHARGE.
If you like it please consider becoming a Patron at https://patreon.com/GeekWisdom
-- END COPYRIGHT NOTICE --

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice (text between the -- BEGIN COPYRIGHT NOTICE -- and -- END COPYRIGHT NOTICE --)
and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
********************************************************************************/
﻿
function gwGridView(rootID,Settings) {
    this.pageSize = 8;
    this.cpadding=20;
    this.cspacing=0;
    this.SettingsObject;
    if (typeof Settings != "undefined" && Settings !="")
	{
	//alert (Settings);
	this.SettingsObject = JSON.parse(Settings);
	if (typeof this.SettingsObject["Headers"] != "undefined") this.jsonConfig = JSON.parse(this.SettingsObject["Headers"]);
        if (typeof this.SettingsObject["PageSize"] != "undefined") this.pageSize = this.SettingsObject["PageSize"];
        if (typeof this.SettingsObject["cellpadding"] != "undefined") this.cpadding = this.SettingsObject["cellpadding"];
        if (typeof this.SettingsObject["cellspacing"] != "undefined") this.cspacing = this.SettingsObject["cellspacing"];
	}
    var self = this;
    this.dataTable;
    this.pageIndex = 0;
    this.rootElementID = "divGrid";
    this.rootElement;
    this.gridTable;
    this.gridTableBody;
    this.gridError;
    this.sortinfo = {};

    this.pagingControl;
    this.jsonConfig;
    this.arFieldIX = [];
    this.isGridTableInit = false;

    this.sorttable = function (prop,order)
    {
     var sortorder=order;

     if (typeof this.sortinfo["prop"] != "undefined" && typeof this.sortinfo["order"] != "undefined")
		{
		if (prop == this.sortinfo["prop"])
			{
			//switch the order
			if (this.sortinfo["order"] == "asc") sortorder="desc";
			else sortorder="asc";
			}
		}

    this.sortinfo["prop"]=prop;
    this.sortinfo["order"] = sortorder;

    var arr = this.dataTable;
//    alert(arr);
    var sortedtable = arr.sort(function (a,b) {
     if (sortorder == "asc")
	return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
     else
	return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
    });
    
    this.datatable=arr;
    this.displayPage();

    if (typeof gwTable_Load != "undefined")
    gwTable_Load(this.rootElementID + "Table");
   
    }





    this.Init = function () {
        try {
            if (typeof rootID != "undefined") {
                this.rootElementID = rootID;
            }

            this.rootElement = document.getElementById(this.rootElementID);

            this.gridError = this.rootElement.appendChild(this.createNewElement("div", "Error", "Error"));
            this.gridTable = this.rootElement.appendChild(this.createNewElement("table", "Table", "gwGridTable"));
	    this.gridTable.cellPadding=this.cpadding;
	    this.gridTable.cellSpacing=this.cspacing;
            var tableFooter = this.gridTable.appendChild(this.createNewElement("tfoot", "Footer", ""));
            var tableFooterRow = tableFooter.appendChild(this.createNewElement("tr", "FooterRow", "gwGridTR"));
            var tableFooterCell = tableFooterRow.appendChild(this.createNewElement("td", "FooterCell", "SOLsearch"));
            tableFooterCell.colSpan = 100;
            this.pagingControl = tableFooterCell.appendChild(this.createNewElement("div", "Paging", "Paging"));
        }
        catch (ex) {
            alert("Init error: " + ex);
        }
    }

    this.createNewElement = function (strType, strID, strClassName) {
        var oElement = document.createElement(strType);
       // oElement.className = this.rootElementID + strClassName;
	 oElement.className = strClassName;
        oElement.id = this.rootElementID + strID;
        return oElement;
    }

    this.addNavigationLink = function (oControl, strCaption, linkIndex) {
        var oLink = oControl.appendChild(this.createNewElement("a", "NavigationLink_" + linkIndex, "NavigationLink"));
        oLink.href = "";
        oLink.appendChild(document.createTextNode(strCaption));

        if (linkIndex == this.pageIndex) {
            oLink.className = this.rootElementID + "NavigationCurrentPage";
        }

	oLink.onclick = function(e)  {
            e.preventDefault();
            if (linkIndex !== this.pageIndex) {
                self.onPagingClick(linkIndex);
            }
        };
    }

    this.addNavigationLinks = function (pagingControl) {
        try {
            this.clearElements(pagingControl);

            var recCount = this.dataTable.length;
            var linkCount = 7;
            var maxPage = Math.ceil(recCount / this.pageSize) - 1;

            this.addNavigationLink(pagingControl, " 1 ", 0);
            if (this.pageIndex > 3 && maxPage > (linkCount + 1)) {
                pagingControl.appendChild(document.createTextNode(" ... "));
            }

            var ixFrom = this.pageIndex - Math.floor(linkCount / 2);
            if (ixFrom > (maxPage - linkCount)) { ixFrom = maxPage - linkCount; }
            if (ixFrom < 1) { ixFrom = 1; }

            var ixTo = this.pageIndex + (Math.floor(linkCount / 2));
            if (ixTo < linkCount) { ixTo = linkCount; }
            if (ixTo > (maxPage - 1)) { ixTo = maxPage - 1; }

            for (i = ixFrom; i <= ixTo; i++) {
                this.addNavigationLink(pagingControl, " " + eval(i + 1) + " ", i);
            }

            if (this.pageIndex < (maxPage - Math.floor(linkCount / 2)) && maxPage > (linkCount + 1)) {
                pagingControl.appendChild(document.createTextNode(" ... "));
            }

            this.addNavigationLink(pagingControl, " " + eval(maxPage + 1) + " ", maxPage);
        }
        catch (ex) {
            this.diplayError("addNavigationLinks error: " + ex);
        }
    }

    this.onPagingClick = function (pageIX) {
        this.pageIndex = pageIX;
        this.displayPage();
        return false;
    }

    this.initGridtable = function () {
	try {
            this.arFieldIX = [];
            this.resetError();
            this.isGridTableInit = true;

            var dataRow = this.dataTable[0];

            this.gridTableBody = this.gridTable.appendChild(document.createElement("tbody"));
            var gridTableHeader = this.gridTable.appendChild(document.createElement('thead'),'thead','gwGridhead');
            var headerRow= gridTableHeader.appendChild(this.createNewElement("tr", "HeaderRow", "gwGridhead"));

            var totalWidth = 0;

            if (typeof this.jsonConfig == "undefined") {
                for (i = 0; i < Object.keys(dataRow).length; i++) {
		    var newcell = this.addHeaderCell(headerRow, i, Object.keys(dataRow)[i]);
                    totalWidth += newcell.width + 20;
                }
            }
            else {
		//alert(jsonConfig.length);
		//alert(this.jsonConfig.length);
                for (i = 0; i < this.jsonConfig.length; i++) {
                    var DataField = this.jsonConfig[i].DataField;
			

                    var k = -1;
                    do { k++;}
                    while (k < Object.keys(dataRow).length && DataField != Object.keys(dataRow)[k])


                    if (k < Object.keys(dataRow).length) {
                        this.arFieldIX.push(k);
                        if (typeof this.jsonConfig[i].HeaderText == "undefined") {
			    var newcell =this.addHeaderCell(headerRow, i, Object.keys(dataRow)[k]);
                            totalWidth += newcell.width;
                        }
                        else {
			    var newcell=this.addHeaderCell(headerRow, i, this.jsonConfig[i].HeaderText,Object.keys(dataRow)[k]);
                            totalWidth += newcell.width;
                        }
                    }
                    else {
                        //this.diplayError("Data field " + DataField + " not found <br>");
			alert ("error!");
                    }
                }
            }

            this.gridTable.width=screen.width / 2;
}        catch (ex) {
            alert("initGridtable error: " + ex);
        }
     
      
    }

    this.addHeaderCell = function (headerRow, i, strCellData,strFieldName) {
        try {
            var headerCell = headerRow.appendChild(this.createNewElement("th", "HeaderCell_" + i, "gwGridhead"));
           // headerCell.textContent = strCellData;

                var hyperLink = headerCell.appendChild(document.createElement("a"))
                hyperLink.appendChild(document.createTextNode(strCellData));
                hyperLink.href = "";
                hyperLink.className = "";
        //       var oData = this.dataTable[i];

		if (typeof strFieldName != "undefined")
               hyperLink.onclick = function(e) { e.preventDefault(); self.sorttable(strFieldName,"asc");} 
	       else
               hyperLink.onclick = function(e) { e.preventDefault(); self.sorttable(strCellData,"asc");} 

	     

            if ((typeof this.jsonConfig !== "undefined") && (typeof this.jsonConfig[i].Width !== "undefined")) {
                headerCell.width = this.jsonConfig[i].Width;
            }
            return headerCell;
        }
        catch (ex) {
            this.diplayError("addHeaderCell error: " + ex);
        }
    }

    this.formatDate = function (dtDate) {
        try {
            var strFormat = "MMM dd, yyyy HH:mm:ss";
            var arMonths = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
            var strResponse = strFormat.replace("MMM", arMonths[dtDate.getMonth()]).replace("dd", this.addLeadingZero(dtDate.getDate())).replace("yyyy", dtDate.getFullYear()).
                replace("HH", this.addLeadingZero(dtDate.getHours())).replace("mm", this.addLeadingZero(dtDate.getMinutes())).replace("ss", this.addLeadingZero(dtDate.getSeconds()));
            return strResponse;
        }
        catch (ex) {
            this.diplayError("formatDate error: " + ex);
        }
    }

    this.addLeadingZero = function (intNumber) {
        if (intNumber < 10) {
            return "0" + intNumber;
        }
        else {
            return intNumber + "";
        }
    }

    this.addCell = function (tableRow, i, j, strCellData) {
        var rowCell = tableRow.appendChild(this.createNewElement("td", "rowCell_" + i + "_" + j, "gwGridview"));

        try {
            if (strCellData == null) { strCellData = ""; }                  //No data at all, empty cell

            if (typeof strCellData !== "undefined") {
                if (strCellData.toString().indexOf("\/Date") > -1) {        //Data is a Date, format it as a Date
                    var dtDate = new Date(strCellData.match(/\d+/)[0] * 1);
                    strCellData = this.formatDate(dtDate);
                }
            }

 
                rowCell.textContent = strCellData;
           

            //set the cell width
            if ((typeof this.jsonConfig !== "undefined") && (typeof this.jsonConfig[j].Width !== "undefined")) {
                rowCell.width = this.jsonConfig[j].Width;
            }
            else {
                rowCell.width = 100;
            }
        }
        catch (ex) {
            this.displayError("Date parse error: " + ex + " " + strCellData + "--");
        }
    }

    this.addColumns = function (tableRow, i) {
        try {
            var dataRow = this.dataTable[i];
            if (this.arFieldIX.length > 0) {
                for (j = 0; j < this.arFieldIX.length; j++) {
                    this.addCell(tableRow, i, j, dataRow[Object.keys(dataRow)[this.arFieldIX[j]]]);
                }
            }
            else {
                var colCount = Object.keys(dataRow).length
                for (j = 0; j < colCount; j++) {
                    this.addCell(tableRow, i, j, dataRow[Object.keys(dataRow)[j]])
                }
            }
        }
        catch (ex) {
            this.displayError("addColumns error: " + ex);
        }
    }

    this.displayPage = function () {
        try {
            if (!this.isGridTableInit) {
                this.initGridtable();
            }

            this.clearElements(this.gridTableBody);

            var intOffset = this.pageSize * this.pageIndex;
            var recCount = this.dataTable.length;
            var pageCount = Math.ceil(recCount / this.pageSize);

            for (i = 0; i < this.pageSize; i++) {
                if ((intOffset + i) < recCount) {
                    var tableRow = this.gridTableBody.appendChild(this.createNewElement("tr", "_Row_" + eval(i + intOffset), "gwGridTR"));
		    tableRow.onclick=function(e) { GetSelectedRow(this,0); };
                    this.addColumns(tableRow, intOffset + i);
                }
            }

            if (pageCount > 1) {
                this.addNavigationLinks(this.pagingControl);
            }
        }
        catch (ex) {
            this.diplayError("displayPage error: " + ex);
        }
    }

    this.clearElements = function (oElement) {
        while (oElement.firstChild) {
            oElement.removeChild(oElement.firstChild);
        }
    }

    this.diplayError = function (strError) {
        this.gridError.textContent = strError;
//        $(this.gridError).show();
        setTimeout(function () { self.resetError() }, 10000);
    }

    this.resetError = function (strError) {
        this.gridError.textContentf = "";
//        $(this.gridError).hide();
    }

    this.Init();
    if (typeof gwTable_Load != "undefined")
    gwTable_Load(this.rootElementID + "Table");
}
