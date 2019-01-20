var dateTimePicker;
function DatePickerCellType() {
}
DatePickerCellType.prototype = new GC.Spread.Sheets.CellTypes.Base();
DatePickerCellType.prototype.createEditorElement = function (context) {
    var $input = $('<input id="datetimepicker" type="text" gcUIElement="gcEditingInput" />');
    return $input[0];
};

DatePickerCellType.prototype.activateEditor = function (editorContext, cellStyle, cellRect, context) {
    //GC.Spread.Sheets.CellTypes.Base.prototype.activateEditor.apply(this, [editorContext, cellStyle, cellRect, context]);
    //Initialize input editor.
    if (editorContext) {
        $editor = $(editorContext);
        //  ns.CustomCellType.prototype.activateEditor.apply(this, arguments);
        var dateTimePicker = $editor.data("kendoDateTimePicker");
        if (!dateTimePicker) {
            // change:$editor.kendoDateTimePicker() return the $editor,if you want dateTimePicker instance
            // you should get it by $editor.data("kendoDateTimePicker"):
            $editor.kendoDateTimePicker({
                format: "MM/dd/yyyy hh:mm tt",
                timeFormat: "HH:mm", //24 hours format
                weekNumber: true
            });
            dateTimePicker = $editor.data("kendoDateTimePicker");
            // change:in createEditorElement you have set $editor's attribute gcUIElement already
            // $editor.css("position", "absolute");
            // $editor.attr("gcUIElement", "gcEditingInput");
            // $(".k-input").attr("gcUIElement", "gcEditingInput");
        }
        // change:actually dateTimerPicker has two dom element on page,
        // should add attribute "gcUIElement:'gcEditingInput'" to them too,could visit them like this.
        dateTimePicker.dateView.div.attr('gcUIElement', 'gcEditingInput');
        dateTimePicker.timeView.list.attr('gcUIElement', 'gcEditingInput');
    }
};

DatePickerCellType.prototype.deactivateEditor = function (editorContext, context) {
    //GC.Spread.Sheets.CellTypes.Base.prototype.deactivateEditor.apply(this, [editorContext, context]);
    //Remove input editor when end editor status.
    if (editorContext) {
        var dateTimePicker = $(editorContext).data("kendoDateTimePicker");
        if (dateTimePicker) {
            dateTimePicker.close();
            // dateTimePicker.destroy();
        }
    }
};

DatePickerCellType.prototype.setEditorValue = function (editor, value, context) {
    //GC.Spread.Sheets.CellTypes.Base.prototype.setEditorValue.apply(this, [editor, value, context]);
    //Sync value from Cell value to editor value.
    // change:these code below are right,but you use "10\12\2017 11:00 PM" as cell's value,
    // kendo.parseDate() can't use "MM/dd/yyyy hh:mm tt" as formatter to parse "10\12\2017 11:00 PM",
    // if you really want use "10\12\2017 11:00 PM" as date string,
    // you should use "MM\\dd\\yyyy hh:mm tt" as formatter instead of use "MM/dd/yyyy hh:mm tt"
    var dateTimePicker = $(editor).data("kendoDateTimePicker");
    if (dateTimePicker) {
       if (value) {
           dateTimePicker.value(kendo.parseDate(value, "MM/dd/yyyy hh:mm tt"));
       }
    }
};

DatePickerCellType.prototype.getEditorValue = function (editor, context) {
    var dateString;

    var dateTimePicker = $(editor).data("kendoDateTimePicker");
    if (dateTimePicker) {

        var selectedDate = dateTimePicker.value();
        if (selectedDate) {
            // change:selectedDate is a date,can be parse to data string directly
            // var dateobj = kendo.parseDate(selectedDate, "MM/dd/yyyy hh:mm tt");
            // dateString = kendo.toString(dateobj, "MM/dd/yyyy hh:mm tt");
            //dateString = dateTimePicker.value();

            dateString = kendo.toString(selectedDate, "MM/dd/yyyy hh:mm tt");
        }
    }

    return dateString;
};

DatePickerCellType.prototype.updateEditor = function (editorContext, cellStyle, cellRect, context) {
    //Update the editor location.
    if (editorContext) {
        $editor = $(editorContext);
        //$editor.css("width", cellRect.width - 1);
        //$editor.css("height", cellRect.height - 1);
    }
    //GC.Spread.Sheets.CellTypes.Base.prototype.updateEditor.apply(this, [editorContext, cellStyle, cellRect, context]);
};

export DatePickerCellType;



