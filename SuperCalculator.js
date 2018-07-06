describe('Super Calculator Test Execution',function(){

    var ExpectedTitleText='Super Calculator';
    var ExpectedHeaderText='Super Calculator';
    var HeaderTextElement=element(by.xpath("//div[@ng-controller='CalcCtrl']//h3"));
    var MethodsDropDown=element.all(by.xpath("//select[@ng-model='operator']/option"));
    var MethodApply='*';
    var FirstNumberElement=element(by.model('first'));
    var SecondNumberElement=element(by.model('second'));
    var GoButtonElement=element(by.buttonText('Go!'));
    var MethodResult=element(by.xpath("//h2[@class='ng-binding']"));
    var ResultTableRowsElement=element.all(by.xpath("//table[@class='table']/tbody/tr[@ng-repeat='result in memory']"));
    

    beforeEach(async function(){
        await browser.get("http://juliemr.github.io/protractor-demo/");
        await console.log("== Browser is launched ==");
    });

    xit('Verify Title of the page',async function(){
        await browser.getTitle().then(async function(TitleText){
            await console.log("Actual Rendered Title of the Page:"+TitleText);
            await expect(TitleText).toEqual(ExpectedTitleText);
        });
    });

    xit('Verify Header Text of the page',async function(){
        await HeaderTextElement.getText().then(async function(headertext){
            await console.log("Actual Header Text:"+headertext);
            await expect(headertext).toEqual(ExpectedHeaderText);
        });
    });

    xit('Verify functionalities in Dropdown for calculation',async function(){
        await MethodsDropDown.then(async function(items){
            await console.log("Number of Method Items available:"+items.length);
            for(var i=0;i<items.length;i++)
            {
                await MethodsDropDown.get(i).getText().then(async function(itemnames){
                    await console.log("Methods Symbols:"+itemnames);
                  });
            }
        });
    });

    it('Methods Apply & Verify Result',async function(){
        await FirstNumberElement.sendKeys(5);
        await SecondNumberElement.sendKeys(4);
        await MethodsDropDown.then(async function(itemlist){
            for(var j=0;j<itemlist.length;j++)
            {
                await MethodsDropDown.get(j).getText().then(async function(itemtext){
                    if(itemtext==MethodApply)
                    {
                        await MethodsDropDown.get(j).click();
                    }
                });
            }
        });
        await GoButtonElement.click();
        await MethodResult.getText().then(async function(result){
            await console.log("Result of "+MethodApply+" is:"+result);
            await expect(result).toEqual('20');
        });  
        
        await ResultTableRowsElement.then(async function(TableRowSize){
            await console.log("Number of Rows in Result Table:"+TableRowSize.length);
            for(i=0;i<TableRowSize.length;i++)
            {
                var ResultTableColumnElement=element.all(by.xpath("//table[@class='table']/tbody/tr[@ng-repeat='result in memory']['"+i+"']/td"));
                await ResultTableColumnElement.then(async function(eachColumnSize){
                    await console.log("Number of Columns in Result Table:"+eachColumnSize.length);
                    for(j=0;j<eachColumnSize.length;j++)
                    {
                        await ResultTableColumnElement.get(j).getText().then(async function(ColumnItemsName){
                            await console.log("Items in Result History Table in Row Index:"+i+"="+ColumnItemsName);
                        });
                    }
                });
            }
        });
    });
});